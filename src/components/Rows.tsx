import { useEffect, useRef } from "react";
import { useBuildRows } from "../hooks/useBuildRows";
import { Column, DataTable } from "./Interface";
interface IProps {
  data?: DataTable[];
  columns?: Column[];
}
const Rows = ({ data, columns }: IProps) => {
  const [rows, build] = useBuildRows();
  const ref = useRef<Function>();
  ref.current = build;
  useEffect(() => {
    if (ref.current) ref.current(data, columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {rows &&
        rows.map((row, i) => {
          return (
            <>
              <tr key={i}>
                {" "}
                {row.map((t, j) => {
                  return (
                    <th key={j}>
                      <div>{t as string}</div>
                    </th>
                  );
                })}
              </tr>
            </>
          );
        })}
    </>
  );
};
export default Rows;
