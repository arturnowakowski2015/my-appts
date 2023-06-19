import "../scss/button.scss";
import { Chevron } from "./Interface";
interface IProps {
  className: string;
  title: string;
  chevron: Chevron | undefined;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onClick: () => void;
}
export default function ColumnHeaderButton({
  className,
  onMouseOver,
  onMouseOut,
  onClick,
  title,
  chevron,
}: IProps) {
  const checkChevronConditions = (chevron: Chevron, title: string) => {
    return (
      chevron.atall === true && chevron.down === true && chevron.title === title
    );
  };
  return (
    <div
      className={className + " columnheader"}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      {chevron !== undefined &&
        (checkChevronConditions(chevron, title) ? (
          <i className="fa fa-chevron-up"></i>
        ) : (
          <i className="fa fa-chevron-down"></i>
        ))}
      {title}
    </div>
  );
}
