import { useState } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import TreeSettings, { IMenuItems } from "../../components/TreeSettings";
import { DataTable, Column } from "../../components/Interface";
import { Element } from "./useTreeSettings";
import PossibleLabel from "../../components/PossibleLabel";
import Table from "../../components/Table";

interface IProps {
  pageSize: number;
  el: Element;
  idroot: string | null;
  treedata: IMenuItems[];
  data: DataTable[];
  columns: Column[];
  preview: () => void;
  enableDropping: (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => void;
  loadDatabase: (i: number) => void;
  changeSize(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Settings = ({
  pageSize,
  el,
  idroot,
  treedata,
  data,
  columns,
  preview,
  enableDropping,
  handleDrop,
  handleDragStart,
  loadDatabase,
  changeSize,
}: IProps) => {
  const navigate = useNavigate();

  // This function is triggered when the select changes
  const change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    loadDatabase(parseInt(value));
  };
  return (
    <Routes>
      <Route
        path="tablesettings"
        element={
          <>
            <div onClick={preview}>preview</div>
            <div onClick={() => navigate("treesettings")}>tree settings</div>
            <label>change database</label>
            <select onChange={change}>
              <option value="0">comments</option>
              <option value="1">photos</option>
            </select>{" "}
            <input
              type="range"
              name="quantity"
              min="1"
              max={data && data.length}
              value={pageSize}
              onChange={changeSize}
            />
            <Table data={data} columns={columns} pageSize={pageSize} />
          </>
        }
      />
      <Route
        path="treesettings"
        element={
          <>
            <div onClick={preview}>preview</div>
            <div onClick={() => navigate("tablesettings")}> table settings</div>
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
    </Routes>
  );
};

export default Settings;
