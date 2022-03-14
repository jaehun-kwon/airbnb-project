package com.itbank.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.itbank.house.HouseDTO;
import com.itbank.member.MemberDTO;
import com.itbank.review.ReviewHouseDTO;
import com.itbank.service.HouseService;
import com.itbank.service.MemberService;
import com.itbank.service.ReviewService;

@Controller
public class HouseController {
	
	@Autowired private HouseService houseService;
	@Autowired private MemberService memberService;
	@Autowired private ReviewService reviewService;
	
	@GetMapping("/house/houseList")
	public String house(@RequestParam HashMap<String, String> param) { return "product/searchList"; }

	private void houseInfo(ModelAndView mav, HouseDTO house) {
		List<String> categorys = null;
		List<String> opts = null;
		if(house.getCategory() != null) categorys = Arrays.asList(house.getCategory().split(";"));
		if(house.getOpt() != null) opts = Arrays.asList(house.getOpt().split(";"));
		MemberDTO host = memberService.getMember(house.getHost_name());
		List<ReviewHouseDTO> reviewList = reviewService.getHouseReviewList(house.getName());
		int cleanSum = 0, accuracySum = 0, communicationSum = 0;
		double cleanAvg = 0, accuracyAvg = 0, communicationAvg = 0, reviewAvg = 0;
		
		for(ReviewHouseDTO review : reviewList) {
			cleanSum += review.getClean();
			accuracySum += review.getAccuracy();
			communicationSum += review.getCommunication();
		}
		if(reviewList.size() != 0) {
			cleanAvg = (double)cleanSum / reviewList.size();
			accuracyAvg = (double)accuracySum / reviewList.size();
			communicationAvg = (double)communicationSum / reviewList.size();
			reviewAvg = (cleanAvg + accuracyAvg + communicationAvg) / 3.0;
		}
		mav.addObject("type", "house");
		mav.addObject("product", house);
		mav.addObject("categorys", categorys);
		mav.addObject("opts", opts);
		mav.addObject("host", host);
		mav.addObject("reviewList", reviewList);
		mav.addObject("cleanAvg", cleanAvg);
		mav.addObject("accuracyAvg", accuracyAvg);
		mav.addObject("reviewAvg", reviewAvg);
		mav.addObject("communicationAvg", communicationAvg);
	}
	
	@GetMapping("/house/detail/{idx}/")
	public ModelAndView houseDetail(@PathVariable int idx) {
		ModelAndView mav = new ModelAndView("/product/detail");
		HouseDTO house = houseService.getHouse(idx);
		
		houseInfo(mav, house);
		return mav;
	}
	
	@GetMapping("/house/booking/{idx}")
	public ModelAndView houseBooking(@PathVariable int idx, @RequestHeader("referer") String beforeURL) {
		ModelAndView mav = new ModelAndView("/product/booking");
		HouseDTO house = houseService.getHouse(idx);
		
		mav.addObject("beforeURL", beforeURL);
		houseInfo(mav, house);
		return mav;
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
