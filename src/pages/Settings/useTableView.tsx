import { useState, useEffect, useMemo } from "react";

import {
  Column,
  Data,
  DataLengths,
  DataTable,
} from "../../components/Interface";
const urls: string[] = [
  "https://jsonplaceholder.typicode.com/comments",
  "https://jsonplaceholder.typicode.com/photos",
];

const useTable = (actualcategory: string) => {
  const [data, setData] = useState<Data>();
  let columns: Column[] = [];
  const [datalengths, setDatalengths] = useState<DataLengths>({});
  const filterData = (str: string): DataTable[] | undefined => {
 
    if (data && (actualcategory === "new" || actualcategory === "postponed")) {
 
      return data[actualcategory].filter((t) => {
        return typeof t.name === "string" && t.name.includes(str);
      });
    }
  };
  const loadDatabase = async (idurl: number) => {
    const response = await fetch(urls[idurl]);
    const result = await response.json();

    setData({
      new: result.filter((t: DataTable, i: number) => {
        return i < 99 && t;
      }),
      postponed: result.filter((t: DataTable, i: number) => {
        return 100 <= i && i < 500 && t;
      }),
    });
  };
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

  return [
    data ? data[actualcategory] : [],
    columns,
    datalengths,
    loadDatabase,
    filterData,
  ] as const;
};

export { useTable };
