import { useConvertTree } from "./useConvertTree";
import { useTreeSettings } from "./useTreeSettings";
import { useEffect, useRef, useState } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import { tree } from "../../data/dummy";
import "./TreeSettings.scss";
import TreeSettings from "../../components/TreeSettings";
import PossibleLabel from "../../components/PossibleLabel";
import MenuItems from "../Home/MenuItems";

import Table from "../../components/Table";
import { useTable } from "./useTableView";
export interface IMenuItems {
  name: string;
  level: number;
  id: number;
  pid: number;
  children?: any[];
}

/*
export default function Table({ data = [], columns }) {
  const { sortedData, sortData } = useSort();

  const [selCol, setSelCol] = useState([]);
  const on = (columnId) => {
    sortData(columnId, data);

    return sortedData;
  };



  const [currentPage, setCurrentPage] = useState(1);


  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (sortedData.length > 0)
      return sortedData.slice(firstPageIndex, lastPageIndex);
    else return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, columns, on]);

*/
const Settings = () => {
  let initialstep = useRef<Function>();
  const [menuItems, setMenuItems] = useState(true);

  const navigate = useNavigate();
  let { flattenarr, zerotreetoarr } = useConvertTree();
  const [data, columns] = useTable(1, "new");

  let {
    idroot,
    treedata,
    setTreedata,
    el,
    handleDragStart,
    enableDropping,
    handleDrop,
  } = useTreeSettings();

  const initialstepfunktion = () => {
    zerotreetoarr(tree.children as [], [0]);
    flattenarr.sort((a, b) => a.id - b.id);
    setTreedata(flattenarr);
  };
  initialstep.current = initialstepfunktion;
  useEffect(() => {
    initialstep.current && initialstep.current();
  }, []);
  return (
    <>
      <div
        onClick={() => {
          setMenuItems(false);
          navigate("tree");
        }}
      >
        settings
      </div>
      {menuItems && (
        <div className="menu">
          <MenuItems data={treedata} />
        </div>
      )}{" "}
      <Routes>
        <Route
          path="tree"
          element={
            <>
              <div
                onClick={() => {
                  navigate("/settings");
                  setMenuItems(true);
                }}
              >
                preview
              </div>
              <p
                id="ROOT"
                className="root"
                draggable="true"
                onDragOver={(event) => enableDropping(event, "sss")}
                onDrop={(event) => handleDrop(event)}
              >
                ROOT
              </p>
              <div className="menu">
                {idroot === "ROOT" && (
                  <PossibleLabel
                    ifroot="ifrooty"
                    level={1}
                    title={el.old && el.old.name}
                  />
                )}
                <TreeSettings
                  actLabel={el.act && el.act.name}
                  oldLabel={el.old && el.old}
                  data={treedata}
                  handleDragStart={handleDragStart}
                  enableDropping={enableDropping}
                  handleDrop={handleDrop}
                />
              </div>
            </>
          }
        />
      </Routes>{" "}
      <Table data={data} columns={columns} />
    </>
  );
};

export default Settings;
