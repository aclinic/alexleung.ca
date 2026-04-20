"use client";

type SafetyAcknowledgementModalProps = {
  accepted: boolean;
  onAcceptedChange: (accepted: boolean) => void;
  onContinue: () => void;
};

export function SafetyAcknowledgementModal({
  accepted,
  onAcceptedChange,
  onContinue,
}: SafetyAcknowledgementModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-5 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="protection-coordination-acknowledgement-title"
        className="w-full max-w-2xl rounded-2xl border border-amber-300/30 bg-slate-950 p-6 shadow-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
          First-use acknowledgement
        </p>
        <h2
          id="protection-coordination-acknowledgement-title"
          className="mt-3 text-2xl font-semibold text-white"
        >
          Read this before using the TCC explorer
        </h2>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          <p>
            This workspace is an educational browser tool for inspecting a few
            standard inverse-time curve families. It is not a production relay
            settings package, and it does not replace manufacturer data,
            commissioning practice, or professional engineering review.
          </p>
          <p>
            Device list order is interpreted as downstream to upstream, and the
            instantaneous element is modeled as a simple fixed clearing time
            when enabled.
          </p>
        </div>

        <label className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => onAcceptedChange(event.target.checked)}
          />
          <span>
            I understand that this is an engineering aid only, that results must
            be reviewed by a qualified engineer before field use, and that this
            MVP includes intentional simplifications.
          </span>
        </label>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-md border border-amber-300/50 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-100 transition-colors hover:bg-amber-400/20 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!accepted}
            onClick={onContinue}
          >
            Open workspace
          </button>
        </div>
      </div>
    </div>
  );
}
