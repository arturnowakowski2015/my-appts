import { useBuildColumns } from "../hooks/useBuildColumns";
import { Column } from "./Interface";
import { useEffect, useRef } from "react";
import ColumnHeaderButton from "./ColumnHeaderButton";

interface IProps {
  tocompare?: Column[];
  columns?: Column[];
  onSort: (i: number) => void;
}

const Columns = ({ tocompare, columns, onSort }: IProps) => {
  const [
    filteredColumns,
    functionbuildcol,
    chevron,
    setChevron,
    currentfunction,
  ] = useBuildColumns();
  const f = (tocompare: Column[], columns: Column[]) => {
    currentfunction(tocompare, columns);
    functionbuildcol();
  };
  const ref = useRef<Function>(f);
  useEffect(() => {
    ref.current(tocompare, columns);
  }, [tocompare, columns]);

  return (
    <>
      {JSON.stringify(tocompare) + "\n" + JSON.stringify(columns)}
      {filteredColumns &&
        filteredColumns.map((column, i) => {
          return (
            <th key={i}>
              <ColumnHeaderButton
                chevron={chevron}
                className={chevron.class && chevron.class[i]}
                title={column.col.title}
                onClick={() => {
                  chevron.class[i] = "red";
                  setChevron({
                    atall: true,
                    down: !chevron.down,
                    title: column.col.title,
                    class: chevron.class,
                  });
                  onSort(i);
                }}
                onMouseOver={() => {
                  chevron.class[i] = "red";
                  setChevron({
                    ...chevron,
                    title: column.col.title,
                    class: chevron.class,
                  });
                }}
                onMouseOut={() => {
                  chevron.class[i] = "gray";
                  setChevron({
                    ...chevron,
                    class: chevron.class,
                    down: false,
                  });
                }}
              />
            </th>
          );
        })}
    </>
  );
};
export default Columns;
