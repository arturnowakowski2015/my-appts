import "./Label.css";
interface ILabel {
  title: string;
  level: number;
  pid: number;
  handleDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => void;
  enableDropping: (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Label = ({
  pid,
  title,
  level,
  handleDragStart,
  handleDrop,
  enableDropping,
}: ILabel) => {
  return (
    <div
      style={{ marginLeft: level + "px" }}
      className={"node" + (title.indexOf(".X") !== -1 ? " labelold" : "")}
      id="d1"
      draggable="true"
      onDragStart={(event) =>
        title.indexOf(".X") === -1 && handleDragStart(event, title)
      }
      onDrop={(event) => {
        handleDrop(event);
      }}
      onDragOver={(event) => enableDropping(event, title)}
    >
      <p className={"item p" + (isNaN(pid) ? -1 : pid) + "/"}>{title}</p>
    </div>
  );
};
export default Label;
