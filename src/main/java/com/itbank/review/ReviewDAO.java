package com.itbank.review;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface ReviewDAO {
	
	List<ReviewHouseDTO> selectHouseReview(HashMap<String, String> param);

	List<ReviewActivityDTO> selectActivityReview(HashMap<String, String> param);

	int insertReviewHouse(HashMap<String, String> param);

	int insertReviewActivity(HashMap<String, String> param);

}
