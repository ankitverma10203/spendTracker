package com.ankit.commons.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SpentItem {
	
	private String name;
	private String category;
	private float amount;
}
