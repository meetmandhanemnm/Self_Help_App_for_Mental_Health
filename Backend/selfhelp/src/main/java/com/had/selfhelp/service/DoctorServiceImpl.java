package com.had.selfhelp.service;

import java.util.List;

import com.had.selfhelp.entity.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.selfhelp.dao.DoctorRepository;
import com.had.selfhelp.entity.Doctor;
import com.had.selfhelp.entity.Patient;


@Service
public class DoctorServiceImpl implements DoctorService {

	private DoctorRepository doctorRepository;
	
	@Autowired
	public DoctorServiceImpl(DoctorRepository theDoctorRepository) {
		doctorRepository = theDoctorRepository;
	}
	
	@Override
	public void save(Doctor theDoctor) {
		doctorRepository.save(theDoctor);
	}

	@Override
	public Doctor findById(int theId) {
		return doctorRepository.getReferenceById(theId);
	}

	@Override
	public Doctor findByEmail(String email) {
		return doctorRepository.findByEmail(email);
	}

	@Override
	public List<Patient> findPatients(int theId) {
		Doctor theDoctor = doctorRepository.getReferenceById(theId);
		return theDoctor.getPatients();
	}

	@Override
	public Doctor login(LoginRequest D) {
		Doctor theDoctor = doctorRepository.findByUsernameAndPassword(D.getUsername(),D.getPassword());
		if(theDoctor==null)
			throw new RuntimeException("Did not find doctor with these credentials");
		return theDoctor;
	}
	@Override
	public List<Doctor> findDoctors() {
		return doctorRepository.findAll();
	}

	@Override
	public void changePass(Doctor d, String pass) {
		Doctor temp = doctorRepository.getReferenceById(d.getDoctor_id());
		temp.setPassword(pass);
		doctorRepository.save(temp);
	}

	@Override
	public Doctor findByUsername(String username) {
		return doctorRepository.findByUsername(username);
	}

}
