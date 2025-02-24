// atoms.ts
import { atom } from "recoil";

export const isDarkAtom = atom<boolean>({
  key: "isDark",
  default: true,
});
