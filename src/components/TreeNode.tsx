import { DataTable, DataLengths } from "./Interface";
import { IMenuItems } from "./TreeSettings";
import { useMenuItems } from "../hooks/useMenuItems";
import "../scss/MenuItems.scss";

interface IProps {
  datalengths: DataLengths;
  treedata: IMenuItems[];
  tabledata: DataTable[];
  pid: number;
  selected: string;
  onClick: (title: string) => void;
}
const TreeNode = ({
  treedata,
  tabledata,
  pid,
  selected,
  onClick,
  datalengths,
}: IProps) => {
  const [itemsonlevel, flag, setFlag, recquantity, set] = useMenuItems(
    pid,
    treedata
  );

  return (
    <>
      {treedata.map((t, i) => {
        return (
          t.pid === pid &&
          t.pid > 0 && (
            <div>
              <div
                className="node"
                style={{
                  marginLeft: t.level * 10 + "px",
                  display: "flex",
                  flexDirection: "row",
                }}
                key={t.id}
              >
                {flag[i] === false && t.nextlevel === 1 && (
                  <div
                    onClick={() => {
                      set(t.pid, true);
                    }}
                  >
                    {" "}
                    +
                  </div>
                )}
                {flag[i] && (
                  <div
                    onClick={() => {
                      set(t.pid, false);
                    }}
                  >
                    -
                  </div>
                )}
                <div
                  className={t.name === selected ? "selected" : "item"}
                  onClick={() => onClick(t.name)}
                >
                  {t.name}

                  <span>
                    ,,,
                    {recquantity(t.name, datalengths)}
                  </span>
                </div>
              </div>

              {flag[i] && (
                <TreeNode
                  selected={selected}
                  treedata={treedata}
                  tabledata={tabledata}
                  pid={t.id}
                  onClick={onClick}
                  datalengths={datalengths}
                />
              )}
            </div>
          )
        );
      })}
    </>
  );
};
export default TreeNode;
