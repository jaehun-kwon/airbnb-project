// 가격 콤마용
function priceToString(price) {
	return Number(price).toLocaleString()
}

//날짜 문자열 변환용
function dateToString(date) {
	 const day = new Date(+date)
	 const result = (day.getMonth() + 1) + '월 ' + day.getDate() +'일'
	 return result
}

function setQueryString(e) {
	const URLSearch = new URLSearchParams(location.search)
	
	if(e.tagName == 'SPAN') {
		if(e.parentNode.classList.contains('search_box')){
			if(e.innerText == '위치') {e.innerText = URLSearch.get('location')}
			else if(e.innerText == '날짜 입력' && URLSearch.get('start_date') != '' && URLSearch.get('end_date') != '') {
				e.innerText = dateToString(URLSearch.get('start_date')) + ' ~ ' + dateToString(URLSearch.get('end_date'))
			}
			else if(e.innerText == '게스트 추가'){
				let totalCount = 0
				totalCount += URLSearch.get('adult') == '' ? 0 : +URLSearch.get('adult')
				totalCount += URLSearch.get('kid') == '' ? 0 : +URLSearch.get('kid')
						
				e.innerText = totalCount == 0 ? '게스트 추가' : '게스트 ' + totalCount + '명'
			}
		}
	}
	
	if(e.querySelector('input') != null){
		const inputList = e.querySelectorAll('input')
		inputList.forEach(input => {
			if(input.name != '' && input.parentNode.classList.contains('onlySearch') == false){
				e = input
			}
			if(e.tagName == 'INPUT' && e.type != 'submit') {
				e.value  = URLSearch.get(e.name)
			}
		})
	}	
}

// start_date, end_date 값이 없을경우 하루 차이로 넣어서 다음페이지로 넘길 파라미터 생성
function getChangeParam(param, type){
	if(type == 'activity') return param+'&adult=1'
	let paramList = param.split('&')
	
	let start_date = paramList[1]
	start_date = +start_date.split('=')[1]
	let end_date = paramList[2]
	end_date = +end_date.split('=')[1]
	
	if(start_date != '' && end_date == '') {
		end_date = start_date + (60*60*24*1000)
		paramList[2] = 'end_date=' + end_date
	} else if (start_date == '' && end_date != ''){
		start_date = end_date - (60*60*24*1000)
		paramList[1] = 'start_date=' + start_date
	}
	
	let changeParam = ''
	paramList.forEach(param => changeParam += param + '&')
	return changeParam
}









