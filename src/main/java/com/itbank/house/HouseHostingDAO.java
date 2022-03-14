package com.itbank.house;

import org.apache.ibatis.annotations.Insert;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseHostingDAO {

	@Insert("insert into house values (house_seq.nextval, "
			+ "#{name}, #{host_name}, #{intro}, #{count_person}, "
			+ "#{count_bath}, #{count_room}, #{address}, "
			+ "#{category}, #{opt}, #{img1}, #{img2}, #{img3}, #{img4}, "
			+ "#{img5}, #{price}, sysdate, 'n', #{location})")
	public int insert(HouseDTO house);
}
