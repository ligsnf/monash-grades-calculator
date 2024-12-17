import { Result } from "@/schemas/result-schema"
import { STORAGE_KEYS } from "@/constants/storage-keys"

const initialData: Result[] = [
  {
    id: 0,
    unitCode: "ECE2072",
    creditPoints: 6,
    mark: 50,
    grade: "P",
  },
  {
    id: 1,
    unitCode: "FIT2107",
    creditPoints: 6,
    mark: 64,
    grade: "C",
  },
  {
    id: 2,
    unitCode: "FIT3170",
    creditPoints: 12,
    mark: 77,
    grade: "D",
  },
  {
    id: 3,
    unitCode: "FIT2095",
    creditPoints: 6,
    mark: 99,
    grade: "HD",
  },
]

export function localStorage<T>(key: string, initialValue: T) {
  const getData = (): T => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) as T : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }

  const setData = (value: T): T => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return value
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
      return value
    }
  }

  return { getData, setData }
}

export const db = localStorage<Result[]>(STORAGE_KEYS.RESULTS, initialData)
