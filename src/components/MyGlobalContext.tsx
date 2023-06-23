import { createContext, useContext } from "react";
export type ThemeContent = {
  sets: string[];
  setSets: (c: string[]) => void;
};
export const MyGlobalContext = createContext<ThemeContent>({
  sets: ["blue"],
  setSets: () => {},
});
export const useThemectx = () => useContext(MyGlobalContext);
