import { useState, useEffect } from "react";
import {
  Column,
  Data,
  DataLengths,
  DataTable,
  Record,
} from "../components/Interface";
const urls: string[] = [
  "https://jsonplaceholder.typicode.com/comments",
  "https://jsonplaceholder.typicode.com/photos",
];
const useLoadDatabase = () => {
  const [data, setData] = useState<Data>();
  const [categoryurl, setCategoryurl] = useState("");
  const [datalengths, setDatalengths] = useState<DataLengths>({});
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
    setCategoryurl(urls[idurl].split("/")[3]);
  };
  useEffect(() => {
    setDatalengths({
      new: data && data.new.length,
      postponed: data && data.postponed.length,
    });
  }, [data]);
  return [datalengths, setData, loadDatabase] as const;
};
export { useLoadDatabase };
