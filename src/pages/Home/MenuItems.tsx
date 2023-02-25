import { IMenuItems } from "../../components/TreeSettings";
import "./MenuItems.scss";
interface IProps {
  data: IMenuItems[];
}
const MenuItems = ({ data }: IProps) => {
  return (
    <>
      {data.map((t) => {
        return (
          <div style={{ marginLeft: t.level * 10 + "px" }} key={t.id}>
            <p className="item">{t.name}</p>
          </div>
        );
      })}
    </>
  );
};
export default MenuItems;
