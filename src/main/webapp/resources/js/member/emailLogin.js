const joinAndLogin = document.querySelector('.joinAndLogin')
const loginAndJoin = document.querySelector('.loginAndJoin')


let login = sessionStorage.getItem('login')
let naver_login = sessionStorage.getItem('naver_login')
let kakao_login = sessionStorage.getItem('kakao_login')

function joinDom(){
	let dom =``
	dom += `<div>`
	dom += `<form class="joinForm" method="post">`
	dom += `<div>`
	dom += `<input class="joinInput" type="text" name="name" placeholder="이름" required autofocus>`
	dom += `<div class="joinExplain">정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요.</div>`
	dom += `<div class="lineUp">`
	dom += `<input class="joinInput" type="date" name="birth" placeholder="생년월일" required>`
	dom += `<div class="joinExplain">만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 에어비앤비의 다른회원에게 공개 되지 않습니다.</div>`
	dom += `</div>`
	dom += `<div class="lineUp">`
	dom += `<input class="joinInput" type="text" name="nickname" placeholder="닉네임" required>`
	dom += `<div class="lineUp">`
	dom += `<input class="joinInput joinInputEmail" type="email" name="email" value="" readonly  required>`
		
	dom += `<div class="joinExplain">예약 확인과 영수증을 이메일로 보내드립니다.</div>`
	dom += `</div>`
	dom += `<input class="joinInput" type="password" name="password" placeholder="비밀번호" required>`
	dom += `<div class="joinExplain">동의 및 계속하기 버튼을 선택하면 에어비앤비 서비스약관, 결제서비스 약관 및 차별금지 정책에 동의하며 개인정보 처리방침 정책을 이해하는 것입니다.</div>`
	dom += `<button class="joinBtn" type="submit">동의 및 계속하기</button>`
	dom += `</div>`
	dom += `</form>`
	dom += `</div>`
	return dom
}

function welcomeDom(){
	let dom = ``
	dom += `<div class="welcome" style="text-align:center;">`
		
	dom += `<div class="joinLogo">`
	dom += `<svg viewBox="0 0 1000 1000" role="img" aria-hidden="false" aria-label="airbnb-logo" focusable="false" style="height: 66px;width: 66px;display: block;fill: rgb(255, 56, 92);"><path d="m499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-11 49-41 105-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 126.1 110 201.1-37 41-72 70-103 88-24 13-47 21-69 23-101 15-180.1-83-144.1-184.1 5-13 15-37 32-74l1-2c55-120.1 122.1-256.1 199.1-407.2l2-5 22-42c17-31 24-45 51-62 13-8 29-12 47-12 36 0 64 21 76 38 6 9 13 21 22 36l21 41 3 6c77 151.1 144.1 287.1 199.1 407.2l1 1 20 46 12 29c9.2 23.1 11.2 46.1 8.2 70.1zm46-90.1c-7-22-19-48-34-79v-1c-71-151.1-137.1-287.1-200.1-409.2l-4-6c-45-92-77-147.1-170.1-147.1-92 0-131.1 64-171.1 147.1l-3 6c-63 122.1-129.1 258.1-200.1 409.2v2l-21 46c-8 19-12 29-13 32-51 140.1 54 263.1 181.1 263.1 1 0 5 0 10-1h14c66-8 134.1-50 203.1-125.1 69 75 137.1 117.1 203.1 125.1h14c5 1 9 1 10 1 127.1.1 232.1-123 181.1-263.1z"></path></svg>`
	dom += `</div>`
		
	dom += `<div>`
	dom += `<h3 class="joinWelcome">에어비앤비에 오신 것을 환영합니다.</h3>`
	dom += `<div class="joinIntro">전 세계 숙소, 현지 레스토랑 및 독특한 체험을 찾아보세요.</div>`
	dom += `</div>`
		
	dom += `<button class="welcomeBtn postEmailBtn">계속</button>`
		
	dom += `</div>`
		
	dom += `<div class = "hidden PWF">`
	dom += `<form name="autoLoginForm" method="post" action="autoLogin">`
	dom += `<input class="passwordInputId" name="email" value="">`
	dom += `<input class="passwordInputPW" type="password" name="password" value="">`
	dom += `</form>`
	dom += `</div>`
	
	return dom
}

function airBnBJoin(){	// 회원가입 창
	modal_inner.style.height = '700px'
	const url = cpath + '/airBnBJoin'
	const opt = {
		method : 'get'
	}
	fetch(url,opt)
	.then(resp => resp.text())
	.then(text => {
		modal_header.innerHTML =''
		modal_header.innerHTML ='회원 가입 완료하기'
		const loginWelcome = document.querySelector('.loginWelcome')
		loginWelcome.innerHTML = ''
		const emailLoginForm = document.querySelector('.emailLoginForm')
		emailLoginForm.classList.add('hidden')
		const boundary = document.querySelector('.boundary')
		boundary.classList.add('hidden')
		
		const loginInputEmail = document.querySelector('.loginInput').value
		const modalLogin = document.querySelector('.modalLogin')
		modalLogin.innerHTML += joinDom()
		document.querySelector('.joinInputEmail').value += loginInputEmail
		const joinForm = document.querySelector('.joinForm')
		joinForm.addEventListener('submit',joinHandler)
	})
}

