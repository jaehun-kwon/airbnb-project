<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../header.jsp"%>

<link rel="stylesheet" href="${cpath }/resources/css/member/account_settings.css">


<div class="first_box">
	<div>
		<div class="account_title_box">
			<div class="personal_load">체험 사진 업데이트</div>
			<h1>act : ${act }</h1>
			<h1>${cpath }</h1>
			<br>
			<div class="account_title" style="padding-bottom: 20px;">체험 사진</div>
			
			<div class="update_profile_img_box">
				<form class="update_img_form" method="post" enctype="multipart/form-data" action="${cpath }/act_hosting_photo">
					<div>
						<div>
							<p>타이틀 사진(필수) </p>
							<input class="update_profile_img" type="file" name="act_img">
						</div>
						<div>
							<p>두번째 사진</p>
							<input class="update_profile_img" type="file" name="act_img">
						</div>
						<div>
							<p>세번째 사진</p>
							<input class="update_profile_img" type="file" name="act_img">
						</div>
					</div>
					<div style="padding-top:10px; display: flex;justify-content: center;">
						<input class="update_profile_img_save" type="submit" value="사진 등록">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

</div>
</body>
</html>