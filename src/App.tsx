import Table from "./components/table/Table"
import { useExpenses } from "./Hooks/useExpenses"
import { getFormattedDate } from "./Util/getFormattedDate"

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
  const [expenses, isLoading, hasError] = useExpenses()

  if (isLoading) return <>LOADING...</>

  if (hasError) return <>Error found...</>

  /*
  Note that I filtered id out here as it is not displayed in the UI.
  Considering the responsibility of the Table component, it should only receive data to be displayed.

  If I had coded this task differently, I could use the id as a key too.
  As the API is always returning the same data in this situation (+ no table filtering), using the index as a key is justifiable here.
  */
  return (
    <div id="app">
      <h1>Expenses</h1>
      <hr></hr>
      <Table
        columnTitles={EXPENSES_TABLE_COLUMN_TITLES}
        rowData={expenses.map(expense => ({
          date: getFormattedDate(expense.date),
          merchant: expense.merchant,
          amount: `£${expense.amount}`,
          category: expense.category,
          description: expense.description,
          status: expense.status,
        }))}
      ></Table>
    </div>
  )
}

export default App
