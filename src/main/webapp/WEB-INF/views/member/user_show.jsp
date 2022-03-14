<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../header.jsp"%>


<div class="first_box">
	<div>
		<div class="user_show_box">
			<div class="user_img_info_box">
				<div>
					<img style="border-radius: 120px; margin-top:35px; width: 225px; height: 225px;" src="${login.profile }" onerror="this.src='${imgService}/profile/user_default.png'">
				</div>
				<div class="user_img_info_box_second">
					<a class="user_img_info_box_update user_show_profile_update_btn" href="${cpath }/edit_photo">사진 업데이트 하기</a>
				</div>
				<div>
					<div class="user_show_img_line"></div>
				</div>
				<div class="user_show_certification_box">
					<div style="padding-bottom:20px;">
						<h1 style="font-size: 22px;">${login.name } 인증 완료</h1>
					</div>
					<div class="user_show_certification user_show_profile_homeandjob">
						<span>
							<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:block;height:16px;width:16px;fill:currentColor" aria-hidden="true" role="presentation" focusable="false"><path d="M13.102 2.537L15.365 4.8l-9.443 9.443L.057 8.378 2.32 6.115l3.602 3.602z"></path></svg>
						</span>
						<span class="user_show_profile_hometown">
							이메일 인증
						</span>
					</div>
					<div class="user_show_certification user_show_profile_homeandjob">
						<span>
							<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="display:block;height:16px;width:16px;fill:currentColor" aria-hidden="true" role="presentation" focusable="false"><path d="M13.102 2.537L15.365 4.8l-9.443 9.443L.057 8.378 2.32 6.115l3.602 3.602z"></path></svg>
						</span>
						<span class="user_show_profile_hometown">
							전화번호 인증
						</span>
					</div>
				</div>
			</div>
			<div class="user_show_profile_box">
				<div class="user_show_box_intro">
					<div>
						<h1 style="font-size: 32px;">안녕하세요. 저는 ${login.name } 입니다.</h1>
					</div>
					<div>
						<button class="user_show_profile_update_btn profile_introduce_update_btn">프로필 수정하기</button>
					</div>
				</div>
				<div class="update_on_user_show_profile">
					<div class="user_show_profile_update_on">
						<div style="margin-bottom:24px;">
							<h1 style="font-size: 22px;">소개</h1>
							<div>${login.intro }</div>
						</div>
						<div>
							<div class="user_show_profile_homeandjob">
								<span>
									<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 16px; width: 16px; fill: currentcolor;"><path d="M8.602 1.147l.093.08 7.153 6.914-.696.718L14 7.745V14.5a.5.5 0 0 1-.41.492L13.5 15H10V9.5a.5.5 0 0 0-.41-.492L9.5 9h-3a.5.5 0 0 0-.492.41L6 9.5V15H2.5a.5.5 0 0 1-.492-.41L2 14.5V7.745L.847 8.86l-.696-.718 7.153-6.915a1 1 0 0 1 1.297-.08z"></path></svg>
								</span>
								<span class="user_show_profile_hometown">
									대한민국
								</span>
							</div>
						</div>
					</div>
					<div class="update_show_profile_update_off hidden">
						<form class="user_intro_update_form">
							<div>
								소개
							</div>
							<textarea style="width:500px; height: 300px;resize: none;" name="intro"></textarea>
							<input class="hidden" name="email" value="${login.email }">
							<div class="update_btn_opt">
							<input class="intro_update_save" type="submit" value="저장">
							<button class="intro_update_cancel">취소</button>
							</div>
						</form>
							<div>
							</div>
					</div>
					
					
				</div>
					<div>
						<div class="user_show_img_line"></div>
					</div>						
					<div>
					</div>
				</div>
				<div>
				
				</div>
				<div>
				
				</div>
				<div>
				
				</div>
				
			</div>
		</div>
	</div>

<script src="${cpath }/resources/js/member/user_show.js"></script>

</div>
</body>
</html>