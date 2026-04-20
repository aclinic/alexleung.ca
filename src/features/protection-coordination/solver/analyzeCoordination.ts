import { getCurveFamilyById } from "@/features/protection-coordination/model/curveFamilies";
import {
  ChartDomain,
  CoordinationAnalysis,
  CoordinationFinding,
  CoordinationWindow,
  DevicePlotSeries,
  PairCoordinationSummary,
  ProtectionCoordinationScenario,
  ProtectionDevice,
  StudyPointResult,
} from "@/features/protection-coordination/model/types";
import {
  createLogSpace,
  evaluateDeviceTimePoint,
} from "@/features/protection-coordination/solver/evaluateCurve";
import { validateScenario } from "@/features/protection-coordination/validation/validateScenario";

const DEFAULT_CHART_DOMAIN: ChartDomain = {
  currentMinAmps: 10,
  currentMaxAmps: 10000,
  timeMinSeconds: 0.01,
  timeMaxSeconds: 100,
};

function niceLogLower(value: number): number {
  return 10 ** Math.floor(Math.log10(value));
}

function niceLogUpper(value: number): number {
  return 10 ** Math.ceil(Math.log10(value));
}

function isDevicePlottable(device: ProtectionDevice): boolean {
  return (
    device.enabled &&
    device.label.trim().length > 0 &&
    device.pickupCurrentAmps > 0 &&
    device.timeMultiplier > 0
  );
}

function buildChartDomain(
  devices: ProtectionDevice[],
  studyCurrentsAmps: number[]
) {
  if (devices.length === 0) {
    return DEFAULT_CHART_DOMAIN;
  }

  const currentStarts = devices.map((device) => {
    const family = getCurveFamilyById(device.curveFamilyId);
    return (
      device.pickupCurrentAmps * family.recommendedCurrentMultiplierRange.min
    );
  });
  const currentEnds = devices.map((device) => {
    const family = getCurveFamilyById(device.curveFamilyId);

    return Math.max(
      device.pickupCurrentAmps * family.recommendedCurrentMultiplierRange.max,
      device.instantaneousPickupAmps ?? 0
    );
  });
  const minCurrentCandidate = Math.min(...currentStarts, ...studyCurrentsAmps);
  const maxCurrentCandidate = Math.max(...currentEnds, ...studyCurrentsAmps);

  return {
    ...DEFAULT_CHART_DOMAIN,
    currentMinAmps: niceLogLower(Math.max(minCurrentCandidate, 1)),
    currentMaxAmps: niceLogUpper(
      Math.max(maxCurrentCandidate, Math.max(minCurrentCandidate, 1) * 10)
    ),
  };
}

function buildPlotSeries(
  device: ProtectionDevice,
  chartDomain: ChartDomain,
  instantaneousTripTimeSeconds: number
): DevicePlotSeries {
  const family = getCurveFamilyById(device.curveFamilyId);
  const inverseStartCurrentAmps = Math.max(
    chartDomain.currentMinAmps,
    device.pickupCurrentAmps * family.recommendedCurrentMultiplierRange.min
  );
  const inverseEndCurrentAmps = Math.min(
    chartDomain.currentMaxAmps,
    device.pickupCurrentAmps * family.recommendedCurrentMultiplierRange.max
  );
  const plotAssumptions = {
    minimumCoordinationMarginSeconds: 0.3,
    instantaneousTripTimeSeconds,
    currentMultiplierDomainMin: family.recommendedCurrentMultiplierRange.min,
    currentMultiplierDomainMax: family.recommendedCurrentMultiplierRange.max,
  };
  const sampleCurrents =
    inverseStartCurrentAmps < inverseEndCurrentAmps
      ? createLogSpace(inverseStartCurrentAmps, inverseEndCurrentAmps, 72)
      : [];
  const instantaneousPickupAmps = device.instantaneousPickupAmps;
  const shouldInsertThreshold =
    instantaneousPickupAmps !== null &&
    instantaneousPickupAmps >= inverseStartCurrentAmps &&
    instantaneousPickupAmps <= inverseEndCurrentAmps;
  const sampledPoints = sampleCurrents
    .filter(
      (currentAmps) =>
        !shouldInsertThreshold || currentAmps !== instantaneousPickupAmps
    )
    .map((currentAmps) =>
      evaluateDeviceTimePoint(device, currentAmps, plotAssumptions)
    )
    .filter((point): point is NonNullable<typeof point> => point !== null)
    .map((point) => ({
      currentAmps: point.currentAmps,
      timeSeconds: point.timeSeconds,
    }));

  const points = shouldInsertThreshold
    ? [
        ...sampledPoints.filter(
          (point) => point.currentAmps < instantaneousPickupAmps
        ),
        ...[
          evaluateDeviceTimePoint(device, instantaneousPickupAmps, {
            ...plotAssumptions,
            instantaneousTripTimeSeconds: Number.POSITIVE_INFINITY,
          }),
          evaluateDeviceTimePoint(
            device,
            instantaneousPickupAmps,
            plotAssumptions
          ),
        ]
          .filter((point): point is NonNullable<typeof point> => point !== null)
          .filter(
            (point, index, thresholdPoints) =>
              index === 0 ||
              point.timeSeconds !== thresholdPoints[index - 1].timeSeconds
          )
          .map((point) => ({
            currentAmps: point.currentAmps,
            timeSeconds: point.timeSeconds,
          })),
        ...sampledPoints.filter(
          (point) => point.currentAmps > instantaneousPickupAmps
        ),
      ]
    : sampledPoints;

  return {
    deviceId: device.id,
    label: device.label,
    color: device.color,
    familyLabel: family.shortLabel,
    points,
  };
}

