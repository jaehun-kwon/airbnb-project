package com.itbank.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itbank.review.ReviewActivityDTO;
import com.itbank.review.ReviewDAO;
import com.itbank.review.ReviewHouseDTO;

@Service
public class ReviewService {
	
	@Autowired private ReviewDAO reviewDAO;

	public List<ReviewHouseDTO> getHouseReviewList(String houseName, String userName) {
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("houseName", houseName);
		if("".equals(userName) == false) param.put("userName", userName);
		List<ReviewHouseDTO> list = reviewDAO.selectHouseReview(param);
		for(ReviewHouseDTO review : list) {
			if (review.getProfile() == null) {
				review.setProfile("http://175.214.170.244:20000/profile/user_default.png");
			}
		}
		return list;
	}
	public List<ReviewHouseDTO> getHouseReviewList(String name) {
		List<ReviewHouseDTO> list = getHouseReviewList(name, "");
		return list;
	}

	public List<ReviewActivityDTO> getActivityReviewList(String activityName, String userName) {
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("activityName", activityName);
		if("".equals(userName) == false) param.put("userName", userName);
		List<ReviewActivityDTO> list = reviewDAO.selectActivityReview(param);
		for(ReviewActivityDTO review : list) {
			if (review.getProfile() == null) {
				review.setProfile("http://175.214.170.244:20000/profile/user_default.png");
			}
		}
		return list;
	}
	public List<ReviewActivityDTO> getActivityReviewList(String name) {
		List<ReviewActivityDTO> list = getActivityReviewList(name, "");
		return list;
	}
	
	
	public int addReviewHouse(String productName, String userName, HashMap<String, String> param) {
		param.put("productName", productName);
		param.put("userName", userName);
		return reviewDAO.insertReviewHouse(param);
	}
	public int addReviewActivity(String productName, String userName, HashMap<String, String> param) {
		param.put("productName", productName);
		param.put("userName", userName);
		return reviewDAO.insertReviewActivity(param);
	}

}
