import React, {useState} from 'react';
import EditTask from '../modals/EditTask'


const DoctorCard = ({taskObj, index}) => {
    const [modal, setModal] = useState(false);

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    let changeIcon = function(icon){
        icon.classList.toggle('fa-minus')
    }

    return (
        <div className = "doctor-card-wrapper mr-5">
            <div className = "card-top" style={{"backgroundColor": colors[index%5].primaryColor}}></div>
            <div className = "task-holder">
                <span className = "card-header" style={{"backgroundColor": colors[index%5].secondaryColor, "borderRadius": "10px",fontWeight:'bold'}}>{taskObj.workout.title}</span>
                <p className = "para">{taskObj.workout.description}</p>
                <div style={{position: "absolute", right : "20px", bottom : "20px"}}>
                   {/* <button> <i className = "fa fa-minus " style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} ></i></button> */}
                   <div style={{fontWeight:"bold"}}><h7>WorkoutID: </h7>{taskObj.workout_instance_id}</div>

                </div>

        </div>
        </div>
    );
};

export default DoctorCard;