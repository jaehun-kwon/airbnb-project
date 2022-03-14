package com.itbank.service;

import java.util.HashMap;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itbank.member.MemberDTO;
import com.itbank.wish.WishDAO;
import com.itbank.wish.WishDTO;

@Service
public class WishService {
	
	@Autowired private WishDAO wishDAO;

	public int addWish(String type, int idx, MemberDTO login) {
		int result = 0;
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("idx", idx+"");
		param.put("selector", login.getNickname());
		if("house".equals(type)) {
			result = wishDAO.insertWishHouse(param);
		} else if("activity".equals(type)) {
			result = wishDAO.insertWishActivity(param);
		}
		return result;
	}

	public int delWish(String type, int idx, MemberDTO login) {
		int result = 0;
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("idx", idx+"");
		param.put("selector", login.getNickname());
		if("house".equals(type)) {
			result = wishDAO.deleteWishHouse(param);
		} else if("activity".equals(type)) {
			result = wishDAO.deleteWishActivity(param);
		}
		return result;
	}

	public List<WishDTO> getWishList(String type, MemberDTO login) {
		String selector = login.getNickname();
		List<WishDTO> list = null;
		if("house".equals(type)) {
			list = wishDAO.selectWishHouseList(selector);
		} else if("activity".equals(type)) {
			list = wishDAO.selectWishActivityList(selector);
		}
		return list;
	}

}
