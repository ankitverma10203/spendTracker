package com.ankit.user.service;

import java.util.HashMap;

import javax.annotation.PostConstruct;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ankit.commons.Utility.Constants.UserFieldName;
import com.ankit.commons.Utility.UtilMethods;
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
		
		Document filter = new Document().append(UserFieldName.email.value, userData.get(UserFieldName.email.value));
		FindIterable<Document> foundUser = collection.find(filter);
		if(isResultEmpty(foundUser)) {
			System.out.println("No user found with given details for user: " + userData.get(UserFieldName.email.value));
			return false;
		}
		
		for (Document document : foundUser) {
			String passwordFromDB = (String) document.get(UserFieldName.password.value);
			String passwordFromUser = (String) userData.get(UserFieldName.password.value);
			String salt = document.getString(UserFieldName.salt.value);
			String securePassword = UtilMethods.generateSecurePassword(passwordFromUser, salt);
			if(passwordFromDB.equalsIgnoreCase(securePassword)) {
				return true;
			}
		}
		return false;
	}

	private boolean isResultEmpty(FindIterable<Document> foundUser) {
		int count = 0;
		for (Document document : foundUser) {
			System.out.println("foundUser " + (count + 1) + ": " + document);
			count++;
		}
		return count == 0;
	}

	@Override
	public boolean saveUser(HashMap<String, Object> userData) {
		MongoCollection<Document> collection = getCollection(databaseName, dailyTracker);
		
		Document filter = new Document().append(UserFieldName.email.value, userData.get(UserFieldName.email.value));
		FindIterable<Document> foundUser = collection.find(filter);
		if(!isResultEmpty(foundUser)) {
			System.out.println("User already exists with given details for user: " + userData.get(UserFieldName.email.value));
			return false;
		}
		
		Document userDataDoc = new Document(userData);
		String password = (String) userDataDoc.get(UserFieldName.password.value);
		String salt = UtilMethods.getSalt(30);
		String securePassword = UtilMethods.generateSecurePassword(password, salt);
		userDataDoc.append(UserFieldName.password.value, securePassword);
		userDataDoc.append(UserFieldName.salt.value, salt);
		collection.insertOne(userDataDoc);
		return true;
	}

}
