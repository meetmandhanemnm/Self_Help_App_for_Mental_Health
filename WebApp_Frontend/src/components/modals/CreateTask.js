import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

const CreateTask = ({modal, toggle, save,Api}) => {

  const [taskName, setTaskName] = useState(''); 
  const [description, setDescription] =useState('');
  const [post, setPost] = React.useState(null);

  
  const handleChange =(e) =>{

    const {name , value} = e.target

    if(name === "taskName"){
        setTaskName(value)
    }
    else{
        setDescription(value)
    }
  }

  // const handleSave = (e) =>{
  //   
  // }

console.log(Api)
  const  handleSave = async (e) => {
  
    await axios.post(`${Api}contentcurator/workout`, {
    
    title : taskName,
    description : description
  })
  .then(function (response) {
    console.log(response.data);
    setPost(response.data);
  })
  .catch(function (error) {
    Swal.fire({
      icon: 'error',
      
      text: '',
      footer: 'Try again !!'
    })
    

  });

  e.preventDefault()
    let taskObj = {}
    taskObj["Name"] =taskName
    taskObj["Description"] =description
    save(taskObj)
    window.location.reload()
}
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
        <ModalBody>
           <form>
                <div className="form-group">
                    <label>Activity Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName"/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="10" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                </div>
           </form>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={handleSave}>
            Create
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
            Cancel
            </Button>
        </ModalFooter>
    </Modal>
  );
};

export default CreateTask;
