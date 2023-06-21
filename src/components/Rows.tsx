import { useEffect, useRef } from "react";
import { useBuildRows } from "../hooks/useBuildRows";
import { Column, DataTable, Record } from "./Interface";
import { useNavigate } from "react-router-dom";

interface IProps {
  data?: DataTable[];
  columns?: Column[];
  selectRecord: (rec: Record[]) => void;
}
const Rows = ({ data, columns, selectRecord }: IProps) => {
  const [rows, build] = useBuildRows();
  const ref = useRef<Function>();
  ref.current = build;
  useEffect(() => {
    if (ref.current) ref.current(data, columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const navigate = useNavigate();
  return (
    <>
      {rows &&
        rows.map((row, i) => {
          return (
            <tr
              key={i}
              onClick={() => {
                navigate("record");
                selectRecord(row);
              }}
            >
              {row.map((t, j) => {
                return (
                  <th key={j}>
                    <div>{t.toString()}</div>
                  </th>
                );
              })}
            </tr>
          );
        })}
    </>
  );
};
export default Rows;
