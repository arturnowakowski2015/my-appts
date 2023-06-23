import { useEffect, useRef } from "react";
import { useBuildRows } from "../hooks/useBuildRows";
import { Column, DataTable, Record } from "./Interface";
import { useNavigate } from "react-router-dom";
import "../scss/Row.scss";
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
              className="row"
              key={i}
              onClick={() => {
                navigate("/record/" + row[1]);
                selectRecord(row);
              }}
            >
              {row.map((t, j) => {
                return (
                  <th key={j}>
                    <div className="string">{t.toString()}</div>
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
