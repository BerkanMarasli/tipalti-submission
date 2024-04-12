import { useEffect, useState } from "react"
import { IExpense } from "../App"

export const useExpenses = () => {
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

  return [expenses, isLoading, hasError] as const
}
