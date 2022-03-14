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

import com.itbank.activity.ActivityDTO;
import com.itbank.member.MemberDTO;
import com.itbank.review.ReviewActivityDTO;
import com.itbank.service.ActivityService;
import com.itbank.service.MemberService;
import com.itbank.service.ReviewService;

@Controller
public class ActivityController {

	@Autowired private ActivityService activityService;
	@Autowired private MemberService memberService;
	@Autowired private ReviewService reviewService;
	
	@GetMapping("/activity/activityList")
	public String activity(@RequestParam HashMap<String, String> param) {return "product/searchList";}
	
	private void activityInfo(ModelAndView mav, ActivityDTO activity) {
		List<String> opts = null; 
		List<String> categorys = null;
		if(activity.getCategory() != null) categorys = Arrays.asList(activity.getCategory().split(";"));
		if(activity.getOpt() != null) opts = Arrays.asList(activity.getOpt().split(";"));
		MemberDTO host = memberService.getMember(activity.getHost_name());
		List<ReviewActivityDTO> reviewList = reviewService.getActivityReviewList(activity.getName());
		int pointSum = 0;
		double pointAvg = 0;
		
		for(ReviewActivityDTO review : reviewList) {
			pointSum += review.getPoint();
		}
		if(reviewList.size() != 0) pointAvg = (double)pointSum / reviewList.size();

		mav.addObject("type", "activity");		
		mav.addObject("product", activity);
		mav.addObject("categorys", categorys);
		mav.addObject("opts", opts);
		mav.addObject("host", host);
		mav.addObject("reviewList", reviewList);
		mav.addObject("reviewAvg", pointAvg);
	}
	
	@GetMapping("/activity/detail/{idx}/")
	public ModelAndView activity(@PathVariable int idx) {
		ModelAndView mav = new ModelAndView("/product/detail");
		ActivityDTO activity = activityService.getActivity(idx);
		
		activityInfo(mav, activity);
		return mav;
	}
	
	@GetMapping("/activity/booking/{idx}")
	public ModelAndView activityBooking(@PathVariable int idx, @RequestHeader("referer") String beforeURL) {
		ModelAndView mav = new ModelAndView("/product/booking");
		ActivityDTO activity = activityService.getActivity(idx);

		mav.addObject("beforeURL", beforeURL);
		activityInfo(mav, activity);
		return mav;
	}
}
