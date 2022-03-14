package com.itbank.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itbank.activity.ActivityDTO;
import com.itbank.booking.BookingActivityDTO;
import com.itbank.booking.BookingHouseDTO;
import com.itbank.house.HouseDTO;
import com.itbank.member.MemberDTO;
import com.itbank.msg.MsgDTO;
import com.itbank.review.ReviewActivityDTO;
import com.itbank.review.ReviewHouseDTO;
import com.itbank.service.ActivityService;
import com.itbank.service.BookingService;
import com.itbank.service.HouseService;
import com.itbank.service.MemberService;
import com.itbank.service.MsgService;
import com.itbank.service.ReviewService;
import com.itbank.service.WishService;
import com.itbank.wish.WishDTO;

@RestController
public class AjaxController {

	@Autowired private HouseService houseService;
	@Autowired private ActivityService activityService;
	@Autowired private ReviewService reviewService;
	@Autowired private MemberService memberService;
	@Autowired private MsgService msgService;
	@Autowired private BookingService bookingService;
	@Autowired private WishService wishService;
	
	@GetMapping("/getListAll/house")
	public List<HouseDTO> getHouseList(@RequestParam HashMap<String, Object> param,@RequestParam ArrayList<String> opt) {
		return houseService.getList(param, opt);
	}
	
	@GetMapping("/getListAll/activity")
	public List<ActivityDTO> getProductList(@RequestParam HashMap<String, Object> param, @RequestParam ArrayList<String> opt) {
		return activityService.getList(param, opt);
	}
	
	@GetMapping("/houseReview/ajax/{houseName}/")
	public List<ReviewHouseDTO> getReviewHouseList(@PathVariable String houseName) {
		return reviewService.getHouseReviewList(houseName);
	}
	
	@GetMapping("/activityReview/ajax/{activityName}/")
	public List<ReviewActivityDTO> getReviewActivityList(@PathVariable String activityName) {
		return reviewService.getActivityReviewList(activityName); 
	}
	
	@GetMapping("/houseReviewUser/{houseName}/")
	public int getHouseReviewUser(@PathVariable String houseName, HttpSession session){
		MemberDTO user = (MemberDTO) session.getAttribute("login"); 
		String userName = user.getNickname();
		List<BookingHouseDTO> bookingHouseList = bookingService.getBookingHouseList(houseName, userName);
		List<ReviewHouseDTO> reviewHouseList = reviewService.getHouseReviewList(houseName, userName);
		
		int result = bookingHouseList.size() - reviewHouseList.size();
		return result;
	}
	
	@GetMapping("/activityReviewUser/{activityName}/")
	public int getActivityReviewUser(@PathVariable String activityName, HttpSession session){
		MemberDTO user = (MemberDTO) session.getAttribute("login");
		String userName = user.getNickname();
		List<BookingActivityDTO> bookingActivityList = bookingService.getBookingActivityList(activityName, userName);
		List<ReviewActivityDTO> reviewActivityList = reviewService.getActivityReviewList(activityName, userName);
		
		int result = bookingActivityList.size() - reviewActivityList.size();
		return result;
	}
	
	@GetMapping("/addReview/{productName}/")
	public int addReview(@PathVariable String productName, @RequestParam HashMap<String, String> param, HttpSession session) {
		int result = 0;
		MemberDTO user = (MemberDTO) session.getAttribute("login");
		String userName = user.getNickname();
		
		if("house".equals(param.get("type"))) {
			result = reviewService.addReviewHouse(productName, userName, param);
		} else {
			result = reviewService.addReviewActivity(productName, userName, param);
		}
		
		return result;
	}
	
	
	@PostMapping(value = "/emailLogin", produces = "application/json; charset=utf-8")
	public String emailLogin(@RequestBody MemberDTO dto, HttpSession session) throws JsonProcessingException {
		String emailLogin = memberService.emailLogin(dto);
		session.setAttribute("emailLogin", emailLogin);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(emailLogin);

		return json;
	}
	// 이메일 입력 시 패스워드 입력 기능 
	@PostMapping(value = "/emailPassword", produces = "application/json; charset=utf-8")
	public String emailPassword(@RequestBody MemberDTO dto, HttpSession session) throws Exception {
		MemberDTO login = memberService.login(dto);
		
		session.setAttribute("login", login);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(login);
		return json;
	}
	@PostMapping("/join")
	public String join(@RequestBody MemberDTO dto) throws Exception  {
		int row = memberService.airBnBJoin(dto);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(row);
		
		return json;
	}
	// 비밀번호 찾기 화면으로 가는 화면
	@GetMapping("/findPW")
	public void findPW() {
	}
	// 회원가입 창
	@GetMapping("/airBnBJoin")
	public void airBnBJoin() {
	}
	@GetMapping(value = "/update_name", produces = "application/json; charset=utf-8")
	public String update_name(HttpSession session) throws Exception {
		MemberDTO update = (MemberDTO) session.getAttribute("login");
		MemberDTO login = memberService.update_airbnb_user(update);
		session.setAttribute("login", login);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(update);
	
		return json;
	}


