package com.itbank.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itbank.booking.BookingActivityDTO;
import com.itbank.booking.BookingDAO;
import com.itbank.booking.BookingHouseDTO;

@Service
public class BookingService {

	@Autowired private BookingDAO bookingDAO;
	
	public int addBookingHouse(BookingHouseDTO dto) {
		return bookingDAO.insertBookingHouse(dto); 
	}

	public int addBookingActivity(BookingActivityDTO bookingDTO) {
		return bookingDAO.insertBookingActivity(bookingDTO);
	}

	public List<BookingHouseDTO> getBookingHouseList(String houseName, String userName) {
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("houseName", houseName);
		param.put("userName", userName);
		return bookingDAO.selectBookingHouseList(param); 
	}

	public List<BookingActivityDTO> getBookingActivityList(String activityName, String userName) {
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("activityName", activityName);
		param.put("userName", userName);
		return bookingDAO.selectBookingActivityList(param); 
	}

	public BookingHouseDTO getBookingHouse(String selector) {
		return bookingDAO.selectBookingHouse(selector);
	}
	public BookingActivityDTO getBookingActivity(String selector) {
		return bookingDAO.selectBookingActivity(selector);
	}

	public int changeHouseStatus(int idx) {
		return bookingDAO.updateBookingHouseStatus(idx);
	}
	public int changeActivityStatus(int idx) {
		return bookingDAO.updateBookingActivityStatus(idx);
	}

}
