interface ITab {
  name: string,
  isActive: boolean,
  slotName: string
}

interface IArticleItem {
  id: string,
  title: string,
  content: string,
  img: string,
  category1: string,
  category2: string,
  isPass: boolean,
  status: 'published' | 'draft',
  publishTime: string,
  tjCount: number,
  ydCount: number,
  fxCount: number
}

interface IPaginData {
  currentPage: number,
  pageSize: number,
  totalCount: number,
  totalPages: number
}

interface IOverviewItem {
  name: string,
  count: number
}

interface IDataHeader {
  cloumnCNName: string,
  cloumnName: string
}

interface IRender {
  (row): string
}
interface IColumn {
  name: string,
  key: string,
  render?: IRender
}

interface IDataItem {
  id: string | number,
  [proName: string]: any
}

interface ITableData {
  rows: Array<IColumn>,
  rowDatas: Array<IDataItem>
}
export {
  IArticleItem, ITab, IOverviewItem, ITableData, IPaginData

}