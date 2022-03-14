package com.itbank.house;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface HouseDAO {

	List<HouseDTO> selectAll(HashMap<String, Object> param);

	HouseDTO selectOne(int idx);

}
