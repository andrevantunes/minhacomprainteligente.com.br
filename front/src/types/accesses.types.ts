import { FetchState } from "@/store";
import { UserAccesses } from "./user.types";

export interface Accesses {
  books: boolean;
  courseClass: boolean;
  courseClassLabels: string[];
  essay: boolean;
  essayCredits: number;
  essayDefault: boolean;
  essayMaster: boolean;
  essayPersonalCorrection: boolean;
  essayTextPlan: boolean;
  essayUnlimited: boolean;
  has: boolean;
  mentoring: boolean;
  roleSlugs: string[];
  privateClass: boolean;
  remainingDays: number;
  studyPlan: boolean;
  type: string;
}

export type AccessesFull = Accesses & UserAccesses;

export interface AccessesState extends AccessesFull, FetchState {}
