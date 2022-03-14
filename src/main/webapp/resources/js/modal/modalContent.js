
const modal_inner = document.querySelector('.modal_inner')
const modal_header = document.querySelector('.modal_header')
const modal_content = document.querySelector('.modal_content')

function renderProductReview(review) {
	const dom = document.createElement('div')
	const review_date = new Date(review.review_date).toLocaleDateString().split('.')
	const year = review_date[0]
	const month = review_date[1]
	dom.classList.add('d_h_r_c_review')
	dom.innerHTML += `<div class="d_h_r_c_r_member">
						<div class="d_h_r_c_r_m_profile">
							<img src="${review.profile}" onerror="this.src='${imgService}/profile/user_default.png'">
						</div>
						<div class="d_h_r_c_r_m_name">
							<div>${review.writer }</div>
							<div>
								${year }년 ${month}월
							</div>
						</div>
					</div>
					<div class="d_h_r_c_r_content_modal">${review.review_content}</div>`
	return dom
}

function reviewWriteBox(type) {
	const dom = document.createElement('form')
	dom.classList.add('review_write_box')
	dom.addEventListener('submit', insertReview)
	const star = '<div class="review_star_icon" data-size="20"></div>'
	if(type == 'house'){
		const cleanScoreStar = document.createElement('div')
		cleanScoreStar.classList.add('clean_score_star', 'review_write_score')
		cleanScoreStar.innerHTML = '<div>청결도</div>'
		for(let i=0; i<5; i++) {
			cleanScoreStar.innerHTML += star
		}
		cleanScoreStar.innerHTML += '<input type="hidden" name="clean" required>'
		const accuracyScoreStar = document.createElement('div')
		accuracyScoreStar.classList.add('accuracy_score_star', 'review_write_score')
		accuracyScoreStar.innerHTML = '<div>정확도</div>'
		for(let i=0; i<5; i++) {
			accuracyScoreStar.innerHTML += star
		}
		accuracyScoreStar.innerHTML += '<input type="hidden" name="accuracy" required>'
		const communicationScoreStar = document.createElement('div')
		communicationScoreStar.classList.add('communication_score_star', 'review_write_score')
		communicationScoreStar.innerHTML = '<div>의사소통</div>'
		for(let i=0; i<5; i++) {
			communicationScoreStar.innerHTML += star
		}
		communicationScoreStar.innerHTML += '<input type="hidden" name="communication" required>'
			
		dom.appendChild(cleanScoreStar)
		dom.appendChild(accuracyScoreStar)
		dom.appendChild(communicationScoreStar)
	} else {
		const pointScoreStar = document.createElement('div')
		pointScoreStar.classList.add('point_score_star', 'review_write_score')
		pointScoreStar.innerHTML = '<div>평점</div>'
		for(let i=0; i<5; i++) {
			pointScoreStar.innerHTML += star
		}
		pointScoreStar.innerHTML += '<input type="hidden" name="point" required>'

		dom.appendChild(pointScoreStar)
	}
	const textareaDiv = document.createElement('div')
	textareaDiv.innerHTML = `<textarea placeholder="리뷰를 작성해 주세요" name="review_content" required></textarea>
        						<input type="submit" value="등록">`
	dom.appendChild(textareaDiv)
	return dom
}

