package com.itbank.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itbank.activity.ActivityDAO;
import com.itbank.activity.ActivityDTO;

@Service
public class ActivityService {

	@Autowired private ActivityDAO activityDAO;
	
	public List<ActivityDTO> getList(HashMap<String, Object> param, ArrayList<String> opt) {
		if(opt.size() > 0) {
			param.put("opt", opt);
		} else {
			param.put("opt", null);
		}
		return activityDAO.selectAll(param);
	}

	public ActivityDTO getActivity(int idx) {
		return activityDAO.selectOne(idx);
	}
	
	public int activityJoin(ActivityDTO dto) {
		return activityDAO.insertActivity(dto);
	}
}
