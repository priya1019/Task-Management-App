import React from "react";
import "./TaskItem.css";
import { Draggable } from "react-beautiful-dnd";
const TaskItem = ({ task, index }) => {
  return (
    <Draggable draggableId={`${task.id}`} key={task} index={index}>
      {(provided, snapshot) => (
        <div
          className={`content ${
            task.status == "incomplete"
              ? "inactive-bg inactive-border"
              : task.status == "inprogress"
              ? "active-bg active-border"
              : "completed-bg completed-border"
          }`}
          ref={provided.innerRef}
          snapshot={snapshot}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task">
            <span>
              <small>#{task.id}</small>
            </span>
            <p className="title">{task.title}</p>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
