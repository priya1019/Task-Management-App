import React from "react";
import "./TaskList.css";
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "../TaskItem/TaskItem";
const TaskList = ({ title, tasks, id }) => {
  return (
    <div className="container">
      <h3
        className={`title ${
          title == "TO-DO"
            ? "inactive-bg inactive-text"
            : title == "IN-PROGRESS"
            ? "active-bg active-text"
            : "completed-bg completed-text"
        }`}
      >
        {title}
      </h3>
      <Droppable droppableId={`${id}`}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskItem task={task} index={index} key={task.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
