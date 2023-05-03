package com.had.selfhelp.service;

import java.util.List;

import com.had.selfhelp.entity.Doctor;
import com.had.selfhelp.entity.Patient;
import com.had.selfhelp.entity.PatientDoctorChange;
import com.had.selfhelp.entity.Questionnaire;
import com.had.selfhelp.entity.Questionnaire_response;

public interface PatientService {

	public void save(Patient thePatient);
	
	public int saveResponses(List<Questionnaire_response> patientResponse, int patient_id);
	
	public List<Questionnaire> getQuestions();
	
	public List<Questionnaire_response> getResponses(int patientId);
	
	public Patient login(Patient P);

	public void updateDoctor(int patient_id, Doctor doctor);

	public void requestForDoctorChange(PatientDoctorChange pd);

	public List<PatientDoctorChange> getDoctorChangeRequests();

	public void assignDoctor(int patient_id);

	public Patient findByEmail(String email);

	public void changePass(Patient p, String pass);
}
