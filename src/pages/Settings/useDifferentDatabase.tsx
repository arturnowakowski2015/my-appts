import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../components/Interface";
import { Column, Data } from "../../components/Interface";
const urls: string[] = [
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/comments",
  "https://jsonplaceholder.typicode.com/albums",
  "https://jsonplaceholder.typicode.com/photos",
  "https://jsonplaceholder.typicode.com/todos",
];

const useDifferentDatabase = (idurl: number, category: string) => {
  let loadData = useRef<Function>();
  const [data, setData] = useState<Data>();

  const [columns, setColumns] = useState<Column[]>();
  const loadDatabase = () => {
    fetch(urls[idurl])
      .then((response) => response.json())
      .then((response) => {
        setData({
          ...data,
          new: response.filter((t: DataTable[], i: number) => {
            return i > 50 && i < 100 && t;
          }),

          removed: response.filter((t: DataTable[], i: number) => {
            return i > 100 && i < 150 && t;
          }),

          postponed: response.filter((t: DataTable[], i: number) => {
            return i > 50 && i < 100 && t;
          }),
        });

        const objcolumn: Column[] = Object.keys(response[0]).map(
          (t: string) => {
            let d: Column = { col: { title: t, disp: true } };
            return d;
          }
        );
        setColumns(objcolumn);
      });
  };
  loadData.current = loadDatabase;
  useEffect(() => {
    loadData.current && loadData.current();
  }, [category]);
  return [data && data[category], columns];
};

export { useDifferentDatabase };

/*

interface Data{
    received?: DataTable[],
    new?: DataTable[],
    selected?: DataTable[],
    opened?: DataTable[],
    removed?: DataTable[],
    labels?: DataTable[],
    postponed?: DataTable[]
}

*/
