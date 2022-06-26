package com.ankit.tracker.service;

import java.util.HashMap;
import java.util.List;
import java.util.SortedSet;

import org.bson.Document;

public interface TrackerDBService {

	Document writeInfoToDB(HashMap<String, Object> trackerInfo);

	SortedSet<String> getAllDates(HashMap<String, Object> params);

	HashMap<String, Long> getDateVsTotalAmountFromDB(HashMap<String, Object> params);

	HashMap<String, List<Document>> getFromDBByDates(HashMap<String, Object> params);
	
}
