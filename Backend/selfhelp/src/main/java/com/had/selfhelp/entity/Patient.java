package com.had.selfhelp.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "patient")
public class Patient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int patient_id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "gender")
	private char gender;
	
	@Column(name = "contact")
	private long contact_number;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "remark")
	private String remarks;
	
	@Column(name = "severity")
	private int severity;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "last_login")
	private Date last_login;
	
	@Column(name = "email")
	private String email;

	@ManyToOne
	@JoinColumn(name = "doctor_id")
	@JsonIgnore
	private Doctor doctor;
	
	private int d_id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "doctor_change")
	private Date doctor_change;
	
	private int numActAssigned;
	
	private int numActCompleted;
	
	public Patient() {
		
	}

	public Patient(int patient_id, String firstName, String lastName, char gender, long contact_number, String username,
			String password, String remarks, int severity, Date last_login, String email, Doctor doctor, int d_id,
			Date doctor_change, int numActAssigned, int numActCompleted) {
		this.patient_id = patient_id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.contact_number = contact_number;
		this.username = username;
		this.password = password;
		this.remarks = remarks;
		this.severity = severity;
		this.last_login = last_login;
		this.email = email;
		this.doctor = doctor;
		this.d_id = d_id;
		this.doctor_change = doctor_change;
		this.numActAssigned = numActAssigned;
		this.numActCompleted = numActCompleted;
	}

	public int getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
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

	public char getGender() {
		return gender;
	}

	public void setGender(char gender) {
		this.gender = gender;
	}

	public long getContact_number() {
		return contact_number;
	}

	public void setContact_number(long contact_number) {
		this.contact_number = contact_number;
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

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
	
	public int getD_id() {
		return d_id;
	}

	public void setD_id(int d_id) {
		this.d_id = d_id;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public int getSeverity() {
		return severity;
	}

	public void setSeverity(int severity) {
		this.severity = severity;
	}

	public Date getLast_login() {
		return last_login;
	}

	public void setLast_login(Date last_login) {
		this.last_login = last_login;
	}
	
	public Date getDoctor_change() {
		return doctor_change;
	}

	public void setDoctor_change(Date doctor_change) {
		this.doctor_change = doctor_change;
	}

	public int getNumActAssigned() {
		return numActAssigned;
	}

	public void setNumActAssigned(int numActAssigned) {
		this.numActAssigned = numActAssigned;
	}

	public int getNumActCompleted() {
		return numActCompleted;
	}

	public void setNumActCompleted(int numActCompleted) {
		this.numActCompleted = numActCompleted;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Patient [patient_id=" + patient_id + ", firstName=" + firstName + ", lastName=" + lastName + ", gender="
				+ gender + ", contact_number=" + contact_number + ", username=" + username + ", password=" + password
				+ ", remarks=" + remarks + ", severity=" + severity + ", last_login=" + last_login + ", email=" + email
				+ ", doctor=" + doctor + ", d_id=" + d_id + ", doctor_change=" + doctor_change + ", numActAssigned="
				+ numActAssigned + ", numActCompleted=" + numActCompleted + "]";
	}
	
}
