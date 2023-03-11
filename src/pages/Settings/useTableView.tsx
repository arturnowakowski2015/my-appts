import { useState, useEffect, useRef, useMemo } from "react";
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
  const [data, setData] = useState<Data>();
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

  return [data ? data[actualcategory] : [], columns, datalengths] as const;
};

export { useTable };
