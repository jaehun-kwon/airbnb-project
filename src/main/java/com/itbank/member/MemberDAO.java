package com.itbank.member;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberDAO {

	MemberDTO selectOne(String nickName);
	
	
	
	@Select("select * from member where email=#{email}")
	String selectEmail(MemberDTO dto);
	
	@Select("select * from member where email=#{email} and password=#{password} and deleted='n'")
	MemberDTO selectPassword(MemberDTO dto);
	
	@Insert("insert into member(name,birth,nickname,email,password,country) values(#{name},#{birth},#{nickname},#{email},#{password},'대한민국')")
	int insertMember(MemberDTO dto);

	@Insert("insert into member_kakao(kakao_id,kakao_email) values(#{kakao_id},#{kakao_email})")
	int insertKakao(SnsMemberDTO dto);
	

	@Select("select * from member_kakao where kakao_id=#{kakao_id} and kakao_email=#{kakao_email}")
	SnsMemberDTO selectKakao(SnsMemberDTO dto);

	@Insert("insert into member_naver(naver_id,naver_email) values(#{naver_id},#{naver_email})")
	int insertNaver(SnsMemberDTO dto);

	@Select("select * from member_naver where naver_id=#{naver_id} and naver_email=#{naver_email}")
	SnsMemberDTO selectNaver(SnsMemberDTO dto);

	@Update("update member set name=#{name} where email=#{email}")
	int modify_name(MemberDTO dto);

	@Update("update member set nickname=#{nickname} where email=#{email}")
	int modify_nickname(MemberDTO dto);

	@Update("update member set birth=#{birth} where email=#{email}")
	int modify_birth(MemberDTO dto);

	@Update("update member set email=#{email} where email=#{before_email}")
	int modify_email(MemberDTO dto);

	@Update("update member set phone_number=#{phone_number} where email=#{email}")
	int modify_phone(MemberDTO dto);
	
	@Update("update member set intro=#{intro} where email=#{email}")
	int modify_intro(MemberDTO dto);

	@Update("update member set password=#{password} where email=#{email}")
	int modify_password(MemberDTO dto);
	
	@Update("update member set deleted='y' where email=#{email}")
	int modify_deleted(MemberDTO dto);
	
	@Update("update  member set profile=#{profile} where email=#{email}")
	void update_profile_photo(MemberDTO target);
	
	@Select("select * from member where email=#{email} and password=#{password}")
	MemberDTO login(MemberDTO dto);

	@Select("select * from member where nickname = #{person}")
	List<MemberDTO> loadRecipient(String person);

	@Select("select profile from member where nickname = #{nickname}")
	String loadProfile(String nickname);




	




	
	
	
	
}