async function reveiwProductModalContent() {
	modal_inner.style.maxWidth = '1300px'
	modal_inner.style.padding = '10px 60px'
	modal_header.innerHTML = `	<span class="review_star_icon" data-size="15"></span>
									${reviewAvg } 후기${reviewCnt}개`

	modal_content.innerHTML = ''
	if(type == 'house') {
		modal_content.innerHTML += `	<div class="d_h_r_Score">
										<div class="d_h_r_s_clean">
										<div>청결도</div>
										<div class="d_h_scoreBar">
											<div class="d_h_s_black"></div>
											<div class="d_h_s_grey"></div>
										</div>
										<div>${cleanAvg }</div>
									</div>
									<div class="d_h_r_s_accuracy">
										<div>정확성</div>
										<div class="d_h_scoreBar">
											<div class="d_h_s_black"></div>
											<div class="d_h_s_grey"></div>
										</div>
										<div>${accuracyAvg }</div>
									</div>
									<div class="d_h_r_s_communication">
										<div>의사소통</div>
										<div class="d_h_scoreBar">
											<div class="d_h_s_black"></div>
											<div class="d_h_s_grey"></div>
										</div>
										<div>${communicationAvg }</div>
									</div>
									</div>`
		
		const avgArr = [cleanAvg, accuracyAvg, communicationAvg]
		getScoreBarLenghtByArr(avgArr )
	}
	modal_content.innerHTML +=	`<div class="d_h_r_content"></div>`
		
		
	const url = cpath + `/${type}Review/ajax/${productName}/`
	const opt = {method: 'GET'}
	const productReviewmodalContent = modal_content.querySelector('.d_h_r_content')
	const modal_star_icon = modal_header.querySelector('.review_star_icon')
	modal_star_icon.innerHTML = review_score_star(+(modal_star_icon.dataset.size))
	const json = await getProductReview(productName)
	
	json.forEach(review => {
		productReviewmodalContent.appendChild(renderProductReview(review))
	})
	
	if(sessionStorage.getItem('login') != ''){
		const reviewAbleCnt = await getReviewUser(productName)
		if(reviewAbleCnt > 0) {
			productReviewmodalContent.appendChild(reviewWriteBox(type))
		}
	}
	set_review_star()
	const reviewWriteStar = document.querySelectorAll('.review_write_score > .review_star_icon')
	reviewWriteStar.forEach(e => {
		e.addEventListener('click', reviewScoreCnt)
		e.querySelectorAll('svg').forEach(star => {
			star.style.color = '#ccc'
		})
	})
}

function mapModalContent(event) {
	modal_inner.style.maxWidth = '900px'
	modal_header.innerHTML = `<div>호스팅 지역 </div>
							  <div style="font-size: 13px"> (${event.target.innerText})</div>`
	const div = document.createElement('div')
	div.style.maxWidth = '900px'
	div.style.height = '682px'
	modal_content.appendChild(div)
	const modalMap = getMap(div)
	getRoomMarker(address, modalMap)
}

function optModalContent(event) {
	modal_header.innerText = '전체 편의시설'
	
	const div = document.createElement('div')
	div.classList.add('d_h_c_l_opts')
	const contentDiv = document.createElement('div')
	contentDiv.classList.add('d_h_c_l_o_content')
	
	const optsString = opts.substring(1,opts.length -1)
	const optsList = optsString.split(', ')
	optsList.forEach(opt => {
		const subDiv = document.createElement('div')
		subDiv.classList.add('d_h_c_l_opt', 'houseOpt', opt)
		contentDiv.appendChild(subDiv)
	})
	
	div.appendChild(contentDiv)
	modal_content.appendChild(div)
	modal_content.style.padding = '10px 30px'
	set_house_opt(modal_content)
}

