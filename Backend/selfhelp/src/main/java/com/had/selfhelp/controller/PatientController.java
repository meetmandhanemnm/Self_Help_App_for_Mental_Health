package com.had.selfhelp.controller;

import java.util.List;
import java.util.Random;

import com.had.selfhelp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.had.selfhelp.entity.Doctor;
import com.had.selfhelp.entity.Patient;
import com.had.selfhelp.entity.PatientDoctorChange;
import com.had.selfhelp.entity.Questionnaire;
import com.had.selfhelp.entity.Questionnaire_response;
import com.had.selfhelp.entity.Workout_instance;
import com.had.selfhelp.entity.Workout_question;
import com.had.selfhelp.entity.Workout_question_response;
import com.had.selfhelp.service.PatientService;
import com.had.selfhelp.service.WorkoutService;

@RestController

@RequestMapping("/patient")
public class PatientController {

	private PatientService patientService;
	private WorkoutService workoutService;
	@Autowired
	UserService userService;

	@Autowired
	public PatientController(PatientService patientService,	WorkoutService workoutService) {
		this.patientService = patientService;
		this.workoutService = workoutService;
	}

	@PostMapping("/")
	public Patient addPatient(@RequestBody Patient thePatient) {
		thePatient.setPatient_id(0);
		patientService.save(thePatient);
		workoutService.assignWorkout(thePatient);
		return thePatient;
	}

	@PostMapping("/responses/{patientId}")
	public int addResponses(@RequestBody List<Questionnaire_response> response, @PathVariable(name = "patientId") int patient_id) {
		System.out.println(response);
		int severity = patientService.saveResponses(response, patient_id);
		if(severity>27) {
			patientService.assignDoctor(patient_id);
		}
		return severity;
	}

	@GetMapping("/questions")

	public List<Questionnaire> getQuestions() {
		return patientService.getQuestions();
	}

	@GetMapping("/responses/{patientId}")
	public List<Questionnaire_response> getResponses(@PathVariable(name = "patientId") int patientId) {
		return patientService.getResponses(patientId);
	}

//	@PostMapping("/login")
//	public Patient login(@RequestBody Patient p) {
//		return patientService.login(p);
//	}

	@GetMapping("/workout/{patientId}")
	@PreAuthorize("hasAuthority('Doctor')")
	public List<Workout_instance> getWorkout(@PathVariable(name = "patientId") int patientId) {
		return workoutService.findWorkoutInstances(patientId);
	}

	@GetMapping("/workout/questions/{workout_id}")
	public List<Workout_question> getWorkoutQuestions(@PathVariable(name = "workout_id") int workout_id) {
		return workoutService.findWorkoutQuestions(workout_id);
	}

	@PostMapping("/workout/response")
	public List<Workout_question_response> saveWorkoutResponse(@RequestBody List<Workout_question_response> responseList) {
		return workoutService.saveResponse(responseList);
	}


	@PostMapping("/workout/complete")
	public void markWorkoutInstanceComplete(@RequestBody Workout_instance instance) {
		workoutService.markInstance(instance);
	}

	@PostMapping("/workout")
	public void saveWorkoutInstances(@RequestBody Workout_instance instance) {
		workoutService.saveInstance(instance);
	}

	@PostMapping("/default_workout")
	public void makeWorkoutStateDefault(@RequestBody Workout_instance instance) {
		workoutService.updateInstance(instance);
	}

	@PutMapping("/doctor/{patient_id}")
	@PreAuthorize("hasAuthority('Admin')")
	public void changeDoctor(@PathVariable(name = "patient_id") int patient_id, @RequestBody Doctor doctor) {
		patientService.updateDoctor(patient_id, doctor);
	}
	@PutMapping("/workout/complete")
	public void markPrerequistes(@RequestBody Workout_instance instance) {
		workoutService.updatePrerequisite(instance);
	}
	@PostMapping("/doctor")
	public void requestDoctorChange(@RequestBody PatientDoctorChange Pd) {
		patientService.requestForDoctorChange(Pd);
	}

	@GetMapping("/doctor")
	@PreAuthorize("hasAuthority('Admin')")
	public List<PatientDoctorChange> getDoctorChangeRequests() {
		return patientService.getDoctorChangeRequests();
	}
	@PutMapping("/Password")
	public void changePassword(@RequestBody Patient P) {


		userService.changePass(P.getPassword(),P.getUsername());

		patientService.changePass(patientService.findByEmail(P.getEmail()),P.getPassword());
	}
}
