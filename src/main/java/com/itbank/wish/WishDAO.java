package com.itbank.wish;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface WishDAO {

	int insertWishHouse(HashMap<String, String> param);

	int insertWishActivity(HashMap<String, String> param);

	int deleteWishHouse(HashMap<String, String> param);

	int deleteWishActivity(HashMap<String, String> param);

	List<WishDTO> selectWishHouseList(String selector);

	List<WishDTO> selectWishActivityList(String selector);

}
