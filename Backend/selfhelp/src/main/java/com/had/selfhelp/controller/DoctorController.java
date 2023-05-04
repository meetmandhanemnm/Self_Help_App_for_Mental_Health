package com.had.selfhelp.controller;


import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.selfhelp.entity.Doctor;
import com.had.selfhelp.entity.Patient;
import com.had.selfhelp.entity.Workout;
import com.had.selfhelp.entity.Workout_question_response;
import com.had.selfhelp.service.DoctorService;
import com.had.selfhelp.service.EmailSenderService;
import com.had.selfhelp.service.WorkoutService;

class sortByDoctorChange implements Comparator<Patient>{

	@Override
	public int compare(Patient P1, Patient P2) {
		if(P1.getDoctor_change()!=null && P2.getDoctor_change()!=null)
			return P1.getDoctor_change().compareTo(P2.getDoctor_change());
		return 0;
	}	
};

@RestController
@RequestMapping("/doctor")
public class DoctorController {

	private DoctorService doctorService;
	private WorkoutService workoutService;
	private EmailSenderService emailService;
	
	@Autowired
	public DoctorController(DoctorService doctorService, WorkoutService workoutService, EmailSenderService emailService) {
		this.doctorService = doctorService;
		this.workoutService = workoutService;
		this.emailService = emailService;
	}

	@PostMapping("/")
	public Doctor addDoctor(@RequestBody Doctor theDoctor) {
		theDoctor.setDoctor_id(0);
		doctorService.save(theDoctor);
		emailService.sendSimpleEmail(theDoctor.getEmail(),
                "Congratulations and welcome to the Self Help App For Mental Health!!\nThank you for registering as a doctor.Here are your login credentials:\n Username - " +theDoctor.getUsername()+"\n Password - "+theDoctor.getPassword()+"\nWe recommend you to change the password as soon as you login the first time.\n Regards",
                "Welcome Dr. "+theDoctor.getFirstName()+" "+theDoctor.getLastName()+" to the Self Help App for Mental Health!!"
        );
		return theDoctor;
	}
	
	@GetMapping("/")
	public List<Doctor> getDoctors() {
		return doctorService.findDoctors();
	}
	
	@GetMapping("/patient/{doctorId}")
	public List<Patient> getPatientList(@PathVariable(name = "doctorId") int doctorId) {
		return doctorService.findPatients(doctorId);
	}
	
	@PostMapping("/login")
	public Doctor login(@RequestBody Doctor d) {
		return doctorService.login(d);
	}
	
	@PostMapping("/workout/{patientId}/{pre_id}")
	public void addWorkout(@PathVariable(name = "patientId") int patientId, @RequestBody List<Workout> workoutList, @PathVariable(name = "pre_id") int pre_id) {
		for(Workout w:workoutList)
		{
			System.out.println(w);
		}
		workoutService.addWorkoutInstances(workoutList, patientId, pre_id);
	}
	
	@GetMapping("/workout/{patientId}")
	public List<Workout> getWorkoutNotAssigned(@PathVariable(name = "patientId") int patientId) {
		 return workoutService.findWorkoutNotAssigned(patientId);
	}
	
	@GetMapping("/workoutResponses/{workout_instance_id}")
	public List<Workout_question_response> getWorkoutResponse(@PathVariable(name = "workout_instance_id") int workout_instance_id) {
		return workoutService.findWorkoutResponse(workout_instance_id);
	} 
	
	@GetMapping("/{doctor_id}")
	public Doctor getDoctorById(@PathVariable(name = "doctor_id") int doctor_id) {
		return doctorService.findById(doctor_id);
	}

	@GetMapping("/visualise/{doctor_id}")
	public Doctor getDoctorVisualise(@PathVariable(name = "doctor_id") int doctor_id) {
		Doctor d = doctorService.findById(doctor_id);
		List<Patient> patientList = d.getPatients();
		patientList.sort(new sortByDoctorChange());
		d.setPatients(patientList);
		return d;
	}
	
	@PostMapping("/resetPassword/{email}")
	public ResponseEntity<?> forgotPass(@PathVariable(name = "email") String email) {
        Doctor d = doctorService.findByEmail(email);

        if(d!=null) {

            String pass = "abcdefg";
            d.setPassword(pass);
            doctorService.changePass(d,pass);
            emailService.sendSimpleEmail(email,
                    "Your new Password is - " +pass,
                    "This Email for Password Reset"
            );
            return ResponseEntity.ok().body("password change successfully please check your email!!!");
        }
        else{
            return new ResponseEntity<>(
                    "No email Id Found",
                    HttpStatus.BAD_REQUEST);
        }
	}
	
	@PostMapping("/Password")
	public void changePassword(@RequestBody Doctor D) {
		doctorService.changePass(doctorService.findById(D.getDoctor_id()), D.getPassword());
	}
}