function buildTimeDomain(
  plotSeries: DevicePlotSeries[],
  chartDomain: ChartDomain
) {
  const timeValues = plotSeries
    .flatMap((series) => series.points.map((point) => point.timeSeconds))
    .filter((timeSeconds) => timeSeconds > 0);

  if (timeValues.length === 0) {
    return chartDomain;
  }

  return {
    ...chartDomain,
    timeMinSeconds: niceLogLower(Math.max(Math.min(...timeValues), 0.001)),
    timeMaxSeconds: niceLogUpper(Math.max(...timeValues)),
  };
}

function calculateEffectiveMarginSeconds(
  downstreamTimeSeconds: number,
  upstreamTimeSeconds: number,
  downstreamTolerancePercent: number,
  upstreamTolerancePercent: number
) {
  const downstreamWorstCaseSeconds =
    downstreamTimeSeconds * (1 + downstreamTolerancePercent / 100);
  const upstreamWorstCaseSeconds =
    upstreamTimeSeconds * (1 - upstreamTolerancePercent / 100);

  return upstreamWorstCaseSeconds - downstreamWorstCaseSeconds;
}

function buildStudyPointResult(
  downstreamDevice: ProtectionDevice,
  upstreamDevice: ProtectionDevice,
  scenario: ProtectionCoordinationScenario,
  currentAmps: number
): StudyPointResult {
  const downstreamPoint = evaluateDeviceTimePoint(
    downstreamDevice,
    currentAmps,
    scenario.assumptions
  );
  const upstreamPoint = evaluateDeviceTimePoint(
    upstreamDevice,
    currentAmps,
    scenario.assumptions
  );

  if (!downstreamPoint) {
    return {
      currentAmps,
      status: "downstream-not-active",
      downstreamTimeSeconds: null,
      upstreamTimeSeconds: upstreamPoint?.timeSeconds ?? null,
      effectiveMarginSeconds: null,
      nominalMarginSeconds: null,
      note: `${downstreamDevice.label} is below pickup at this current marker.`,
    };
  }

  if (!upstreamPoint) {
    return {
      currentAmps,
      status: "upstream-not-active",
      downstreamTimeSeconds: downstreamPoint.timeSeconds,
      upstreamTimeSeconds: null,
      effectiveMarginSeconds: null,
      nominalMarginSeconds: null,
      note: `${upstreamDevice.label} is not expected to operate at this current marker.`,
    };
  }

  const nominalMarginSeconds =
    upstreamPoint.timeSeconds - downstreamPoint.timeSeconds;
  const effectiveMarginSeconds = calculateEffectiveMarginSeconds(
    downstreamPoint.timeSeconds,
    upstreamPoint.timeSeconds,
    downstreamDevice.timeTolerancePercent,
    upstreamDevice.timeTolerancePercent
  );

  if (!downstreamPoint.supported || !upstreamPoint.supported) {
    return {
      currentAmps,
      status: "out-of-domain",
      downstreamTimeSeconds: downstreamPoint.timeSeconds,
      upstreamTimeSeconds: upstreamPoint.timeSeconds,
      effectiveMarginSeconds,
      nominalMarginSeconds,
      note: "At least one device is outside the supported v1 inverse-time domain at this current marker.",
    };
  }

  if (
    effectiveMarginSeconds <
    scenario.assumptions.minimumCoordinationMarginSeconds
  ) {
    return {
      currentAmps,
      status: "warning",
      downstreamTimeSeconds: downstreamPoint.timeSeconds,
      upstreamTimeSeconds: upstreamPoint.timeSeconds,
      effectiveMarginSeconds,
      nominalMarginSeconds,
      note: `Worst-case margin is below the ${scenario.assumptions.minimumCoordinationMarginSeconds.toFixed(2)} s study target.`,
    };
  }

  return {
    currentAmps,
    status: "ok",
    downstreamTimeSeconds: downstreamPoint.timeSeconds,
    upstreamTimeSeconds: upstreamPoint.timeSeconds,
    effectiveMarginSeconds,
    nominalMarginSeconds,
    note: "Margin meets the configured study target at this current marker.",
  };
}

