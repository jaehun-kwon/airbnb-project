Kakao.init('165a5aa4e17d4ee97e9eb9d19d0d1669') // js key
// console.log(Kakao.isInitialized()) // sdk 초기화

// 카카오로그인
const logout_kakao = document.querySelector('.logout_kakao') 
const kakao_login_form = document.querySelector('.kakao_login_form')
const kakao_login_id = document.querySelector('.kakao_login_id')
const kakao_login_email = document.querySelector('.kakao_login_email')
//로그아웃
const all_logout = document.querySelector('.all_logout')
//네이버로그인
const naverIdLogin_loginButton = document.getElementById('naverIdLogin_loginButton')
const naverLoginConnect = document.getElementById('naverLoginConnect')
const naverLogout = document.querySelector('.naverLogout')
//세션
let naverConnect = sessionStorage.getItem('naver_login')
let kakaoConnect = sessionStorage.getItem('kakao_login')
let emailConnect = sessionStorage.getItem('login')



function loginWithKakao() { // 카카오 로그인
	Kakao.Auth.login({
		success : function(response) {
			Kakao.API.request({
				url : '/v2/user/me',
				success : function(authObj) {
					const kakao_id = document.querySelector('.kakao_id')
					kakao_id.value += JSON.stringify(authObj.id)
					const kakao_email = document.querySelector('.kakao_email')
					kakao_email.value += authObj.kakao_account.email
					const kakao_join_form = document.querySelector('.kakao_join_form')
					
					
					
					kakao_join_form.submit()

				},
				fail : function(error) {
					console.log(JSON.stringify(err))
				},
			})
		}
	})
}

function logoutWithKakao(event) { // 카카오 로그아웃
	if (Kakao.Auth.getAccessToken()) {
		Kakao.API.request({
			url : '/v1/user/unlink',
			success : function(authObj) {
				window.location.replace(cpath + '/logout')
			},
			fail : function(error) {
				console.log(error)
			},
		})
		Kakao.Auth.setAccessToken(undefined)
	}
}

const naverLogin = new naver.LoginWithNaverId( // 네이버 로그인 기본 사항
{
	clientId : 'O63IQFNuKmWNnhqqk1kz',
	callbackUrl : 'http://175.214.170.244/airbnb',
	isPopup : false,
	loginButton : {
		color : 'white',
		type : 2,
		height : 40
	}
}

)

naverLogin.init()

function naverLoginConnectHandler(){
	let connectNaver = document.getElementById("naverIdLogin").firstChild
	connectNaver.click()
}



naverLogin.getLoginStatus(function(status) { // 네이버 로그인 사용자 정보 가져옴
	if (status) {
		const naverEmail = naverLogin.user.getEmail()
		const naverId = naverLogin.user.id
		
		const naver_email = document.querySelector('.naver_email')
		naver_email.value += naverEmail
		
		const naver_id = document.querySelector('.naver_id')
		naver_id.value += naverId
		
		const naverBtn = document.querySelector('.naverBtn')
		const naver_join_form = document.querySelector('.naver_join_form')
		
		
		if (naverConnect == '') {
			naver_join_form.submit()
		} else if (naverConnect != null) {
			naver_join_form.innerHTML = ''
		}
	}
})

logout_kakao.onclick = logoutWithKakao

naverLogout.addEventListener('click', function() { // 네이버 로그아웃
	window.location.replace(cpath + '/logout')
	naverLogin.logout()
})


function allLogoutHandler(){
	if((kakaoConnect == '') == false){
		document.querySelector('.logout_kakao').click()
	}
	else if((naverConnect == '') == false){
		document.querySelector('.naverLogout').click()
	}
	else if((emailConnect == '') == false){
		window.location.replace(cpath + '/logout')
	}
	
}


all_logout.addEventListener('click',allLogoutHandler)










