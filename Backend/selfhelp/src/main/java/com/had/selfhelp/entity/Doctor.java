package com.had.selfhelp.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "doctor")
public class Doctor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int doctor_id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "qualification")
	private String qualification;
	
	@Column(name = "type")
	private char type;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "password")
	private String password;
	 
	@Column(name = "email")
	private String email;
	
//	@JsonIgnore
	@OneToMany(mappedBy = "doctor")
	private List<Patient> patients;
	
	public Doctor() {
		
	}

	public Doctor(int doctor_id, String firstName, String lastName, String qualification, char type, String username, String password, List<Patient> patients) {
		this.doctor_id = doctor_id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.qualification = qualification;
		this.type = type;
		this.username = username;
		this.password = password;
		this.patients = patients;
	}

	public int getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public char getType() {
		return type;
	}

	public void setType(char type) {
		this.type = type;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Patient> getPatients() {
		return patients;
	}

	public void setPatients(List<Patient> patients) {
		this.patients = patients;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Doctor [doctor_id=" + doctor_id + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", qualification=" + qualification + ", type=" + type + ", username=" + username + ", password=" + password + ", email=" + email + ", patients=" + patients
				+ "]";
	}

	
	
}
