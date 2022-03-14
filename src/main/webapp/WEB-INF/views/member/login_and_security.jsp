<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../header.jsp"%>
<link rel="stylesheet"
	href="${cpath }/resources/css/member/account_settings.css">
<script>
	sessionStorage.setItem("login_password","${login.password}")
</script>

<div class="first_box">
	<div>
		<div class="account_title_box">
			<div class="personal_load">계정 > 로그인 및 보안</div>
			<br>
			<div class="account_title">로그인 및 보안</div>
		</div>
	</div>
	<div class="personal_info_update_box">
		<div class="personal_info_update_list">
			<div class="personal_info_update_one">
			</div>
		</div>
		<div style="margin-top: 32px;">
			<div>
				<h2>
					<div class="login_title">로그인</div>
				</h2>
			</div>
			<div>
				<div style="margin-top: 24px;">
					<div class="security_update">
						<div>
							<div class="security_update_title">비밀번호</div>
						</div>
						<div>
							<button class="security_update_btn">업데이트</button>
							<button class="security_update_btn_cancel hidden">취소</button>
						</div>
					</div>
					<div>
						<form class="security_password_form hidden" method="post">
							<div class="password_update_title">새 비밀번호</div>
							<input class="passwordInput_plus" type="password"  name="password" placeholder="비밀번호" required autofocus>
							<div class="password_update_title password_wrong">비밀번호 확인</div>
							<input class="passwordInput_another" type="password" placeholder="비밀번호 확인">
							<input class="hidden" type="email" name="email" value="${login.email }">
							<div>
								<button class="password_update_btn">비밀번호 변경</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div class="security_line">
			<div>
				<h2>
					<div class="login_title">계정</div>
				</h2>
			</div>
			<div>
				<div style="margin-top:24px;">
					<div class="security_update">
						<div>
							<div class="security_update_title">계정 비활성화</div>
						</div>
						<div>
							<button class="security_delete_btn modal_open">비활성화</button>
							
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
	<div class="update_explanation">
		<div class="update_explanation_box">
			<svg viewBox="0 0 24 24" role="presentation" aria-hidden="true"
				focusable="false"
				style="height: 40px; width: 40px; display: block; fill: rgb(255, 180, 0);">
				<path
					d="m5 20.5a.5.5 0 0 1 -.5.5h-.5v.5a.5.5 0 0 1 -1 0v-.5h-.5a.5.5 0 0 1 0-1h .5v-.5a.5.5 0 0 1 1 0v .5h.5a.5.5 0 0 1 .5.5zm1.5 1.5a.5.5 0 1 0 .5.5.5.5 0 0 0 -.5-.5zm16-20h-.5v-.5a.5.5 0 0 0 -1 0v .5h-.5a.5.5 0 0 0 0 1h .5v.5a.5.5 0 0 0 1 0v-.5h.5a.5.5 0 0 0 0-1zm-2.58 4.87a13.41 13.41 0 0 1 -6.76-3.2.37.37 0 0 0 -.63.26l.08 16.22a.38.38 0 0 0 .55.32 11.98 11.98 0 0 0 7.07-13.31.37.37 0 0 0 -.31-.3z"></path>
				<path
					d="m14.39 8.32a1.93 1.93 0 0 0 -3.66 0l-2.42 4.85a3.09 3.09 0 0 0 -.4 1.61 2.36 2.36 0 0 0 2.23 2.23 3.95 3.95 0 0 0 2.42-1.06 3.95 3.95 0 0 0 2.42 1.06 2.36 2.36 0 0 0 2.23-2.23 3.09 3.09 0 0 0 -.4-1.61zm-2.72 4.38c0-.05.01-1.23.89-1.23s.88 1.18.88 1.23a3.25 3.25 0 0 1 -.88 1.83 3.25 3.25 0 0 1 -.89-1.83zm3.31 3.31a2.92 2.92 0 0 1 -1.71-.77 4.3 4.3 0 0 0 1.17-2.54 2.02 2.02 0 0 0 -1.8-2.22l-.08-.01a2.02 2.02 0 0 0 -1.89 2.15l.01.08a4.29 4.29 0 0 0 1.17 2.54 2.92 2.92 0 0 1 -1.71.77 1.36 1.36 0 0 1 -1.23-1.23 2.13 2.13 0 0 1 .29-1.16l2.42-4.85c.33-.65.55-.76.94-.76s.61.11.94.76l2.42 4.85a2.13 2.13 0 0 1 .29 1.16 1.36 1.36 0 0 1 -1.23 1.23zm7.01-10.35a.5.5 0 0 0 -.43-.4 13.03 13.03 0 0 1 -8.68-4.57.52.52 0 0 0 -.77 0 13.03 13.03 0 0 1 -8.68 4.57.5.5 0 0 0 -.43.4c-1.58 8.19 1.55 14.02 9.3 17.31a.5.5 0 0 0 .39 0c7.75-3.29 10.87-9.11 9.3-17.31zm-9.49 16.3c-7.1-3.09-9.91-8.25-8.57-15.76a13.98 13.98 0 0 0 8.57-4.43 13.98 13.98 0 0 0 8.57 4.43c1.33 7.51-1.48 12.67-8.57 15.76z"
					fill="#484848"></path></svg>
			<div class="update_explanation_text">계정 보안 유지</div>
			<div class="update_explanation_text_explanation">
				에어비앤비는 최고의 보안을 위해 계정을 정기적으로 검토합니다.계정 보안을 강화할 수 있는 조치가 더 있다면
				알려드리겠습니다.<br> 게스트 및 호스트를 위한 안전 팁에 대해 알아보세요.
			</div>
		</div>
	</div>
</div>

<script src="${cpath }/resources/js/member/login_and_security.js"></script>

<%@ include file="../footer.jsp" %>
