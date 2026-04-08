import {
  getPresetById,
  PID_SIMULATOR_PRESETS,
} from "@/features/pid-simulator/presets";

describe("PID presets", () => {
  it("defines the required educational presets", () => {
    expect(PID_SIMULATOR_PRESETS.map((preset) => preset.id)).toEqual([
      "well-tuned",
      "underdamped",
      "overdamped",
      "oscillatory",
    ]);
  });

  it("resolves presets by id", () => {
    const preset = getPresetById("oscillatory");

    expect(preset).toBeDefined();
    expect(preset?.gains.ki).toBeGreaterThan(1);
  });
});
