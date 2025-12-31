import { skills } from "../skills";

describe("skills", () => {
  it("should have non-empty skill values", () => {
    expect(skills.length).toBeGreaterThan(0);
    skills.forEach((item) => {
      expect(item.skill).toBeTruthy();
      expect(item.skill.length).toBeGreaterThan(0);
    });
  });
});
