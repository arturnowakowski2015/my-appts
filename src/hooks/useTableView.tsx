import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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

const useTable = (actualcategory: string) => {
  const navigate = useNavigate();
  const [tableflag, setTableflag] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<Record[]>();
  const [data, setData] = useState<Data>();
  const [categoryurl, setCategoryurl] = useState("");
  let columns: Column[] = [];
  const [datalengths, setDatalengths] = useState<DataLengths>({});
  const filterData = (str: string): DataTable[] | undefined => {
    if (data && (actualcategory === "new" || actualcategory === "postponed")) {
      return data[actualcategory].filter((t) => {
        return typeof t.name === "string" && t.name.includes(str);
      });
    }
  };
  const update = (url: string, rec: DataTable) => {
    fetch(
      "https://jsonplaceholder.typicode.com/" +
        url +
        "/" +
        rec[columns[1].col.title],
      {
        method: "PUT",
        body: JSON.stringify({
          [columns[0].col.title]: rec[columns[0].col.title],
          [columns[1].col.title]: rec[columns[1].col.title],
          [columns[2].col.title]: rec[columns[2].col.title],
          [columns[3].col.title]: rec[columns[3].col.title],
          [columns[4].col.title]: rec[columns[4].col.title],
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (data)
          data[actualcategory].splice(1, Number(columns[1].col.title), json);
        setData({ ...data });
        setTableflag(1);
        navigate("/" + actualcategory);
      });
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
    setCategoryurl(urls[idurl].split("/")[3]);
  };
  const selectRecord = (rec: Record[]) => {
    setSelectedRecord(rec);
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
    selectedRecord,
    categoryurl,
    tableflag,
    loadDatabase,
    filterData,
    selectRecord,
    update,
    setTableflag,
  ] as const;
};

export { useTable };
