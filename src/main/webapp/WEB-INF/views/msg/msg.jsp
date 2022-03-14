<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../header.jsp"%>
<main>
	<div class="middle_message">
		<div class="left_message">
			<div class="head1_message">
				<h3>메시지</h3>
			</div>
			<div class="body1_message"></div>
		</div>

		<div class="center_message">
				<h3 class="head2_sub_message"></h3>
			<div class="body2_message">
				<div id = "textarea_message" 
				 style="overflow-y: auto;
 							overflow-x: hidden;
  							width: 100%;
   						height: 87%;
   						margin : 0 auto;
   						">
			</div>
			</div>
			<div class ="bottom_message">
<%-- 					<img src="${cpath }/resources/img/이미지로고.png"> --%>
				<input id = "send_message" placeholder="메시지를 입력하세요" autofocus class="sender_message">
			</div>	
		</div>
	</div>
</main>
</div>

<script>
	const user = '${login.nickname}'
	const profile_message_insert ='${login.profile}'
</script>
<script src="${cpath }/resources/js/msg/messageElement.js"></script>

</body>
</html>