package com.had.selfhelp.service;

import java.util.List;

import com.had.selfhelp.entity.Doctor;
import com.had.selfhelp.entity.LoginRequest;
import com.had.selfhelp.entity.Patient;

public interface DoctorService {

	public void save(Doctor theDoctor);

	public Doctor findById(int theId);
	public Doctor findByEmail(String email);

	public List<Patient> findPatients(int theId);

	public Doctor login(LoginRequest D);

	public List<Doctor> findDoctors();

	void changePass(Doctor d, String pass);

    Doctor findByUsername(String userNameFromJwtToken);
}
