<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../header.jsp" %>
<c:set var="reviewCnt" value=" ${reviewList.size() }" />
<main id="detail_house">
	<div class="d_h_name">${product.name }</div>
	<div class="d_h_menu">
	<div class="d_h_m_left">
			<div>
				<span class="review_star_icon" data-size="14"></span>
				<fmt:formatNumber value="${reviewAvg }" pattern="0.00"/>
			</div>
			<div class="d_h_m_l_review reviewModal modal_open">후기 ${reviewCnt }개</div>
			<div class="d_h_m_l_add modal_open">${product.location}</div>
		</div>
		<div class="d_h_m_right">
			<div class="d_h_m_r_copy">주소 복사</div>
			<div class="d_h_m_r_wish">
				<span class="wish_heart" data-idx="${product.idx }" data-size="16"></span>
				저장
			</div>
		</div>
	</div>
	<div class="d_h_img">
		<div class="d_h_i_main">
			<img src="${product.img1}">
		</div>
		<div class="d_h_i_sub">
			<div>
				<img src="${product.img2}">
			</div>
			<div>
				<img src="${product.img3}">
			</div>
			<c:if test="${type == 'house' }">
			<div>
				<img src="${product.img4}">
			</div>
			<div>
				<img src="${product.img5}">
			</div>
			</c:if>
		</div>
	</div>
	<div class="d_h_content">
		<div class="d_h_c_left">
			<div class="d_h_c_l_host">
				<div class="d_h_c_l_h_info">
					<div class="d_h_c_l_h_i_name">
						${product.host_name}이 호스팅하는 
						<c:if test="${type == 'house' }">숙소</c:if>
						<c:if test="${type == 'activity' }">체험</c:if>
					</div>
					<c:if test="${type == 'house' }">
					<div class="d_h_c_l_h_i_info">최대인원 ${product.count_person}명, 침실 ${product.count_room}개, 욕실 ${product.count_bath}개</div>
					</c:if>
				</div>
				<div class="d_h_c_l_profile">
					<img src="${host.profile}" onerror="this.src='${imgService}/profile/user_default.png'">
				</div>
				<div class="d_h_c_l_msg"><a href="${cpath }/msg?partner=${product.host_name}">호스트에게 연락하기</a></div>
			</div>
			<c:if test="${type == 'house' }">
				<div class="d_h_c_l_categorys">
					<c:forEach var="category" items="${categorys}">
						<div class="d_h_c_l_category houseCategory ${category }"></div>
					</c:forEach>
					<c:if test="${cleanAvg >= 4.8}">
						<div class="d_h_c_l_category houseCategory clean"></div>
					</c:if>
					<c:if test="${accuracyAvg >= 4.8}">
						<div class="d_h_c_l_category houseCategory accuracy"></div>
					</c:if>
				</div>
			</c:if>
			<div class="d_h_c_l_intro">
				<div>
			        ${product.intro }
				</div>
				<div class="d_h_c_l_i_more">더보기 ></div>
			</div>
			<div class="d_h_c_l_opts">
				<div class="d_h_c_l_o_title">
					<c:if test="${type == 'house' }">숙소 편의시설</c:if>
					<c:if test="${type == 'activity' }">제공 항목</c:if>
					 ( ${opts.size() }개 )
				</div>
				<div class="d_h_c_l_o_content">
				<c:forEach var="i" begin="0" end="5">
					<div class="d_h_c_l_opt ${opts[i] }"></div>
				</c:forEach>
				</div>
				<c:if test="${opts.size() > 6 }">
					<div class="modal_open">옵션 더보기</div>
				</c:if>
			</div>
		</div>
		<div class="d_h_c_right">
			<div class="booking_box">
				<div class="booking_box_info">
					<div>
						<div><fmt:formatNumber value="${product.price }" type="currency"/></div>
						<c:if test="${type == 'house' }">
							/박
						</c:if>
						<c:if test="${type == 'activity' }">
							/인
						</c:if>
					</div>
					<div>
						<span class="review_star_icon" data-size="10"></span>
						<fmt:formatNumber value="${reviewAvg }" pattern="0.00"/>
					</div>
					<div class="d_h_m_l_review reviewModal modal_open">후기 ${reviewCnt }개</div>
				</div>
				<form action="${cpath }/${type }/booking/${product.idx }" method="GET" >
				<div class="booking_box_choose">
					<div class="detail_box">
						<div class="d_b_location" tabindex="1" style="display:none;">
		               		<div>위치</div>
		                	<div><input type="text" name="location" placeholder="어디로 여행가세요?"></div>
                		</div>
                		<c:if test="${type == 'house' }">
							<div class="b_b_checkIn checkIn" tabindex="1">
		               			<div>체크인</div>
			                	<div>
			                		<input type="text" placeholder="날짜 입력" disabled>
		                			<input class="hidden_input start_date_value" type="text" name="start_date" required>
			                	</div>
			                	<div class="hidden_div calendar_div"></div>
			               	</div>
		                	<div class="b_b_checkOut checkOut" tabindex="1">
		                		<div>체크아웃</div>
			                	<div>
			                		<input type="text" placeholder="날짜 입력" disabled>
			                		<input class="hidden_input end_date_value" type="text" name="end_date"  required>
			                	</div>
		                		<div class="hidden_div calendar_div"></div>
		                	</div>
		                </c:if>
                		<c:if test="${type == 'activity' }">
							<div class="b_b_checkIn checkIn b_b_selected" tabindex="1">
		               			<div>체험 날짜</div>
			                	<div>
			                		<input type="text" placeholder="날짜 입력" disabled>
		                			<input class="hidden_input start_date_value" type="text" name="selected_date"  required>
			                	</div>
			                	<div class="hidden_div calendar_div"></div>
			               	</div>
		                	<div class="b_b_checkOut checkOut disabled_box" tabindex="1">
		                		<div></div>
			                	<div>
			                		<input type="text" placeholder="날짜 입력" disabled>
			                		<input class="hidden_input end_date_value" type="text" name="end_date" disabled>
			                	</div>
		                		<div class="hidden_div calendar_div"></div>
		                	</div>
		                </c:if>
                	</div>
	                	
                	<div class="detail_box">
	                	<div class="b_b_guestCount guestCount" tabindex="1">
                		<div>
                			<div>인원</div>
	                		<div>
	                			<input type="text" placeholder="게스트 추가" disabled>
	                			<input class="hidden_input" type="text" name="adult" required>
	                			<input class="hidden_input" type="text" name="kid">
	                			<input class="hidden_input" type="text" name="baby">
	                		</div>
                		</div>
		                	<div class="hidden_div"></div>
                		</div>
	               		<input type="submit" id="hidden_submit2" class="hidden_submit">
					</div>
				</div>
				</form>
				<label for="hidden_submit2"><div class="booking_box_btn">예약하기</div></label>
				<div class="booking_box_ex">예약 확정 전에는 요금이 청구되지 않습니다</div>
					<div class="booking_box_price"></div>
					<div class="booking_box_result"></div>
			</div>
		</div>
	</div>
	<div class="d_h_review">
		<div class="d_h_r_title">
			<span class="review_star_icon" data-size="18"></span>
			<fmt:formatNumber value="${reviewAvg }" pattern="0.00"/> 
			후기${reviewCnt }개
		</div>
		<c:if test="${cleanAvg != null }">
		<div class="d_h_r_Score">
			<div class="d_h_r_s_clean">
				<div>청결도</div>
				<div class="d_h_scoreBar">
					<div class="d_h_s_black"></div>
					<div class="d_h_s_grey"></div>
				</div>
				<div><fmt:formatNumber value="${cleanAvg }" pattern="0.00"/></div>
			</div>
			<div class="d_h_r_s_accuracy">
				<div>정확성</div>
				<div class="d_h_scoreBar">
					<div class="d_h_s_black"></div>
					<div class="d_h_s_grey"></div>
				</div>
				<div><fmt:formatNumber value="${accuracyAvg }" pattern="0.00"/></div>
			</div>
			<div class="d_h_r_s_communication">
				<div>의사소통</div>
				<div class="d_h_scoreBar">
					<div class="d_h_s_black"></div>
					<div class="d_h_s_grey"></div>
				</div>
				<div><fmt:formatNumber value="${communicationAvg }" pattern="0.00"/></div>
			</div>
		</div>
		</c:if>
		<div class="d_h_r_content">
			<c:forEach var="review" items="${reviewList}" begin="0" end="5">
				<div class="d_h_r_c_review">
					<div class="d_h_r_c_r_member">
						<div class="d_h_r_c_r_m_profile">
							<img src="${review.profile}" onerror="this.src='${imgService}/profile/user_default.png'">
						</div>
						<div class="d_h_r_c_r_m_name">
							<div>${review.writer }</div>
							<div>
								<fmt:formatDate value="${review.review_date }" pattern="YYYY년 MM월"/> 
							</div>
						</div>
					</div>
					<div class="d_h_r_c_r_content">${review.review_content}</div>
				</div>
			</c:forEach>
		</div>
		<div class="modal_open reviewModal">후기 ${reviewCnt }개 더보기</div>
	</div>
	<div class="d_h_location">
		<div class="d_h_title">호스팅 지역</div>
		<div class="d_h_l_map">
			<div class="d_h_l_m_map"></div>
			<button class="d_h_l_m_up">+</button>
			<button class="d_h_l_m_down">-</button>
		</div>
		<div class="d_h_l_address">${product.address }</div>
	</div>
</main>

<script>
	const type = '${type}'
	const price = ${product.price}
	const address = '${product.address}'
	let reviewAvg = ${reviewAvg}
	const reviewCnt = ${reviewCnt}
	
	let cleanAvg, accuracyAvg, communicationAvg
	if (type == 'house') {
		cleanAvg = ${cleanAvg}
		cleanAvg = cleanAvg.toFixed(2)
		accuracyAvg = ${accuracyAvg}
		accuracyAvg = accuracyAvg.toFixed(2)
		communicationAvg = ${communicationAvg}
		communicationAvg = communicationAvg.toFixed(2)
	}
	const productName = '${product.name}'
	const opts = '${opts}'
</script>
<script src="${cpath }/resources/js/product/detailElement.js"></script>

<%@ include file="../footer.jsp" %>