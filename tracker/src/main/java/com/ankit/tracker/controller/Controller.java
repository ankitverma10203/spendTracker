package com.ankit.tracker.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ankit.tracker.service.TrackerService;

@CrossOrigin("http://localhost:4200/")
@RestController
@RequestMapping("/tracker")
public class Controller {
	
	@Autowired
	TrackerService trackerService;

	@PostMapping("/test")
	public ResponseEntity<?> test(@RequestBody HashMap<String, ?> request) {
		System.out.println("test called");
		System.out.println(request);
		System.out.println(trackerService.writeInfoToFile(request));
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/read")
	public ResponseEntity<?> read() {
		System.out.println("read called");
		trackerService.readFromFile();
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
