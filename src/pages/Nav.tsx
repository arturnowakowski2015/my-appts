import { useNavigate } from "react-router-dom";
import { useState } from "react";
export interface IProps {
  one: (str: string) => void;
}
const Nav = ({ one }: IProps) => {
  const navigate = useNavigate();
  const [set, setSet] = useState<string[]>(["blue", "brown", "green", "red"]);
  const [i, setI] = useState(1);

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
      <div className={"dropdown-" + set[i]}>
        <button className="dropbtn">Dropdown</button>
        <div className="dropdown-content">
          {set.map((t, j) => {
            return (
              <a href="#" onClick={() => setI(j)}>
                {t}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Nav;
