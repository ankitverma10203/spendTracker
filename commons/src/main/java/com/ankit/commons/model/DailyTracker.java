package com.ankit.commons.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity
public class DailyTracker {

	@Id
	private String id;

	private LocalDate date;
	private String category;
	private String message;
	private long amount;
}
