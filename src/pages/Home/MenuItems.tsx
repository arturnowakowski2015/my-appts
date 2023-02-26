import { IMenuItems } from "../../components/TreeSettings";
import { DataTable, DataLengths } from "../../components/Interface";
import "./MenuItems.scss";
interface IProps {
   datalengths: DataLengths;
  treedata: IMenuItems[];
  tabledata: DataTable[];
  onClick: (title: string) => void;
}
const MenuItems = ({ treedata, tabledata, onClick, datalengths }: IProps) => {
  const ret = (str: string) => {
    alert(str);
    for (const [key, value] of Object.entries(datalengths)) {
      if (key === str) return value;
    }
  };

  return (
    <>
      {treedata.map((t) => {
        return (
          <div style={{ marginLeft: t.level * 10 + "px" }} key={t.id}>
            <p className="item" onClick={() => onClick(t.name)}>
              {t.name}
 
              <span>
                ,,,
                {ret(t.name)}
              </span>
 
            </p>{" "}
          </div>
        );
      })}
    </>
  );
};
export default MenuItems;
