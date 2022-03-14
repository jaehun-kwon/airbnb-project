function loadParam(){
	const loadpa2 =  window.location.search.substring(1).split('=')
	const loadpa =  decodeURI(loadpa2[1])
	const arr = []
		
	const left_member = document.querySelectorAll('.left_member_message')
	left_member.forEach(v=>{
		const partnerName = v.querySelector('.partner_message')
		if(loadpa == partnerName.innerText){
			const target = partnerName.parentNode
			target.click()
			
		}
	})
}

function newConnection(){
	const loadpa2 =  window.location.search.substring(1).split('=')
	const loadpa =  decodeURI(loadpa2[1])
	const url = cpath + '/newConnection/'+user+'/'+loadpa+'/'
	const opt = {
		method : 'GET'
	}
	fetch(url,opt)
	.then(resp => resp.json())
	.then(json => {
		loadMember()
	})
}



async function loadMember(event){
	const url = cpath +'/load/'+user+'/'
	const opt = {
			method :'GET'
	}
	const json = await fetch(url, opt).then(resp => resp.json())
	
	for(dto of json.msgList) {
		const dom  = getLoadDom(dto, json.profileList)
		body1_message.innerHTML += dom
	}
	
	const left_member_message = document.querySelectorAll('.left_member_message')		
	left_member_message.forEach(partner => {
		partner.onclick = loadMessage
	})
	loadParam()
}


function getLoadDom(dto, profileList){
	const partnerList_message = document.querySelectorAll('.left_member_message')
	const recipient = dto.recipient
	const sender = dto.sender
	const array = []
	
	partnerList_message.forEach(partner => {
		const partnerName = partner.querySelector('.partner_message').innerText
		array.push(partnerName)
	})
		
			
	let dom = ``
	if(array.includes(sender) == false && array.includes(recipient) == false){
		dom += `<div class="left_member_message">`
		if(user == recipient && user != sender){
			dom += `<div class="profile_message"><img src="${profileList[sender]}"></div>`
			dom += `<div class="insert_message">`
			dom += `<div class="partner_message">${sender}</div>`
		}	
		else if(user == sender && user != recipient){
			dom += `<div class="profile_message"><img src="${profileList[recipient]}"></div>`
			dom += `<div class="insert_message">`
			dom += `<div class="partner_message">${recipient}</div>`
		}
		dom += `<div class="content_message">${dto.content}</div>`
		dom += `<div class="content_day_message">최종 대화 일자 : ${dto.send_date_year}</div>`
		dom +=`</div>`
		dom += `</div>`			
	}
	return dom
		
}


async function loadMessage(event){
	const url2 = cpath +'/load/'+user+'/'
	const opt2 = {
			method :'GET'
	}
	const json2 = await fetch(url2, opt2).then(resp => resp.json())
	
	let target = event.target
	while(target.classList.contains('left_member_message') == false){
		target = target.parentNode
	}
	
	const partnerName = target.querySelector('.partner_message').innerText
	if(user != partnerName){
		head2_sub_message.innerHTML=``
		head2_sub_message.innerHTML += partnerName
	}	
	
	send_message.dataset.recipient = partnerName
	const url = cpath +'/loadMessage/'+user+'/'+partnerName+'/'
	const opt = {
			method : 'GET'
	}
	textarea_message.innerHTML=''
	const json = await fetch(url,opt).then(resp => resp.json())
	for(dto of json){
		const dom  = await getLoadMessageDom(dto,json2.profileList)
		textarea_message.innerHTML += dom
	}
	textarea_message.scrollTop = textarea_message.scrollHeight
	
	const confirmBtns = document.querySelectorAll('.booking_confirm_btn')
	confirmBtns.forEach(btn => btn.addEventListener('click', bookingConfirm))
}
function bookingConfirm(event) {
	const target = event.target
	while(target.classList.contains('booking_confirm_btn') == false){
		target = target.parentNode
	}
	const type = target.dataset.type
	const idx = target.dataset.idx
	const url = cpath + `/bookingConfirm/${type}/${idx}`
	const opt = {method: 'GET'}
	fetch(url, opt)
	.then(resp => resp.text())
	.then(text => {
		if(text == 1){
			alert('예약이 확정 되었습니다.')
		} else {
			alert('예약을 확정하지 못 했습니다.')
		}
	})
}
async function booking_confirm_btn(selector, type) {
	const url = cpath + `/getLastBooking${type}/${selector}/`
	const opt = {method: 'GET'}
	const json = await fetch(url, opt).then(resp => resp.json())
	
	const button = `<div class="booking_confirm_btn" data-idx="${json.idx}" data-type="${type}">
					예약 확정</div>`
	return button
}

