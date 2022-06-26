package com.ankit.user;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ankit.user.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;

	@GetMapping("/get")
	public String get() {
		return "Welcome to user module";
	}
	
	@PostMapping("/validateUser")
	public boolean validateUser(@RequestBody HashMap<String, Object> userData) {
		return userService.isValidUser(userData);
	}
	
	@PostMapping("/saveUser")
	public boolean saveUser(@RequestBody HashMap<String, Object> userData) {
		return userService.saveUser(userData);
	}
	
}
