package com.itbank.service;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.binary.Base64;

import com.itbank.msg.MsgDAO;
import com.itbank.msg.MsgDTO;


@Service
public class MsgService {

	@Autowired private MsgDAO dao;
	public static String alg ="AES/CBC/PKCS5Padding";
	private final String key = "a1a2a3a4a5a6a7a8";
	private final String iv = key.substring(0, 16);
	
	
	public String deCrypt(String msg) throws Exception{
		
		Cipher cipher = Cipher.getInstance(alg);
		SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
		IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
		cipher.init(Cipher.DECRYPT_MODE,keySpec,ivParamSpec);
		
		byte[] decodedBytes = Base64.decodeBase64(msg);
		byte[] decryped = cipher.doFinal(decodedBytes);
		return new String(decryped,"UTF-8");
		
	}
	
	
	public List<MsgDTO> loadMsg(String user) throws Exception {
		
		List<MsgDTO> result = dao.loadMsg(user);
		for(MsgDTO msg : result) {
			String asd = msg.getContent();
			msg.setContent(deCrypt(asd)); 
		}
	
		return result; 
	}

	public List<MsgDTO> loadMessage(String user, String partnerName) throws Exception {
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("user", user);
		param.put("partnerName", partnerName);
//		System.out.println(param);
		
		List<MsgDTO> result = dao.loadMessage(param);
		for(MsgDTO msg : result) {
			String asd = msg.getContent();
			msg.setContent(deCrypt(asd)); 
		}
	
		return result; 
	}

	public int insertMsg(HashMap<String, String> payload) throws Exception{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmm");
		String resetTime = sdf.format(new Date(Long.parseLong(payload.get("date"))));
		payload.put("date", resetTime);
		System.out.println(payload);
//		System.out.println(payload.get("message"));
		
		Cipher cipher = Cipher.getInstance(alg);
		SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
		IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
		cipher.init(Cipher.ENCRYPT_MODE,keySpec,ivParamSpec);
		
		byte[] encrypted = cipher.doFinal(payload.get("message").getBytes("UTF-8"));
		Base64.encodeBase64(encrypted);
//		getEncoder().encode(encrypted);
//		System.out.println(encrypted);
		
		String encryMessage = Base64.encodeBase64URLSafeString(encrypted);
		payload.put("message", encryMessage);
//		System.out.println(payload);
		
		return dao.insertMsg(payload); 
	}
	
	public List<MsgDTO> newConnection(String user, String loadpa) throws Exception {
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("user", user);
		param.put("partnerName", loadpa);
//		System.out.println(param);
		param.put("content", loadpa+"님과 대화를 시작합니다");
		
		Date nowTime = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmm");
		String resetTime = sdf.format(nowTime);
		param.put("date",resetTime);
//		System.out.println(param);
		
		Cipher cipher = Cipher.getInstance(alg);
		SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
		IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
		cipher.init(Cipher.ENCRYPT_MODE,keySpec,ivParamSpec);
		
		byte[] encrypted = cipher.doFinal(param.get("content").getBytes("UTF-8"));
		Base64.encodeBase64(encrypted);
		
		String encryMessage = Base64.encodeBase64URLSafeString(encrypted);
		param.put("content", encryMessage);
		
		dao.insertFirst(param);
//		System.out.println(dao.loadMessage(param)); 
		return null;
	}

}
