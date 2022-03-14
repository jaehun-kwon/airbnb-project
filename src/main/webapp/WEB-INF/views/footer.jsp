<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>



</div>
<footer>
	<div>
		<div>조원 소개</div>
		<div>
			<div>
				<p>조장 : 김주현</p>
			</div>
			<div>
				<p>조원 : 박정우</p>
			</div>
			<div>
				<p>조원 : 권재헌</p>
			</div>
			<div>
				<p>조원 : 권영현</p>
			</div>
		</div>
	</div>
	<div>
		<div>주요 기능</div>
		<div>
			<div>로그인 (제작: 권재헌)</div>
			<div>메시지 (제작: 권영현 / 김주현)</div>
			<div>예약 (제작: 김주현 / 박정우)</div>
		</div>
		<div>
			<div>지도 (제작: 김주현)</div>
			<div>검색 필터 (제작: 박정우)</div>
			<div>호스팅 (제작:권재헌, 박정우)</div>
		</div>
	</div>
	<div>
		<div>
			<span class="language">
	            <svg viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 16px; width: 16px; fill: currentcolor;">
	                <path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z"></path>
	            </svg>
	        </span>
	        <span style="margin-left: 10px;">한국어(KR)</span>
	        <span>₩ KRW</span>
		</div>
		<div>
			<span style="font-weight: normal; margin-left: 0;">© 2022 Airbnb, clone.</span>
		</div>
	</div>
</footer>

<script>
	const null_login = document.querySelectorAll('.null_login')
	const loginCheck = '${login}'
	
	if(loginCheck != '') {
		null_login.forEach(e => e.addEventListener('click', function(event) {
			event.preventDefault()
			interceptorOpenModal()
		}))
	}
</script>
<script src="${cpath }/resources/js/modal/modal.js"></script>
<script src="${cpath }/resources/js/public/set_icon.js"></script>

</body>
</html>