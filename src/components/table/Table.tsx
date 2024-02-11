import Body, { IRow } from "./body/Body"
import Head from "./head/Head"
import './table.css'

interface ITableProps {
  columnTitles: string[] // TODO can make type stricter
  rowData: IRow[]
}

export default function Table({ columnTitles, rowData }: ITableProps) {
  return (
    <table id="table">
      <Head columnTitles={columnTitles}></Head>
      <Body rowData={rowData}></Body>
    </table>
  )
}
