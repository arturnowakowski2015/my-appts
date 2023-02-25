import { useState, useEffect, useRef, useMemo } from "react";
import { DataTable } from "../../components/Interface";
import { Column, Data } from "../../components/Interface";
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
  const loadDatabase = async () => {
    const response = await fetch(urls[idurl]);
    const result = await response.json();

    setData({
      [actualcategory]: result.filter((t: DataTable, i: number) => {
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
  const ref = useRef<Function>(loadDatabase);

  useEffect(() => {
    if (ref.current) {
      ref.current();
    }
  }, [actualcategory, idurl]);
  return [data ? data[actualcategory] : [], columns] as const;
};

export { useTable };
