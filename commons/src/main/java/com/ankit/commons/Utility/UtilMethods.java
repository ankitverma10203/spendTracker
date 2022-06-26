package com.ankit.commons.Utility;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;
import java.util.Base64;
import java.util.stream.Stream;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public interface UtilMethods {

	/**
	 * 
	 * @param trackerInfoFilePath
	 * @return
	 */
	public static long lineCount(Path trackerInfoFilePath) {
		long linesInFile = 0L;
		try (Stream<String> lines = Files.lines(trackerInfoFilePath);) {
			linesInFile = lines.count();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return linesInFile;
	}

	public static void write(FileChannel channel, byte[] headerInBytes) throws IOException {
		ByteBuffer buffer;
		buffer = ByteBuffer.allocate(headerInBytes.length);
		buffer.put(headerInBytes);
		buffer.flip();
		channel.write(buffer);
	}

	public static String[] getHeaders(Path trackerInfoFilePath) {
		try (BufferedReader reader = Files.newBufferedReader(trackerInfoFilePath)) {

			String line = reader.readLine();
			if (line != null) {
				String[] headers = line.split(Constants.JOINING_DELIMITER);
				System.out.println("Headers: " + Arrays.toString(headers));
				return headers;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}

	public static String getSalt(int length) {
		SecureRandom secureRandom = new SecureRandom();
		final String characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		StringBuilder salt = new StringBuilder(length);
		for (int i = 0; i < length; i++) {
			int randomIndex = secureRandom.nextInt(characters.length());
			salt.append(characters.charAt(randomIndex));
		}
		return salt.toString();
	}

	public static byte[] hash(String password, String salt) {
		char[] passwordCharArr = password.toCharArray();
		PBEKeySpec spec = new PBEKeySpec(passwordCharArr, salt.getBytes(), 500, 512);
		Arrays.fill(passwordCharArr, Character.MIN_VALUE);
		try {
			SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
			return skf.generateSecret(spec).getEncoded();
		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
			e.printStackTrace();
		} finally {
			spec.clearPassword();
		}
		return null;
	}
	
	public static String generateSecurePassword(String password, String salt) {
		byte[] hash = hash(password, salt);
		return Base64.getEncoder().encodeToString(hash);
	}
	
}
