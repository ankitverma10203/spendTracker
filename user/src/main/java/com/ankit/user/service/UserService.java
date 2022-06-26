package com.ankit.user.service;

import java.util.HashMap;

public interface UserService {
	boolean isValidUser(HashMap<String, Object> userData);

	boolean saveUser(HashMap<String, Object> userData);
}
