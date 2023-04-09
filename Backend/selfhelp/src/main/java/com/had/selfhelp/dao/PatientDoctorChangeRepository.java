package com.had.selfhelp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.had.selfhelp.entity.Patient;
import com.had.selfhelp.entity.PatientDoctorChange;

public interface PatientDoctorChangeRepository extends JpaRepository<PatientDoctorChange, Integer> {

	PatientDoctorChange findByPatient(Patient P);
	
}
