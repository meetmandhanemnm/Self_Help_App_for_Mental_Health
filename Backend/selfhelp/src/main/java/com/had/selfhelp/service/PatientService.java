package com.had.selfhelp.service;

import java.util.List;

import com.had.selfhelp.entity.*;

public interface PatientService {

	public void save(Patient thePatient);
	
	public int saveResponses(List<Questionnaire_response> patientResponse, int patient_id);
	
	public List<Questionnaire> getQuestions();
	
	public List<Questionnaire_response> getResponses(int patientId);
	
	public Patient login(LoginRequest P);

	public void updateDoctor(int patient_id, Doctor doctor);

	public void requestForDoctorChange(PatientDoctorChange pd);

	public List<PatientDoctorChange> getDoctorChangeRequests();

	public void assignDoctor(int patient_id);
	public Patient findByEmail(String Email);
	public Patient findById(int id);

    void changePass(Patient p, String pass);
}
