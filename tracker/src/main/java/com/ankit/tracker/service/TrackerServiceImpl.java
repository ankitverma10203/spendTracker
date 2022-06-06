package com.ankit.tracker.service;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ankit.commons.Utility.Constants;
import com.ankit.commons.Utility.UtilMethods;

@Service
public class TrackerServiceImpl implements TrackerService {

	@Value("${tracker.info.filepath}") 
	String filePath;
	
	private Path trackerInfoFilePath;
	
	@PostConstruct
	public void initValue() {
		trackerInfoFilePath = Paths.get(filePath);
	}

	@Override
	public boolean writeInfoToFile(HashMap<String, String> trackerInfo) {
		System.out.println("writing data to file");

		long linesInFile = 0L;

		linesInFile = UtilMethods.lineCount(trackerInfoFilePath);

		try (FileOutputStream fos = new FileOutputStream(trackerInfoFilePath.toFile(), true);
				FileChannel channel = fos.getChannel();) {

			if (linesInFile == 0) {
				String delimitedKeyString = trackerInfo.entrySet().stream().map(entry -> entry.getKey())
						.collect(Collectors.joining(Constants.JOINING_DELIMITER));
				String header = Constants.DATE_COLUMN + Constants.JOINING_DELIMITER + delimitedKeyString
						+ Constants.LINE_DELIMITER;
				byte[] headerInBytes = header.getBytes();
				UtilMethods.write(channel, headerInBytes);
			}

			String delimitedValueString = trackerInfo.entrySet().stream().map(entry -> entry.getValue().toString())
					.collect(Collectors.joining(Constants.JOINING_DELIMITER));
			
			String record = LocalDate.now() + Constants.JOINING_DELIMITER + delimitedValueString
					+ Constants.LINE_DELIMITER;
			byte[] recordInBytes = record.getBytes();
			UtilMethods.write(channel, recordInBytes);

		} catch (IOException e) {
			e.printStackTrace();
		}

		return false;
	}

	@Override
	public HashMap<String, List<HashMap<String, String>>> readFromFile() {
		
		String[] headers = UtilMethods.getHeaders(trackerInfoFilePath);
		
		HashMap<String, List<HashMap<String, String>> > trackerInfoRecordsByDateMap = new HashMap<>();

		try (BufferedReader reader = Files.newBufferedReader(trackerInfoFilePath)) {

			String line = reader.readLine();

			while ((line = reader.readLine()) != null) {
				System.out.println(line);
				HashMap<String, String> record = createObject(headers, line);
				System.out.println(record);
				String date = record.get("Date");
				
				List<HashMap<String, String>> trackerInfoRecordsByDate = trackerInfoRecordsByDateMap.computeIfAbsent(date, k -> new ArrayList<>());
				trackerInfoRecordsByDate.add(record);
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return trackerInfoRecordsByDateMap;
	}
	
	@Override
	public SortedSet<String> getAllDates() {
		try (BufferedReader reader = Files.newBufferedReader(trackerInfoFilePath)) {

			TreeSet<String> dates = new TreeSet<>();
			String line = reader.readLine();

			while ((line = reader.readLine()) != null) {
				System.out.println(line);
				String date = line.split(Constants.JOINING_DELIMITER)[0];
				dates.add(date);
			}
			
			return dates.descendingSet();

		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public HashMap<String, String> createObject(String[] headers, String line) {
		HashMap<String, String> trackerInfo = new HashMap<>();
		String[] trackerInfoValues = line.split(Constants.JOINING_DELIMITER);
		
		for (int i=0; i<headers.length; i++) {
			trackerInfo.put(headers[i], trackerInfoValues[i]);
		}
		
		return trackerInfo;
	}
	
	@Override
	public HashMap<String, Long> getDateVsTotalAmount() {
		try (BufferedReader reader = Files.newBufferedReader(trackerInfoFilePath)) {

			String line = reader.readLine();
			String[] headers = UtilMethods.getHeaders(trackerInfoFilePath);
			
			HashMap<String, Long> totalAmountByDateMap = new HashMap<>();
			
			while ((line = reader.readLine()) != null) {
				System.out.println(line);
				HashMap<String, String> record = createObject(headers, line);
				System.out.println(record);
				String date = record.get("Date");
				
				long totalAmount = totalAmountByDateMap.computeIfAbsent(date, k -> 0L);
				totalAmount += Long.parseLong(record.get("Amount"));
				totalAmountByDateMap.put(date, totalAmount);
			}
			
			return totalAmountByDateMap;

		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

}
