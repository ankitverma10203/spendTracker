package com.ankit.commons.Utility;

public class Constants {

	public static final String LINE_DELIMITER = "\n";
	public static final String JOINING_DELIMITER = ",";
	
	public enum FieldNames {
		Amount, Category, Date
	}
	
	public enum UserFieldName {
		email("Email Id"),
		password("Password"),
		salt("salt");
		
		public final String value;
		
		UserFieldName(String value) {
			this.value = value;
		}
				
	}
}