async function getLoadMessageDom(dto, profileList){
	const item_message = document.querySelector('.item_message:last-child')
	const user = item_message == null ? null: item_message.querySelector('.sender_message').innerText
	const time = item_message == null ? null: item_message.querySelector('.time_message').innerText
	const year = item_message == null ? null: item_message.querySelector('.year_message').innerText
			
	let tag = `<div class ="item_message">`
		tag += 	`	<div class="year_message`
			if(year == dto.send_date_year ){
			tag +=` hidden2`
			}
		tag += `">`
		tag += `${dto.send_date_year}</div>`
		
		tag += `<div class="main_message" style="display:flex;">`
		tag +=	`<div class="profile2_message`
		if(user == dto.sender && time == dto.send_date_time  && year == dto.send_date_year){
			tag +=` hidden_message`
		}
		tag += `" style="padding-top: 15px;">
						<img src="${profileList[dto.sender]}">
					</div>
					<div class="user_message">
						<div style="display : flex; padding-top: 15px">
							<div class="sender_message`
		if(user == dto.sender && time == dto.send_date_time  && year == dto.send_date_year){
				tag +=` hidden2`
		}
		tag += `">
								${dto.sender}
							</div>
							<div class="time_message`
		if(user == dto.sender && time == dto.send_date_time  && year == dto.send_date_year){
			tag +=` hidden2`
		}
		tag += `">
								${dto.send_date_time}
							</div>
						</div>
						<div class="message_message">`
		if(dto.sender == '관리자') {
			const contentList = dto.content.split('_')
			tag += `<div>${contentList[0]}</div>`
			tag += await booking_confirm_btn(contentList[1], contentList[2])
		} else {
			tag += dto.content
		}
		tag +=				`</div>
				</div>	
			</div></div>`
			
	return tag
}

function keyHandler(event){
	if(event.key == 'Enter'){
		sendHandler(event)
	}
}

function sendHandler(event){
	const message = send_message.value
	const recipient = send_message.dataset.recipient
	if(recipient == '관리자') {
		alert('메세지를 보낼 수 없습니다.')
		return
	}
	send_message.value = ``
	ws.send(JSON.stringify({
		sender : user,
		message : message,
		date : new Date().getTime() +'',
		recipient : recipient
	}))
	send_message.focus()
	
	const partnerName = document.querySelectorAll('.partner_message')
	partnerName.forEach(v=>{
		if(v.innerText == recipient){
			let target= v
			while(target.classList.contains('left_member_message')==false){
				target = target.parentNode
			}
			const pa = target.querySelector('.content_message')
			pa.innerHTML = message
		}
	})

}

async function onMessage(event){

	const sender = JSON.parse(event.data).sender
	const recipient = JSON.parse(event.data).recipient
	let url = cpath + '/load/'
	if(user == recipient){
		url += sender+'/'
	}else{
		url += recipient+'/'
	}
	const opt = {
		method :'GET'
	}
	const load_recipient = await fetch(url,opt).then(resp=>resp.json())
	
	
	
	const today = new Date()
	let hour = today.getHours()
	const ampm = hour >= 12 ? '오후'  : '오전'
	hour = hour > 12 ? hour-12 : hour	
	hour = hour < 10 ? '0'+hour : hour		
	let minute = today.getMinutes()
	minute = minute > 9 ? minute : '0' + minute
	const item_message = document.querySelector('.item_message:last-child')
	const sender_message = item_message == null? null : item_message.querySelector('.sender_message').textContent
	const time_message = item_message == null? null : item_message.querySelector('.time_message').textContent
	const message_message = item_message == null? null : item_message.querySelector('.message_message').innerText
	const left_member_message = document.querySelectorAll('.left_member_message') 	
		let tag =``
	if (JSON.parse(event.data).sender == send_message.dataset.recipient || JSON.parse(event.data).sender == user) {
		tag += `<div class ="item_message" style="display : flex;">`
		
		tag += `<div class="profile_message_insert`
		if(sender_message == JSON.parse(event.data).sender && time_message == `${ampm} ${hour} : ${minute}`){
				tag += ` hidden_message`
			}
		tag += `">`
		if(user == JSON.parse(event.data).sender ){
			tag += `<img src = "${profile_message_insert}"></div>`
		}
		else if(user ==JSON.parse(event.data).recipient){
			tag += `<img src = "${load_recipient.profileList[sender]}"></div>`	
		}
		tag +=  `	<div class="import_message">`	
		tag += `		<div class="user_message2`
			if(sender_message == JSON.parse(event.data).sender && time_message == `${ampm} ${hour} : ${minute}`){
				tag += ` hidden_message`
			}
		tag += `">`
		tag += `		<div class="sender_message">${JSON.parse(event.data).sender}</div>`
		tag += 	`		<div class="time_message">${ampm} ${hour} : ${minute}</div>`
		tag +=`		</div>`	
		tag += `		<div class="message_message" style="margin-left: 15px;">${JSON.parse(event.data).message}</div>`
		tag += `	</div>`	
		tag += `</div>`
	}

		
	textarea_message.innerHTML += tag
	
	textarea_message.scroll({
		top : textarea_message.scrollHeight,
		behavior:'smooth'
	})
}