	@PostMapping(value = "/update_name", produces = "application/json; charset=utf-8")
	public String update_name(@RequestBody MemberDTO dto, HttpSession session) throws Exception {
		MemberDTO update = (MemberDTO) session.getAttribute("login");
		MemberDTO login = memberService.update_airbnb_user(update);
		session.setAttribute("login", login);
		int row = memberService.update_name(dto);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(row);
		
		return json;
	}
	@GetMapping(value = "/update_nickname", produces = "application/json; charset=utf-8")
	public String update_nickname(HttpSession session) throws Exception {
		MemberDTO update = (MemberDTO) session.getAttribute("login");
		MemberDTO login = memberService.update_airbnb_user(update);
		session.setAttribute("login", login);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(update);
		
	
		return json;
	}
	@PostMapping(value = "/update_nickname", produces = "application/json; charset=utf-8")
	public String update_nickname(@RequestBody MemberDTO dto, HttpSession session) throws Exception {
		MemberDTO update = (MemberDTO) session.getAttribute("login");
		MemberDTO login = memberService.update_airbnb_user(update);
		session.setAttribute("login", login);
		int row = memberService.update_nickname(dto);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(row);
		
		return json;
	}
	@GetMapping(value = "/update_birth", produces = "application/json; charset=utf-8")
	public String update_birth(HttpSession session) throws Exception {
		MemberDTO update = (MemberDTO) session.getAttribute("login");
		MemberDTO login = memberService.update_airbnb_user(update);
		session.setAttribute("login", login);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(update);
		
		return json;
	}
	@PostMapping(value = "/update_birth", produces = "application/json; charset=utf-8")
	public String update_birth(@RequestBody MemberDTO dto, HttpSession session) throws Exception {
		MemberDTO update = (MemberDTO) session.getAttribute("login");
		MemberDTO login = memberService.update_airbnb_user(update);
		session.setAttribute("login", login);
		int row = memberService.update_birth(dto);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(row);
		
		return json;
	}
	@GetMapping(value = "/update_email", produces = "application/json; charset=utf-8")
	public String update_email(HttpSession session) throws Exception {
		MemberDTO update = (MemberDTO) session.getAttribute("login");
		MemberDTO login = memberService.update_airbnb_user(update);
		session.setAttribute("login", login);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(update);

		return json;
	}
	@PostMapping(value = "/update_email", produces = "application/json; charset=utf-8")
	public String update_email(@RequestBody MemberDTO dto, HttpSession session) throws Exception {
		MemberDTO update = (MemberDTO) session.getAttribute("login");
		MemberDTO login = memberService.update_airbnb_user(update);
		session.setAttribute("login", login);
		int row = memberService.update_email(dto);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(row);
		
		return json;
	}
	@GetMapping(value = "/update_phone", produces = "application/json; charset=utf-8")
	public String update_phone(HttpSession session) throws Exception {
		MemberDTO update = (MemberDTO) session.getAttribute("login");
		MemberDTO login = memberService.update_airbnb_user(update);
		session.setAttribute("login", login);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(update);
		
		return json;
	}
	@PostMapping(value = "/update_phone", produces = "application/json; charset=utf-8")
	public String update_phone(@RequestBody MemberDTO dto, HttpSession session) throws Exception {
		MemberDTO update = (MemberDTO) session.getAttribute("login");
		MemberDTO login = memberService.update_airbnb_user(update);
		session.setAttribute("login", login);
		int row = memberService.update_phone(dto);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(row);
		
		return json;
	}
	@GetMapping(value = "/password_update", produces = "application/json; charset=utf-8")
	public String password_update_get(MemberDTO dto ,HttpSession session) throws Exception {
		MemberDTO update = (MemberDTO) session.getAttribute("login");
		MemberDTO login = memberService.update_airbnb_user(update);
		session.setAttribute("login", login);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(update);
	
		return json;
	}
	@PostMapping(value = "/password_update", produces = "application/json; charset=utf-8")
	public String password_update(@RequestBody MemberDTO dto, HttpSession session) throws Exception {
		int row =memberService.update_password(dto);
		MemberDTO update = (MemberDTO) session.getAttribute("login");
		session.setAttribute("login", update);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(row);
		
		return json;
	}
	
	
	@GetMapping("/load/{user}/")
	public HashMap<String, Object> load(@PathVariable String user) throws Exception {
		List<MsgDTO> list = msgService.loadMsg(user);
		HashSet<String> set = new HashSet<String>();
		HashMap<String, String> asd = new HashMap<String, String>();
		HashMap<String, String> sdf = new HashMap<String, String>();
		HashMap<String, String> allProfile = new HashMap<String, String>();
		allProfile.put(user, memberService.loadProfile(user));
		HashMap<String, Object> profileAll = new HashMap<String, Object>();
		List<String> list2 = new ArrayList<String>();

		String profile = null;
		
		for(MsgDTO msg : list) {
			if(msg.getSender().equals(user) == true) {
				asd.put("partner", msg.getRecipient());
				set.add(asd.get("partner"));
			}
			else if(msg.getSender().equals(user) == false) {
				asd.put("partner", msg.getSender());
				set.add(asd.get("partner"));
			}
		}
		
		List<String> list3 = new ArrayList<>(set);
		
		for(String dto : set) {
			sdf.put("profile", memberService.loadProfile(dto));
			profile = sdf.get("profile");
			list2.add(profile);
		}
		
		for(int i = 0 ; i < list2.size() ; i++) {
			allProfile.put(list3.get(i), list2.get(i));
		}
		
		
		profileAll.put("msgList", list);
		profileAll.put("profileList", allProfile);
		return profileAll; 
	}
	
