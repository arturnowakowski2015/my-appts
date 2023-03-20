import { useState } from "react";
import { DataTable, Column } from "../components/Interface";

const useBuildRows = () => {
  const [rows, setRows] = useState<(string | number | Boolean | undefined)[][]>(
    [[]]
  );
  let temprows: (string | number | Boolean | undefined)[] = [];
  let temp: (string | number | Boolean | undefined)[][] = [[]];
  let ii = 0;

  const build = (data?: DataTable[], columns?: Column[]) => {
    const buildRows = (data1: DataTable, j: number) => {
      temprows = [
        ...temprows,
        ...Object.keys(data1).map((k, j) => {
          return (
            data1 !== undefined && typeof data1[k] !== "object" && data1[k]
          );
        }),
      ];
    };

    data && data.map(buildRows);

    temprows.map((t, i) => {
      if (columns && i !== 0 && i % columns.length === 0) {
        ii++;
        temp.push([]);
      }
      temp[ii] && temp[ii].push(t);
      return t;
    });
    setRows(temp);
  };

  return [rows, build] as const;
};
export { useBuildRows };
