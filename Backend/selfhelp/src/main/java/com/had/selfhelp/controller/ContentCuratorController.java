package com.had.selfhelp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.had.selfhelp.entity.Workout;
import com.had.selfhelp.service.WorkoutService;

@RestController
@RequestMapping("/contentcurator")
public class ContentCuratorController {

	private WorkoutService workoutService;

	@Autowired
	public ContentCuratorController(WorkoutService workoutService) {
		this.workoutService = workoutService;
	}
	
	@PostMapping("/workout")
	@PreAuthorize("hasAuthority('ContentCurator')")
	public Workout addWorkout(@RequestBody Workout theWorkout) {
		theWorkout.setWorkout_id(0);
		workoutService.save(theWorkout);
		return theWorkout;
	}
	
	@GetMapping("/workout")
	@PreAuthorize("hasAnyAuthority('ContentCurator','Admin')")
	public List<Workout> getWorkout() {
		return workoutService.findWorkout();
	}
	
}
