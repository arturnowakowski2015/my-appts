import { Route, useNavigate, Routes } from "react-router-dom";
import TreeSettings, { IMenuItems } from "../../components/TreeSettings";
import { DataTable, Column } from "../../components/Interface";
import { Element } from "./useTreeSettings";
import PossibleLabel from "../../components/PossibleLabel";
import Table from "../../components/Table";
import CheckColumn from "../../components/CheckColumn";
interface IProps {
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
  chooseColumn: (str: string) => void;
}

const Settings = ({
  el,
  idroot,
  treedata,
  data,
  columns,
  preview,
  enableDropping,
  handleDrop,
  handleDragStart,
  chooseColumn,
}: IProps) => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="tablesettings"
        element={
          <>
            <div onClick={preview}>preview</div>
            <div onClick={() => navigate("treesettings")}>tree settings</div>
            {columns.map((t, i) => {
              return (
                <CheckColumn
                  key={i}
                  title={t.col.title}
                  chooseColumn={chooseColumn}
                  display={t.col.disp}
                />
              );
            })}
            <Table data={data} columns={columns} />
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
