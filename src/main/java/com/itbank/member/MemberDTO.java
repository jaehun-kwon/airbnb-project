package com.itbank.member;

import java.sql.Date;

public class MemberDTO {
   
   private String email;
   private String name;
   private String nickname;
   private String phone_number;
   private Date birth;
   private String country;
   private String intro;
   private String profile;
   private String member_type;
   private String deleted;
   private String password;
   private String before_email;
   
   
   public String getBefore_email() {
	   return before_email;
   }
   public void setBefore_email(String before_email) {
		this.before_email = before_email;
   }
   public String getEmail() {
	      return email;
   }
   public void setEmail(String email) {
      this.email = email;
   }
   public String getName() {
      return name;
   }
   public void setName(String name) {
      this.name = name;
   }
   public String getNickname() {
      return nickname;
   }
   public void setNickname(String nickname) {
      this.nickname = nickname;
   }
   public String getPhone_number() {
      return phone_number;
   }
   public void setPhone_number(String phone_number) {
      this.phone_number = phone_number;
   }
   public Date getBirth() {
      return birth;
   }
   public void setBirth(Date birth) {
      this.birth = birth;
   }
   public String getCountry() {
      return country;
   }
   public void setCountry(String country) {
      this.country = country;
   }
   public String getIntro() {
      return intro;
   }
   public void setIntro(String intro) {
      this.intro = intro;
   }
   public String getProfile() {
      return profile;
   }
   public void setProfile(String profile) {
      this.profile = profile;
   }
   public String getMember_type() {
      return member_type;
   }
   public void setMember_type(String member_type) {
      this.member_type = member_type;
   }
   public String getDeleted() {
      return deleted;
   }
   public void setDeleted(String deleted) {
      this.deleted = deleted;
   }
   public String getPassword() {
      return password;
   }
   public void setPassword(String password) {
      this.password = password;
   }
   
}