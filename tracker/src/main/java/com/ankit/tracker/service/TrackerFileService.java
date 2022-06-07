package com.ankit.tracker.service;

import java.util.HashMap;
import java.util.List;
import java.util.SortedSet;

public interface TrackerFileService {

	boolean writeInfoToFile(HashMap<String, Object> trackerInfo);

	HashMap<String, List<HashMap<String, Object>>> readFromFile();

	SortedSet<String> getAllDatesFromFile();

	HashMap<String, Long> getDateVsTotalAmountFromFile();

}