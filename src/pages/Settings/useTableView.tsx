import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  Column,
  Data,
  DataLengths,
  DataTable,
} from "../../components/Interface";
const urls: string[] = [
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/comments",
  "https://jsonplaceholder.typicode.com/albums",
  "https://jsonplaceholder.typicode.com/photos",
  "https://jsonplaceholder.typicode.com/todos",
];

const useTable = (idurl: number, actualcategory: string) => {
  const navigate = useNavigate();
  const [data, setData] = useState<Data>();
  const [whichColumns, setWhichColumns] = useState<Column[]>([]);
  let columns: Column[] = [];
  const [datalengths, setDatalengths] = useState<DataLengths>({});
  const loadDatabase = async () => {
    const response = await fetch(urls[idurl]);
    const result = await response.json();

    setData({
      new: result.filter((t: DataTable, i: number) => {
        return i < 300 && t;
      }),
      postponed: result.filter((t: DataTable, i: number) => {
        return 300 <= i && i < 500 && t;
      }),
    });
  }; //mmmddddd
  columns = useMemo(() => {
    return data && data["new"]
      ? [
          ...Object.keys(data["new"][0]).map((t: string) => {
            let d: any = { col: { title: t, disp: true } };
            return d;
          }),
        ]
      : [];
  }, [data]);
  useEffect(() => {
    setDatalengths({
      new: data && data.new.length,
      postponed: data && data.postponed.length,
    });
  }, [data]);

  const ref = useRef<Function>();
  ref.current = loadDatabase;
  useEffect(() => {
    if (ref.current) {
      ref.current();
    }
  }, [actualcategory, idurl]);
  const chooseColumn = (title: string) => {
    columns.map((t) => {
      if (t.col.title === title) t.col.disp = !t.col.disp;
      return t;
    });
    setWhichColumns(columns);
    navigate("/settings/tablesettings");
    return whichColumns;
  };

  return [
    data ? data[actualcategory] : [],
    whichColumns.length === 0 ? columns : whichColumns,
    datalengths,
    chooseColumn,
  ] as const;
};

export { useTable };
