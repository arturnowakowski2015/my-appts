import { useState, useMemo } from "react";
import { useSort } from "../hooks/useSort";
import { DataTable, Column, Record } from "./Interface";
import { useBuildChevron } from "../hooks/useBuildChevron";

import ColumnHeaderButton from "./ColumnHeaderButton";
import Pagination from "./Pagination";
import Rows from "./Rows";
//import Pagination from "./Pagination";
interface IProps {
  data?: DataTable[];
  columns: Column[];
  pageSize: number;
  selectRecord: (rec: Record[]) => void;
}
export default function Table({
  data,
  columns,
  pageSize,
  selectRecord,
}: IProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [buildchevron, chevron, setChevron] = useBuildChevron(columns);

  const { sortedData, sortData } = useSort();
  const onSort = (columnId: number) => {
    if (data && data.length > 0) sortData(columnId, data);

    return sortedData;
  };
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    if (sortedData && sortedData.length > 0 && data && data.length <= 0)
      return sortedData.slice(firstPageIndex, lastPageIndex);
    else return data && data.slice(firstPageIndex, lastPageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSort]);
  return (
    <>
      {" "}
      {currentTableData && currentTableData.length > 0 ? (
        <table>
          <thead>
            <tr>
              {columns &&
                columns.map((column, i) => {
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
                          buildchevron(columns);
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
            </tr>
          </thead>
          <tbody>
            <Rows
              selectRecord={selectRecord}
              data={currentTableData}
              columns={columns}
            />
          </tbody>
        </table>
      ) : (
        <div className="norecords">"no records avaible!!"</div>
      )}{" "}
      <Pagination
        siblingCount={1}
        currentPage={currentPage}
        totalCount={data && data.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}

/*
 
 


        {data && data[0]
            ? buildHeader(Object.keys(data && data[0]), data && props.columns)
            : null}



          {currentPost.length >= 0 &&
          data &&
          searcheddata.length === data.length
            ? slicedSearchedText.map(buildRow)
            : stop === 0 && currentPost && currentPost.map(buildRow)
            ? stop === 0 && currentPost && currentPost.map(buildRow)
            : slicedSearchedText.map(buildRow)}



      <div style={{ padding: 20 }} >
            {data.map((item, i) => {
                return (
                    <div key={i}
                        style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", padding: 20, border: "1px solid black", margin: 10 }}
                        onClick={() => onRowClick(item.id)}
                    >
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                    </div> 
                )
            })}
        </div>



*/
