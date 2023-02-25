import { useState, useEffect, useRef } from "react";
import { DataTable, Column } from "../components/Interface";

const useBuildRows = (data?: DataTable[], columns?: Column[]) => {
  const [rows, setRows] = useState<(string | number | Boolean | undefined)[][]>(
    [[]]
  );
  let temprows: (string | number | Boolean | undefined)[] = [];
  let temp: (string | number | Boolean | undefined)[][] = [[]];
  let ii = 0;
  const buildRows = (row: DataTable) => {
    temprows = [
      ...temprows,
      ...Object.keys(row).map((k, j) => {
        return row !== undefined && typeof row[k] !== "object" && row[k];
      }),
    ];
  };
  let datacurrent = useRef<Function>();
  const build = () => {
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
  datacurrent.current = build;
  useEffect(() => {
    datacurrent.current && datacurrent.current();
  }, [data]);

  return [rows];
};
export { useBuildRows };
