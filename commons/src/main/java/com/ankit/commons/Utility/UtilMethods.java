package com.ankit.commons.Utility;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

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

}
