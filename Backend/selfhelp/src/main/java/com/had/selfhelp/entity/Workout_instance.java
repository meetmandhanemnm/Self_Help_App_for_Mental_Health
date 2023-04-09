package com.had.selfhelp.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "workout_instance")
public class Workout_instance {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int workout_instance_id;
	
	@ManyToOne
	@JoinColumn(name = "workout_id")
	private Workout workout;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "patient_id")
	private Patient patient;
	
	@Column(name = "completed")
	private boolean completed;
	
	@OneToOne
	@JsonIgnore
	@JoinColumn(name = "prereq_id", referencedColumnName = "id")
	private Workout_instance prerequisite;
	
	private int pre_id;
//	
//	Removing Bidirectional mapping for response and workout_instance
//	@JsonIgnore
//	@OneToMany(mappedBy = "workout_instance")
//	private List<Workout_question_response> responses;
	
	public Workout_instance() {
		
	}
	
	public Workout_instance(int workout_instance_id, Workout workout, Patient patient, boolean completed,
			Workout_instance prerequisite, int pre_id, List<Workout_question_response> responses) {
		this.workout_instance_id = workout_instance_id;
		this.workout = workout;
		this.patient = patient;
		this.completed = completed;
		this.prerequisite = prerequisite;
		this.pre_id = pre_id;
//		this.responses = responses;
	}

	public int getWorkout_instance_id() {
		return workout_instance_id;
	}

	public void setWorkout_instance_id(int workout_instance_id) {
		this.workout_instance_id = workout_instance_id;
	}

	public Workout getWorkout() {
		return workout;
	}

	public void setWorkout(Workout workout) {
		this.workout = workout;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public Workout_instance getPrerequisite() {
		return prerequisite;
	}

	public void setPrerequisite(Workout_instance prerequisite) {
		this.prerequisite = prerequisite;
	}
	
	public int getPre_id() {
		return pre_id;
	}

	public void setPre_id(int pre_id) {
		this.pre_id = pre_id;
	}

//	public List<Workout_question_response> getResponses() {
//		return responses;
//	}
//
//	public void setResponses(List<Workout_question_response> responses) {
//		this.responses = responses;
//	}

	@Override
	public String toString() {
		return "Workout_instance [workout_instance_id=" + workout_instance_id + ", workout=" + workout + ", patient="
				+ patient + ", completed=" + completed + ", prerequisite=" + prerequisite + ", pre_id=" + pre_id
				+ "]";
	}
	
}
