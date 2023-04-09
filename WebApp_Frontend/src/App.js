
import Pat from './components/PatientInfo'
import Nav from './components/Navbar_head'
import Login from './components/Login'
import Responses from './components/Responses'
import { Route, Router, Routes } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Curator from './components/curator'
import PatientWorkout from './components/PatientWorkout'


// Example of a data array that
// you might receive from an API

function App() {

  return (
  
    <>
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/curator' element={<Curator/>}/>
        <Route path='/patient_details' element={<Pat />} />
        <Route path='/patient_details/patient_responses' element={<Responses/>}/>
        <Route path='/patient_details/patient_workout' element={<PatientWorkout/>}/>
      </Routes>
    
    </>
  );
}
  
export default App;