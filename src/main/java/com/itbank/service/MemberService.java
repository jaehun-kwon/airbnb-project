package com.itbank.service;

import java.util.List;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itbank.member.MemberDAO;
import com.itbank.member.MemberDTO;
import com.itbank.member.SnsMemberDTO;

@Service
public class MemberService {

	@Autowired
	private MemberDAO memberDAO;

	public static String alg = "AES/CBC/PKCS5Padding";
	private final String key = "a1a2a3a4a5a6a7a8";
	private final String iv = key.substring(0, 16);

	private void profileNull(MemberDTO member) {
		if (member.getProfile() == null) {
			member.setProfile("http://175.214.170.244:20000/profile/user_default.png");
		}
	}

	public MemberDTO getMember(String nickName) {
		MemberDTO member = memberDAO.selectOne(nickName);
		profileNull(member);
		return member;
	}

	public String emailLogin(MemberDTO dto) {
		return memberDAO.selectEmail(dto);
	}

	public MemberDTO login(MemberDTO dto) throws Exception { // 자동 로그인 할때 암호화 ? 
		Cipher c = Cipher.getInstance(alg);
		SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
		c.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()));
		byte[] encrypted = c.doFinal(dto.getPassword().getBytes("UTF-8"));
		Base64.encodeBase64(encrypted);
		String encryPassword = Base64.encodeBase64URLSafeString(encrypted);
		dto.setPassword(encryPassword);

		MemberDTO member = memberDAO.selectPassword(dto);
		if (member != null) {
			profileNull(member);
		}
		return member;
	}
	
	public MemberDTO update_airbnb_user(MemberDTO dto) {
		return memberDAO.selectPassword(dto);
	}

	public int airBnBJoin(MemberDTO dto) throws Exception { // 회원가입 할때 암호화
		Cipher c = Cipher.getInstance(alg);
		SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
		c.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()));
		byte[] encrypted = c.doFinal(dto.getPassword().getBytes("UTF-8"));
		Base64.encodeBase64(encrypted);
		String encryPassword = Base64.encodeBase64URLSafeString(encrypted);
		dto.setPassword(encryPassword);
		return memberDAO.insertMember(dto);
	}

	public int kakao_join(SnsMemberDTO dto) {
		return memberDAO.insertKakao(dto);
	}

	public SnsMemberDTO kakao_login(SnsMemberDTO dto) {
		return memberDAO.selectKakao(dto);
	}

	public int naver_join(SnsMemberDTO dto) {
		return memberDAO.insertNaver(dto);
	}

	public SnsMemberDTO naver_login(SnsMemberDTO dto) {
		return memberDAO.selectNaver(dto);
	}

	public int update_name(MemberDTO dto) {
		return memberDAO.modify_name(dto);
	}

	public int update_nickname(MemberDTO dto) {
		return memberDAO.modify_nickname(dto);
	}

	public int update_birth(MemberDTO dto) {
		return memberDAO.modify_birth(dto);
	}

	public int update_email(MemberDTO dto) {
		return memberDAO.modify_email(dto);
	}

	public int update_phone(MemberDTO dto) {
		return memberDAO.modify_phone(dto);
	}
	
	public int update_intro(MemberDTO dto) {
		return memberDAO.modify_intro(dto);
	}

	public int update_password(MemberDTO dto) throws Exception {	// 비번 바꿀때 암호화
		
		Cipher c = Cipher.getInstance(alg);
		SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
		c.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()));
		byte[] encrypted = c.doFinal(dto.getPassword().getBytes("UTF-8"));
		Base64.encodeBase64(encrypted);
		String encryPassword = Base64.encodeBase64URLSafeString(encrypted);
		dto.setPassword(encryPassword);
		
		return memberDAO.modify_password(dto);
	}
	
	public String decryptPW(MemberDTO dto) throws Exception { // 비번 바꿀대 복호화
		
		Cipher c = Cipher.getInstance(alg);
		SecretKeySpec ks= new SecretKeySpec(key.getBytes(),"AES");
		IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
		c.init(Cipher.DECRYPT_MODE, ks,ivParamSpec);
		
		byte[] decryptPW = Base64.decodeBase64(dto.getPassword());
		String resultPW = new String(c.doFinal(decryptPW),"UTF-8");
		dto.setPassword(resultPW);
		
		return resultPW;
	}
	
	public int update_deleted(MemberDTO dto) {
		return memberDAO.modify_deleted(dto);
	}

	public List<MemberDTO> loadRecipient(String person) {
		return memberDAO.loadRecipient(person);
	}

	public String loadProfile(String nickname) {
		String profile = memberDAO.loadProfile(nickname);
		if (profile == null)
			profile = "http://175.214.170.244:20000/profile/user_default.png";
		return profile;
	}

	public void update_profile_photo(MemberDTO target) {
		memberDAO.update_profile_photo(target);
	}

	



}
