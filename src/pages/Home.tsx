import { useConvertTree } from "../hooks/useConvertTree";
import { useTreeSettings } from "../hooks/useTreeSettings";
import { useEffect, useRef, useState } from "react";
import { Route, useNavigate, Routes, useLocation } from "react-router-dom";
import { tree } from "../data/dummy";

import Settings from "./Settings";
import MenuItems from "./MenuItems";
import SearchBox from "../pages/SearchBox";
import Table from "../components/Table";
import Rec from "./Rec";
import Nav from "./Nav";
import { useTable } from "../hooks/useTableView";
import { DataTable } from "../components/Interface";
import "../scss/home.scss";
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
  const [selectedMenu, setSelectedMenu] = useState<string[]>([]);
  const [overItem, setOverItem] = useState<string>("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let { flattenarr, zerotreetoarr } = useConvertTree();

  const [
    data,
    columns,
    datalengths,
    selectedRecord,
    categoryurl,
    tableflag,
    deleteRec,
    loadDatabase,
    filterData,
    selectRecord,
    update,
    setTableflag,
  ] = useTable(actcategory);
  const [pageSize, setPageSize] = useState(5);
  const changeSize = (i: number) => {
    setPageSize(i);
    console.log(tableflag);
  };
  const preview = () => {
    navigate("/" + actcategory);
    setMenuItems(!menuItems);
  };
  const changeCategory = (str: string) => {
    if (location.pathname) setActcategory(str);

    let arr: string[] = [];
    for (let k = 0; k < treedata.length; k++)
      if (treedata[k].name === actcategory) arr[k] = "selected";
      else arr[k] = "item";
    setSelectedMenu(arr);
    navigate(str);
  };
  const onmouseover = (str: string) => {
    setOverItem(str);
  };
  const onmouseout = (str: string) => {
    setOverItem("");
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
    flattenarr.map((t) => {
      if (t.name === actcategory) selectedMenu.push("selected");
      else selectedMenu.push("item");
      return t;
    });
    setSelectedMenu(selectedMenu);
    navigate("new");
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
      <div className="container">
        {menuItems && (
          <div className="right">
            <div className="menu">
              <MenuItems
                overItem={overItem}
                onmouseout={(str) => onmouseout(str)}
                onmouseover={(str) => onmouseover(str)}
                selected={actcategory}
                datalengths={datalengths}
                tabledata={data}
                treedata={treedata}
                onClick={(str) => {
                  changeCategory(str);
                }}
              />{" "}
            </div>
          </div>
        )}
        <Routes>
          {/* switch displays only one component that matches */}

          <Route
            path="/:item"
            element={
              <div className="left">
                {query}
                <Table
                  selectRecord={(rec) => {
                    setTableflag(0);
                    selectRecord(rec);
                  }}
                  data={query ? filterData(query) : data}
                  columns={columns}
                  pageSize={pageSize}
                />
              </div>
            }
          />

          <Route
            path="search"
            element={
              <div className="searchbox">
                <SearchBox onChange={onChange} />
                <div className="table">
                  <Table
                    selectRecord={(rec) => {
                      setTableflag(0);
                      selectRecord(rec);
                    }}
                    data={query ? filterData(query) : data}
                    columns={columns}
                    pageSize={pageSize}
                  />
                </div>
              </div>
            }
          />
          <Route
            path="record/:index"
            element={
              <div className="record">
                <Rec
                  update={(index, record) => {
                    update(index, record as DataTable);
                  }}
                  deleteRec={(str, rec) => deleteRec(str, rec as DataTable)}
                  columns={columns}
                  record={selectedRecord}
                  categoryurl={categoryurl}
                />
              </div>
            }
          />

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
                  changeSize={(e) =>
                    changeSize(parseInt(e.currentTarget.value))
                  }
                />
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default Home;
