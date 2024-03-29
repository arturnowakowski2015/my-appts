export interface treeItems {
  name: string;
  children: treeItems[];
}
export interface categoryurl {
  str: string;
}
export interface DataTable {
  [id: string | number]: string | number;
}
export interface Record {
  rec: Array<string | number | Boolean | undefined>;
}
export interface Data {
  [category: string]: DataTable[];
}

interface ColumnsHeader {
  title: string;
  disp: boolean;
}
export interface Column {
  col: ColumnsHeader;
}

export interface Chevron {
  atall: Boolean;
  down: Boolean;
  title: string;
  class: string[];
}
export interface DataLengths {
  new?: number;
  postponed?: number;
}
