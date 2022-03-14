package com.itbank.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itbank.house.HouseDTO;
import com.itbank.house.HouseHostingDAO;

@Service
public class HostingService {
	
	@Autowired private HouseHostingDAO hhdao;

	public int addHouse(HouseDTO house) {
		return hhdao.insert(house);
	}

}
