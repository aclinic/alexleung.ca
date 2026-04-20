export type CurveFamilyId =
  | "iec-standard-inverse"
  | "iec-very-inverse"
  | "iec-extremely-inverse";

export type ValidationSeverity = "error" | "warning";

export type TimeElementType = "inverse" | "instantaneous";

export type StudyPointStatus =
  | "ok"
  | "warning"
  | "out-of-domain"
  | "upstream-not-active"
  | "downstream-not-active";

export interface CurveFamilyDefinition {
  id: CurveFamilyId;
  label: string;
  shortLabel: string;
  standardLabel: string;
  coefficients: {
    a: number;
    b: number;
    c: number;
  };
  recommendedCurrentMultiplierRange: {
    min: number;
    max: number;
  };
  description: string;
}

export interface ProtectionDevice {
  id: string;
  label: string;
  color: string;
  enabled: boolean;
  curveFamilyId: CurveFamilyId;
  pickupCurrentAmps: number;
  timeMultiplier: number;
  instantaneousPickupAmps: number | null;
  timeTolerancePercent: number;
}

export interface CoordinationAssumptions {
  minimumCoordinationMarginSeconds: number;
  instantaneousTripTimeSeconds: number;
  currentMultiplierDomainMin: number;
  currentMultiplierDomainMax: number;
}

export interface ProtectionCoordinationScenario {
  schemaVersion: "protection-coordination-scenario/v1";
  title: string;
  presetId: string | null;
  notes: string;
  devices: ProtectionDevice[];
  studyCurrentsAmps: number[];
  assumptions: CoordinationAssumptions;
}

export interface ProtectionCoordinationPreset {
  id: string;
  name: string;
  description: string;
  scenario: ProtectionCoordinationScenario;
}

export interface ValidationIssue {
  code: string;
  severity: ValidationSeverity;
  fieldPath: string;
  message: string;
}

export interface DeviceTimePoint {
  currentAmps: number;
  currentMultiple: number;
  timeSeconds: number;
  inverseTimeSeconds: number;
  activeElement: TimeElementType;
  supported: boolean;
  extrapolated: boolean;
}

export interface DevicePlotPoint {
  currentAmps: number;
  timeSeconds: number;
}

export interface DevicePlotSeries {
  deviceId: string;
  label: string;
  color: string;
  familyLabel: string;
  points: DevicePlotPoint[];
}

export interface ChartDomain {
  currentMinAmps: number;
  currentMaxAmps: number;
  timeMinSeconds: number;
  timeMaxSeconds: number;
}

export interface CoordinationWindow {
  startCurrentAmps: number;
  endCurrentAmps: number;
  minimumEffectiveMarginSeconds: number;
  minimumNominalMarginSeconds: number;
  hasNominalOverlap: boolean;
}

export interface StudyPointResult {
  currentAmps: number;
  status: StudyPointStatus;
  downstreamTimeSeconds: number | null;
  upstreamTimeSeconds: number | null;
  effectiveMarginSeconds: number | null;
  nominalMarginSeconds: number | null;
  note: string;
}

export interface PairCoordinationSummary {
  downstreamDeviceId: string;
  downstreamLabel: string;
  upstreamDeviceId: string;
  upstreamLabel: string;
  windows: CoordinationWindow[];
  worstEffectiveMarginSeconds: number | null;
  studyPointResults: StudyPointResult[];
}

export interface CoordinationFinding {
  id: string;
  severity: "warning" | "info";
  kind:
    | "overlap-window"
    | "insufficient-margin-window"
    | "study-point"
    | "plot-domain"
    | "configuration";
  title: string;
  detail: string;
}

export interface CoordinationAnalysis {
  chartDomain: ChartDomain;
  plotSeries: DevicePlotSeries[];
  pairSummaries: PairCoordinationSummary[];
  findings: CoordinationFinding[];
  enabledDeviceCount: number;
}
