package com.itbank.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import com.itbank.component.UploadDTO;
import com.itbank.member.MemberDTO;
import com.itbank.member.SnsMemberDTO;
import com.itbank.service.MemberService;
import com.itbank.service.UploadService;

@Controller
public class MemberController {

	@Autowired
	private MemberService ms;

	@Autowired
	private UploadService us;
	
	// 로그아웃
	@GetMapping("/logout")
	public ModelAndView logout(HttpSession session) {
		ModelAndView mav = new ModelAndView("redirect:/");
		session.invalidate();
		return mav;
	}

	// 회원가입 시 그냥 멤버 테이블로 자동 로그인 됨
	@PostMapping("/autoLogin")
	public ModelAndView autoLogin(MemberDTO dto, HttpSession session) throws Exception {
		ModelAndView mav = new ModelAndView("redirect:/");
		MemberDTO login = ms.login(dto);
		session.setAttribute("login", login);

		return mav;
	}

	// 카카오 로그인 하면 카카오 테이블로 회원가입됨
	@PostMapping("/kakao_join")
	public ModelAndView kakao_join(SnsMemberDTO dto, HttpSession session) {
		ModelAndView mav = new ModelAndView("redirect:/");
		try {
			ms.kakao_join(dto);
		} catch (DuplicateKeyException e) {
		} finally {
			SnsMemberDTO kakao_login = ms.kakao_login(dto);
			session.setAttribute("kakao_login", kakao_login);
		}
		return mav;
	}

	// 네이버 로그인 하면 네이버 테이블로 회원가입됨
	@PostMapping("/naver_join")
	public ModelAndView naver_join(SnsMemberDTO dto, HttpSession session) {
		ModelAndView mav = new ModelAndView("redirect:/");
		try {
			ms.naver_join(dto);
		} catch (DuplicateKeyException e) {
		} finally {
			SnsMemberDTO naver_login = ms.naver_login(dto);
			session.setAttribute("naver_login", naver_login);
		}

		return mav;
	}

	// 계정 세팅 창
	@GetMapping("/account_settings")
	public String account_settings() { return "/member/account_settings"; }
	
	@GetMapping("/personal_info")
	public String personal_info() { return "/member/personal_info"; }
	
	@GetMapping("/login_and_security")
	public ModelAndView login_and_security(HttpSession session) throws Exception {
		ModelAndView mav = new ModelAndView("/member/login_and_security");
		MemberDTO dto = (MemberDTO) session.getAttribute("login");
		try {
			ms.decryptPW(dto);
		} catch (Exception e) {

		}
		return mav;
	}
	
	@PostMapping("/login_and_security")
	public ModelAndView update_deleted(MemberDTO dto,HttpSession session) {
		ModelAndView mav = new ModelAndView("redirect:/");
		int row = ms.update_deleted(dto);
		session.invalidate();
		return mav;
	}
	
	@GetMapping("/user_show")
	public String user_show() {return "/member/user_show";}
	
	@GetMapping("/edit_photo")
	public String edit_photo() {return"/member/edit_photo";}
	
	@PostMapping("/edit_photo")
	public String upload(UploadDTO dto, HttpSession session) throws Exception {
		MemberDTO target = (MemberDTO) session.getAttribute("login"); 
		dto.setUploadFileDir("profile");
		
		String uploadFilePath = us.upload(dto);
		target.setProfile(uploadFilePath);
		
		ms.update_profile_photo(target);
		
		return "/member/user_show";
	}
}
