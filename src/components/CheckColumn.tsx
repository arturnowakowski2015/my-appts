interface IProps {
  title: string;
}
const CheckColumn = ({ title }: IProps) => {
  return (
    <>
      <label>{title}</label>
      <input type="checkbox" id="myCheck"></input>
    </>
  );
};
export default CheckColumn;
