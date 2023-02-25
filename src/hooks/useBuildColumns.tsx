 
import { useState, useEffect, useRef } from "react";
 
import { Chevron } from "../components/Interface";
interface ColumnsHeader {
  title: string;
  disp: boolean;
}
export interface Column {
  col: ColumnsHeader;
}

const useBuildColumns = () => {
 
  const ref = useRef<Function>();
 
  const [filteredColumns, setFilteredColumns] = useState<Column[]>();
  const [chevron, setChevron] = useState<Chevron>({
    atall: true,
    down: true,
    title: "",
    class: [],
  });
  const currentfunction = (tocompare?: Column[], columns?: Column[]) => {
    let obj: Column[] | undefined =
      tocompare &&
      tocompare.filter((k: Column, ii: number) => {
        return columns && columns[ii].col.disp === true && k;
      });

    setFilteredColumns(obj);
  };
  const functionbuildcol = () => {
    filteredColumns &&
      filteredColumns.map((t, i) => {
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
  ref.current = functionbuildcol;
  useEffect(() => {
    if (ref.current) ref.current();
  }, [filteredColumns]); 
  return [
    filteredColumns,
    functionbuildcol,
    chevron,
    setChevron,
    currentfunction,
  ] as const;
};
export { useBuildColumns };
