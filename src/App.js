import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons"; 

import "./App.css";
import Addtaskform from "./components/Addtaskform";
import Updateform from "./components/Updateform";

function App() {
  // Tasks Sate
  const [toDo, setToDo] = useState([]);

  // Temp store
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  //  add task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status : false}
      setToDo([...toDo,newEntry])
      setNewTask('')
    }
  };

  //  delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id!== id)
    setToDo(newTasks)
  };

  //  mark task as done or completed
  const markDone = (id) => {
    let newTask = toDo.map( task =>{
      if (task.id===id) {
        return ({...task,status:!task.status})
      }
      return task;
    })
    setToDo(newTask)
  };
  
  //  Cancel task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title:e.target.value,
      status:updateData.status ? true : false
    }
    setUpdateData(newEntry);
  };


  // update task
  const updateTask = () => {
    let filterRecords= [...toDo].filter(task=> task.id!==updateData.id)
    let updatedObject = [...filterRecords,updateData]
    setToDo(updatedObject)
    setUpdateData('')
  };


  //  Cancel update
  const cancelUpdate = () => {
    setUpdateData('')
  };



  return (
    <div className="container App">
      <br></br>
      <br></br>
      <h3>To Do List</h3>
      <br></br>
      <br></br>


{updateData && updateData ? (
        <Updateform
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
        />
):(
        <Addtaskform
        newTask ={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        />
)}





{/* Display task */}
      {toDo && toDo.length ? "" : "No Tasks..."}
      
      <>

{toDo && toDo
      .sort((a,b)=> a.id> b.id ? 1 : -1)
      .map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? 'done' : ''}>
                  <span className="taskNumber">{index + 1}.</span>
                  <span className="taskText">{task.title}</span>
                </div>
                <div className="iconsWrap">
                  <span title="Completed / Not Completed" onClick={()=>{markDone(task.id)}}><FontAwesomeIcon icon={faCircleCheck}/></span>


                  {task.status ? null :(
                    <span title="Edit" onClick={ ()=>setUpdateData({
                      id:task.id,
                      title:task.title,
                      status:task.status ? true : false
                    })}><FontAwesomeIcon icon={faPen}/></span>
                  )}


                  <span title="Delete" onClick={()=>{deleteTask(task.id)}}><FontAwesomeIcon icon={faTrashCan}/></span>
                </div>
              </div>
            </React.Fragment>
          );
        })}

    </>
    </div>
  );
}

export default App;
