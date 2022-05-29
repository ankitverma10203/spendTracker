package com.ankit.commons.model;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class DailyTracker {

	private Date date;
	private List<SpentItem> spentItems;
}
