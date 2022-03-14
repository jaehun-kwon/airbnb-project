package com.itbank.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itbank.calendar.DateData;

@RestController
public class CalendarController {
	
	HashMap<String, Integer> today_info;
	DateData dateData;
	
	@GetMapping("/today_info")
	public HashMap<String, Integer> today_info(DateData dateData){
		Calendar cal = Calendar.getInstance();
		
		if(dateData.getDate().equals("")&&dateData.getMonth().equals("")){
			dateData = new DateData(String.valueOf(cal.get(Calendar.YEAR)),String.valueOf(cal.get(Calendar.MONTH)),String.valueOf(cal.get(Calendar.DATE)),null);
		}
		this.dateData = dateData;
		
		HashMap<String, Integer> today_info =  dateData.today_info(dateData);
		this.today_info = today_info;
		
		return today_info;
	}
	
	@GetMapping("/dateList")
	public ArrayList<DateData> dateList(){
		ArrayList<DateData> dateList = new ArrayList<DateData>();
		
		DateData calendarData;
		
		if(today_info.get("start") != null) {
			for(int i=1; i<today_info.get("start"); i++){
				calendarData = new DateData(null, null, null, null);
				dateList.add(calendarData);
			}
		}
		
		for (int i = today_info.get("startDay"); i <= today_info.get("endDay"); i++) {
			if(i < today_info.get("today") || today_info.get("today") == -1){
				calendarData= new DateData(String.valueOf(dateData.getYear()), String.valueOf(dateData.getMonth()), String.valueOf(i), "yesterday");
			}
			else if(i==today_info.get("today")){
				calendarData= new DateData(String.valueOf(dateData.getYear()), String.valueOf(dateData.getMonth()), String.valueOf(i), "today");
			}
			else{
				calendarData= new DateData(String.valueOf(dateData.getYear()), String.valueOf(dateData.getMonth()), String.valueOf(i), "normal");
			}
			dateList.add(calendarData);
		}
		
		int index = 7-dateList.size()%7;
		
		if(dateList.size()%7!=0){
			for (int i = 0; i < index; i++) {
				calendarData= new DateData(null, null, null, null);
				dateList.add(calendarData);
			}
		}
		return dateList;
	}
	
}
