package com.ankit.tracker.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ankit.tracker.service.TrackerDBService;
import com.ankit.tracker.service.TrackerFileService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/tracker")
public class Controller {
	
	@Autowired
	private TrackerDBService trackerDBService;
	
	@Autowired
	private TrackerFileService trackerFileService;
	
	

	@PostMapping("/db/save/{date}")
	public ResponseEntity<?> saveDataToDB(@RequestBody HashMap<String, Object> request, @PathVariable String date) {
		System.out.println("saveDataToDB called");
		System.out.println(request);
		System.out.println("saving: " + trackerDBService.writeInfoToDB(request, date));
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
//	@PostMapping("/db/saveToGivenDate/{date}")
//	public ResponseEntity<?> saveDataToDBForGivenDate(@RequestBody HashMap<String, Object> request, @PathVariable String date) {
//		System.out.println("test called");
//		System.out.println(request);
//		System.out.println("saving: " + trackerDBService.writeInfoToDBForGivenDate(request, LocalDate.parse(date)));
//		return new ResponseEntity<>(HttpStatus.OK);
//	}
	
	@GetMapping("/db/read")
	public ResponseEntity<?> readDataFromDB() {
		System.out.println("readDataFromDB called");
		return new ResponseEntity<>(trackerDBService.getFromDBByDates(), HttpStatus.OK);
	}
	
	@DeleteMapping("/db/deleteRecord/{id}")
	public ResponseEntity<?> deleteDataFromDB(@PathVariable String id) {
		System.out.println("deleteDataFromDB called");
		System.out.println(id);
		System.out.println("deleting: " + trackerDBService.deleteInfoToDB(id));
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/db/dates")
	public ResponseEntity<?> getAllDatesFromDB() {
		System.out.println("getAllDatesFromDB called");
		return new ResponseEntity<>(trackerDBService.getAllDates(), HttpStatus.OK);
	}
	
	@GetMapping("/db/totalAmount")
	public ResponseEntity<?> getTotalAmountsFromDB() {
		System.out.println("getTotalAmountsFromDB called");
		return new ResponseEntity<>(trackerDBService.getDateVsTotalAmountFromDB(), HttpStatus.OK);
	}
	
	@PostMapping("/file/save")
	public ResponseEntity<?> saveDataToFile(@RequestBody HashMap<String, Object> request) {
		System.out.println("saveDataToFile called");
		System.out.println(request);
		System.out.println(trackerFileService.writeInfoToFile(request));
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/file/read")
	public ResponseEntity<?> readDataFromFile() {
		System.out.println("readDataFromFile called");
		return new ResponseEntity<>(trackerFileService.readFromFile(), HttpStatus.OK);
	}
	
	@GetMapping("/file/dates")
	public ResponseEntity<?> getAllDatesFromFile() {
		System.out.println("getAllDatesFromFile called");
		return new ResponseEntity<>(trackerFileService.getAllDatesFromFile(), HttpStatus.OK);
	}
	
	@GetMapping("/file/totalAmount")
	public ResponseEntity<?> getTotalAmountsFromFile() {
		System.out.println("getTotalAmountsFromFile called");
		return new ResponseEntity<>(trackerFileService.getDateVsTotalAmountFromFile(), HttpStatus.OK);
	}
}
