<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../header.jsp" %>
<c:set var="cpath" value="${pageContext.request.contextPath }" />
<link rel="stylesheet" type="text/css" href="${cpath }/resources/css/hosting/experience_hosting.css">
    
<div class="one_box">
	<div class="experience_hosting_title">
		<div>
			<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 50px; width: 50px; fill: rgb(0, 132, 137);"><path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.267 3.42-6.414 3.615l-.28.019-.267.006C5.377 31 2.5 28.584 2.5 24.522l.005-.469c.026-.928.23-1.768.83-3.244l.216-.524c.966-2.298 6.083-12.989 7.707-16.034C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.692l-.345.836c-.427 1.071-.573 1.655-.605 2.24l-.009.33v.206C4.5 27.395 6.411 29 8.857 29c1.773 0 3.87-1.236 5.831-3.354-2.295-2.938-3.855-6.45-3.855-8.91 0-2.913 1.933-5.386 5.178-5.42 3.223.034 5.156 2.507 5.156 5.42 0 2.456-1.555 5.96-3.855 8.907C19.277 27.766 21.37 29 23.142 29c2.447 0 4.358-1.605 4.358-4.478l-.004-.411c-.019-.672-.17-1.296-.714-2.62l-.248-.6c-1.065-2.478-5.993-12.768-7.538-15.664C18.053 3.539 17.24 3 16 3zm.01 10.316c-2.01.021-3.177 1.514-3.177 3.42 0 1.797 1.18 4.58 2.955 7.044l.21.287.174-.234c1.73-2.385 2.898-5.066 2.989-6.875l.006-.221c0-1.906-1.167-3.4-3.156-3.421h-.001z"></path></svg>
		</div>
		<div style="padding-left: 30px;">
			<h1 style="margin: 0px;font-size:30px;">체험 호스팅 하기</h1>
		</div>
	</div>
	
	<div>
		<div class="experience_hosting_intro_box">
			<div class="hosting_intro_box_title">
				자신의 아이디어로 체험을 호스팅 하세요
			</div>
			<div class="hosting_intro_box_second_title">
				<div style="font-size: 26px;">
					게스트와 직접대면하고 참여하는 체험입니다.
				</div>
				<div>
					<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 32px; width: 32px; fill: currentcolor;"><path d="M22 5a6 6 0 0 1 3.643 10.768 9.003 9.003 0 0 1 5.353 7.967L31 24h-2a7.002 7.002 0 0 0-5.999-6.929v-2.197A4.002 4.002 0 0 0 22 7a4 4 0 0 0-3.679 5.574A4.991 4.991 0 0 1 21 17a4.986 4.986 0 0 1-1.599 3.665 9.003 9.003 0 0 1 5.595 8.07L25 29h-2a7.002 7.002 0 0 0-5.999-6.929v-2.242a3.001 3.001 0 1 0-2 0L15 22.071a7.002 7.002 0 0 0-5.996 6.688L9 29H7a9.003 9.003 0 0 1 5.6-8.335 5 5 0 0 1 1.077-8.093A4 4 0 1 0 9 14.874v2.197a7.002 7.002 0 0 0-5.996 6.688L3 24H1a9.002 9.002 0 0 1 5.357-8.232A6 6 0 1 1 15.917 10h.166A6.002 6.002 0 0 1 22 5z"></path></svg>
				</div>
			</div>
			<div class="line"></div>
			<div class="exp_hosting_form_box">
				<form method="POST"  enctype="multipart/form-data">
					<input class="hidden" name="host_name" value="${login.nickname }">
					<input class="exp_hosting_input_name" type="text" name="name" required placeholder="체험 이름을 입력해 주세요"><br>
					<input class="exp_hosting_input_style" type="text" name="address" placeholder="주소를 입력해주세요" required><br>
					<div>
					<input class="exp_hosting_input_style" type="number" name="price" placeholder="가격을 책정 해 주세요" required>
					<span class="exp_hosting_money">원</span>
					</div>
					<br>
					<div class="exp_hosting_category" style="margin-bottom:20px;">
						<div class="exp_hosting_category_title">체험 카테고리</div>
						<div>
							<input type="checkbox" name="category" value="cultureAndArt" checked>문화예술
							<input type="checkbox" name="category" value="culture">예술
							<input type="checkbox" name="category" value="photo">사진
							<input type="checkbox" name="category" value="drawing">그림
							<input type="checkbox" name="category" value="nature">자연 및 야외활동<br>
							<input type="checkbox" name="category" value="outdoor">야외활동
							<input type="checkbox" name="category" value="hiking">하이킹
							<input type="checkbox" name="category" value="fishing">낚시
							<input type="checkbox" name="category" value="animal">동물
							<input type="checkbox" name="category" value="habitat">동물 서식지
							<input type="checkbox" name="category" value="farm">농장 동물
						</div>
					</div>
					<div class="exp_hosting_category">
						<div class="exp_hosting_category_title">체험 옵션</div>
						<div>
							<input type="checkbox" name="opt" value="equipment" checked>장비
							<input type="checkbox" name="opt" value="drink">음료
							<input type="checkbox" name="opt" value="ticket">티켓
							<input type="checkbox" name="opt" value="transportation">교통
						</div>
					</div>
					<div class="exp_hosting_category">
						<div class="exp_hosting_category_title">검색어로 등록할 지명이름</div>
						<input class="exp_hosting_input_style locationCheck" type="text" name="location" placeholder="ex)제주특별자치도 >> 제주도">
					</div>
					<div>
						<textarea class="exp_hosting_input_intro" name="intro" required placeholder="체험에 대해서 설명 해주세요" style="width:580px;height: 300px; resize: none;"></textarea><br>
					</div>
					<div class="exp_hosting_category">
						<div class="exp_hosting_category_title">대표 사진 등록</div>
						<input class="insert_exp_hosting_img" type="file" name="activityImg" required>
						<div class="exp_hosting_category_title">추가 사진 등록</div>
						<input class="insert_exp_hosting_img" type="file" name="activityImg">
						<div class="exp_hosting_category_title">추가 사진 등록</div>
						<input class="insert_exp_hosting_img" type="file" name="activityImg">
					</div>
					<div>
						<input class="exp_hosting_Btn" type="submit" value="체험 호스팅">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<script>
	addressCheck()
</script>
</div>
</body>
</html>
