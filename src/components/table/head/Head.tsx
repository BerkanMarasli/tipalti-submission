interface IHeadProps {
  columnTitles: string[] // TODO can make type stricter
}

export default function Head({ columnTitles }: IHeadProps) {
  return (
    <thead>
      <tr>
        {columnTitles.map((columnName: string, i: number) => (
          <th key={i}>{columnName}</th>
        ))}
      </tr>
    </thead>
  )
}
