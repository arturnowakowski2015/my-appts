import { useBuildRows } from "../hooks/useBuildRows";
import { Column, DataTable } from "./Interface";
interface IProps {
  data?: DataTable[];
  columns?: Column[];
}
const Rows = ({ data, columns }: IProps) => {
  const [rows] = useBuildRows(data, columns);

  return (
    <>
      {rows &&
        rows.map((row, i) => {
          return (
            <tr key={i}>
              {row.map((t, j) => {
                return (
                  <th key={j}>
                    <div>
                      {i}....{t as string}
                    </div>
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
