function borderToggle(event) {
	let target = event.target
	while(target.classList.contains('h_v_inner') == false) {
		target= target.parentNode
	}
	if(target.tagName == 'LABEL') {target.classList.toggle('borderBlackToggle')}
	if(target.tagName == 'DIV') {
		if(target.querySelector('textarea') != null){target.querySelector('textarea').focus()}
		else {target.querySelector('input').focus()}
	}
}

function previousBtnEvent(event) {
	event.preventDefault()
	history.go(-1)
}

function nextBtnEvent(event) {
	event.preventDefault()
	const href = event.target.href
	const URLSearch = new URLSearchParams(location.search)
	
	let param = '?' + (URLSearch.toString() == '' ? '' : URLSearch.toString() + '&')
	
	const type = document.querySelector('.hosting_value #hosting_type')
	let paramType = ''
		
	if(type == null) {
		const textArea = document.querySelector('.hosting_value textArea')
		if(textArea != null) {paramType = textArea.name + '=' + textArea.value + '&'}
	}
	else {
		paramType = type.value + '='
	}
	
	let flag = false
	let msg = '숙소 정보를 선택해주세요.'
	const paramValue = document.querySelectorAll('.hosting_value input')
	paramValue.forEach(input => {
		if(input.type == 'checkbox') {
			if(input.checked == true){
				paramType += input.value + ';'
				flag = true
			}
		}
		if(input.type == 'text') {
			if(input.value != '') {
				paramType += input.name + '=' + input.value + '&'
			}
		}
		if(input.type == 'number') {
			if(input.value != '' && +input.value <= +input.max) {
				paramType += input.name + '=' + input.value + '&'
			}
		}
	})
	
	if(type == null) {
		msg = '숙소 정보를 정확히 작성해주세요.'
		if(paramType.includes('name') && paramType.includes('address') && paramType.includes('location')) {
			location.href = href + param + paramType
		}
		else if(paramType.includes('count_person') && paramType.includes('count_bath') && paramType.includes('count_room')  && paramType.includes('price'))
		{location.href = href + param + paramType}
		else {alert(msg)}
	}
	else {
		if(flag) {location.href = href + param + paramType}
		else {alert(msg)}
	}
}

function addressCheck() {
	const addressInput = document.querySelector('input[name="address"]')
	addressInput.addEventListener('change', function(event) {
		const geocoder = new kakao.maps.services.Geocoder()
		geocoder.addressSearch(addressInput.value, function(result, status) {
	       if(status == kakao.maps.services.Status.OK) {}
	       else {
	          alert('유효하지않는 주소 입니다.')
	          addressInput.value = ''
        	  addressInput.select()
	       }
		})
	})
}