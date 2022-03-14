package com.itbank.service;

import java.sql.Date;
import java.util.Properties;
import java.util.Random;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

import com.itbank.activity.ActivityDTO;
import com.itbank.booking.BookingActivityDTO;
import com.itbank.booking.BookingHouseDTO;
import com.itbank.house.HouseDTO;
import com.itbank.member.MemberDTO;

@Service
public class MailService {
	public String getAuthNumber() {	// 인증 번호 만드는 함수
		Random ran = new Random();
		String authNumber="";
		for(int i =0;i < 6; i++) {
			authNumber += ran.nextInt(9);
		}
		return authNumber;
	}
	
	private String activityBookingEmailContent(MemberDTO loginUser, BookingActivityDTO bookingDTO, ActivityDTO activityDTO, Date dueDate) {
		String content = "<div style=\" width: 800px; height: 500px; margin: auto; padding: 0 30px; box-sizing: border-box;\">\r\n" + 
				"        <div style=\"display: flex; align-items: center; justify-content: center; margin: 25px 30px;\">\r\n" + 
				"            <div style=\"margin-top: 9px;\"><svg width=\"102\" height=\"32\" fill=\"rgb(255, 56, 92)\">\r\n" + 
				"                <path d=\"M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5zM41.54 24.12a5.02 5.02 0 01-3.95-1.83 6.55 6.55 0 01-1.6-4.48 6.96 6.96 0 011.66-4.58 5.3 5.3 0 014.08-1.86 4.3 4.3 0 013.7 1.92l.1-1.57h2.92V23.8h-2.93l-.1-1.76a4.52 4.52 0 01-3.88 2.08zm.76-2.88c.58 0 1.09-.16 1.57-.45.44-.32.8-.74 1.08-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.55.45zM53.45 8.46c0 .35-.06.67-.22.93-.16.25-.38.48-.67.64-.29.16-.6.22-.92.22-.32 0-.64-.06-.93-.22a1.84 1.84 0 01-.67-.64 1.82 1.82 0 01-.22-.93c0-.36.07-.68.22-.93.16-.3.39-.48.67-.64.29-.16.6-.23.93-.23a1.84 1.84 0 011.6.86 2 2 0 01.21.94zm-3.4 15.3V11.7h3.18v12.08h-3.19zm11.68-8.9v.04c-.15-.07-.35-.1-.5-.13-.2-.04-.36-.04-.55-.04-.89 0-1.56.26-2 .8-.48.55-.7 1.32-.7 2.31v5.93h-3.19V11.69h2.93l.1 1.83c.32-.64.7-1.12 1.24-1.48a3.1 3.1 0 011.81-.5c.23 0 .45.02.64.06.1.03.16.03.22.06v3.2zm1.28 8.9V6.74h3.18v6.5c.45-.58.96-1.03 1.6-1.38a5.02 5.02 0 016.08 1.31 6.55 6.55 0 011.6 4.49 6.96 6.96 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.1 1.57-2.92.03zm6.15-2.52c.57 0 1.08-.16 1.56-.45.44-.32.8-.74 1.08-1.25.26-.51.38-1.12.38-1.8 0-.67-.12-1.28-.38-1.79a3.75 3.75 0 00-1.08-1.25 2.95 2.95 0 00-3.12 0c-.45.32-.8.74-1.09 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.56.45zm7.51 2.53V11.69h2.93l.1 1.57a3.96 3.96 0 013.54-1.89 4.1 4.1 0 013.82 2.44c.35.76.54 1.7.54 2.75v7.24h-3.19v-6.82c0-.84-.19-1.5-.57-1.99-.38-.48-.9-.74-1.56-.74-.48 0-.9.1-1.27.32-.35.23-.64.52-.86.93a2.7 2.7 0 00-.32 1.35v6.92h-3.16zm12.52 0V6.73h3.19v6.5a4.67 4.67 0 013.73-1.89 5.02 5.02 0 013.95 1.83 6.57 6.57 0 011.59 4.48 6.95 6.95 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.09 1.57-2.93.03zm6.18-2.53c.58 0 1.09-.16 1.56-.45.45-.32.8-.74 1.09-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a3.63 3.63 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.95.45 1.55.45z\"></path>\r\n" + 
				"            </svg></div>\r\n" + 
				"            <div style=\"font-size: 24px; font-weight: bold; margin-left: 30px;\">[%s]님 <span style=\"color: rgb(255, 56, 92);\">TEAM AIRBNB</span> 예약 내역</div>\r\n" + 
				"        </div>\r\n" + 
				"        <div style=\"padding: 0 30px; border: 2px solid #aaa; border-radius: 20px;\">\r\n" + 
				"            <p>\r\n" + 
				"                <div style=\"font-weight: bold; font-size: 18px;\">체험 날짜</div>\r\n" + 
				"                <div style=\"margin-left: 30px; margin-top: 10px;\">%s</div>\r\n" + 
				"            </p>\r\n" + 
				"            <p>\r\n" + 
				"                <div style=\"font-weight: bold; font-size: 18px;\">게스트</div>\r\n" + 
				"                <div style=\"margin-left: 30px; margin-top: 10px;\">%s명</div>\r\n" + 
				"            </p>\r\n" + 
				"            <p>\r\n" + 
				"                <div style=\"font-weight: bold; font-size: 18px;\">예약 정보</div>\r\n" + 
				"                <div style=\"margin-left: 30px; margin-top: 10px;\">%s의 %s</div>\r\n" + 
				"                <div style=\"margin-left: 30px;\">%s</div>\r\n" + 
				"            </p>\r\n" + 
				"            <p>\r\n" + 
				"                <div style=\"font-weight: bold; font-size: 18px;\">가격</div>\r\n" + 
				"                <div style=\"margin-left: 30px; margin-top: 10px;\">%s원</div>\r\n" + 
				"            </p>\r\n" + 
				"            <div style=\"text-align: center; margin: auto; width: 550px; line-height: 25px;\">\r\n" + 
				"                [%s]님은 %s 내에 \r\n" + 
				"                <strong>국민은행 847901-01-227422</strong>\r\n" + 
				"                으로<br> <strong>%s원</strong>을 결제하셔야\r\n" + 
				"                 예약이 확정됩니다 해당 기일 이내에 <u><br>결제가 완료 되지 않을 경우</u>\r\n" + 
				"                 자동으로 <span style=\"color: red;\">예약이 취소</span>됩니다\r\n" + 
				"            </div>\r\n" + 
				"            <p style=\"text-align: center;\">\r\n" + 
				"                <a href=\"http://175.214.170.244/airbnb/\" style=\"color: blue;\">\r\n" + 
				"                    TEAM AIRBNB에 로그인을 하시면 여행 정보를 알 수 있고 호스트와 연락을 할 수 있습니다\r\n" + 
				"                </a>\r\n" + 
				"            </p>\r\n" + 
				"        </div>\r\n" + 
				"    </div>";
		
		content = String.format(content, 
				loginUser.getNickname(), bookingDTO.getSelected_date(), bookingDTO.getCount_person(),
				activityDTO.getHost_name(), activityDTO.getName(), activityDTO.getAddress(), activityDTO.getPrice() * bookingDTO.getCount_person(),
				loginUser.getNickname(), dueDate, activityDTO.getPrice() * bookingDTO.getCount_person());
		return content;
	}
	private String houseBookingEmailContent(MemberDTO loginUser, BookingHouseDTO bookingDTO, HouseDTO houseDTO, int stay, Date dueDate) {
		String content = "<div style=\" width: 800px; height: 500px; margin: auto; padding: 0 30px; box-sizing: border-box;\">" + 
				"        <div style=\"display: flex; align-items: center; justify-content: center; margin: 25px 30px;\">" + 
				"            <div style=\"margin-top: 9px;\"><svg width=\"102\" height=\"32\" fill=\"rgb(255, 56, 92)\">" + 
				"                <path d=\"M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5zM41.54 24.12a5.02 5.02 0 01-3.95-1.83 6.55 6.55 0 01-1.6-4.48 6.96 6.96 0 011.66-4.58 5.3 5.3 0 014.08-1.86 4.3 4.3 0 013.7 1.92l.1-1.57h2.92V23.8h-2.93l-.1-1.76a4.52 4.52 0 01-3.88 2.08zm.76-2.88c.58 0 1.09-.16 1.57-.45.44-.32.8-.74 1.08-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.55.45zM53.45 8.46c0 .35-.06.67-.22.93-.16.25-.38.48-.67.64-.29.16-.6.22-.92.22-.32 0-.64-.06-.93-.22a1.84 1.84 0 01-.67-.64 1.82 1.82 0 01-.22-.93c0-.36.07-.68.22-.93.16-.3.39-.48.67-.64.29-.16.6-.23.93-.23a1.84 1.84 0 011.6.86 2 2 0 01.21.94zm-3.4 15.3V11.7h3.18v12.08h-3.19zm11.68-8.9v.04c-.15-.07-.35-.1-.5-.13-.2-.04-.36-.04-.55-.04-.89 0-1.56.26-2 .8-.48.55-.7 1.32-.7 2.31v5.93h-3.19V11.69h2.93l.1 1.83c.32-.64.7-1.12 1.24-1.48a3.1 3.1 0 011.81-.5c.23 0 .45.02.64.06.1.03.16.03.22.06v3.2zm1.28 8.9V6.74h3.18v6.5c.45-.58.96-1.03 1.6-1.38a5.02 5.02 0 016.08 1.31 6.55 6.55 0 011.6 4.49 6.96 6.96 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.1 1.57-2.92.03zm6.15-2.52c.57 0 1.08-.16 1.56-.45.44-.32.8-.74 1.08-1.25.26-.51.38-1.12.38-1.8 0-.67-.12-1.28-.38-1.79a3.75 3.75 0 00-1.08-1.25 2.95 2.95 0 00-3.12 0c-.45.32-.8.74-1.09 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.56.45zm7.51 2.53V11.69h2.93l.1 1.57a3.96 3.96 0 013.54-1.89 4.1 4.1 0 013.82 2.44c.35.76.54 1.7.54 2.75v7.24h-3.19v-6.82c0-.84-.19-1.5-.57-1.99-.38-.48-.9-.74-1.56-.74-.48 0-.9.1-1.27.32-.35.23-.64.52-.86.93a2.7 2.7 0 00-.32 1.35v6.92h-3.16zm12.52 0V6.73h3.19v6.5a4.67 4.67 0 013.73-1.89 5.02 5.02 0 013.95 1.83 6.57 6.57 0 011.59 4.48 6.95 6.95 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.09 1.57-2.93.03zm6.18-2.53c.58 0 1.09-.16 1.56-.45.45-.32.8-.74 1.09-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a3.63 3.63 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.95.45 1.55.45z\"></path>" + 
				"            </svg></div>" + 
				"            <div style=\"font-size: 24px; font-weight: bold; margin-left: 30px;\">[%s]님 <span style=\"color: rgb(255, 56, 92);\">TEAM AIRBNB</span> 예약 내역</div>" + 
				"        </div>" + 
				"        <div style=\"padding: 0 30px; border: 2px solid #aaa; border-radius: 20px;\">" + 
				"            <p>" + 
				"                <div style=\"font-weight: bold; font-size: 18px;\">여행 날짜</div>" + 
				"                <div style=\"margin-left: 30px; margin-top: 10px;\">%s ~ %s (%s박)</div>" + 
				"            </p>" + 
				"            <p>" + 
				"                <div style=\"font-weight: bold; font-size: 18px;\">예약 정보</div>" + 
				"                <div style=\"margin-left: 30px; margin-top: 10px;\">%s의 %s</div>" + 
				"                <div style=\"margin-left: 30px;\">%s</div>" + 
				"            </p>" + 
				"            <p>" + 
				"                <div style=\"font-weight: bold; font-size: 18px;\">가격</div>" + 
				"                <div style=\"margin-left: 30px; margin-top: 10px;\">%s원</div>" + 
				"            </p>" + 
				"            <div style=\"text-align: center; margin: auto; width: 550px; line-height: 25px;\">" + 
				"                [%s]님은 %s 내에 " + 
				"                <strong>국민은행 847901-01-227422</strong>" + 
				"                으로<br> <strong>%s원</strong>을 결제하셔야" + 
				"                 예약이 확정됩니다 해당 기일 이내에 <u><br>결제가 완료 되지 않을 경우</u>" + 
				"                 자동으로 <span style=\"color: red;\">예약이 취소</span>됩니다" + 
				"            </div>" + 
				"            <p style=\"text-align: center;\">" + 
				"                <a href=\"http://175.214.170.244/airbnb/\" style=\"color: blue;\">" + 
				"                    TEAM AIRBNB에 로그인을 하시면 여행 정보를 알 수 있고 호스트와 연락을 할 수 있습니다" + 
				"                </a>" + 
				"            </p>" + 
				"        </div>" + 
				"    </div>";
		
		
		content = String.format(content, 
				loginUser.getNickname(), bookingDTO.getStart_date(), bookingDTO.getEnd_date(), stay,
				houseDTO.getHost_name(), houseDTO.getName(), houseDTO.getAddress(), houseDTO.getPrice() * stay,
				loginUser.getNickname(), dueDate, houseDTO.getPrice() * stay);
		return content;
	}
	
