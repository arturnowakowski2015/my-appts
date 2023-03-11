import { Route, useNavigate, Routes } from "react-router-dom";
import TreeSettings, { IMenuItems } from "../../components/TreeSettings";
import { Element } from "./useTreeSettings";
import PossibleLabel from "../../components/PossibleLabel";
import Table from "../../components/Table";
import { useTable } from "./useTableView";
interface IProps {
  el: Element;
  idroot: string | null;
  treedata: IMenuItems[];
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
}

const Settings = ({
  el,
  idroot,
  treedata,
  preview,
  enableDropping,
  handleDrop,
  handleDragStart,
}: IProps) => {
  const [data, columns, datalengths] = useTable(1, "new");
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="tablesettings"
        element={
          <>
            <div onClick={preview}>preview</div>
            <div onClick={() => navigate("treesettings")}>tree settings</div>

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
