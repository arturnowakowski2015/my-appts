import { useConvertTree } from "./useConvertTree";
import { useTreeSettings } from "./useTreeSettings";
import { useEffect, useRef, useState } from "react";
import { Route, useNavigate, Routes, useLocation } from "react-router-dom";
import { tree } from "../../data/dummy";

import Settings from "./Settings";
import MenuItems from "../Home/MenuItems";
import SearchBox from "../../components/SearchBox";
import Table from "../../components/Table";
import Nav from "../Nav";
import { useTable } from "./useTableView";
import "../../scss/home.scss";
export interface IMenuItems {
  name: string;
  level: number;
  id: number;
  pid: number;
  children?: any[];
}

const Home = () => {
  let initialstep = useRef<Function>();
  const [menuItems, setMenuItems] = useState(true);
  const [actcategory, setActcategory] = useState("new");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let { flattenarr, zerotreetoarr } = useConvertTree();

  const [data, columns, datalengths, loadDatabase, filterData] =
    useTable(actcategory);
  const [pageSize, setPageSize] = useState(5);
  const changeSize = (i: number) => {
    setPageSize(i);
  };
  const preview = () => {
    navigate("/");
    setMenuItems(!menuItems);
  };

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
    loadDatabase(0);
  };
  initialstep.current = initialstepfunktion;
  useEffect(() => {
    initialstep.current && initialstep.current();
  }, []);
  const onChange = (str: string) => {
    setQuery(str);
  };
  return (
    <>
      <Nav
        one={(str) => {
          if (str === "settings") setMenuItems(false);
          if (str === "search") setMenuItems(true);
        }}
      />
      {menuItems && (
        <>
          <div className="right">
            <div className="menu">
              <MenuItems
                datalengths={datalengths}
                tabledata={data}
                treedata={treedata}
                onClick={(str) => {
                  navigate(str);
                  if (location.pathname) setActcategory(str);
                }}
              />
            </div>
          </div>

          <div className="left">
            <Routes>
              <Route
                path="search"
                element={
                  <div className="searchbox">
                    <SearchBox onChange={onChange} />
                  </div>
                }
              />
            </Routes>
            <div className="table">
              <Table
                data={filterData(query)}
                columns={columns}
                pageSize={pageSize}
              />
            </div>
          </div>
        </>
      )}
      <Routes>
        <Route
          path="settings/*"
          element={
            <div>
              <Settings
                pageSize={pageSize}
                data={data}
                columns={columns}
                loadDatabase={loadDatabase}
                treedata={treedata}
                el={el}
                idroot={idroot}
                handleDragStart={handleDragStart}
                enableDropping={enableDropping}
                handleDrop={handleDrop}
                preview={() => preview()}
                changeSize={(e) => changeSize(parseInt(e.currentTarget.value))}
              />
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default Home;
