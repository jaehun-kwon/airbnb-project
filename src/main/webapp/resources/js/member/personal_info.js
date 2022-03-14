// session

let login_name = sessionStorage.getItem('login_name')

let login_nickname = sessionStorage.getItem('login_nickname')
let login_birth = sessionStorage.getItem('login_birth')
let login_email = sessionStorage.getItem('login_email')
let login_phone = sessionStorage.getItem('login_phone')

// personal_info.jsp
const modify_name_btn = document.querySelector('.modify_name_btn')
const modify_name_btn_cancel = document.querySelector('.modify_name_btn_cancel')
const before_name_box = document.querySelector('.before_name_box')
const before_name_explanation = document.querySelector('.before_name_explanation')
const update_name_form = document.querySelector('.update_name_form')
const update_name_input = document.querySelector('.update_name_input')

const modify_nickname_btn = document.querySelector('.modify_nickname_btn')
const modify_nickname_btn_cancel = document.querySelector('.modify_nickname_btn_cancel')
const before_nickname_box = document.querySelector('.before_nickname_box')
const update_nickname_form = document.querySelector('.update_nickname_form')
const update_nickname_input = document.querySelector('.update_nickname_input')

const modify_birth_btn = document.querySelector('.modify_birth_btn')
const modify_birth_btn_cancel = document.querySelector('.modify_birth_btn_cancel')
const before_birth_box = document.querySelector('.before_birth_box')
const update_birth_form = document.querySelector('.update_birth_form')
const update_birth_input = document.querySelector('.update_birth_input')

const modify_email_btn = document.querySelector('.modify_email_btn')
const modify_email_btn_cancel = document.querySelector('.modify_email_btn_cancel')
const before_email_box = document.querySelector('.before_email_box')
const update_email_form = document.querySelector('.update_email_form')
const update_email_input = document.querySelector('.update_email_input')
const email_update_error = document.querySelector('.email_update_error')

const modify_phone_btn = document.querySelector('.modify_phone_btn')
const modify_phone_btn_cancel = document.querySelector('.modify_phone_btn_cancel')
const before_phone_box = document.querySelector('.before_phone_box')
const update_phone_form = document.querySelector('.update_phone_form')
const update_phone_input = document.querySelector('.update_phone_input')
const before_phone_explanation = document.querySelector('.before_phone_explanation')
const phone_explanation = document.querySelector('.phone_explanation')

function updateInputHandlerName(){
	
	before_name_box.classList.add('hidden')
	before_name_explanation.classList.remove('hidden')
	update_name_form.classList.remove('hidden')
	modify_name_btn_cancel.classList.remove('hidden')
	modify_name_btn.classList.add('hidden')

	const url = cpath + '/update_name'
	const opt = {
		method : 'get'
	}
	fetch(url,opt)
	.then(resp =>resp.json())
	.then(json=>{
	})
}

function updateInputHandlerNickname(){
	
	before_nickname_box.classList.add('hidden')
	update_nickname_form.classList.remove('hidden')
	modify_nickname_btn_cancel.classList.remove('hidden')
	modify_nickname_btn.classList.add('hidden')

	const url = cpath + '/update_nickname'
	const opt = {
		method : 'get'
	}
	fetch(url,opt)
	.then(resp =>resp.json())
	.then(json=>{
	})
}

function updateInputHandlerBirth(){
	before_birth_box.classList.add('hidden')
	update_birth_form.classList.remove('hidden')
	modify_birth_btn_cancel.classList.remove('hidden')
	modify_birth_btn.classList.add('hidden')

	const url = cpath + '/update_birth'
	const opt = {
		method : 'get'
	}
	fetch(url,opt)
	.then(resp =>resp.json())
	.then(json=>{
	})
}

function updateInputHandlerEmail(){
	before_email_box.classList.add('hidden')
	update_email_form.classList.remove('hidden')
	modify_email_btn_cancel.classList.remove('hidden')
	modify_email_btn.classList.add('hidden')
	

	const url = cpath + '/update_email'
	const opt = {
		method : 'get'
	}
	fetch(url,opt)
	.then(resp =>resp.json())
	.then(json=>{
	})
}

