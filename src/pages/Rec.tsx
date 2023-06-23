import { useState, useEffect } from "react";
import { Record, DataTable, Column } from "../components/Interface";

import { useRec } from "../hooks/useRec";
interface IProps {
  record?: Record[];
  categoryurl: string;
  columns: Column[];
  update: (url: string, record?: DataTable) => void;
}
const Rec = ({ record, categoryurl, columns, update }: IProps) => {
  const [data, setData] = useRec(record as Record[], columns);
  return (
    <>
      <input
        type="text"
        value={(data && data[columns[2].col.title]) || ""}
        onChange={(e) =>
          setData({
            ...data,
            [columns[2].col.title]: e.currentTarget.value,
          })
        }
      />
      <input
        type="text"
        value={(data && data[columns[3].col.title]) || ""}
        onChange={(e) =>
          setData({
            ...data,
            [columns[3].col.title]: e.currentTarget.value,
          })
        }
      />{" "}
      <input
        type="text"
        value={(data && data[columns[4].col.title]) || ""}
        onChange={(e) =>
          setData({
            ...data,
            [columns[4].col.title]: e.currentTarget.value,
          })
        }
      />
      <button
        onClick={() => {
          update(categoryurl, data);
        }}
      >
        update
      </button>
    </>
  );
};
export default Rec;
