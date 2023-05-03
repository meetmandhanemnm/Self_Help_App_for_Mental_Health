package com.had.selfhelp.service;

import java.util.List;

import com.had.selfhelp.entity.Doctor;
import com.had.selfhelp.entity.Patient;

public interface DoctorService {

	public void save(Doctor theDoctor);
	
	public Doctor findById(int theId);
	
	public List<Patient> findPatients(int theId);
	
	public Doctor login(Doctor D);

	public List<Doctor> findDoctors();

	public Doctor findByEmail(String email);

	public void changePass(Doctor d, String pass);

}
