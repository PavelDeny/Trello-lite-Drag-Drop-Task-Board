import { create } from 'zustand'

export type Task = {
  id: string
  content: string
}

export type Column = {
  id: string
  title: string
  tasks: Task[]
}

type BoardStore = {
  columns: Column[]
  addTask: (columnId: string, content: string) => void
  moveTask: (
    sourceColumnId: string,
    destColumnId: string,
    taskIndex: number,
    destIndex: number
  ) => void
}

const LS_KEY = 'trello-lite-board'

function loadColumns(): Column[] {
  const data = localStorage.getItem(LS_KEY)
  if (data) {
    try {
      return JSON.parse(data)
    } catch {
      // ignore parse error, fallback to default
    }
  }
  return [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 'task-1', content: 'Learn Zustand' },
        { id: 'task-2', content: 'Implement Drag & Drop' },
      ],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [],
    },
  ]
}

export const useBoardStore = create<BoardStore>((set) => ({
  columns: loadColumns(),

  addTask: (columnId, content) =>
    set((state) => {
      const newColumns = state.columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: [...col.tasks, { id: crypto.randomUUID(), content }],
            }
          : col
      )
      localStorage.setItem(LS_KEY, JSON.stringify(newColumns))
      return { columns: newColumns }
    }),

  moveTask: (sourceColumnId, destColumnId, taskIndex, destIndex) =>
    set((state) => {
      const sourceCol = state.columns.find((col) => col.id === sourceColumnId)
      const destCol = state.columns.find((col) => col.id === destColumnId)
      if (!sourceCol || !destCol) return {}
      const task = sourceCol.tasks[taskIndex]
      const newSourceTasks = [...sourceCol.tasks]
      newSourceTasks.splice(taskIndex, 1)
      const newDestTasks = [...destCol.tasks]
      newDestTasks.splice(destIndex, 0, task)
      const newColumns = state.columns.map((col) => {
        if (col.id === sourceColumnId) return { ...col, tasks: newSourceTasks }
        if (col.id === destColumnId) return { ...col, tasks: newDestTasks }
        return col
      })
      localStorage.setItem(LS_KEY, JSON.stringify(newColumns))
      return { columns: newColumns }
    }),
}))
