import { useNavigate } from "react-router-dom";
export interface IProps {
  one: (str: string) => void;
}
const Nav = ({ one }: IProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate("/search");
          one("search");
        }}
      >
        search
      </div>
      <div
        onClick={() => {
          navigate("/settings/treesettings");
          one("settings");
        }}
      >
        settingsaaa
      </div>
    </>
  );
};

export default Nav;
