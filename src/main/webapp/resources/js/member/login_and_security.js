const security_update_btn = document.querySelector('.security_update_btn')
const security_password_form = document.querySelector('.security_password_form')
const security_update_btn_cancel = document.querySelector('.security_update_btn_cancel')
const password_update_btn = document.querySelector('.password_update_btn')
const password_update_title = document.querySelector('.password_update_title')

const passwordInput_plus = document.querySelector('.passwordInput_plus')
const passwordInput_another = document.querySelector('.passwordInput_another')
const password_wrong = document.querySelector('.password_wrong')

const security_delete_btn = document.querySelector('.security_delete_btn')

//session
let login_password = sessionStorage.getItem('login_password')

function security_openHandler(){
	event.preventDefault()
	security_password_form.classList.remove('hidden')
	security_update_btn_cancel.classList.remove('hidden')
	security_update_btn.classList.add('hidden')
}

function security_openCancelHandler(){
	event.preventDefault()
	security_update_btn.classList.remove('hidden')
	security_update_btn_cancel.classList.add('hidden')
	security_password_form.classList.add('hidden')
	
	password_update_title.style.color = 'gray'
	password_update_title.innerText = '비밀번호'
	
	password_wrong.innerText = ''
	password_wrong.style.color = 'gray'
	password_wrong.innerText = '비밀번호 확인'
	
	passwordInput_plus.value = null
	passwordInput_another.value = null
	
}


function security_updatePasswordHandler(){
	event.preventDefault()
	if(passwordInput_plus.value != passwordInput_another.value){
		password_update_title.value = null
		password_wrong.innerText = ''
		password_wrong.style.color = 'red'
		password_wrong.innerText = '입력하신 비밀번호 와 다릅니다.'
	}
	else if(passwordInput_plus.value == login_password){
		password_update_title.style.color = 'red'
		password_update_title.innerText = '기존의 비밀번호로 수정 할 수 없습니다.'
		} 
	else if(passwordInput_plus.value == passwordInput_another.value){
		const ob = {}
		const formData = new FormData(event.target)
		for(key of formData.keys()){
			const value = formData.get(key)
			ob[key] = value
		}
		
		const url = cpath + '/password_update'
		const opt = {
			method:'post',
			body: JSON.stringify(ob),
			headers : {
				'Content-Type' : 'application/json; charset=utf-8'
			}
		}
		fetch(url,opt)
		.then(resp => resp.text())
		.then(text => {
			if(text == 1){
				const url = cpath + '/password_update'
				const opt = {
					method : 'get'
				}
				fetch(url,opt)
				.then(resp =>resp.json())
				.then(json=>{
					console.log(json)
				})
				
				
				window.location.replace(cpath)
			}
			
			else if (text != 1){
				alert('수정 실패')
			}
		})
	}
}




security_update_btn_cancel.addEventListener('click',security_openCancelHandler)
security_update_btn.addEventListener('click',security_openHandler)
security_password_form.addEventListener('submit',security_updatePasswordHandler)
security_delete_btn.addEventListener('click', security_deleteHandler)

















