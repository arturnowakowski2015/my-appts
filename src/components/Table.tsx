import { useState, useEffect, useMemo } from "react";
import { useSort } from "../hooks/useSort";
import { DataTable, Column } from "./Interface";
import Pagination from "./Pagination";
import Columns from "./Columns";
import Rows from "./Rows";
//import Pagination from "./Pagination";
let PageSize = 10;
interface IProps {
  data?: DataTable[];
  columns: Column[];
}
export default function Table({ data, columns }: IProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { sortedData, sortData } = useSort();
  const [selCol, setSelCol] = useState<Column[]>([]);
  const onSort = (columnId: number) => {
    if (data && data.length > 0) sortData(columnId, data);

    return sortedData;
  };
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (sortedData && sortedData.length > 0 && data && data.length <= 0)
      return sortedData.slice(firstPageIndex, lastPageIndex);
    else return data && data.slice(firstPageIndex, lastPageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSort]);

  useEffect(() => {
    setSelCol(columns);
  }, [columns]);
  return (
    <>
      {" "}
      {currentTableData && currentTableData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <Columns
                tocompare={selCol}
                columns={columns}
                onSort={(id) => onSort(id)}
              />
            </tr>
          </thead>
          <tbody>
            <Rows data={currentTableData} columns={selCol} />
          </tbody>
        </table>
      ) : (
        <div className="norecords">"no records avaible!!"</div>
      )}{" "}
      <Pagination
        siblingCount={1}
        currentPage={currentPage}
        totalCount={data && data.length}
        pageSize={PageSize}
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
