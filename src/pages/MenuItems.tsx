import { IMenuItems } from "../components/TreeSettings";
import { DataTable, DataLengths } from "../components/Interface";
import TreeNode from "../components/TreeNode";
import { useMenuItems } from "../hooks/useMenuItems";
import { useState } from "react";
import "../scss/MenuItems.scss";
interface IProps {
  datalengths: DataLengths;
  treedata: IMenuItems[];
  tabledata: DataTable[];
  selected: string;
  overItem: string;
  onmouseover: (str: string) => void;
  onmouseout: (str: string) => void;
  onClick: (title: string) => void;
}
const MenuItems = ({
  treedata,
  tabledata,
  selected,
  overItem,
  onClick,
  onmouseover,
  onmouseout,
  datalengths,
}: IProps) => {
  const [itemsonlevel, flag, setFlag, recquantity, set] = useMenuItems(
    0,
    treedata
  );

  const ret = (str: string) => {
    for (const [key, value] of Object.entries(datalengths)) {
      if (key === str) return value;
    }
  };

  return (
    <>
      {itemsonlevel.map((t, i) => {
        return (
          <div style={{ marginLeft: t.level * 10 + "px" }} key={t.id}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {flag[i] === false && t.nextlevel === 1 && (
                <div
                  onClick={() => {
                    set(i, true);
                  }}
                >
                  {" "}
                  +
                </div>
              )}
              {flag[i] && (
                <div
                  onClick={() => {
                    set(i, false);
                  }}
                >
                  -
                </div>
              )}
              <div
                className={
                  t.name === selected
                    ? "selected"
                    : t.name === overItem
                    ? "over"
                    : "item"
                }
                onClick={() => onClick(t.name)}
                onMouseOver={() => onmouseover(t.name)}
                onMouseOut={() => onmouseout(t.name)}
              >
                {t.name}
                <span>{ret(t.name)}</span>
              </div>
            </div>
            {flag[i] && (
              <TreeNode
                treedata={treedata}
                selected={selected}
                tabledata={tabledata}
                pid={t.id}
                onClick={onClick}
                datalengths={datalengths}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
export default MenuItems;
