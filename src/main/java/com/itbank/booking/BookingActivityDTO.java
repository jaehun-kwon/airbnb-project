package com.itbank.booking;

import java.sql.Date;

public class BookingActivityDTO {
	private int idx, count_person;
	private String selector, name, status;
	private Date selected_date;
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public int getCount_person() {
		return count_person;
	}
	public void setCount_person(int count_person) {
		this.count_person = count_person;
	}
	public String getSelector() {
		return selector;
	}
	public void setSelector(String selector) {
		this.selector = selector;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getSelected_date() {
		return selected_date;
	}
	public void setSelected_date(Date selected_date) {
		this.selected_date = selected_date;
	}
	
}
