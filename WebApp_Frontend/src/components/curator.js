import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';
import axios from 'axios';

const Curator = () => {
    const [modal, setModal] =useState(false);
    const [taskList,setTaskList] = useState([]);
    const [arr,setarr] =useState([]);

    const Fetch_data = async()=>{
        await axios.get(` https://d8eb-119-161-98-68.in.ngrok.io/contentcurator/workout`, {
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
          
      })
        .then((response)=>{
            console.log(response.data);
            setTaskList(response.data);
        })
        .catch(function(error)
        {
            console.log(error);
        });
        
    }


    useEffect(() => {
        // let arr =localStorage.getItem("taskList")
        Fetch_data();
        
        if(arr){
            let obj = JSON.parse(JSON.stringify(arr))
            setTaskList(obj)
        }
        
    },[])
    const toggle = () => {
        setModal(!modal);
    }

    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList",JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }
    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        // window.location.reload()
    }
    return ( 
        <>
        <div className= "header text-center" >
                <h3>Activity List</h3>
                <button className='btn btn-primary mt-2' onClick={() => setModal(true)}>Create Activity</button>
        </div>
        <div className="task-container">
              {taskList && taskList.map((obj,index) => <Card taskObj = {obj} index={index} deleteTask={deleteTask}  updateListArray = {updateListArray}/>)}  
        </div>
        <CreateTask toggle={toggle} modal={modal} save ={saveTask}/>
        </>  
        
    );
};

export default Curator;