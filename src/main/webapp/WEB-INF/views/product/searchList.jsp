<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../header.jsp" %>

<script>
	const windowUrl = window.location.pathname
	const type = windowUrl.split('/')[2]
</script>

<main>
	<div class="product_main">
		<div class="search_result_section">
			<div class="product_list_head">
				<p>요금 및 유형은 검색하신 지역 전체 통계입니다.</p>
				<p>옵션 필터는 필터 이후 필터링된 항목 중에서만 표시됩니다.</p>
			</div>
			<div class="product_list"></div>
			<div class="product_list_footer">
				<div></div>
			</div>
		</div>
	</div>
	<div id="map"></div>
</main>

<script src="${cpath }/resources/js/product/searchListElement.js"></script>
<%@ include file="../footer.jsp" %>