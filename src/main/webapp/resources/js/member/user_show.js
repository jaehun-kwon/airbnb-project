const profile_introduce_update_btn = document.querySelector('.profile_introduce_update_btn')
const user_show_profile_update_on = document.querySelector('.user_show_profile_update_on')
const update_show_profile_update_off = document.querySelector('.update_show_profile_update_off')
const intro_update_cancel = document.querySelector('.intro_update_cancel')

const user_intro_update_form = document.querySelector('.user_intro_update_form')



function intro_updateHandler(){
	event.preventDefault()
	
	user_show_profile_update_on.classList.add('hidden')
	update_show_profile_update_off.classList.remove('hidden')
	
	const url = cpath + '/intro_update'
	const opt = {
		method : 'get'
	}
	fetch(url,opt)
	.then(resp =>resp.json())
	.then(json=>{
	})
}

function intro_cancelHandler(){
	event.preventDefault()
	user_show_profile_update_on.classList.remove('hidden')
	update_show_profile_update_off.classList.add('hidden')
}

function intro_update_submitHandler(){
	event.preventDefault()

	const ob = {}
	const formData = new FormData(event.target)
	for(key of formData.keys()){
		const value = formData.get(key)
		ob[key] = value
	}
	
	const url = cpath +'/intro_update'
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
			const url = cpath + '/intro_update'
			const opt = {
				method : 'get'
			}
			fetch(url,opt)
			.then(resp =>resp.json())
			.then(json=>{
			})

			window.location.replace(cpath+'/user_show')
		}
		else if(text != 1){
			alert('수정 실패')
		}
	})
}



profile_introduce_update_btn.addEventListener('click',intro_updateHandler)
intro_update_cancel.addEventListener('click',intro_cancelHandler)
user_intro_update_form.addEventListener('submit',intro_update_submitHandler)