	private Session mailSetting(String username, String password) {
		String host ="smtp.naver.com";	// Simple Mail Transfer Protocol
		int port = 465;	// 네트워크 포트번호
		
		
		Properties props = System.getProperties();
		props.put("mail.smtp.host",host);				// 메일을 보낼 서버이름
		props.put("mail.smtp.port",port);				// 메일을 보낼 서버포트
		props.put("mail.smtp.auth","true");				// 메일을 보낼때 인증이 필요한가
		props.put("mail.smtp.ssl.enable","true");		// 메일 보낼때 암호화 처리 하는가
		props.put("mail.smtp.trust",host);				// 메일 보내는 신뢰할 수 있는 서버가 어디인가
		
		Session mailSession = Session.getDefaultInstance(props,new Authenticator() {
			String un = username;	// 멤버필드
			String pw = password;
			
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(un,pw);
			}
		});
		return mailSession;
	}
	
	public String sendMail(String email, String authNumber, String account) {
		final String username=account.split("/")[0];
		final String password=account.split("/")[1];
		
		String subject = "비밀번호 재설정 하기";	//	 메일 제목
		String tag = "<div style=\"font-size:20px;\">"	// 메일 내용
				+ "새로운 비밀번호 는 [<span style=\"font-size: 24px; font-weight: bold\">%s</span>] 입니다.</div>";
		String body = String.format(tag, authNumber);	// 메일 내용
		
		Session mailSession = mailSetting(username, password);
		
		// 메일 보낼 내용 - Message 를 구성한다.
		Message mimeMessage = new MimeMessage(mailSession);
		
		try {
			// 보내는 사람 의 주소
			mimeMessage.setFrom(new InternetAddress(username + "@naver.com"));
			
			// 받는 사람 의 주소
			mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
			
			mimeMessage.setSubject(subject); 		// 제목
//			mimeMessage.setText(body);				// 내용
			mimeMessage.setContent(body,"text/html;charset=utf-8");	// 내용(HTML)
			
			
			Transport.send(mimeMessage);
			
		} catch (MessagingException e) {
			System.out.println("주소가 잘못 되었습니다.");
		}
		
		return authNumber; // 컨트롤러로 인증번호 반환
	}
	
	public void sendBookingHouseMail(MemberDTO loginUser, BookingHouseDTO bookingDTO, HouseDTO houseDTO, int stay, Date dueDate, String account) {
		final String username=account.split("/")[0];
		final String password=account.split("/")[1];
		
		String subject = "TEAM AIRBNB 예약 내역입니다.";	//	 메일 제목
		String body= houseBookingEmailContent(loginUser, bookingDTO, houseDTO, stay, dueDate);
		
		Session mailSession = mailSetting(username, password);
		mailSession.setDebug(true); // 메일 보내는 과정의 디버깅을 화면에 출력하기로 설정
		Message mimeMessage = new MimeMessage(mailSession);
		
		try {
			mimeMessage.setFrom(new InternetAddress(username + "@naver.com"));
			mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(loginUser.getEmail()));
			
			mimeMessage.setSubject(subject); 
			mimeMessage.setContent(body,"text/html;charset=utf-8");	
			
			Transport.send(mimeMessage);
			
		} catch (MessagingException e) {
			System.out.println("주소가 잘못 되었습니다.");
		}
	}

	public void sendBookingActivityMail(MemberDTO loginUser, BookingActivityDTO bookingDTO, ActivityDTO activityDTO, Date dueDate, String account) {
		final String username=account.split("/")[0];
		final String password=account.split("/")[1];
		
		String subject = "TEAM AIRBNB 예약 내역입니다.";	//	 메일 제목
		String body= activityBookingEmailContent(loginUser, bookingDTO, activityDTO, dueDate);
		
		Session mailSession = mailSetting(username, password);
		mailSession.setDebug(true); // 메일 보내는 과정의 디버깅을 화면에 출력하기로 설정
		Message mimeMessage = new MimeMessage(mailSession);
		
		try {
			mimeMessage.setFrom(new InternetAddress(username + "@naver.com"));
			mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(loginUser.getEmail()));
			
			mimeMessage.setSubject(subject); 
			mimeMessage.setContent(body,"text/html;charset=utf-8");	
			
			Transport.send(mimeMessage);
			
		} catch (MessagingException e) {
			System.out.println("주소가 잘못 되었습니다.");
		}
	}

}

