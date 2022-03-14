package com.itbank.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.itbank.member.MemberDTO;
import com.itbank.member.SnsMemberDTO;

public class LoginInterceptor extends HandlerInterceptorAdapter{

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		HttpSession session = request.getSession();
	    MemberDTO login = (MemberDTO) session.getAttribute("login");
	    SnsMemberDTO naverLogin = (SnsMemberDTO) session.getAttribute("naver_login");
	    SnsMemberDTO kakaoLogin = (SnsMemberDTO) session.getAttribute("kakao_login");
	    if(login != null || naverLogin != null || kakaoLogin != null) {
	       return true;
	    }
		
		String referer = request.getHeader("referer");
		String homepageURL = request.getRequestURL().toString();
		String[] arr = homepageURL.split("airbnb");
		String homepage = arr[0] + "airbnb/";
	      
		if(referer == null || referer.equals(homepage)) {
			response.sendRedirect(request.getContextPath() + "/?loginmodal=open");
		} else if (referer.contains("?loginmodal") == false) {
			response.sendRedirect(referer + "&loginmodal=open");
		} else {
			response.sendRedirect(referer);
		}
		return false;
	}
}