function updateInputHandlerPhone(){
	before_phone_box.classList.add('hidden')
	update_phone_form.classList.remove('hidden')
	modify_phone_btn_cancel.classList.remove('hidden')
	modify_phone_btn.classList.add('hidden')
	phone_explanation.classList.remove('hidden')
	

	let cut_phone_number=update_phone_input.value.replace('-','')
	cut_phone_number=cut_phone_number.replace('-','')
	update_phone_input.value = null
	update_phone_input.value += cut_phone_number

	const url = cpath + '/update_phone'
	const opt = {
		method : 'get'
	}
	fetch(url,opt)
	.then(resp =>resp.json())
	.then(json=>{
	})
}

function updateCancelHandlerName(){
	before_name_box.classList.remove('hidden')
	before_name_explanation.classList.add('hidden')
	update_name_form.classList.add('hidden')
	modify_name_btn_cancel.classList.add('hidden')
	modify_name_btn.classList.remove('hidden')
	update_name_input.value = null
	update_name_input.value += login_name

}

function updateCancelHandlerNickname(){
	before_nickname_box.classList.remove('hidden')
	update_nickname_form.classList.add('hidden')
	modify_nickname_btn_cancel.classList.add('hidden')
	modify_nickname_btn.classList.remove('hidden')
	update_nickname_input.value = null
	update_nickname_input.value += login_nickname
}

function updateCancelHandlerBirth(){
	before_birth_box.classList.remove('hidden')
	update_birth_form.classList.add('hidden')
	modify_birth_btn_cancel.classList.add('hidden')
	modify_birth_btn.classList.remove('hidden')
	update_birth_input.value = null
	update_birth_input.value += login_birth
}

function updateCancelHandlerEmail(){
	before_email_box.classList.remove('hidden')
	update_email_form.classList.add('hidden')
	modify_email_btn_cancel.classList.add('hidden')
	modify_email_btn.classList.remove('hidden')
	email_update_error.classList.add('hidden')
	update_email_input.value = null
	update_email_input.value += login_email
}

function updateCancelHandlerPhone(){
	before_phone_box.classList.remove('hidden')
	update_phone_form.classList.add('hidden')
	modify_phone_btn_cancel.classList.add('hidden')
	modify_phone_btn.classList.remove('hidden')
	update_phone_input.value = null
	update_phone_input.value += login_phone
	before_phone_explanation.classList.add('hidden')
	phone_explanation.classList.add('hidden')
	
	
}

function updateNameHandler(event) {
	event.preventDefault()
	const ob = {}
	const formData = new FormData(event.target)
	for(key of formData.keys()){
		const value = formData.get(key)
		ob[key] = value
	}
	
	const url = cpath +'/update_name'
	const opt = {
			method :'POST',
			body : JSON.stringify(ob),
			headers : {
				'Content-Type' : 'application/json; charset=utf-8'
			}
	}
	fetch(url,opt)
	.then(resp => resp.text())
	.then(text => {
		if(text == 1 ){
			const url = cpath + '/update_name'
			const opt = {
				method : 'get'
			}
			fetch(url,opt)
			.then(resp =>resp.json())
			.then(json=>{
			})

			window.location.replace(cpath+'/personal_info')
		}
		else if(text != 1){
			alert('수정 실패')
		}
	})
	
	
}

function updateNicknameHandler(){
	event.preventDefault()
	const ob = {}
	const formData = new FormData(event.target)
	for(key of formData.keys()){
		const value = formData.get(key)
		ob[key] = value
	}
	
	const url = cpath +'/update_nickname'
	const opt = {
			method :'POST',
			body : JSON.stringify(ob),
			headers : {
				'Content-Type' : 'application/json; charset=utf-8'
			}
	}
	fetch(url,opt)
	.then(resp => resp.text())
	.then(text => {
		if(text == 1 ){
			const url = cpath + '/update_nickname'
			const opt = {
				method : 'get'
			}
			fetch(url,opt)
			.then(resp =>resp.json())
			.then(json=>{
			})

			window.location.replace(cpath+'/personal_info')
		}
		else if(text != 1){
			alert('수정 실패')
		}
	})
}

