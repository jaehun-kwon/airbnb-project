<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../header.jsp"%>

<div class="first_box">
	<div>
		<div class="account_title_box">
			<div class="account_title">계정</div>
			<div class="account_info">
				<span class="account_info_name">${login.name },</span>
				<span class="account_info_email">${login.email }</span>
			</div>
		</div>
		<div>
			<div>
				<div style="display: flex;">
					<div class="account_profile_card_size">
						<a class="account_profile_card" href="${cpath}/user_show">
							<div>
								<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="32px" height="32px"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/><path xmlns="http://www.w3.org/2000/svg" d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path xmlns="http://www.w3.org/2000/svg" d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/></svg>
							</div>
							<div>
								<div class="account_profile_card_privacy">
									프로필
								</div>
								<div class="account_profile_card_privacy_num">
									자기 소개 및 프로필 을 볼수 있습니다.
								</div>
							</div>
						</a>
					</div>
					<div class="account_profile_card_size">
						<a class="account_profile_card" href="${cpath }/personal_info">
							<div>
								<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 32px; width: 32px; fill: currentcolor;"><path d="m29 5c1.0543618 0 1.9181651.81587779 1.9945143 1.85073766l.0054857.14926234v18c0 1.0543618-.8158778 1.9181651-1.8507377 1.9945143l-.1492623.0054857h-26c-1.0543618 0-1.91816512-.8158778-1.99451426-1.8507377l-.00548574-.1492623v-18c0-1.0543618.81587779-1.91816512 1.85073766-1.99451426l.14926234-.00548574zm0 2h-26v18h26zm-3 12v2h-8v-2zm-16-8c1.6568542 0 3 1.3431458 3 3 0 .6167852-.1861326 1.1900967-.5052911 1.6668281 1.4972342.8624949 2.5052911 2.4801112 2.5052911 4.3331719h-2c0-1.3058822-.8343774-2.4168852-1.9990993-2.8289758l-.0009007-3.1710242c0-.5522847-.4477153-1-1-1-.51283584 0-.93550716.3860402-.99327227.8833789l-.00672773.1166211.00008893 3.1706743c-1.16523883.4118113-2.00008893 1.5230736-2.00008893 2.8293257h-2c0-1.8530607 1.00805693-3.470677 2.50570706-4.3343854-.3195745-.4755179-.50570706-1.0488294-.50570706-1.6656146 0-1.6568542 1.34314575-3 3-3zm16 4v2h-8v-2zm0-4v2h-8v-2z"></path></svg>
							</div>
							<div>
								<div class="account_profile_card_privacy">
									개인정보
								</div>
								<div class="account_profile_card_privacy_num">
									개인정보 및 연락처를 알려주세요
								</div>
							</div>
						</a>
					</div>
					<div class="account_profile_card_size">
						<a class="account_profile_card" href="${cpath }/login_and_security">
							<div>
								<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 32px; width: 32px; fill: currentcolor;"><path d="M16 .798l.555.37C20.398 3.73 24.208 5 28 5h1v12.5C29 25.574 23.21 31 16 31S3 25.574 3 17.5V5h1c3.792 0 7.602-1.27 11.445-3.832L16 .798zm-1 3.005c-3.2 1.866-6.418 2.92-9.648 3.149L5 6.972V17.5c0 6.558 4.347 10.991 10 11.459zm2 0V28.96c5.654-.468 10-4.901 10-11.459V6.972l-.352-.02c-3.23-.23-6.448-1.282-9.647-3.148z"></path></svg>
							</div>
							<div>
								<div class="account_profile_card_privacy">
									로그인 및 보안
								</div>
								<div class="account_profile_card_privacy_num">
									비밀번호를 변경하고 게정을 안정하게 보호하세요.
								</div>
							</div>
						</a>
					</div>
					
				</div>
				
			</div>
		</div>
	</div>
</div>


<%@ include file="../footer.jsp" %>













