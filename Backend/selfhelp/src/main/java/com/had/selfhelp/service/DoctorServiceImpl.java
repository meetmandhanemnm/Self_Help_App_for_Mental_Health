package com.had.selfhelp.service;

import java.util.List;

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
	public String findById(int theId) {
		Doctor d = doctorRepository.getReferenceById(theId);
		return d.getFirstName()+" "+d.getLastName();
	}

	@Override
	public List<Patient> findPatients(int theId) {
		Doctor theDoctor = doctorRepository.getReferenceById(theId);
		return theDoctor.getPatients();
	}

	@Override
	public Doctor login(Doctor D) {
		Doctor theDoctor = doctorRepository.findByUsernameAndPassword(D.getUsername(),D.getPassword());
		if(theDoctor==null)
			throw new RuntimeException("Did not find doctor with these credentials");
		return theDoctor;
	}

	@Override
	public List<Doctor> findDoctors() {
		return doctorRepository.findAll();
	}

}
