package com.had.selfhelp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.had.selfhelp.entity.Patient;
import com.had.selfhelp.entity.PatientDoctorChange;

import java.util.List;

public interface PatientDoctorChangeRepository extends JpaRepository<PatientDoctorChange, Integer> {

	List<PatientDoctorChange> findByPatient(Patient P);
	
}