	@GetMapping("/loadMessage/{user}/{partnerName}/")
	public List<MsgDTO> loadMessage(@PathVariable String user, @PathVariable String partnerName) throws Exception{
		return msgService.loadMessage(user,partnerName); 
	}
	
	@GetMapping("/newConnection/{user}/{loadpa}")
	public List<MsgDTO> newConnection(@PathVariable String user,@PathVariable String loadpa) throws Exception{
		return msgService.newConnection(user,loadpa);
	}
	
	@GetMapping("/getProfile/{person}/")
	public List<MemberDTO> loadRecipient(@PathVariable String person){
		return memberService.loadRecipient(person);
	}
	
	@GetMapping("/AdminMessage/{message}/")
	public int sendAdminMessage(@PathVariable String message, @RequestParam HashMap<String, String> param) throws Exception {
		param.put("message", message);
		return msgService.insertMsg(param);
	}
	
	@GetMapping("/getLastBookinghouse/{selector}/")
	public BookingHouseDTO getLastBookinghouse(@PathVariable String selector) {
		return bookingService.getBookingHouse(selector);
	}
	@GetMapping("/getLastBookingactivity/{selector}/")
	public BookingHouseDTO getLastBookingactivity(@PathVariable String selector) {
		return bookingService.getBookingHouse(selector);
	}
	@GetMapping("/bookingConfirm/{type}/{idx}")
	public int bookingConfirm(@PathVariable String type, @PathVariable int idx) {
		int result = 0;
		if("house".equals(type)) {
			result = bookingService.changeHouseStatus(idx);
		} else if("activity".equals(type)) {
			result = bookingService.changeActivityStatus(idx);
		}
		return result;
	}
	@GetMapping(value = "/intro_update", produces = "application/json; charset=utf-8")
	   public String intro_update(HttpSession session) throws Exception {
	      MemberDTO update = (MemberDTO) session.getAttribute("login");
	      MemberDTO login = memberService.update_airbnb_user(update);
	      session.setAttribute("login", login);
	      ObjectMapper om = new ObjectMapper();
	      String json = om.writeValueAsString(update);
	   
	      return json;
	   }
	   
   @PostMapping(value = "/intro_update", produces = "application/json; charset=utf-8")
   public String intro_update(@RequestBody MemberDTO dto, HttpSession session) throws Exception {
      MemberDTO update = (MemberDTO) session.getAttribute("login");
      MemberDTO login = memberService.update_airbnb_user(update);
      session.setAttribute("login", login);
      int row = memberService.update_intro(dto);
      ObjectMapper om = new ObjectMapper();
      String json = om.writeValueAsString(row);
      
      return json;
   }
	
	@GetMapping("/addWishHeart/{type}/{idx}")
	public int addWishHeart(@PathVariable String type, @PathVariable int idx, HttpSession session) {
		MemberDTO login = (MemberDTO) session.getAttribute("login");
		int result = wishService.addWish(type, idx, login);
		return result;
	}
	@GetMapping("/delWishHeart/{type}/{idx}")
	public int delWishHeart(@PathVariable String type, @PathVariable int idx, HttpSession session) {
		MemberDTO login = (MemberDTO) session.getAttribute("login");
		int result = wishService.delWish(type, idx, login);
		return result;
	}
	
	@GetMapping("/getWishList/{type}")
	public List<WishDTO> getWishList(@PathVariable String type, HttpSession session) {
		MemberDTO login = (MemberDTO) session.getAttribute("login");
		List<WishDTO> list = null;
		if(login != null) list = wishService.getWishList(type, login);
		return list;
	}
}
