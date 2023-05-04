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
  let h=`https://4ae2-103-156-19-229.ngrok-free.app`
  return (
    <>
      
        {/* <Navbar /> */}
        <Routes>
          <Route path='/'  element={<Login/>} />
          <Route path='/curator' element={<Curator/>}/>
          <Route path='/home'  element={<Home/>} />
          <Route path='/patient_details' element={<PatientInfo/>} />
          <Route path='/patient_details/patient_responses' element={<Responses/>}/>
          <Route path='/patient_details/patient_workout' element={<PatientWorkout/>}/>
          <Route path='/patient_details/patient_workout/workout_responses' element={<WorkoutResponse/>}/>
          <Route path='/admin' element={<Admin Api={h}/>}/>
          <Route path='/admin/admin_reg' element={<Admin_reg Api={h}/>}/>
          <Route path='/admin/patient_request' element={<Patient_request/>}/>
          <Route path='/admin/patient_request/avail_doctors' element={<Avail_doctors/>}/>
          <Route path='/forgot_password' element={<ForgotPassword/>}/>
          <Route path='/change_password' element={<ChangePassword/>}/>




          
          
        </Routes>
      
    </>
  );
}

export default App;