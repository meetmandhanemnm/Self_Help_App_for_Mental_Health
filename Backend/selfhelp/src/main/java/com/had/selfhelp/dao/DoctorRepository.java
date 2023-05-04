package com.had.selfhelp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.had.selfhelp.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

	Doctor findByUsernameAndPassword(String username, String password);

	Doctor findByEmail(String Email);
	Doctor findByType(char c);
}
