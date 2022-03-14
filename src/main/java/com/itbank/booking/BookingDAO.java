package com.itbank.booking;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface BookingDAO {

	int insertBookingHouse(BookingHouseDTO dto);

	int insertBookingActivity(BookingActivityDTO bookingDTO);

	List<BookingHouseDTO> selectBookingHouseList(HashMap<String, String> param);

	List<BookingActivityDTO> selectBookingActivityList(HashMap<String, String> param);

	BookingHouseDTO selectBookingHouse(String selector);
	BookingActivityDTO selectBookingActivity(String selector);

	int updateBookingHouseStatus(int idx);
	int updateBookingActivityStatus(int idx);

}
