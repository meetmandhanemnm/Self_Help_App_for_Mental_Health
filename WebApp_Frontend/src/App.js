import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import PatientInfo from './pages/PatientList/PatientInfo';
import Responses from './pages/PatientResponses/Responses';
import PatientWorkout from './pages/Workout/PatientWorkout';
import WorkoutResponse from './pages/PatientResponses/WorkoutResponses';
import Curator from './components/ContentCurator/curator';
import Admin from './pages/Admin/admin';
import Admin_reg from './pages/Admin/admin_reg';
import Patient_request from './pages/Admin/Patient_request';
import Avail_doctors from './pages/Admin/Avail_doctors';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ChangePassword from './components/ForgotPassword/ChangePassword';


function App() {
  let h=`https://7dac-104-28-220-173.ngrok-free.app/`
 // https://ce27-104-28-220-173.ngrok-free.app
  //https://187a-119-161-98-68.ngrok-free.app
  //https://27f1-104-28-220-173.ngrok-free.app
  return (
    <>
      
        {/* <Navbar /> */}
        <Routes>
          <Route path='/'  element={<Login Api={h}/>} />
          <Route path='/curator' element={<Curator Api={h}/>}/>
          <Route path='/home'  element={<Home Api={h}/>} />
          <Route path='/patient_details' element={<PatientInfo Api={h}/>} />
          <Route path='/patient_details/patient_responses' element={<Responses Api={h}/>}/>
          <Route path='/patient_details/patient_workout' element={<PatientWorkout Api={h}/>}/>
          <Route path='/patient_details/patient_workout/workout_responses' element={<WorkoutResponse Api={h}/>}/>
          <Route path='/admin' element={<Admin Api={h}/>}/>
          <Route path='/admin/admin_reg' element={<Admin_reg Api={h}/>}/>
          <Route path='/admin/patient_request' element={<Patient_request Api={h}/>}/>
          <Route path='/admin/patient_request/avail_doctors' element={<Avail_doctors Api={h}/>}/>
          <Route path='/forgot_password' element={<ForgotPassword Api={h}/>}/>
          <Route path='/change_password' element={<ChangePassword Api={h}/>}/>




          
          
        </Routes>
      
    </>
  );
}

export default App;