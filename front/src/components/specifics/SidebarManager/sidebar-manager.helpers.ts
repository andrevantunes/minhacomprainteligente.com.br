import { Logos } from "@/types";

export const specialLogo = (logos: Logos = {}, type: string = "") => {
  if (/experimentacao|experimentacao-expirado|medicina|medicina-expirado/.test(type)) {
    return logos?.med || logos?.default;
  }
  return logos?.enem || logos?.default;
};