function joinHandler(event){	// 회원 가입 
	event.preventDefault()
	
	const ob = {}
	const formData = new FormData(event.target)
	for(key of formData.keys()){
		const value = formData.get(key)
		ob[key] = value
		
	}
	
	
	const url = cpath + '/join'
	const opt = {
		method : 'post',
		body : JSON.stringify(ob),
		headers : {
			'Content-Type' : 'application/json; charset=utf-8'
		}
	}
	fetch(url,opt)
	.then(resp => resp.text())
	.then(text => {
		if(text == 1){
			modal_header.innerHTML=''
			modal_header.innerHTML='프로필 생성하기'
			const joinForm = document.querySelector('.joinForm')
			joinForm.classList.add('hidden')
			const modalLogin = document.querySelector('.modalLogin')
			modalLogin.innerHTML = welcomeDom()
			
			const welcome = document.querySelector('.welcome')
			const welcomeBtn = document.querySelector('.welcomeBtn')
			const modal_inner = document.querySelector('.modal_inner')
			modal_inner.style.height = '320px'
			welcomeBtn.onclick = function(event){
				const emailKey = ob.email
				const passwordKey = ob.password
				
				const passwordInputId = document.querySelector('.passwordInputId').value += emailKey
				const passwordInputPW = document.querySelector('.passwordInputPW').value +=passwordKey
				
				document.autoLoginForm.submit()
			}
			
			
		}
		else {
			alert('회원가입에 실패 하였습니다. 다시시도 하여 주세요.')
		}
	})
}




function emailLoginHandler(event){ // 이메일로 로그인시
	modal_inner.style.height = '320px'
	event.preventDefault()
	const ob = {}
	const formData = new FormData(event.target)
	for(key of formData.keys()){
		const value = formData.get(key)
		ob[key] = value
		
	}
	
	const url = cpath + '/emailLogin'
	const opt = {
			method : 'post',
			body : JSON.stringify(ob),
			headers:{
				'Content-Type' : 'application/json; charset=utf-8'
			}
	}
	fetch(url,opt)
	.then(resp => resp.json())
	.then(json =>{
		if(json == null){	// 이메일이 없을경우 회원가입 창 띄움
			airBnBJoin()
			const snsLogin = document.querySelector('.snsLogin')
			snsLogin.classList.add('hidden')
			
		}
		else if(json !=null){	// 이메일 있을 경우 비밀번호 입력창 띄움
			const emailKey = ob[key]
			modal_header.innerHTML=''
			modal_header.innerHTML='로그인'
			const snsLogin = document.querySelector('.snsLogin')
			snsLogin.classList.add('hidden')
			const passwordInputId = document.querySelector('.passwordInputId').value += emailKey
			
			const loginWelcome = document.querySelector('.loginWelcome')
			loginWelcome.innerHTML=''
			const emailLoginForm = document.querySelector('.emailLoginForm')
			emailLoginForm.classList.add('hidden')
			const PWF = document.querySelector('.PWF')
			PWF.classList.remove('hidden')
			const boundary = document.querySelector('.boundary')
			boundary.classList.add('hidden')
			
			
		}
		else {
			 sessionStorage.clear();
		}
	})
}



function emailPasswordHandler(event){ // 비밀번호 입력시 로그인
	event.preventDefault()
	
	const ob = {}
	const formData = new FormData(event.target)
	
	for(key of formData.keys()){
		const value = formData.get(key)
		ob[key] = value
		
	}
	const url = cpath + '/emailPassword'
	const opt = {
			method : 'post',
			body : JSON.stringify(ob),
			headers : {
				'Content-Type' : 'application/json; charset=utf-8'
			}
	}
	fetch(url,opt)
	.then(resp => resp.json())
	.then(json =>{
		if(json==null){
			modal_inner.style.height = '450px'
			const wrongPW = document.querySelector('.wrongPW')
			wrongPW.classList.remove('hidden')
		}
		else if(json != null){   
	         const pageURL = new URL(window.location.href)
	         if(pageURL.searchParams.has('loginmodal')){
	            pageURL.searchParams.delete('loginmodal')
	         }
	         location.href = pageURL.href
	      }
	})
}

function findPW(event){	// 이메일 있는데 비밀번호 모를경우 비밀번호 찾기
	
	event.preventDefault()
	
	const url = cpath + '/findPW'
	const opt = {
		method: 'get'
	}
	fetch(url,opt)
	.then(resp => resp.html)
	.then(html =>{
		modal_header.innerHTML =''
		modal_header.innerHTML = '비밀번호를 잊으셨나요?'
		const PWF = document.querySelector('.PWF')
		PWF.classList.add('hidden')
		const PWF_2 = document.querySelector('.PWF_2')
		PWF_2.classList.remove('hidden')
	})
}
const sendPW = document.querySelector('.sendPW')
const sendMailMsg = document.querySelector('.sendMailMsg')
const authMailForm = document.querySelector('.authMailForm')
const authMailMsg = document.querySelector('.authMailMsg')

function sendMailHandler(event){	// 비밀 번호 이메일로 보내기
	event.preventDefault()
	const findPWEmail = event.target.querySelector('.findPWEmail')
	
	
	const url = cpath + '/mailto/' + findPWEmail.value + '/'
	const opt = {
		method : 'get'
	}
	fetch(url, opt)
	.then(resp => resp.json())
	.then(json => {
		sendMailMsg.innerText = json.message
		sendMailMsg.style.corlor = json.stauts == 'OK' ? 'blue' : 'red'
		if(json.status == 'OK'){
			authMailForm.classList.remove('hidden')
			authMailForm.querySelector('input').focus()
			
			
			
		}
	})
	
	
}




if(login){
	joinAndLogin.classList.add('hidden')
	loginAndJoin.classList.add('hidden')
}
else if (naver_login||kakao_login){
	joinAndLogin.classList.add('hidden')
	loginAndJoin.classList.add('hidden')

}else if (login==false || naver_login == false || kakao_login== false){
	const all_logout = document.querySelector('.all_logout')
	all_logout.classList.add('hidden')
}

joinAndLogin.addEventListener('click',modalLoginOpen)
loginAndJoin.addEventListener('click',modalLoginOpen)






