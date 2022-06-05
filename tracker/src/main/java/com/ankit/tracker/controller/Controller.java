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

	@PostMapping("/save")
	public ResponseEntity<?> saveData(@RequestBody HashMap<String, String> request) {
		System.out.println("test called");
		System.out.println(request);
		System.out.println(trackerService.writeInfoToFile(request));
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/read")
	public ResponseEntity<?> readData() {
		System.out.println("read called");
		return new ResponseEntity<>(trackerService.readFromFile(), HttpStatus.OK);
	}
	
	@GetMapping("/dates")
	public ResponseEntity<?> getAllDates() {
		System.out.println("dates called");
		return new ResponseEntity<>(trackerService.getAllDates(), HttpStatus.OK);
	}
	
	@GetMapping("/totalAmount")
	public ResponseEntity<?> getTotalAmounts() {
		System.out.println("dates called");
		return new ResponseEntity<>(trackerService.getDateVsTotalAmount(), HttpStatus.OK);
	}
}
