import type { RiboSettings } from "@andrevantunes/ribo";

import * as Mars from "@andrevantunes/andrevds";

import * as Components from "@/components";
import * as controllersList from "@/controllers";
import * as modifiersList from "@/helpers/content-parsers.helpers";

export const riboSettings: RiboSettings = {
  componentsList: {
    ...Mars,
    ...Components,
  },
  controllersList,
  modifiersList,
  defaultError: "Error ao carregar",
};
