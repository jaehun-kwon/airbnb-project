package com.itbank.msg;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

public interface MsgDAO {

	@Select("select * from msg,member where sender=#{user} or recipient =#{user} order by idx ")
	List<MsgDTO> loadMsg(String user);

	@Select("select * from msg where (sender = #{user} and recipient = #{partnerName} ) or (sender = #{partnerName} and recipient = #{user}) order by idx")
	List<MsgDTO> loadMessage(HashMap<String, String> param);
	
	@Insert("insert into msg "
			+ "(recipient, sender, content, send_date) "
			+ "		values "
			+ "(#{recipient}, #{sender}, #{message}, to_date(#{date},'YYYYMMddHH24mi'))")
	int insertMsg(HashMap<String, String> payload);

	@Insert("insert into msg"
			+ "(recipient,sender,content,send_date)"
			+ " values"
			+ "(#{partnerName},#{user},#{content},to_date(#{date},'YYYYMMddHH24mi'))")
	void insertFirst(HashMap<String, String> param);
}



















