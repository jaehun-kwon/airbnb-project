package com.itbank.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itbank.house.HouseDAO;
import com.itbank.house.HouseDTO;

@Service
public class HouseService {

	@Autowired private HouseDAO houseDAO;
	
	public List<HouseDTO> getList(HashMap<String, Object> param, ArrayList<String> opt) {
		int adult = 0, kid = 0;
		if("".equals(param.get("adult")) == false) adult = Integer.parseInt((String) param.get("adult"));
		if("".equals(param.get("kid")) == false) kid = Integer.parseInt((String) param.get("kid"));
		int person = adult + kid;
		param.put("person", person); 
		if(opt.size() > 0) {
			param.put("opt", opt);
		} else {
			param.put("opt", null);
		}
		return houseDAO.selectAll(param);
	}

	public HouseDTO getHouse(int idx) {
		return houseDAO.selectOne(idx);
	}

}
