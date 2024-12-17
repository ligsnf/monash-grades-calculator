import { db } from "@/db/local-storage"
import { Result } from "@/schemas/result-schema"

export function addResult() {
  const currentData = db.getData()
  const maxId = Math.max(...currentData.map(item => item.id), -1)
  const newResult: Result = {
    id: maxId + 1,
    unitCode: "",
    creditPoints: 6,
    mark: 0,
    grade: "N",
  }
  return db.setData([...currentData, newResult])
}

export function updateResult(id: number, updatedResult: Result) {
  const currentData = db.getData()
  const newData = currentData.map(item => 
    item.id === id ? { ...updatedResult, id } : item
  )
  return db.setData(newData)
}

export function deleteResult(id: number) {
  const currentData = db.getData()
  const newData = currentData.filter(item => item.id !== id)
  return db.setData(newData)
}

export function restoreResult(itemToRestore: Result) {
  const currentData = db.getData()
  if (currentData.some(item => item.id === itemToRestore.id)) {
    return currentData
  }

  const insertIndex = currentData.findIndex(item => item.id > itemToRestore.id)
  const newData = [...currentData]
  if (insertIndex === -1) {
    newData.push(itemToRestore)
  } else {
    newData.splice(insertIndex, 0, itemToRestore)
  }
  return db.setData(newData)
}