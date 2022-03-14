<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../header.jsp"%>
<c:if test="${param.start_date != '' and param.end_date != '' }">
	<c:set var="stay" value="${(param.end_date - param.start_date) / (60*60*24*1000)}" />
</c:if>
<c:set var="personCnt" value="${param.adult + param.kid }" />

<main id="booking_check">
	<div class="booking_title">
		<a href="${beforeURL }">&lt;</a> 확인 및 결제
	</div>
	<div class="booking_content">
		<div class="b_c_left">
			<div class="login_check">
				<div>안녕하세요, 계정에 로그인하셨습니다.</div>
				<div>계속 진행하려면 예약 세부정보를 확인해주세요.</div>
			</div>
			<div class="b_c_l_title">예약정보</div>
			<div class="b_c_l_date">
				<div>날짜</div>
				<div></div>
			</div>
			<div class="b_c_l_person">
				<div>게스트</div>
				<div>${personCnt} 명</div> 
			</div>
			<div class="b_c_l_product">
				<div>예약 정보</div>
				<div>${product.host_name }의 ${product.name }</div>
				<div>${product.address }</div>
			</div>
			<div>
				코로나19로 인한 여행문제에는 정상참작이 가능한 상황 정책이 적용되지 않습니다, <strong>자세히 알아보기</strong>
			</div>
			<div class="b_c_l_bookingBtn">예약 진행</div>
		</div>
		<div class="b_c_right">
			<div class="b_c_r_box">
				<div class="b_c_r_b_product">
					<div><img src="${product.img1}"></div>
					<div>
						<div class="b_c_r_b_p_info">
							<div class="b_c_r_b_p_i_productcategory">카테고리</div>
							<div>${product.name }</div>
						</div>
						<div class="b_c_r_b_p_review">
							<div>
								<span class="review_star_icon" data-size="10"></span> 
								<fmt:formatNumber value="${reviewAvg }" type="number" pattern="#.##"/> (${reviewList.size()})
							</div>
						</div>
					</div>
				</div>
				<div class="b_c_r_b_price">
					<div>요금 세부정보</div>
					<div>
						<fmt:formatNumber value="${product.price }" type="currency"/> x 
						<c:if test="${type == 'house' }">
							<fmt:formatNumber value="${stay }" type="number" pattern="#" /> 박
							<div><fmt:formatNumber value="${product.price * stay }" type="currency"/></div>
						</c:if>
						<c:if test="${type == 'activity' }">
							<fmt:formatNumber value="${personCnt }" type="number" pattern="#" /> 인
							<div><fmt:formatNumber value="${product.price * personCnt }" type="currency"/></div>
						</c:if>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<script>
	const beforeURL = '${beforeURL}'
	const host = '${product.host_name }'
	const type = '${type}'
	const user = '${login.nickname}'
	const productName = '${product.name}'
</script>
<script src="${cpath }/resources/js/product/bookingElement.js"></script>

<%@ include file="../footer.jsp"%>