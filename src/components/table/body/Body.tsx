export interface IRow {
  date: string
  merchant: string
  amount: number
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
          {Object.entries(data).map(([key, value], i: number) =>
            key === "amount" ? (
              <td key={i}>
                £{value}
              </td>
            ) : (
              <td key={i}>
                {value}
              </td>
            )
          )}
        </tr>
      ))}
    </tbody>
  )
}
