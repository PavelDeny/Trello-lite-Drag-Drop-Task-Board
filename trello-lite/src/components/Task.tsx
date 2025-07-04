import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import type { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd' // ✅ Можно так, если поддерживается


type TaskProps = {
  task: {
    id: string
    content: string
  }
  index: number
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className={`p-2 my-2 rounded shadow ${
            snapshot.isDragging ? 'bg-blue-100' : 'bg-white'
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  )
}

export default Task
