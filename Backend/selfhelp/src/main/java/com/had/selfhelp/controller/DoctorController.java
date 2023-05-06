package com.had.selfhelp.controller;


import java.util.Comparator;
import java.util.List;
import java.util.Random;

import com.had.selfhelp.entity.*;
import com.had.selfhelp.jwt.JwtUtils;
import com.had.selfhelp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

//import com.had.selfhelp.dao.Workout_instance_repo;
import com.had.selfhelp.service.DoctorService;
import com.had.selfhelp.service.WorkoutService;





class sortByDoctorChange implements Comparator<Patient> {

	@Override
	public int compare(Patient P1, Patient P2) {
		if(P1.getDoctor_change()!=null && P2.getDoctor_change()!=null)
			return P1.getDoctor_change().compareTo(P2.getDoctor_change());
		return 0;
	}
};
@RestController
@RequestMapping("/doctor")
public class  DoctorController {

	private DoctorService doctorService;
	private WorkoutService workoutService;
	@Autowired
	UserService userService;

	@Autowired
	JwtUtils jwtUtils;
	@Autowired
	public DoctorController(DoctorService doctorService, WorkoutService workoutService) {
		this.doctorService = doctorService;
		this.workoutService = workoutService;
	}

//	@PostMapping("/")
//	public Doctor addDoctor(@RequestBody Doctor theDoctor) {
//		theDoctor.setDoctor_id(0);
//		doctorService.save(theDoctor);
//		return theDoctor;
//	}
	
	@GetMapping("/")
	@PreAuthorize("hasAuthority('Admin')")
	public List<Doctor> getDoctors() {
		return doctorService.findDoctors();
	}
	
	@GetMapping("/patient/{doctorId}")
	//@PreAuthorize("hasAnyAuthority('Doctor')")
	public List<Patient> getPatientList(@RequestHeader("Authorization") String token,@PathVariable(name = "doctorId") int doctorId) {
          String t = token.substring(7, token.length());
		if(doctorId!=doctorService.findByUsername(jwtUtils.getUserNameFromJwtToken(t)).getDoctor_id())
		     throw new RuntimeException("You are not Authenticate to do veiw the other Doctors Patient ");

		   return doctorService.findPatients(doctorId);

	}
	
//	@PostMapping("/login")
//	public Doctor login(@RequestBody Doctor d) {
//		return doctorService.login(d);
//	}
	
	@PostMapping("/workout/{patientId}/{pre_id}")
	@PreAuthorize("hasAuthority('Doctor')")
	public void addWorkout(@PathVariable(name = "patientId") int patientId, @RequestBody List<Workout> workoutList, @PathVariable(name = "pre_id") int pre_id) {
		for(Workout w:workoutList)
		{
			System.out.println(w);
		}
		workoutService.addWorkoutInstances(workoutList, patientId, pre_id);
	}
	
	@GetMapping("/workout/{patientId}")
	@PreAuthorize("hasAuthority('Doctor')")
	public List<Workout> getWorkoutNotAssigned(@PathVariable(name = "patientId") int patientId) {
		 return workoutService.findWorkoutNotAssigned(patientId);
	}
	
	@GetMapping("/workoutResponses/{workout_instance_id}")
	@PreAuthorize("hasAuthority('Doctor')")
	public List<Workout_question_response> getWorkoutResponse(@PathVariable(name = "workout_instance_id") int workout_instance_id) {
		return workoutService.findWorkoutResponse(workout_instance_id);
	} 
	
	@GetMapping("/{doctor_id}")
	@PreAuthorize("hasAuthority('Patient')")
	public Doctor getDoctorById(@PathVariable(name = "doctor_id") int doctor_id) {
		return doctorService.findById(doctor_id);
	}

	@GetMapping("/visualise/{doctor_id}")
	@PreAuthorize("hasAuthority('Doctor')")
	public Doctor getDoctorVisualise(@PathVariable(name = "doctor_id") int doctor_id) {
		Doctor d = doctorService.findById(doctor_id);
		List<Patient> patientList = d.getPatients();
		patientList.sort(new sortByDoctorChange());
		d.setPatients(patientList);
		return d;
	}
	@PostMapping("/Password")
	public void changePassword(@RequestBody Doctor D) {

        String username =    doctorService.findById(D.getDoctor_id()).getUsername();
		userService.changePass(D.getPassword(),username);
		doctorService.changePass(doctorService.findById(D.getDoctor_id()),D.getPassword());
	}

}
