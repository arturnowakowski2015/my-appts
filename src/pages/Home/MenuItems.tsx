import { IMenuItems } from "../../components/TreeSettings";
import "./MenuItems.scss";
interface IProps {
  data: IMenuItems[];
  onClick: (title: string) => void;
}
const MenuItems = ({ data, onClick }: IProps) => {
  return (
    <>
      {data.map((t) => {
        return (
          <div style={{ marginLeft: t.level * 10 + "px" }} key={t.id}>
            <p className="item" onClick={() => onClick(t.name)}>
              {t.name}
              <span>{data.length}</span>
            </p>{" "}
          </div>
        );
      })}
    </>
  );
};
export default MenuItems;
