import { useConvertTree } from "./useConvertTree";
import { useTreeSettings } from "./useTreeSettings";
import { useEffect, useRef, useState } from "react";
import { Route, useNavigate, Routes, useLocation } from "react-router-dom";
import { tree } from "../../data/dummy";
import "./TreeSettings.scss";

import Settings from "./Settings";
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

const Home = () => {
  let initialstep = useRef<Function>();
  const [menuItems, setMenuItems] = useState(true);
  const [actcategory, setActcategory] = useState("new");
  const navigate = useNavigate();
  const location = useLocation();
  let { flattenarr, zerotreetoarr } = useConvertTree();
  const [data, columns] = useTable(1, actcategory);

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
  };
  initialstep.current = initialstepfunktion;
  useEffect(() => {
    initialstep.current && initialstep.current();
  }, []);
  return (
    <>
      {menuItems && (
        <>
          {location.pathname.split("/")[1] ? (
            <div
              onClick={() => {
                setMenuItems(false);
                navigate("/settings/treesettings");
              }}
            >
              settings
            </div>
          ) : (
            <div style={{ height: "22px" }}></div>
          )}

          <div className="menu">
            <MenuItems
              data={treedata}
              onClick={(str) => {
                alert(location.pathname.split("/")[1]);
                navigate(str);
                if (location.pathname) setActcategory(str);
              }}
            />
          </div>
          <Table data={data} columns={columns} />
        </>
      )}
      <Routes>
        <Route
          path="settings/*"
          element={
            <div>
              ssssss
              <Settings
                treedata={treedata}
                el={el}
                idroot={idroot}
                handleDragStart={handleDragStart}
                enableDropping={enableDropping}
                handleDrop={handleDrop}
                preview={() => preview()}
              />
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default Home;
