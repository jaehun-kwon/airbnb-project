package com.itbank.member;

public class SnsMemberDTO {

	public String kakao_id, kakao_email, kakao_nickname, kakaogender;
	public String naver_id, naver_email;
	
	
	public String getNaver_id() {
		return naver_id;
	}

	public void setNaver_id(String naver_id) {
		this.naver_id = naver_id;
	}

	public String getNaver_email() {
		return naver_email;
	}

	public void setNaver_email(String naver_email) {
		this.naver_email = naver_email;
	}

	public String getKakao_id() {
		return kakao_id;
	}

	public void setKakao_id(String kakao_id) {
		this.kakao_id = kakao_id;
	}

	public String getKakao_email() {
		return kakao_email;
	}

	public void setKakao_email(String kakao_email) {
		this.kakao_email = kakao_email;
	}

	public String getKakao_nickname() {
		return kakao_nickname;
	}

	public void setKakao_nickname(String kakao_nickname) {
		this.kakao_nickname = kakao_nickname;
	}

	public String getKakaogender() {
		return kakaogender;
	}

	public void setKakaogender(String kakaogender) {
		this.kakaogender = kakaogender;
	}
	
	
	
	
}
