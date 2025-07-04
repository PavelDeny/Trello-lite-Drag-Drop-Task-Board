import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'
import AddTaskForm from './AddTaskForm'
import type { Task as TaskType } from '../store'

type ColumnProps = {
  columnId: string;
  title: string;
  tasks: TaskType[];
}

const Column: React.FC<ColumnProps> = ({ columnId, title, tasks }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow w-64 flex flex-col h-[50vh]">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <Droppable droppableId={columnId}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(provided: any) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={
              'flex-1 min-h-[100px] overflow-y-auto p-2 rounded transition-colors duration-200 bg-white'
            }
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddTaskForm columnId={columnId} />
    </div>
  )
}

export default Column