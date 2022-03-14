<%@page import="com.jcraft.jsch.Session"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp" %>

<main>
	<div class="home_bigImg">
		<div>
			<img src="${imgService }/home/fire.gif">
			<p>에어비앤비가<br>여행지를 찾아드릴게요!</p> 
		</div>
	</div>
	<div class="home_content">
		<div>
			<p>설레는 다음 여행을 위한 아이디어</p>
			<div class="home_content_list">
				<div style="background-image: url('${imgService }/home/content_list_img1.jpg');">
					<div style="background-color: #cc2d4a;">서울</div>
					<a href="${cpath }/house/houseList?location=서울&start_date=&end_date=&adult=&kid=&baby=&opt="></a>
				</div>
				<div style="background-image: url('${imgService }/home/content_list_img2.jpg');">
					<div style="background-color: #bc1a6e;">부산</div>
					<a href="${cpath }/house/houseList?location=부산&start_date=&end_date=&adult=&kid=&baby=&opt="></a>
				</div>
				<div style="background-image: url('${imgService }/home/content_list_img3.jpg');">
					<div style="background-color: #de3151;">인천</div>
					<a href="${cpath }/house/houseList?location=인천&start_date=&end_date=&adult=&kid=&baby=&opt="></a>
				</div>
				<div style="background-image: url('${imgService }/home/content_list_img4.jpg');">
					<div style="background-color: #d93b30;">제주도</div>
					<a href="${cpath }/house/houseList?location=제주도&start_date=&end_date=&adult=&kid=&baby=&opt="></a>
				</div>
			</div>
		</div>
		<div class="h_c_l_activity">
			<p>에어비앤비 체험 둘러보기</p>
			<div class="home_content_list">
				<div style="background-image: url('${imgService }/home/content_list_img5.jpg');">
					<div style="background-color: #cc2d4a;">부산</div>
					<a href="${cpath }/activity/activityList?location=부산&selected_date=&opt="></a>
				</div>
				<div style="background-image: url('${imgService }/home/content_list_img6.jpg');">
					<div style="background-color: #bc1a6e;">제주도</div>
					<a href="${cpath }/activity/activityList?location=제주도&selected_date=&opt="></a>
				</div>
			</div>
		</div>
	</div>
</main>
<script>
	let checkMsg = '${accessComleteMsg}'
	if(checkMsg != '') {
		alert(checkMsg)
		checkMsg = ''
		<% session.removeAttribute("accessComleteMsg"); %>
	}
</script>
<%@ include file="footer.jsp" %>