function summarizePair(
  downstreamDevice: ProtectionDevice,
  upstreamDevice: ProtectionDevice,
  scenario: ProtectionCoordinationScenario,
  chartDomain: ChartDomain
): PairCoordinationSummary {
  const sampledCurrents = createLogSpace(
    Math.max(
      downstreamDevice.pickupCurrentAmps *
        scenario.assumptions.currentMultiplierDomainMin,
      upstreamDevice.pickupCurrentAmps *
        scenario.assumptions.currentMultiplierDomainMin,
      chartDomain.currentMinAmps
    ),
    chartDomain.currentMaxAmps,
    96
  );
  const windows: CoordinationWindow[] = [];
  let activeWindow: CoordinationWindow | null = null;

  sampledCurrents.forEach((currentAmps) => {
    const downstreamPoint = evaluateDeviceTimePoint(
      downstreamDevice,
      currentAmps,
      scenario.assumptions
    );
    const upstreamPoint = evaluateDeviceTimePoint(
      upstreamDevice,
      currentAmps,
      scenario.assumptions
    );

    if (
      !downstreamPoint ||
      !upstreamPoint ||
      !downstreamPoint.supported ||
      !upstreamPoint.supported
    ) {
      if (activeWindow) {
        windows.push(activeWindow);
        activeWindow = null;
      }
      return;
    }

    const nominalMarginSeconds =
      upstreamPoint.timeSeconds - downstreamPoint.timeSeconds;
    const effectiveMarginSeconds = calculateEffectiveMarginSeconds(
      downstreamPoint.timeSeconds,
      upstreamPoint.timeSeconds,
      downstreamDevice.timeTolerancePercent,
      upstreamDevice.timeTolerancePercent
    );
    const failsMargin =
      effectiveMarginSeconds <
      scenario.assumptions.minimumCoordinationMarginSeconds;

    if (!failsMargin) {
      if (activeWindow) {
        windows.push(activeWindow);
        activeWindow = null;
      }
      return;
    }

    if (!activeWindow) {
      activeWindow = {
        startCurrentAmps: currentAmps,
        endCurrentAmps: currentAmps,
        minimumEffectiveMarginSeconds: effectiveMarginSeconds,
        minimumNominalMarginSeconds: nominalMarginSeconds,
        hasNominalOverlap: nominalMarginSeconds <= 0,
      };
      return;
    }

    activeWindow.endCurrentAmps = currentAmps;
    activeWindow.minimumEffectiveMarginSeconds = Math.min(
      activeWindow.minimumEffectiveMarginSeconds,
      effectiveMarginSeconds
    );
    activeWindow.minimumNominalMarginSeconds = Math.min(
      activeWindow.minimumNominalMarginSeconds,
      nominalMarginSeconds
    );
    activeWindow.hasNominalOverlap =
      activeWindow.hasNominalOverlap || nominalMarginSeconds <= 0;
  });

  if (activeWindow) {
    windows.push(activeWindow);
  }

  const studyPointResults = scenario.studyCurrentsAmps.map((currentAmps) =>
    buildStudyPointResult(
      downstreamDevice,
      upstreamDevice,
      scenario,
      currentAmps
    )
  );
  const worstEffectiveMarginSeconds =
    windows.length > 0
      ? Math.min(
          ...windows.map((window) => window.minimumEffectiveMarginSeconds)
        )
      : null;

  return {
    downstreamDeviceId: downstreamDevice.id,
    downstreamLabel: downstreamDevice.label,
    upstreamDeviceId: upstreamDevice.id,
    upstreamLabel: upstreamDevice.label,
    windows,
    worstEffectiveMarginSeconds,
    studyPointResults,
  };
}

