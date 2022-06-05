package com.ankit.tracker.service;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

public interface TrackerService {

	boolean writeInfoToFile(HashMap<String, String> trackerInfo);

	HashMap<String, List<HashMap<String, String>>> readFromFile();

	Set<String> getAllDates();

	HashMap<String, Long> getDateVsTotalAmount();
	
}
