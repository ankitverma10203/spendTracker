package com.ankit.commons.Utility;

public class Constants {

	public static final String LINE_DELIMITER = "\n";
	public static final String JOINING_DELIMITER = ",";
	
	public enum FieldNames {
		Amount, Category, Date
	}
	
	public enum UserFormFieldName {
		email("Email Id"),
		password("Password");
		
		public final String value;
		
		UserFormFieldName(String value) {
			this.value = value;
		}
				
	}
}
