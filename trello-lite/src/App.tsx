import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useBoardStore } from './store'
import Column from './components/Column'

const App: React.FC = () => {
  const columns = useBoardStore((state) => state.columns)
  const moveTask = useBoardStore((state) => state.moveTask)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    const { source, destination } = result
    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }
    moveTask(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    )
  }

  return (
    <div className="min-h-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🗂️ Trello Lite</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-[15px] flex-wrap justify-center bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
          {columns.map((column) => (
            <Column
              key={column.id}
              columnId={column.id}
              title={column.title}
              tasks={column.tasks}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default App
