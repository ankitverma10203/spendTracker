package com.ankit.user.service;

import java.util.HashMap;

import javax.annotation.PostConstruct;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Service
public class UserServiceImpl implements UserService {
	@Value("${mongodb.host}") 
	private String host;
	@Value("${mongodb.port}") 
	private int port;
	@Value("${mongodb.database}") 
	private String databaseName;
	@Value("${mongodb.collection}") 
	private String dailyTracker;
	
	private MongoClient mongoClient;
	
	@PostConstruct
	public void initValue() {
		this.mongoClient = new MongoClient(host, port);
	}
	
	private MongoCollection<Document> getCollection(String databaseName, String collectionName) {
		MongoDatabase database = mongoClient.getDatabase(databaseName);
		System.out.println("DatabaseName: " + database.getName());
		MongoCollection<Document> collection = database.getCollection(collectionName);
		System.out.println("collectionName: " + collection.count());
		return collection;
	}
	
	@Override
	public boolean isValidUser(HashMap<String, Object> userData) {
		MongoCollection<Document> collection = getCollection(databaseName, dailyTracker);
		Document userDataDoc = new Document(userData);
		FindIterable<Document> foundUser = collection.find(userDataDoc);
		int count = 0;
		for (Document document : foundUser) {
			System.out.println("foundUser " + count + 1 + ": " + document);
			count++;
		}
		if(count == 0) {
			System.out.println("No user found with given details for user: " + userData.get("Email Id"));
			return false;
		}
		return true;
	}

	@Override
	public boolean saveUser(HashMap<String, Object> userData) {
		MongoCollection<Document> collection = getCollection(databaseName, dailyTracker);
		Document userDataDoc = new Document(userData);
		collection.insertOne(userDataDoc);
		return true;
	}

}