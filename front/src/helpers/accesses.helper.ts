import { Accesses, AccessesFull, UserAccesses, UserState } from "@/types";
const initialAccessesState: Accesses = {
  books: false,
  courseClass: false,
  courseClassLabels: [],
  essay: false,
  essayCredits: 0,
  essayDefault: false,
  essayMaster: false,
  essayPersonalCorrection: false,
  essayTextPlan: false,
  essayUnlimited: false,
  has: false,
  mentoring: false,
  roleSlugs: [],
  privateClass: false,
  remainingDays: 0,
  studyPlan: false,
  type: "",
};

const initialUserAccessesState: UserAccesses = {
  guest: true,
  hasImage: false,
  hasPhone: false,
  hasWhatsapp: false,
  roles: [],
  isBirthday: false,
};

export const initialAccesses = {
  ...initialAccessesState,
  ...initialUserAccessesState,
};

export const parseAccessesFull = (user: UserState, accesses: Accesses): AccessesFull => {
  const { guest, image, phone, roles, birthDate } = user;
  return {
    ...accesses,
    roles: roles.map(({ slug }) => slug),
    guest,
    hasImage: Boolean(image),
    hasPhone: Boolean(phone),
    hasWhatsapp: Boolean(phone),
    isBirthday: isBirthday(birthDate || ""),
  };
};

const isBirthday = (birthDate = "") => {
  const today = new Date().toISOString().replace(/(\d{4})-(\d{2})-(\d{2}).*/, "$2-$3");
  const birthDateISO = birthDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2-$1");
  return today === birthDateISO;
};

export const userHasClasses = (accesses: Accesses) => {
  const { courseClass } = accesses;
  if (!courseClass) return false;
  return courseClass;
};

export const getUserType = (accesses: Accesses) => {
  if (/experimentacao|experimentacao-expirado|medicina|medicina-expirado/.test(accesses.type)) {
    return "med";
  }

  if (/enem-e-vestibulares/.test(accesses.type)) {
    return "enem";
  }

  return "default";
};
