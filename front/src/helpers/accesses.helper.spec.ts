import { getUserType, userHasClasses } from "./accesses.helper";

export const mockAccesses = {
  books: false,
  courseClass: true,
  courseClassLabels: ["medicina-2022-2"],
  essay: true,
  essayCredits: 0,
  essayDefault: false,
  essayMaster: false,
  essayPersonalCorrection: true,
  essayTextPlan: true,
  essayUnlimited: false,
  guest: false,
  has: true,
  hasImage: false,
  hasPhone: false,
  hasWhatsapp: false,
  isBirthday: false,
  mentoring: false,
  mentoringLimited: false,
  mentoringUnlimited: true,
  privateClass: true,
  remainingDays: 365,
  roleSlugs: [],
  roles: [],
  studyPlan: true,
};

describe("accesses.helper", () => {
  describe("userHasClasses", () => {
    it("should return false if the access is false", () => {
      const userHasClass = userHasClasses(false);
      expect(userHasClass).toBe(false);
    });

    it("should return false if the access is a empty object", () => {
      const userHasClass = userHasClasses({});
      expect(userHasClass).toBe(false);
    });
    it("should return false if the access is a empty array", () => {
      const userHasClass = userHasClasses([]);
      expect(userHasClass).toBe(false);
    });

    it("should return truen fi the user has a class", () => {
      const userHasClass = userHasClasses(mockAccesses);
      expect(userHasClass).toBe(true);
    });
  });

  describe("getUserType", () => {
    it.each([
      ["medicina", "med"],
      ["medicina-expirado", "med"],
      ["experimentacao", "med"],
      ["experimentacao-expirado", "med"],
      ["enem-e-vestibulares", "enem"],
      ["enem-e-vestibulares-expirado", "enem"],
      ["any-other", "default"],
    ])('should when access "%s" return user type "%s"', (input, output) => {
      const userType = getUserType({ ...mockAccesses, type: input });
      expect(userType).toBe(output);
    });
  });
});