function modalLoginOpen(){
	modal_header.innerText = '로그인 회원가입'
	modal_inner.style.height = '450px'
	modal_content.innerHTML = `
			<div class="modalLogin">
				<div>
					<div>
						<h3 class="loginWelcome">에어비앤비에 오신 것을 환영합니다.</h3>
					</div>

					<form class="emailLoginForm" method="post">
						<input class="loginInput" type="email" name="email" placeholder="이메일" required autofocus> 
						<input class="loginBtn" type="submit" value="계속">
					</form>
					<form class="kakao_join_form hidden" method="post" action="${cpath }/kakao_join">
						<input class="kakao_id" type="password" name="kakao_id" value="">
						<input class="kakao_email" type="email" name="kakao_email" value="">
					</form>

					<div class="PWF hidden">
						<form class="emailPasswordForm" method="post">
							<div class="wrongPW hidden">
								<div>
									<img src="${cpath }/resources/img/sns_icon/wrong.png">
									
								</div>
								<div style="padding-left: 10px;">
									<h2 style="padding-bottom: 5px;">다시 시도해주세요.</h2>
									<div style="color: gray;">올바르지 않은 비밀번호입니다. 다시 시도하거나 다른
										로그인 방법을 선택하세요.</div>
								</div>
							</div>
							<input class="passwordInputId hidden" name="email" value="">
							<input class="passwordInput" type="password" name="password"
								placeholder="비밀번호" required autofocus>
							<button class="passwordBtn" type="submit">로그인</button>
						</form>
						<button class="findPWBtn">비밀번호 를 잊으셨나요?</button>
					</div>
					<div class="hidden PWF_2">
						<div class="findExplain">계정으로 사용하는 이메일 주소를 입력하시면, 비밀번호 재설정
							링크를 전송해 드립니다.</div>
						<div>
							<form class="sendPW" method="post">
								<input class="findPWEmail" type="email" name="email"
									placeholder="Email" required autofocus> <input
									class="postEmailBtn" type="submit" value="재설정 링크 전송">
							</form>
							<div class="sendMailMsg"></div>
							<form class="authMailForm hidden">
								<div class="box">
									<h3>인증번호 입력</h3>
									<div style="display: flex;">
										<input type="text" name="auth" placeholder="인증번호 입력">
										<input type="submit" value="인증">
									</div>
									<div id="authMailMsg"></div>
								</div>
							</form>
						</div>
					</div>

					<div class="boundary">
						<div class="line_first"></div>
						<div class="line_text">
							<span style="font-size: 12px;">또는</span>
						</div>
						<div class="line_second"></div>
					</div>
					<!-- sns로그인 -->
					<div class="snsLogin">
						<div class="KakaoBtn login_kakao" >
							<img src="${cpath }/resources/img/sns_icon/kakao_icon.png">
							<p>카카오 로그인</p>
						</div>
						<div class="naverBtn" id="naverLoginConnect">
							<img src="${cpath }/resources/img/sns_icon/naver_icon.png">
							<p>네이버 로그인<p>
						</div>
						
					</div>
				</div>
			</div>`
		// 이메일 로그인
		const emailLoginForm = document.querySelector('.emailLoginForm')
		emailLoginForm.addEventListener('submit',emailLoginHandler)
		const emailPasswordForm = document.querySelector('.emailPasswordForm')
		emailPasswordForm.addEventListener('submit',emailPasswordHandler)
		
		// 네이버 로그인
		const naverLoginConnect = document.getElementById('naverLoginConnect')
		naverLoginConnect.addEventListener('click',naverLoginConnectHandler)

		// 카카오 로그인
		const login_kakao = document.querySelector('.login_kakao') 
		login_kakao.addEventListener('click',loginWithKakao)
		const logout_kakao = document.querySelector('.logout_kakao')
		logout_kakao.addEventListener('click',logoutWithKakao)
		
		// 비번 찾기
		const findPWBtn = document.querySelector('.findPWBtn')
		findPWBtn.addEventListener('click',findPW)
		const sendPW = document.querySelector('.sendPW')
		sendPW.addEventListener('submit',sendMailHandler)
}

function security_deleteHandler(){
	modal_header.innerText = '계정 비활성화'
	modal_inner.style.height = '385px'
	modal_content.innerHTML = 
		`<div class="delete_title">
			<div style="padding-top:15px;>
				<svg viewBox="0 0 1000 1000" role="img" aria-hidden="false" aria-label="airbnb-logo" focusable="false" style="height: 66px;width: 568px;display: block;fill: rgb(255, 56, 92);"><path d="m499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-11 49-41 105-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 126.1 110 201.1-37 41-72 70-103 88-24 13-47 21-69 23-101 15-180.1-83-144.1-184.1 5-13 15-37 32-74l1-2c55-120.1 122.1-256.1 199.1-407.2l2-5 22-42c17-31 24-45 51-62 13-8 29-12 47-12 36 0 64 21 76 38 6 9 13 21 22 36l21 41 3 6c77 151.1 144.1 287.1 199.1 407.2l1 1 20 46 12 29c9.2 23.1 11.2 46.1 8.2 70.1zm46-90.1c-7-22-19-48-34-79v-1c-71-151.1-137.1-287.1-200.1-409.2l-4-6c-45-92-77-147.1-170.1-147.1-92 0-131.1 64-171.1 147.1l-3 6c-63 122.1-129.1 258.1-200.1 409.2v2l-21 46c-8 19-12 29-13 32-51 140.1 54 263.1 181.1 263.1 1 0 5 0 10-1h14c66-8 134.1-50 203.1-125.1 69 75 137.1 117.1 203.1 125.1h14c5 1 9 1 10 1 127.1.1 232.1-123 181.1-263.1z"></path></svg>
			</div>
			<div>
				<h3 class="delete_intro">계정을 정말 비활성화 하시겠습니까?</h3>
			</div>
			<div>
				<div>
					<form method="post" action="${cpath}/login_and_security">
						<button class="delete_btn delete_yes">예</button>
						<input class="hidden delete_email" name="email" value="">
					</form>
				</div>
				<div>
					<button class="delete_btn delete_no">아니오</button>
				</div>
			</div>
		</div>`
		let login_email = sessionStorage.getItem('login_email')
		document.querySelector('.delete_email').value = login_email
		function delete_no_btn_connect(){
			modal_closeBtn.click()
	}
		
		const delete_no = document.querySelector('.delete_no')
		delete_no.addEventListener('click',delete_no_btn_connect)
	
	}
	
