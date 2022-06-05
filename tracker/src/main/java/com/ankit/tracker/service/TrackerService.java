package com.ankit.tracker.service;

import java.util.HashMap;

public interface TrackerService {

	boolean writeInfoToFile(HashMap<String, ?> trackerInfo);

	boolean readFromFile();
	
}
