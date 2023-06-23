import { DataTable, DataLengths } from "./Interface";
import { IMenuItems } from "./TreeSettings";
import { useMenuItems } from "../hooks/useMenuItems";
import "../scss/MenuItems.scss";

import { useThemectx } from "./MyGlobalContext";

interface IProps {
  datalengths: DataLengths;
  treedata: IMenuItems[];
  tabledata: DataTable[];
  pid: number;
  overItem: string;
  selected: string;
  onmouseout: (str: string) => void;
  onmouseover: (str: string) => void;
  onClick: (title: string) => void;
}

const TreeNode = ({
  treedata,
  tabledata,
  pid,
  selected,
  overItem,
  onmouseout,
  onmouseover,
  onClick,
  datalengths,
}: IProps) => {
  const [itemsonlevel, flag, setFlag, recquantity, set] = useMenuItems(
    pid,
    treedata
  );

  const { sets } = useThemectx();
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
                    className="plus"
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
                    className="minus"
                    onClick={() => {
                      set(t.pid, false);
                    }}
                  >
                    -
                  </div>
                )}
                <div
                  className={
                    t.name === selected
                      ? "selected-" + sets[1]
                      : t.name === overItem
                      ? "over-" + sets[1]
                      : "item-" + sets[1]
                  }
                  onClick={() => onClick(t.name)}
                  onMouseOver={() => onmouseover(t.name)}
                  onMouseOut={() => onmouseout(t.name)}
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
                  overItem={overItem}
                  onmouseover={onmouseover}
                  onmouseout={onmouseout}
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