function buildPlotDomainFinding(
  device: ProtectionDevice,
  chartDomain: ChartDomain
): CoordinationFinding | null {
  const family = getCurveFamilyById(device.curveFamilyId);
  const familyMaxCurrentAmps =
    device.pickupCurrentAmps * family.recommendedCurrentMultiplierRange.max;

  if (
    chartDomain.currentMaxAmps <= familyMaxCurrentAmps ||
    (device.instantaneousPickupAmps !== null &&
      chartDomain.currentMaxAmps >= device.instantaneousPickupAmps)
  ) {
    return null;
  }

  return {
    id: `plot-domain-${device.id}`,
    severity: "info",
    kind: "plot-domain",
    title: `${device.label} is truncated at the v1 curve boundary`,
    detail: `${family.shortLabel} is only plotted through ${family.recommendedCurrentMultiplierRange.max.toFixed(0)}x pickup in this MVP. Higher-current behaviour needs manufacturer-specific data or a richer device model.`,
  };
}

function buildFindings(pairSummaries: PairCoordinationSummary[]) {
  return pairSummaries.flatMap((pairSummary) => {
    const windowFindings = pairSummary.windows.map((window, index) => ({
      id: `${pairSummary.downstreamDeviceId}-${pairSummary.upstreamDeviceId}-window-${index}`,
      severity: "warning" as const,
      kind: window.hasNominalOverlap
        ? ("overlap-window" as const)
        : ("insufficient-margin-window" as const),
      title: window.hasNominalOverlap
        ? `${pairSummary.upstreamLabel} crosses ${pairSummary.downstreamLabel}`
        : `${pairSummary.upstreamLabel} leaves a thin margin above ${pairSummary.downstreamLabel}`,
      detail: window.hasNominalOverlap
        ? `From about ${window.startCurrentAmps.toFixed(0)} A to ${window.endCurrentAmps.toFixed(0)} A, the upstream device is as fast as or faster than the downstream device on the nominal curves.`
        : `From about ${window.startCurrentAmps.toFixed(0)} A to ${window.endCurrentAmps.toFixed(0)} A, the worst-case grading margin falls below the configured target.`,
    }));

    const studyPointFindings = pairSummary.studyPointResults
      .filter(
        (result) =>
          result.status === "warning" || result.status === "out-of-domain"
      )
      .map((result, index) => ({
        id: `${pairSummary.downstreamDeviceId}-${pairSummary.upstreamDeviceId}-study-${index}`,
        severity:
          result.status === "warning"
            ? ("warning" as const)
            : ("info" as const),
        kind: "study-point" as const,
        title:
          result.status === "warning"
            ? `Study point warning at ${result.currentAmps.toFixed(0)} A`
            : `Study point outside supported domain at ${result.currentAmps.toFixed(0)} A`,
        detail: `${pairSummary.downstreamLabel} vs ${pairSummary.upstreamLabel}: ${result.note}`,
      }));

    return [...windowFindings, ...studyPointFindings];
  });
}

export function analyzeCoordination(
  scenario: ProtectionCoordinationScenario
): CoordinationAnalysis {
  const validationIssues = validateScenario(scenario);
  const plottableDevices = scenario.devices.filter(isDevicePlottable);
  const enabledDeviceCount = scenario.devices.filter(
    (device) => device.enabled
  ).length;

  if (plottableDevices.length === 0) {
    return {
      chartDomain: DEFAULT_CHART_DOMAIN,
      plotSeries: [],
      pairSummaries: [],
      findings: validationIssues.map((issue, index) => ({
        id: `validation-${index}`,
        severity: issue.severity === "error" ? "warning" : "info",
        kind: "configuration",
        title: "Scenario needs attention",
        detail: issue.message,
      })),
      enabledDeviceCount,
    };
  }

  const chartDomain = buildChartDomain(
    plottableDevices,
    scenario.studyCurrentsAmps
  );
  const plotSeries = plottableDevices.map((device) =>
    buildPlotSeries(
      device,
      chartDomain,
      scenario.assumptions.instantaneousTripTimeSeconds
    )
  );
  const chartDomainWithTime = buildTimeDomain(plotSeries, chartDomain);
  const pairSummaries = plottableDevices
    .slice(0, -1)
    .map((device, index) =>
      summarizePair(
        device,
        plottableDevices[index + 1],
        scenario,
        chartDomainWithTime
      )
    );
  const findings = [
    ...validationIssues.map((issue, index) => ({
      id: `validation-${index}`,
      severity:
        issue.severity === "error" ? ("warning" as const) : ("info" as const),
      kind: "configuration" as const,
      title: "Scenario needs attention",
      detail: issue.message,
    })),
    ...plottableDevices
      .map((device) => buildPlotDomainFinding(device, chartDomainWithTime))
      .filter(
        (finding): finding is NonNullable<typeof finding> => finding !== null
      ),
    ...buildFindings(pairSummaries),
  ];

  return {
    chartDomain: chartDomainWithTime,
    plotSeries,
    pairSummaries,
    findings,
    enabledDeviceCount,
  };
}
