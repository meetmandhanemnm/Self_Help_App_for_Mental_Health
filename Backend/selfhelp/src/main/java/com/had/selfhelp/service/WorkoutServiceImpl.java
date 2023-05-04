package com.had.selfhelp.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.selfhelp.dao.PatientRepository;
import com.had.selfhelp.dao.WorkoutRepository;
import com.had.selfhelp.dao.Workout_instance_repo;
import com.had.selfhelp.dao.Workout_question_response_repo;
import com.had.selfhelp.entity.Patient;
import com.had.selfhelp.entity.Workout;
import com.had.selfhelp.entity.Workout_instance;
import com.had.selfhelp.entity.Workout_question;
import com.had.selfhelp.entity.Workout_question_response;

@Service
public class WorkoutServiceImpl implements WorkoutService {

	private WorkoutRepository workoutRepository;
	private Workout_instance_repo workout_instance_repo;
	private PatientRepository patientRepository;
	private Workout_question_response_repo response_repo;
	
	@Autowired
	public WorkoutServiceImpl(WorkoutRepository workoutRepository, Workout_instance_repo workout_instance_repo,
			PatientRepository patientRepository, Workout_question_response_repo response_repo) {
		this.workoutRepository = workoutRepository;
		this.workout_instance_repo = workout_instance_repo;
		this.patientRepository = patientRepository;
		this.response_repo = response_repo;
	}

	@Override
	public void save(Workout theWorkout) {
		workoutRepository.save(theWorkout);
	}

	@Override
	public List<Workout_instance> assignWorkout(Patient thePatient) {
		
		Workout_instance w1 = new Workout_instance();
		Workout_instance w2 = new Workout_instance();
		Workout_instance w3 = new Workout_instance();
		
		w1.setPatient(thePatient);
		w1.setWorkout(workoutRepository.getReferenceById(1));
		w1.setCompleted(false);
		w1.setPre_id(0);
		
		w2.setPatient(thePatient);
		w2.setWorkout(workoutRepository.getReferenceById(2));
		w2.setCompleted(false);
		w2.setPre_id(0);
		
		w3.setPatient(thePatient);
		w3.setWorkout(workoutRepository.getReferenceById(3));
		w3.setCompleted(false);
		w3.setPre_id(0);
		
		List<Workout_instance> list = new ArrayList<Workout_instance>();
		list.add(w1);
		list.add(w2);
		list.add(w3);
		
		workout_instance_repo.saveAll(list);
		
		return list;
	}

	@Override
	public List<Workout_instance> findWorkoutInstances(int patientId) {
		Patient P = patientRepository.getReferenceById(patientId);
		P.setLast_login(new Date());
		patientRepository.save(P);
		return workout_instance_repo.findByPatient(patientRepository.getReferenceById(patientId));
	}

	@Override
	public void addWorkoutInstances(List<Workout> list, int patientId, int pre_id) {
		List<Workout_instance> temp = new ArrayList<Workout_instance>();
		Patient P = patientRepository.getReferenceById(patientId);
		for(Workout workout:list) {
			Workout_instance instance = new Workout_instance();
			instance.setCompleted(false);
			instance.setPatient(patientRepository.getReferenceById(patientId));
			instance.setWorkout(workoutRepository.getReferenceById(workout.getWorkout_id()));
			P.setNumActAssigned(P.getNumActAssigned()+1);
			System.out.println("Before setting prerequisite!!!!!!");
			if(pre_id==0)
				instance.setPrerequisite(null);
			else {
				instance.setPrerequisite(workout_instance_repo.getReferenceById(pre_id));
			}
			System.out.println("HERE!!!");
			instance.setPre_id(pre_id);
			workout_instance_repo.save(instance);
			temp.add(instance);
			System.out.println("after add!!!");
			patientRepository.save(P);
		}
	}

	@Override
	public List<Workout> findWorkoutNotAssigned(int patientId) {
		List<Workout_instance> list = findWorkoutInstances(patientId);
		List<Workout> assigned_workouts = new ArrayList<Workout>();
		for(Workout_instance instance:list) {
			assigned_workouts.add(instance.getWorkout());
		}
		List<Workout> workouts = workoutRepository.findAll();
		workouts.removeAll(assigned_workouts);
		return workouts;
	}

	@Override
	public List<Workout> findWorkout() {
		return workoutRepository.findAll();
	}

	@Override
	public List<Workout_question> findWorkoutQuestions(int workout_id) {
		return workoutRepository.getReferenceById(workout_id).getQuestions();
	}

	@Override
	public List<Workout_question_response> saveResponse(List<Workout_question_response> responseList) {
		Workout_instance instance = workout_instance_repo.getReferenceById(responseList.get(0).getInstance_id());
		instance.setCompleted(true);
		Patient P = patientRepository.getReferenceById(instance.getPatient().getPatient_id());
		P.setNumActCompleted(P.getNumActCompleted()+1);
		patientRepository.save(P);
		workout_instance_repo.save(instance);
		for(Workout_question_response res : responseList) {
			res.setWorkout_instance(instance);
		}
		return response_repo.saveAll(responseList);
	}

	@Override
	public List<Workout_question_response> findWorkoutResponse(int instance_id) {
		return response_repo.getResponse(workout_instance_repo.getReferenceById(instance_id));
	}

	@Override
	public void saveInstance(Workout_instance instance) {
		Workout_instance in = workout_instance_repo.getReferenceById(instance.getWorkout_instance_id());
		in.setPre_id(0);
		in.setPrerequisite(null);
		workout_instance_repo.save(in);
	}

	@Override
	public void updateInstance(Workout_instance instance) {
		Workout_instance in = workout_instance_repo.getReferenceById(instance.getWorkout_instance_id());
		in.setCompleted(false);
		Patient P = patientRepository.getReferenceById(in.getPatient().getPatient_id());
		P.setNumActCompleted(P.getNumActCompleted()-1);
		patientRepository.save(P);
		workout_instance_repo.save(in);
	}

	@Override
	public void markInstance(Workout_instance instance) {
		Workout_instance ins = workout_instance_repo.getReferenceById(instance.getWorkout_instance_id());
		ins.setCompleted(true);
		Patient P = patientRepository.getReferenceById(ins.getPatient().getPatient_id());
		P.setNumActCompleted(P.getNumActCompleted()+1);
		patientRepository.save(P);
		workout_instance_repo.save(ins);
	}
	@Override
	public void updatePrerequisite(Workout_instance instance) {
		Workout_instance ins = workout_instance_repo.getReferenceById(instance.getWorkout_instance_id());
		ins.setPre_id(0);
		ins.setPrerequisite(null);
		workout_instance_repo.save(ins);
	}

}
