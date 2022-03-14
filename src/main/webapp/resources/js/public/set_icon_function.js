function set_review_star() {
	const review_star_list = document.querySelectorAll('.review_star_icon')
	review_star_list.forEach(setStar => 
		setStar.innerHTML = review_score_star(+(setStar.dataset.size)))
}
function set_wish_heart() {
	const wish_heart_list = document.querySelectorAll('.wish_heart')
	wish_heart_list.forEach(setHeart => {
		setHeart.innerHTML = wish_heart_icon(+(setHeart.dataset.size))
		setHeart.addEventListener('click', heart_click)
	})
}

function house_category_div(list, title, ex, img) {
	list.forEach(e => {
		const imgDiv = document.createElement('div')
		imgDiv.innerHTML = img
		const info = document.createElement('div')
		const infoTitle = document.createElement('div')
		infoTitle.innerText = title
		const infoEx = document.createElement('div')
		infoEx.innerText = ex
		
		info.appendChild(infoTitle)
		info.appendChild(infoEx)
		
		e.appendChild(imgDiv)
		e.appendChild(info)
	})
}

function set_house_category_privateroom() {
	const privateroom_list = document.querySelectorAll('.privateroom')
	const title = '개인실'
	const ex = '레지던스 전체를 단독으로 사용하시게 됩니다'
	house_category_div(privateroom_list, title, ex, house_category_house())
}
function set_house_category_pension() {
	const pension_list = document.querySelectorAll('.pension')
	const title = '펜션'
	const ex = '민박의 가정적 분위기와 호텔의 편의성을 갖춘 소규모의 고급 숙박 시설입니다'
	house_category_div(pension_list, title, ex, house_category_house())
}
function set_house_category_multiroom() {
	const pension_list = document.querySelectorAll('.multiroom')
	const title = '다인실'
		const ex = '여러 사람이 하나의 방을 공유합니다'
			house_category_div(pension_list, title, ex, house_category_house())
}
function set_house_category_selfcheckin() {
	const list = document.querySelectorAll('.houseCategory+.selfcheckin')
	const title = '셀프체크인'
	const ex = '키패드를 이용하여 체크인 하세요'
	house_category_div(list, title, ex, house_category_selfcheckin())
}
function set_house_category_cancel() {
	const list = document.querySelectorAll('.cancel')
	const title = '취소 가능'
	const ex = '예약 후 취소 가능한 숙소 입니다'
	house_category_div(list, title, ex, house_category_cancel())
}
function set_house_category_clean() {
	const list = document.querySelectorAll('.clean')
	const title = '청결 강화'
	const ex = '숙소를 이용한 게스트의 청결 평점이 4.8 이상인 숙소입니다.'
	house_category_div(list, title, ex, house_category_clean())
}
function set_house_category_accuracy() {
	const list = document.querySelectorAll('.accuracy')
	const title = '정확한 안내'
	const ex = '숙소를 이용한 게스트의 정확성 평점이 4.8 이상인 숙소입니다.'
	house_category_div(list, title, ex, house_category_accuracy())
}


function house_opt_div(opt, img, target) {
	const list = target.querySelectorAll(`.d_h_c_l_o_content .${opt}`)
	list.forEach(e => {
		const imgDiv = document.createElement('div')
		const nameDiv = document.createElement('div')
		imgDiv.innerHTML = img
		nameDiv.innerText = house_opt_ko(opt)
		e.appendChild(imgDiv)
		e.appendChild(nameDiv)
		e.classList.add('houseOpt')
	})
}

function set_house_opt(target) {
	house_opt_div('wifi', house_opt_wifi(), target)
	house_opt_div('airconditioner', house_opt_airconditioner(), target)
	house_opt_div('parking', house_opt_parking(), target)
	house_opt_div('oven', house_opt_oven(), target)
	house_opt_div('fridge', house_opt_fridge(), target)
	house_opt_div('kitchen', house_opt_kitchen(), target)
	house_opt_div('tv', house_opt_tv(), target)
	house_opt_div('washer', house_opt_washer(), target)
	house_opt_div('hairdryer', house_opt_hairdryer(), target)
	house_opt_div('hotwater', house_opt_hotwater(), target)
	house_opt_div('heater', house_opt_heater(), target)
	house_opt_div('barbecue', house_opt_barbecue(), target)
	house_opt_div('selfcheckin', house_opt_selfcheckin(), target)
	house_opt_div('fireoff', house_opt_fireoff(), target)
	house_opt_div('necessity', house_opt_necessity(), target)
	house_opt_div('hanger', house_opt_hanger(), target)
}

function activity_opt_div(opt, img, explain) {
	const list = document.querySelectorAll(`.d_h_c_l_o_content .${opt}`)
	list.forEach(e => {
		const imgDiv = document.createElement('div')
		imgDiv.innerHTML = img
		const titleDiv = document.createElement('div')
		titleDiv.innerText = activity_opt_ko(opt)
		const exDiv = document.createElement('div')
		exDiv.innerText = explain
		e.appendChild(imgDiv)
		e.appendChild(titleDiv)
		e.appendChild(exDiv)
		e.classList.add('activityOpt')
	})
}
function set_activity_opt() {
	activity_opt_div('equipment', activity_opt_equipment(), '체험에 필요한 장비를 호스트가 직접 준비합니다. 장비는 체험의 내용에 따라 다르며 자세한 내용은 호스트에게 직접 문의 하셔야 합니다.')
	activity_opt_div('drink', activity_opt_drink(), '체험을 하는 동안 호스트가 음료를 제공합니다. 제공하는 음료는 체험에 따라 다르며 자세한 내용은 호스트에게 직접 문의 하셔야 합니다.')
	activity_opt_div('ticket', activity_opt_ticket(), '체험에 필요한 티켓을 호스트가 준비합니다. 티켓의 요금은 체험 요금에 포함되며 자세한 내용은 호스트에게 직접 문의 하셔야 합니다.')
	activity_opt_div('transportation', activity_opt_transportation(), '체험 중 이동이나 체험 장소까지의 교통편을 호스트가 제공합니다. 이동수단이나 기타 자세한 내용은 호스트에게 직접 문의 하셔야 합니다.')
}





