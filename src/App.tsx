import { useEffect, useState } from "react"
import Table from "./components/table/Table"

export interface IExpense {
  id: number
  merchant: string
  amount: number
  description: string
  date: string
  category: "training" | "travel" | "meal"
  status: "draft"
}

const EXPENSES_TABLE_COLUMN_TITLES = [
  "Date",
  "Merchant",
  "Amount",
  "Category",
  "Description",
  "Status",
] // TODO can extract from interface or from data returned by API 

function App() {
  const [expenses, setExpenses] = useState<IExpense[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_EXPENSES_BACKEND_BASE_URL}/expenses`, {
        headers: {
          "Content-Type": "application/json",
          Username: import.meta.env.VITE_USERNAME,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const data = await response.json()

      setExpenses(data)
    } catch {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getFormattedDate = (date_string: string) => {
    const date = new Date(date_string)

    // Note: formatted string works but month and year for all data returned by API is the same (e.g. May 22)
    const formattedDate = `${date.toLocaleString("en-US", { month: "short" })} ${date
      .getUTCFullYear()
      .toString()
      .substring(2)}` // Note: I wasn't sure if the requirement was DD or YY so I used YY as it made sense after the month

    return formattedDate
  }

  if (isLoading) return <>LOADING...</>

  if (hasError) return <>Error found...</>

  return (
    <div id="template-text">
      <h1>Expenses</h1>
      <hr></hr>
      <Table
        columnTitles={EXPENSES_TABLE_COLUMN_TITLES}
        rowData={expenses.map(expense => ({
          date: getFormattedDate(expense.date),
          merchant: expense.merchant,
          amount: expense.amount,
          category: expense.category,
          description: expense.description,
          status: expense.status,
        }))}
      ></Table>
    </div>
  )
}

export default App
