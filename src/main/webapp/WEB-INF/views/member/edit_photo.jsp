<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../header.jsp"%>

<link rel="stylesheet" href="${cpath }/resources/css/member/account_settings.css">


<div class="first_box">

	<div>
		<div class="account_title_box">
			<div class="personal_load">계정 > 프로필 > 사진 업데이트</div>
			<br>
			<div class="account_title" style="padding-bottom: 20px;">프로필 사진</div>
			
			<div class="update_profile_img_box">
				<form class="update_img_form" method="post" enctype="multipart/form-data">
					<div>
						<input class="update_profile_img" type="file" name="uploadFile">
					</div>
					<div style="padding-top:10px; display: flex;justify-content: center;">
						<input class="update_profile_img_save" type="submit" value="사진 저장">
					</div>
				</form>
			</div>
		</div>
	</div>
	

</div>

<%@ include file="../footer.jsp"%>