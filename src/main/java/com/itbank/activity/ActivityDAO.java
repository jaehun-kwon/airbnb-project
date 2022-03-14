package com.itbank.activity;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityDAO {

	List<ActivityDTO> selectAll(HashMap<String, Object> param);

	ActivityDTO selectOne(int idx);

	@Insert("insert into activity(host_name,name,address,price,category,opt,location,intro,img1,img2,img3)"
			+ "values(#{host_name},#{name},#{address},#{price},#{category},#{opt},#{location},#{intro},#{img1},#{img2},#{img3})")
	int insertActivity(ActivityDTO dto);
	
}
