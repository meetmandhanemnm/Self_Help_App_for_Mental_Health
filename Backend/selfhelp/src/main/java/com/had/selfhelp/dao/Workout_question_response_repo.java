package com.had.selfhelp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.had.selfhelp.entity.Workout_instance;
import com.had.selfhelp.entity.Workout_question_response;

public interface Workout_question_response_repo extends JpaRepository<Workout_question_response, Integer>{

	@Query("select res from Workout_question_response res where res.workout_instance=?1")
	public List<Workout_question_response> getResponse(Workout_instance instance);
	
}
