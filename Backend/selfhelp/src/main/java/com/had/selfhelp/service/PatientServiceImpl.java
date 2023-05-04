package com.had.selfhelp.service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;

import com.had.selfhelp.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.selfhelp.dao.DoctorRepository;
import com.had.selfhelp.dao.PatientDoctorChangeRepository;
import com.had.selfhelp.dao.PatientRepository;
import com.had.selfhelp.dao.QuestionnaireRepo;
import com.had.selfhelp.dao.Questionnaire_Response_Repo;


class sortByPatient implements Comparator<Doctor>{

	@Override
	public int compare(Doctor d1, Doctor d2) {
		return d1.getPatients().size()-d2.getPatients().size();
	}	
};

@Service
public class PatientServiceImpl implements PatientService {

	private PatientRepository patientRepository;
	private Questionnaire_Response_Repo responseRepository;
	private QuestionnaireRepo questionRepository;
	private DoctorRepository doctorRepository;
	private PatientDoctorChangeRepository patientDoctorChangeRepository;
	
	@Autowired
	public PatientServiceImpl(PatientRepository patientRepository, Questionnaire_Response_Repo responseRepository,
			QuestionnaireRepo questionRepository, DoctorRepository doctorRepository,
			PatientDoctorChangeRepository patientDoctorChangeRepository) {
		this.patientRepository = patientRepository;
		this.responseRepository = responseRepository;
		this.questionRepository = questionRepository;
		this.doctorRepository = doctorRepository;
		this.patientDoctorChangeRepository = patientDoctorChangeRepository;
	}

	@Override
	public void save(Patient thePatient) {
		patientRepository.save(thePatient);
	}

	@Override
	public int saveResponses(List<Questionnaire_response> patientResponse, int patient_id) {
		Patient thePatient = patientRepository.getReferenceById(patient_id);
		int severity = 0;
		for(Questionnaire_response res : patientResponse) {
			res.setPatient(thePatient);
			responseRepository.save(res);
			severity += (res.getAnswer()*questionRepository.getReferenceById(res.getQuestion().getQid()).getWeightage());
		}
		System.out.println("Severity: "+severity);
		thePatient.setSeverity(severity);
		patientRepository.save(thePatient);
		return severity;
	}

	@Override
	public List<Questionnaire> getQuestions() {
		return questionRepository.findAll();
	}

	@Override
	public List<Questionnaire_response> getResponses(int patientId) {
		return responseRepository.findByPatient(patientRepository.getReferenceById(patientId));
	}

	@Override
	public Patient login(LoginRequest P) {
		Patient thePatient = patientRepository.findByUsernameAndPassword(P.getUsername(),P.getPassword());
		if(thePatient==null)
			throw new RuntimeException("Did not find patient with these credentials");
		thePatient.setLast_login(new Date());
		patientRepository.save(thePatient);
		return thePatient;
	}

	@Override
	public void updateDoctor(int patient_id, Doctor doctor) {
		Doctor d = doctorRepository.getReferenceById(doctor.getDoctor_id());
		Patient P = patientRepository.getReferenceById(patient_id);
		P.setDoctor(d);
		P.setD_id(d.getDoctor_id());
		P.setDoctor_change(new Date());
		patientRepository.save(P);
		List<PatientDoctorChange> pd = patientDoctorChangeRepository.findByPatient(P);
		patientDoctorChangeRepository.deleteAll(pd);
	}

	@Override
	public void requestForDoctorChange(PatientDoctorChange pd) {
		PatientDoctorChange pd1 = new PatientDoctorChange();
		pd1.setPatient(patientRepository.getReferenceById(pd.getPatient().getPatient_id()));
		pd1.setRemark(pd.getRemark());
		patientDoctorChangeRepository.save(pd);
	}

	@Override
	public List<PatientDoctorChange> getDoctorChangeRequests() {
		return patientDoctorChangeRepository.findAll();
	}
	
	@Override
	public void assignDoctor(int patient_id) {
//		List<Doctor> doctorList = doctorRepository.findAll();
//		doctorList.remove(doctorRepository.findByType('C'));
//		doctorList.remove(doctorRepository.findByType('A'));
//		doctorList.sort(new sortByPatient());
//		Patient thePatient = patientRepository.getReferenceById(patient_id);
//		thePatient.setDoctor(doctorList.get(0));
//		thePatient.setD_id(doctorList.get(0).getDoctor_id());
//		patientRepository.save(thePatient);



		Patient thePatient = patientRepository.getReferenceById(patient_id);
		thePatient.setDoctor(doctorRepository.getReferenceById(11));
		thePatient.setD_id(11);
		thePatient.setDoctor_change(new Date());

		patientRepository.save(thePatient);
	}

	@Override
	public Patient findByEmail(String Email) {
		return patientRepository.findByEmail(Email);
	}

	@Override
	public void changePass(Patient p, String pass) {
		Patient temp = patientRepository.getReferenceById(p.getPatient_id());
		temp.setPassword(pass);
		patientRepository.save(temp);
	}

}
