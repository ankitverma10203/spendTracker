package com.ankit.tracker.service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

import javax.annotation.PostConstruct;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ankit.commons.Utility.Constants.FieldNames;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;

@Service
public class TrackerDBServiceImpl implements TrackerDBService {
	
	@Value("${mongodb.host}") 
	private String host;
	@Value("${mongodb.port}") 
	private int port;
	@Value("${mongodb.database}") 
	private String databaseName;
	@Value("${mongodb.collection}") 
	private String dailyTracker;
	
	private MongoClient mongoClient;
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@PostConstruct
	public void initValue() {
		this.mongoClient = new MongoClient(host, port);
	}

	@Override
	public Document writeInfoToDB(HashMap<String, Object> trackerInfo, String date) {
		System.out.println("writing data to DB");
		MongoCollection<Document> collection = getCollection(databaseName, dailyTracker);
		Document trackerInfoDoc = new Document(trackerInfo);
		trackerInfoDoc.put("id", Instant.now().toString());
		if(date.equals("0")) {
			date = LocalDate.now().toString();
		}
		trackerInfoDoc.put(FieldNames.Date.toString(), date);
		collection.insertOne(trackerInfoDoc);
		return trackerInfoDoc;
	}

	private MongoCollection<Document> getCollection(String databaseName, String collectionName) {
		MongoDatabase database = mongoClient.getDatabase(databaseName);
		MongoCollection<Document> collection = database.getCollection(collectionName);
		return collection;
	}
	
	private FindIterable<Document> getFromDB() {
		MongoCollection<Document> collection = getCollection(databaseName, dailyTracker);
		return collection.find();
	}
	
	@Override
	public HashMap<String, List<Document>> getFromDBByDates() {
		FindIterable<Document> fromDB = this.getFromDB();
		HashMap<String, List<Document>> trackerInfosByDateMap = new HashMap<>();
		
		for (Document document : fromDB) {
			String date = document.getString(FieldNames.Date.toString());
			List<Document> trackerInfoList = trackerInfosByDateMap.computeIfAbsent(date, k -> new ArrayList<>());
			trackerInfoList.add(document);
			trackerInfosByDateMap.put(date, trackerInfoList);
		}
		return trackerInfosByDateMap;
	}

	@Override
	public SortedSet<String>  getAllDates() {
		FindIterable<Document> fromDB = this.getFromDB();
		
		TreeSet<String> dates = new TreeSet<>();
		
		for (Document document : fromDB) {
			dates.add(document.get(FieldNames.Date.toString()).toString());
		}
		
		return dates.descendingSet();
	}
	
	@Override
	public HashMap<String, Long> getDateVsTotalAmountFromDB() {
		
		FindIterable<Document> fromDB = this.getFromDB();
		HashMap<String, Long> totalAmountByDateMap = new HashMap<>();
		
		for (Document document : fromDB) {
			String date = document.getString(FieldNames.Date.toString());
			long totalAmount = totalAmountByDateMap.computeIfAbsent(date, k -> 0L);
			try {
			totalAmount += Long.parseLong(document.getString(FieldNames.Amount.toString()));
			} catch (NumberFormatException e) {
				logger.error("Amount not a number");
			}
			totalAmountByDateMap.put(date, totalAmount);
		}
		return totalAmountByDateMap;
	}
	
	@Override
	public Document deleteInfoToDB(String id) {
		System.out.println("deleting data from DB");
		MongoCollection<Document> collection = getCollection(databaseName, dailyTracker);
		logger.info("id of object to be deleted: " + id.toString());
		FindIterable<Document> find = collection.find(new Document("id", id));
		for (Document document : find) {
			System.out.println("find: " + document);
		}
		DeleteResult deleteOne = collection.deleteOne(new Document("id", id));
		logger.info("Delete Result: " + deleteOne);
		return null;
	}
	
}
