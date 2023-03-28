import { useState } from "react";

import { Chevron } from "../components/Interface";
interface ColumnsHeader {
  title: string;
  disp: boolean;
}
export interface Column {
  col: ColumnsHeader;
}

const useBuildChevron = () => {
  const [chevron, setChevron] = useState<Chevron>({
    atall: true,
    down: true,
    title: "",
    class: [],
  });

  const buildchevron = (fc: Column[]) => {
    fc &&
      fc.map((t, i) => {
        chevron.class[i] = "gray";
        return t;
      });
    setChevron({
      atall: true,
      down: true,
      title: "",
      class: [...chevron.class],
    });
  };

  return [buildchevron, chevron, setChevron] as const;
};
export { useBuildChevron };
