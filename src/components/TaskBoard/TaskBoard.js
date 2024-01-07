import React, { useEffect, useState } from "react";
import "./TaskBoard.css";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "../TaskList/TaskList";
import { allTask } from "../../storage/localStorage";
import { isEmpty } from "lodash";

const TaskBoard = () => {
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInProgress] = useState([]);
  const [incomplete, setInComplete] = useState([]);
  const [taskText, setTaskText] = useState("");
  useEffect(() => {
    let tempCompleted = [];
    let tempInprogress = [];
    let tempIncomplete = [];
    !isEmpty(allTask) &&
      allTask.forEach((item) => {
        if (item.status == "incomplete") {
          tempIncomplete.push(item);
        } else if (item.status == "inprogress") {
          tempInprogress.push(item);
        } else {
          tempCompleted.push(item);
        }
      });
    setInComplete(tempIncomplete);
    setInProgress(tempInprogress);
    setCompleted(tempCompleted);
  }, []);

  const handleSubmit = () => {
    let taskItem = {
      id: !isEmpty(allTask) ? allTask?.length + 1 : 1,
      title: taskText,
      status: "incomplete",
    };
    if (!isEmpty(allTask)) {
      localStorage.setItem("allTask", JSON.stringify([...allTask, taskItem]));
      setInComplete([...incomplete, taskItem]);
      setTaskText("");
    } else {
      localStorage.setItem("allTask", JSON.stringify([taskItem]));
      setInComplete([taskItem]);
      setTaskText("");
    }
  };

  const removeItemById = (id, array) => {
    return array.filter((item) => item.id != id);
  };

  const findItemById = (id, array) => {
    return array.find((item) => item.id == id);
  };

  const updateLocalStorage = (value) => {
    const indexOfObjectToUpdate = allTask.findIndex(
      (obj) => obj.id === value.id
    );
    if (indexOfObjectToUpdate !== -1) {
      allTask[indexOfObjectToUpdate].status = value.status;
      const updatedArrayString = JSON.stringify(allTask);
      localStorage.setItem("allTask", updatedArrayString);
    } else {
      console.error("Object not found in the array.");
    }
  };
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // Get the item
    const task = findItemById(draggableId, [
      ...incomplete,
      ...inprogress,
      ...completed,
    ]);
    //For Within draggable components
    if (source.droppableId === destination.droppableId) {
      return;
    } else {
      //For Adding item to destination component
      if (destination.droppableId == 1 && source.droppableId != 1) {
        setInComplete([...incomplete, { ...task, status: "incomplete" }]);
        //Updating in localStorage
        updateLocalStorage({ ...task, status: "incomplete" });
        //For removing item from source array
        if (source.droppableId == 2) {
          setInProgress(removeItemById(draggableId, inprogress));
        } else {
          setCompleted(removeItemById(draggableId, completed));
        }
      }
      if (destination.droppableId == 2 && source.droppableId != 2) {
        setInProgress([...inprogress, { ...task, status: "inprogress" }]);
        //Updating in localStorage
        updateLocalStorage({ ...task, status: "inprogress" });
        //For removing item from source array
        if (source.droppableId == 1) {
          setInComplete(removeItemById(draggableId, incomplete));
        } else {
          setCompleted(removeItemById(draggableId, completed));
        }
      }
      if (destination.droppableId == 3 && source.droppableId != 3) {
        setCompleted([...completed, { ...task, status: "completed" }]);
        //Updating in localStorage
        updateLocalStorage({ ...task, status: "completed" });
        //For removing item from source array
        if (source.droppableId == 1) {
          setInComplete(removeItemById(draggableId, incomplete));
        } else {
          setInProgress(removeItemById(draggableId, inprogress));
        }
      }
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex-items">
        <textarea
          type="text"
          className="input-text"
          onChange={(e) => setTaskText(e.target.value)}
          value={taskText}
        />
        <button className="submit-button" onClick={handleSubmit}>
          Add task
        </button>
      </div>
      <div className="contain">
        <div className="flex-container">
          <TaskList title={"TO-DO"} tasks={incomplete} id={"1"} />
          <TaskList title={"IN-PROGRESS"} tasks={inprogress} id={"2"} />
          <TaskList title={"COMPLETED"} tasks={completed} id={"3"} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
