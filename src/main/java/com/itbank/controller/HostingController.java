package com.itbank.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.itbank.activity.ActivityDTO;
import com.itbank.component.UploadDTO;
import com.itbank.house.HouseDTO;
import com.itbank.member.MemberDTO;
import com.itbank.service.ActivityService;
import com.itbank.service.HostingService;
import com.itbank.service.UploadService;

@Controller
@RequestMapping("/hosting")
public class HostingController {
	
	@Autowired private UploadService us;
	@Autowired private HostingService hs;
	@Autowired private ActivityService as;

	@GetMapping("/houseHosting")
	public void hosting() {}
	
	@GetMapping("/houseStart")
	public void hostingStart() {}
	
	@GetMapping("/houseChoice/{idx}")
	public String houseChoice(@PathVariable int idx, @RequestParam HashMap<String, String> param) {return "/hosting/houseChoice/" + idx;}
	
	@PostMapping("/houseChoice/{idx}")
	public String houseChoice(HouseDTO house, HttpSession session, MultipartHttpServletRequest mhsr) throws Exception {
		MemberDTO member = (MemberDTO) session.getAttribute("login");
		house.setHost_name(member.getNickname());
		
		List<MultipartFile> imgList = mhsr.getFiles("houseImg");
		String[] imgPathList = new String[5];
		for (int i = 0; i < imgList.size(); i++) {
			if(imgList.get(i).getOriginalFilename() != "") {
				UploadDTO tmp = new UploadDTO();
				tmp.setUploadFileDir("house");
				tmp.setUploadFile(imgList.get(i));
				
				imgPathList[i] = us.upload(tmp);
			}
		}
		house.setImg1(imgPathList[0] != null ? imgPathList[0]  : "");
		house.setImg2(imgPathList[1] != null ? imgPathList[1]  : "");
		house.setImg3(imgPathList[2] != null ? imgPathList[2]  : "");
		house.setImg4(imgPathList[3] != null ? imgPathList[3]  : "");
		house.setImg5(imgPathList[4] != null ? imgPathList[4]  : "");
		
		int row = hs.addHouse(house);
		String accessComleteMsg = row == 1 ? "등록에 성공하셨습니다." : "등록에 실패하셨습니다.";
		session.setAttribute("accessComleteMsg", accessComleteMsg);
		
		return "redirect:/";
	}
	
	@GetMapping("/experience_hosting")
	public void experience_hosting() {}
	
	@PostMapping("/experience_hosting")
	public String experience_hosting(ActivityDTO activity, HttpSession session, MultipartHttpServletRequest mhsr) throws Exception {

		List<MultipartFile> imgList = mhsr.getFiles("activityImg");
		String[] imgPathList = new String[3];
		for (int i = 0; i < imgList.size(); i++) {
			if(imgList.get(i).getOriginalFilename() != "") {
				UploadDTO tmp = new UploadDTO();
				tmp.setUploadFileDir("activity");
				tmp.setUploadFile(imgList.get(i));
				
				imgPathList[i] = us.upload(tmp);
			}
		}
		activity.setImg1(imgPathList[0] != null ? imgPathList[0]  : "");
		activity.setImg2(imgPathList[1] != null ? imgPathList[1]  : "");
		activity.setImg3(imgPathList[2] != null ? imgPathList[2]  : "");
		
		String category_result = activity.getCategory();
		category_result = category_result.replace(",", ";");
		category_result += ";";
		activity.setCategory(category_result);
		
		String opt_result = activity.getOpt();
		opt_result = opt_result.replace(",", ";");
		opt_result += ";";
		activity.setOpt(opt_result);

		int row = as.activityJoin(activity);
		String accessComleteMsg = row == 1 ? "등록에 성공하셨습니다." : "등록에 실패하셨습니다.";
		session.setAttribute("accessComleteMsg", accessComleteMsg);
		
		return "redirect:/";
	}
	
	@ExceptionHandler
	public String duplicateKeyException(DuplicateKeyException e, HttpSession session) {
		String accessComleteMsg = "등록에 실패하셨습니다.";
		session.setAttribute("accessComleteMsg", accessComleteMsg);
		return "redirect:/";
	}
}
