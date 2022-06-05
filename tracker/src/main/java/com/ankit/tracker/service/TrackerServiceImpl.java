package com.ankit.tracker.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ankit.commons.Utility.Constants;
import com.ankit.commons.Utility.UtilMethods;

@Service
public class TrackerServiceImpl implements TrackerService {

	private Path trackerInfoFilePath = Paths.get(Constants.TRACKER_INFO_FILEPATH);

	@Override
	public boolean writeInfoToFile(HashMap<String, ?> trackerInfo) {
		System.out.println("writing data to file");
		this.trackerInfoFilePath = Paths.get(Constants.TRACKER_INFO_FILEPATH);

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
			String record = Date.from(Instant.now()) + Constants.JOINING_DELIMITER + delimitedValueString
					+ Constants.LINE_DELIMITER;
			byte[] recordInBytes = record.getBytes();
			UtilMethods.write(channel, recordInBytes);

		} catch (IOException e) {
			e.printStackTrace();
		}

		return false;
	}


	@Override
	public boolean readFromFile() {
		this.trackerInfoFilePath = Paths.get(Constants.TRACKER_INFO_FILEPATH);

		try (BufferedReader reader = Files.newBufferedReader(trackerInfoFilePath)) {

			String line = null;

			while ((line = reader.readLine()) != null) {
				System.out.println(line);
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return false;
	}

}