function updateBirthHandler(){
	event.preventDefault()
	const ob = {}
	const formData = new FormData(event.target)
	for(key of formData.keys()){
		const value = formData.get(key)
		ob[key] = value
	}
	
	const url = cpath +'/update_birth'
	const opt = {
			method :'POST',
			body : JSON.stringify(ob),
			headers : {
				'Content-Type' : 'application/json; charset=utf-8'
			}
	}
	fetch(url,opt)
	.then(resp => resp.text())
	.then(text => {
		if(text == 1 ){
			const url = cpath + '/update_birth'
			const opt = {
				method : 'get'
			}
			fetch(url,opt)
			.then(resp =>resp.json())
			.then(json=>{
			})

			window.location.replace(cpath+'/personal_info')
		}
		else if(text != 1){
			alert('수정 실패')
		}
	})
}

function updateEmailHandler(){
	event.preventDefault()
	if(login_email == update_email_input.value){
		
		email_update_error.classList.remove('hidden')
		return
	}
		const ob = {}
		const formData = new FormData(event.target)
		for(key of formData.keys()){
			const value = formData.get(key)
			ob[key] = value
		}
		
		const url = cpath +'/update_email'
		const opt = {
				method :'POST',
				body : JSON.stringify(ob),
				headers : {
					'Content-Type' : 'application/json; charset=utf-8'
				}
		}
		fetch(url,opt)
		.then(resp => resp.text())
		.then(text => {
			if(text == 1 ){
				const url = cpath + '/update_email'
				const opt = {
					method : 'get'
				}
				fetch(url,opt)
				.then(resp =>resp.json())
				.then(json=>{
				})
				const reLoginOpen = document.querySelector('.reLoginOpen')
				reLoginOpen.addEventListener('click',modalLoginOpen)
				reLoginOpen.click()
				if(modal.onclick = gateClose == false){ // 모달 나가기 막기
					window.location.replace(cpath)
				}
			}

		})
	
}

function updatePhoneHandler(){
	event.preventDefault()

	
	if(update_phone_input.value.length == 11){
		let cut_phone_number = update_phone_input.value
		update_phone_input.value=null
		let cut_phone_number_01 = cut_phone_number.substr(0,3)
		let cut_phone_number_02 = cut_phone_number.substr(3,4)
		let cut_phone_number_03 = cut_phone_number.substr(7)
		cut_phone_number = cut_phone_number_01 + '-' + cut_phone_number_02 + '-' + cut_phone_number_03
		update_phone_input.value += cut_phone_number
			const ob = {}
			const formData = new FormData(event.target)
			for(key of formData.keys()){
				const value = formData.get(key)
				ob[key] = value
			}
			
			const url = cpath +'/update_phone'
			const opt = {
					method :'POST',
					body : JSON.stringify(ob),
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					}
			}
			fetch(url,opt)
			.then(resp => resp.text())
			.then(text => {
				if(text == 1 ){
					const url = cpath + '/update_phone'
					const opt = {
						method : 'get'
					}
					fetch(url,opt)
					.then(resp =>resp.json())
					.then(json=>{
					})
					window.location.replace(cpath+'/personal_info')
				}
				else if(text != 1){
					alert('text 가 1 을 반환 못함')
				}
			})
		} else if(update_phone_input.value.length != 11){
			before_phone_explanation.classList.remove('hidden')
	}
}


modify_name_btn.addEventListener('click',updateInputHandlerName)
modify_name_btn_cancel.addEventListener('click',updateCancelHandlerName)
update_name_form.addEventListener('submit',updateNameHandler)

modify_nickname_btn.addEventListener('click',updateInputHandlerNickname)
modify_nickname_btn_cancel.addEventListener('click',updateCancelHandlerNickname)
update_nickname_form.addEventListener('submit',updateNicknameHandler)

modify_birth_btn.addEventListener('click',updateInputHandlerBirth)
modify_birth_btn_cancel.addEventListener('click',updateCancelHandlerBirth)
update_birth_form.addEventListener('submit',updateBirthHandler)

modify_email_btn.addEventListener('click',updateInputHandlerEmail)
modify_email_btn_cancel.addEventListener('click',updateCancelHandlerEmail)
update_email_form.addEventListener('submit',updateEmailHandler)

modify_phone_btn.addEventListener('click',updateInputHandlerPhone)
modify_phone_btn_cancel.addEventListener('click',updateCancelHandlerPhone)
update_phone_form.addEventListener('submit',updatePhoneHandler)






















