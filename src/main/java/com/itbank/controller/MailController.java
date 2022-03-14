package com.itbank.controller;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.util.HashMap;
import java.util.Scanner;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itbank.activity.ActivityDTO;
import com.itbank.booking.BookingActivityDTO;
import com.itbank.booking.BookingHouseDTO;
import com.itbank.component.Hash;
import com.itbank.house.HouseDTO;
import com.itbank.member.MemberDTO;
import com.itbank.service.ActivityService;
import com.itbank.service.BookingService;
import com.itbank.service.HouseService;
import com.itbank.service.MailService;

@RestController
public class MailController {

	@Autowired private MailService mailService;
	@Autowired private HouseService houseService;
	@Autowired private ActivityService activityService;
	@Autowired private BookingService bookingService;
	@Autowired private Hash hash;
	
	private String getAccount(HttpSession session) throws IOException {
		String account = null;
		String filePath = session.getServletContext().getRealPath("/WEB-INF/data/account.dat");
		
		File f  = new File(filePath);
		if(f.exists() == false) {
			System.out.println("메일 전송에 필요한 계정 정보가 없습니다.");
			return null;
		}
		
		Scanner sc = new Scanner(f);
		while(sc.hasNextLine()) {
			account = sc.nextLine();
		}
		sc.close();
		
		return account;
	}
	
	@GetMapping("/houseBooking/ajax/{idx}/")
	public int houseBooking(@PathVariable int idx, @RequestParam HashMap<String, String> param, HttpSession session) throws IOException {
		BookingHouseDTO bookingDTO = new BookingHouseDTO();
		MemberDTO loginUser = (MemberDTO)session.getAttribute("login");
		
		long start_date_long = Long.parseLong(param.get("start_date"));
		long end_date_long = Long.parseLong(param.get("end_date"));
		HouseDTO houseDTO = houseService.getHouse(idx);
		bookingDTO.setSelector(loginUser.getNickname());
		bookingDTO.setStart_date(new Date(start_date_long));
		bookingDTO.setEnd_date(new Date(end_date_long));
		bookingDTO.setName(houseDTO.getName());
		int result = bookingService.addBookingHouse(bookingDTO);
		
		int stay = (int)(end_date_long - start_date_long) / (60*60*24*1000); 
		
		long today = new java.util.Date().getTime();
		Date dueDate = new Date(today + (60*60*24*1000*(start_date_long - today < 60*60*24*1000*7 ? 1 : 7)));
		
		if(result == 1) {
			String account = getAccount(session);
			mailService.sendBookingHouseMail(loginUser, bookingDTO, houseDTO, stay, dueDate, account);
		}
		return result;
	}

	@GetMapping("/activityBooking/ajax/{idx}/")
	public int activityBooking(@PathVariable int idx, @RequestParam HashMap<String, String> param, HttpSession session) throws IOException {
		BookingActivityDTO bookingDTO = new BookingActivityDTO();
		MemberDTO loginUser = (MemberDTO)session.getAttribute("login");
		
		long selected_date_long = Long.parseLong(param.get("selected_date"));
		int adult = "".equals(param.get("adult")) ? 0 : Integer.parseInt(param.get("adult"));
		int kid = "".equals(param.get("kid")) ? 0 : Integer.parseInt(param.get("kid"));
		int count_person = adult + kid;
		ActivityDTO activityDTO = activityService.getActivity(idx);
		bookingDTO.setSelector(loginUser.getNickname());
		bookingDTO.setSelected_date(new Date(selected_date_long));
		bookingDTO.setName(activityDTO.getName());
		bookingDTO.setCount_person(count_person);
		int result = bookingService.addBookingActivity(bookingDTO);
		
		
		long today = new java.util.Date().getTime();
		Date dueDate = new Date(today + (60*60*24*1000*(selected_date_long - today < 60*60*24*1000*7 ? 1 : 7)));
		
		if(result == 1) {
			String account = getAccount(session);
			mailService.sendBookingActivityMail(loginUser, bookingDTO, activityDTO, dueDate, account);
		}
		return result;
	}
	
	@GetMapping("/mailto/{email}/")
	public HashMap<String, String> mailto(@PathVariable String email, HttpSession session) throws IOException{
		System.out.println("인증번호를 받을 이메일 주소 : " + email);
		
		String authNumber = mailService.getAuthNumber();
		System.out.println("인증 번호 : " +authNumber);
		
		String hashNumber = hash.getHash(authNumber);
		System.out.println("인증 해시값 : "+ hashNumber);
		
		session.setAttribute("hashNumber", hashNumber);
		
		String account = getAccount(session);
		
		String result = mailService.sendMail(email, authNumber, account);
		HashMap<String, String> ret = new HashMap<String, String>();
		
		if(result.equals(authNumber)) {
			ret.put("status","OK");
			ret.put("message","인증번호가 발송 되었습니다.");
			
		}
		else {
			ret.put("stauts","FAIL");
			ret.put("message","인증번호 발송에 실패 했습니다.");
		}
		
		return ret;
		
	}

	@GetMapping("/getAuthResult/{userNumber}")
	public HashMap<String, String> getAuthResult(@PathVariable String userNumber, HttpSession session)	{
		String sessionHash = (String)session.getAttribute("hashNumber");
		String userHash = hash.getHash(userNumber);
		boolean flag = userHash.equals(sessionHash);
		
		HashMap<String, String> ret = new HashMap<String, String>();
		ret.put("status", flag ? "OK" : "FAIL");
		ret.put("message", flag ? "인증 완료" : "인증번호 를 다시 확인해주세요");
		
		
		return ret;
	}
	
}

