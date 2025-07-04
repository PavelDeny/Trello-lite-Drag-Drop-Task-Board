import React, { useState } from 'react'
import { useBoardStore } from '../store'

type AddTaskFormProps = {
  columnId: string
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ columnId }) => {
  const [taskContent, setTaskContent] = useState('')
  const addTask = useBoardStore((state) => state.addTask)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (taskContent.trim() === '') return

    addTask(columnId, taskContent)
    setTaskContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-[15px] flex gap-[15px]">
      <input
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        placeholder="New task"
        className="flex-1 px-2 py-1 border border-gray-300 rounded-l"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded-r hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  )
}

export default AddTaskForm
