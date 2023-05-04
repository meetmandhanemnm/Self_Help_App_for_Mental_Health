package com.had.selfhelp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "patient_doctor_change")
public class PatientDoctorChange {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int patient_doctor_change_id;

	@OneToOne
	@JoinColumn(name = "patient_id", referencedColumnName = "id")
	private Patient patient;

	private String remark;

	public PatientDoctorChange(int patient_doctor_change_id, Patient patient, String remark) {
		this.patient_doctor_change_id = patient_doctor_change_id;
		this.patient = patient;
		this.remark = remark;
	}

	public PatientDoctorChange() {

	}

	public int getPatient_doctor_change_id() {
		return patient_doctor_change_id;
	}

	public void setPatient_doctor_change_id(int patient_doctor_change_id) {
		this.patient_doctor_change_id = patient_doctor_change_id;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	public String toString() {
		return "PatientDoctorChange [patient_doctor_change_id=" + patient_doctor_change_id + ", patient=" + patient
				+ ", remark=" + remark + "]";
	}


}