<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../header.jsp"%>

<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<script>
sessionStorage.setItem('login_name','${login.name}')
sessionStorage.setItem('login_nickname','${login.nickname}')
sessionStorage.setItem('login_birth','${login.birth}')
sessionStorage.setItem('login_email','${login.email}')
sessionStorage.setItem('login_phone','${login.phone_number}')
</script>

<div class="first_box" style="height: 125vh;">
	<div>
		<div class="account_title_box">
			<div class="personal_load">계정 > 개인정보</div>
			<br>
			<div class="account_title">개인 정보</div>
		</div>
	</div>
	<div class="personal_info_update_box">
		<div class="personal_info_update_list">
			<div class="personal_info_update_one">
				<div style="display: flex;">
					<div class="personal_info_update_contents">
						<div id="test" class="psersonal_info_update_contents_one">
							<h2 class="personal_info_update_contents_one_title">실명</h2>
						</div>
						<div id="test" class="personal_info_update_contents_two">
							<span class="before_name_box">${login.name }</span>
							<sapn class="before_name_explanation hidden">허가증이나 여권 등 여행 서류에 기재 되어 있는 이름을 말합니다.</sapn>
						</div>
						<div>
							<form class="update_name_form hidden" method="post">
								<input class="joinInput update_name_input" type="text" name="name" placeholder="이름" required autofocus value="${login.name }" >
								<input class="hidden" name="email" value="${login.email }">
								<button class="update_name_btn">저장</button>
							</form>
						</div>
					</div>
					<div style="height: 18px;">
						<button class="personal_info_update_btn modify_name_btn">수정</button>
						<button class="personal_info_update_btn_two modify_name_btn_cancel hidden">취소</button>
					</div>
				</div>
			</div>
		</div>
		<div class="personal_info_update_list">
			<div class="personal_info_update_one">
				<div style="display: flex;">
					<div class="personal_info_update_contents">
						<div class="psersonal_info_update_contents_one">
							<h2 class="personal_info_update_contents_one_title">별명</h2>
						</div>
						<div class="personal_info_update_contents_two">
							<span class="before_nickname_box">${login.nickname }</span>
						</div>
						<form class="update_nickname_form hidden" method="post">
								<input class="joinInput update_nickname_input" type="text" name="nickname" placeholder="별명" required autofocus value="${login.nickname }" >
								<input class="hidden" name="email" value="${login.email }">
								<button class="update_name_btn">저장</button>
						</form>
					</div>
					<div>
						<button class="personal_info_update_btn modify_nickname_btn">수정</button>
						<button class="personal_info_update_btn_two modify_nickname_btn_cancel hidden">취소</button>
					</div>
				</div>
			</div>
		</div>
		<div class="personal_info_update_list">
			<div class="personal_info_update_one">
				<div style="display: flex;">
					<div class="personal_info_update_contents">
						<div class="psersonal_info_update_contents_one">
							<h2 class="personal_info_update_contents_one_title">생년월일</h2>
						</div>
						<div class="personal_info_update_contents_two">
							<span class="before_birth_box">${login.birth }</span>
						</div>
						<form class="update_birth_form hidden" method="post">
								<input class="joinInput update_birth_input" type="date" name="birth" placeholder="생일" required autofocus value="${login.birth }" >
								<input class="hidden" name="email" value="${login.email }">
								<button class="update_name_btn">저장</button>
						</form>
					</div>
					<div>
						<button class="personal_info_update_btn modify_birth_btn">수정</button>
						<button class="personal_info_update_btn_two modify_birth_btn_cancel hidden">취소</button>
					</div>
				</div>
			</div>
		</div>
		<div class="personal_info_update_list">
			<div class="personal_info_update_one">
				<div style="display: flex;">
					<div class="personal_info_update_contents">
						<div class="psersonal_info_update_contents_one">
							<h2 class="personal_info_update_contents_one_title">이메일 주소</h2>
						</div>
						<div class="personal_info_update_contents_two">
							<span class="before_email_box">${login.email }</span>
							<span class="email_update_error hidden" style="color: red;">기존의 이메일로 변경 할 수 없습니다.</span>
						</div>
						<form class="update_email_form hidden" method="post">
								<input class="joinInput update_email_input" type="email" name="email" placeholder="이메일" required autofocus value="${login.email }" >
								<input class="hidden" name="before_email" value="${login.email }">
								<button class="modal_open hidden reLoginOpen"></button>
								<button class="update_name_btn">저장</button>
						</form>
					</div>
					<div>
						<button class="personal_info_update_btn modify_email_btn">수정</button>
						<button class="personal_info_update_btn_two modify_email_btn_cancel hidden">취소</button>
					</div>
				</div>
			</div>
		</div>
		<div class="personal_info_update_list">
			<div class="personal_info_update_one">
				<div style="display: flex;">
					<div class="personal_info_update_contents">
						<div class="psersonal_info_update_contents_one">
							<h2 class="personal_info_update_contents_one_title">전화번호</h2>
						</div>
						<div class="personal_info_update_contents_two">
							<span class="before_phone_box">${login.phone_number }</span>
							<sapn class="phone_explanation hidden">'-' 를 제외 하고 입력해 주세요.</sapn>
							<br><sapn class="before_phone_explanation hidden" style="color:red;">핸드폰 번호 를 잘못 입력 하였습니다.</sapn>
						</div>
						<form class="update_phone_form hidden" method="post">
								<input class="joinInput update_phone_input" type="text" name="phone_number" placeholder="핸드폰 번호" required autofocus value="${login.phone_number }" >
								<input class="hidden" name="email" value="${login.email }">
								<button class="update_name_btn">저장</button>
						</form>
					</div>
					<div>
						<button class="personal_info_update_btn modify_phone_btn">수정</button>
						<button class="personal_info_update_btn_two modify_phone_btn_cancel hidden">취소</button>
					</div>
				</div>
			</div>
		</div>
		<div class="personal_info_update_list">
			<div class="personal_info_update_one">
				<div style="display: flex;">
					<div class="personal_info_update_contents">
						<div class="psersonal_info_update_contents_one">
							<h2 class="personal_info_update_contents_one_title">정보 발급 신분증</h2>
						</div>
						<div class="personal_info_update_contents_two">
							<span>제공되지 않음</span>
						</div>
					</div>
					<div>
						<button class="personal_info_update_btn">수정</button>
					</div>
				</div>
			</div>
		</div>
		<div class="personal_info_update_list">
			<div class="personal_info_update_one">
				<div style="display: flex;">
					<div class="personal_info_update_contents">
						<div class="psersonal_info_update_contents_one">
							<h2 class="personal_info_update_contents_one_title">주소</h2>
						</div>
						<div class="personal_info_update_contents_two">
							<span>제공되지않음</span>
						</div>
					</div>
					<div>
						<button class="personal_info_update_btn">수정</button>
					</div>
				</div>
			</div>
		</div>
		<div class="personal_info_update_list">
			<div class="personal_info_update_one">
				<div style="display: flex;">
					<div class="personal_info_update_contents">
						<div class="psersonal_info_update_contents_one">
							<h2 class="personal_info_update_contents_one_title">비상 연락처</h2>
						</div>
						<div class="personal_info_update_contents_two">
							<span>제공되지 않음</span>
						</div>
					</div>
					<div>
						<button class="personal_info_update_btn">수정</button>
					</div>
				</div>
			</div>
		</div>
		<div class="personal_info_update_list">
			<div class="personal_info_update_one">
				<div style="display: flex;">
					<div class="personal_info_update_contents">
						<div class="psersonal_info_update_contents_one">
							<h2 class="personal_info_update_contents_one_title">중국 여행에 필요한 여권 정보</h2>
						</div>
						<div class="personal_info_update_contents_two">
							<span>제공되지 않음</span>
						</div>
					</div>
					<div>
						<button class="personal_info_update_btn">수정</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="update_explanation">
		<div class="update_explanation_box">
			<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 48px; width: 48px; fill: rgb(227, 28, 95); stroke: currentcolor;"><g stroke="none"><path d="m39 15.999v28.001h-30v-28.001z" fill-opacity=".2"></path><path d="m24 0c5.4292399 0 9.8479317 4.32667079 9.9961582 9.72009516l.0038418.27990484v2h7c1.0543618 0 1.9181651.8158778 1.9945143 1.8507377l.0054857.1492623v32c0 1.0543618-.8158778 1.9181651-1.8507377 1.9945143l-.1492623.0054857h-34c-1.0543618 0-1.91816512-.8158778-1.99451426-1.8507377l-.00548574-.1492623v-32c0-1.0543618.81587779-1.9181651 1.85073766-1.9945143l.14926234-.0054857h7v-2c0-5.5228475 4.4771525-10 10-10zm17 14h-34v32h34zm-17 14c1.6568542 0 3 1.3431458 3 3s-1.3431458 3-3 3-3-1.3431458-3-3 1.3431458-3 3-3zm0 2c-.5522847 0-1 .4477153-1 1s.4477153 1 1 1 1-.4477153 1-1-.4477153-1-1-1zm0-28c-4.3349143 0-7.8645429 3.44783777-7.9961932 7.75082067l-.0038068.24917933v2h16v-2c0-4.418278-3.581722-8-8-8z"></path></g></svg>
			<div class="update_explanation_text">
				수정할 수 있는 세부 정보는 무엇인가요?
			</div>
			<div class="update_explanation_text_explanation">
				에어비앤비에서 본인 인증시 사용하는 세부정보는 변경할 수 없습니다. 연락처정보와 일부 개인정보는 수정할 수 있지만, 다음번 예약 또는 숙소를 등록할 때 본인 인증 절차를 거쳐야 할 수도 있습니다.
			</div>
			<div class="update_explanation_box_line"></div>
			<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 48px; width: 48px; fill: rgb(227, 28, 95); stroke: currentcolor;"><g stroke="none"><path d="M24 9C14.946 9 7.125 15.065 4.74 23.591L4.63 24l.013.054c2.235 8.596 9.968 14.78 18.99 14.943L24 39c9.053 0 16.875-6.064 19.26-14.59l.11-.411-.013-.052c-2.234-8.597-9.968-14.78-18.99-14.944L24 9z" fill-opacity=".2"></path><path d="M24 5c11.18 0 20.794 7.705 23.346 18.413l.133.587-.133.587C44.794 35.295 35.181 43 24 43 12.82 43 3.206 35.295.654 24.588l-.133-.587.048-.216C2.985 12.884 12.69 5 24 5zm0 2C13.88 7 5.16 13.887 2.691 23.509l-.12.492.032.14c2.288 9.564 10.728 16.513 20.65 16.846l.377.01L24 41c10.243 0 19.052-7.056 21.397-16.861l.031-.14-.031-.138c-2.288-9.566-10.728-16.515-20.65-16.848l-.377-.01L24 7zm0 10a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"></path></g></svg>
			<div class="update_explanation_text">
				다른 사람에게 어떤 정보가 공개되나요?
			</div>
			<div class="update_explanation_text_explanation">
				에어비앤비는 예약이 확정된 후에만 호스트 및 게스트의 연락처 정보를 공개합니다.
			</div>
		</div>
	</div>
</div>

<script src="${cpath }/resources/js/member/personal_info.js"></script>

<%@ include file="../footer.jsp" %>
