export interface IRow {
  date: string
  merchant: string
  amount: string
  category: "training" | "travel" | "meal"
  description: string
  status: "draft"
}

interface IBodyProps {
  rowData: IRow[]
}

export default function Body({ rowData }: IBodyProps) {
  return (
    <tbody>
      {rowData.map((data: IRow, i: number) => (
        <tr key={i}>
          {Object.values(data).map((value, i: number) => (
            <td key={i}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
