import React, { useEffect, useState } from 'react';

import axios from 'axios';
import CreateTask from '../modals/CreateTask';
import Card from '../Cards/Card';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Curator = (props) => {
    const [modal, setModal] =useState(false);
    const [taskList,setTaskList] = useState([]);
    const [arr,setarr] =useState([]);
    const navigate = useNavigate()
    console.log(props.Api)

    axios.interceptors.request.use( config => {
        const user = JSON.parse(localStorage.getItem('user'));
      
        if(user){
          const token = 'Bearer ' + user;
          config.headers.Authorization =  token;
        }
        return config;
      });


    const Fetch_data = async()=>{
        await axios.get(`${props.Api}contentcurator/workout`, {
        //   headers: new Headers({
        //     "ngrok-skip-browser-warning": "69420",
        //   }),
          
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
    console.log(props.Api)
    return ( 
        <>
        <div className= "header text-center" >
                <h3>Activity List</h3>
                <Button variant='danger' onClick={()=>navigate('/') } style={{marginRight:"10px",marginTop:"4px"   }}>LOGOUT  </Button>

                <button className='btn btn-primary mt-2' onClick={() => setModal(true)}>Create Activity</button>
        </div>
        <div className="task-container">
              {taskList && taskList.map((obj,index) => <Card taskObj = {obj} index={index} deleteTask={deleteTask}  updateListArray = {updateListArray} Api={props.Api}/>)}  
        </div>
        <CreateTask toggle={toggle} modal={modal} save ={saveTask} Api={props.Api}/>
        </>  
        
    );
};

export default Curator;