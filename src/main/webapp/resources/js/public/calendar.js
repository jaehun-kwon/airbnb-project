
// selectDate 관련
function resetSelect(targetDiv) {
	const checkIn = targetDiv.querySelector('.checkIn')
	const checkOut = targetDiv.querySelector('.checkOut')
	
	checkIn.querySelector('.hidden_input').value = ""
	checkOut.querySelector('.hidden_input').value = ""
	
	checkIn.querySelector('input[placeholder="날짜 입력"]').value = ""
	checkOut.querySelector('input[placeholder="날짜 입력"]').value = ""
	
	const dateTdList = targetDiv.querySelectorAll('.dateTd:not(.emptyDay):not(.yesterday)')
	dateTdList.forEach(dateTd => {
		if(dateTd.classList.contains('selectDate')) {dateTd.classList.toggle('selectDate')}
		if(dateTd.classList.contains('selectedList')) {dateTd.classList.toggle('selectedList')}
	})
}

function sameSelect(targetDiv, dateData){
	const dateValueList = targetDiv.querySelectorAll('.dateValue')
	dateValueList.forEach(dateValue => {
		if(dateValue.innerText == dateData) {
			dateValue.parentNode.classList.toggle('selectDate')
		}
	})
}

function selectDateList(start, end) {
	const startDateArea = start.parentNode.parentNode.querySelectorAll('.calendar_div .dateValue')
	const endDateArea = end.parentNode.parentNode.querySelectorAll('.calendar_div .dateValue')

	startDateArea.forEach(dateArea => {
		if(dateArea.parentNode.classList.contains('selectedList')){dateArea.parentNode.classList.toggle('selectedList')}
	})
	endDateArea.forEach(dateArea => {
		if(dateArea.parentNode.classList.contains('selectedList')){dateArea.parentNode.classList.toggle('selectedList')}
	})
	for(let i = 0; i < startDateArea.length; i++) {
		if(startDateArea[i].innerText > start.value && startDateArea[i].innerText < end.value && (startDateArea[i].parentNode.classList.contains('selectedList') == false)) {
			startDateArea[i].parentNode.classList.toggle('selectedList')
		}
	}
	for(let i = 0; i < endDateArea.length; i++) {
		if(endDateArea[i].innerText > start.value && endDateArea[i].innerText < end.value && (endDateArea[i].parentNode.classList.contains('selectedList') == false)) {
			endDateArea[i].parentNode.classList.toggle('selectedList')
		}
	}
}

function selectDate(event) {
	event.stopPropagation()
	let targetDiv = event.target
	while(targetDiv.classList.contains('detail_box') == false) {
		targetDiv = targetDiv.parentNode
	}
	const checkIn = targetDiv.querySelector('.checkIn')
	const checkOut = targetDiv.querySelector('.checkOut')
	
	const checkInValue = checkIn.querySelector('.hidden_input')
	const checkOutValue = checkOut.querySelector('.hidden_input')
	
	let target = event.target
	while(target.classList.contains('dateTd') == false) {
		target = target.parentNode
	}
	const targetValue = target.querySelector('.dateValue')
	
	let inputArea = event.target
	while(inputArea != checkIn && inputArea != checkOut) {
		inputArea = inputArea.parentNode
	}
	
	let flag = null
	if(inputArea == checkOut) {
		flag = 2
		if(checkInValue.value > targetValue.innerText && checkInValue.value != "" ){flag = null}
		else if(checkInValue.value > targetValue.innerText && checkOutValue.value != ""){flag = null}
		else if(checkInValue.value == targetValue.innerText) {flag = 0}
	}
	if(inputArea == checkIn) {
		if(checkOutValue.value < targetValue.innerText && checkInValue.value != ""){resetSelect(targetDiv)}
		else if(checkOutValue.value < targetValue.innerText && checkOutValue.value != ""){resetSelect(targetDiv)}
		flag = 1
		if(checkOutValue.value == targetValue.innerText) {flag = 0}
	}
	switch(flag){
	case 0: 
		if(inputArea.querySelector('.hidden_input').value == targetValue.innerText == false) {sameSelect(targetDiv, inputArea.querySelector('.hidden_input').value)}
		inputArea.querySelector('.hidden_input').value = targetValue.innerText
		inputArea.querySelector('.hidden_input').focus()
		break
	case 1:
		if(checkInValue.value == checkOutValue.value == false){sameSelect(targetDiv, checkInValue.value)}
		sameSelect(targetDiv, targetValue.innerText)
		checkInValue.value = targetValue.innerText
		checkInValue.click()
		if(checkInValue.name == 'start_date'){checkOut.click()}
		break
	case 2:
		if(checkInValue.value == checkOutValue.value == false){sameSelect(targetDiv, checkOutValue.value)}
		sameSelect(targetDiv, targetValue.innerText)
		checkOutValue.value = targetValue.innerText
		checkOutValue.click()
		if(checkInValue.value == "") {checkIn.click()}
		break
	default: 
		resetSelect(targetDiv)
		sameSelect(targetDiv, checkInValue.value)
		sameSelect(targetDiv, targetValue.innerText)
		checkInValue.value = targetValue.innerText
		checkInValue.click()
		checkOut.click()
	}
}

// calendar 얻기
function getDate(dateList) {
	const calendar_body = document.createElement('table')
	calendar_body.classList.add('calendar_body')
	
	const thead = document.createElement('thead')
	calendar_body.appendChild(thead)
	const thead_tr = document.createElement('tr')
	thead.appendChild(thead_tr)
	const day_value = ['일','월','화','수','목','금','토']
	day_value.forEach(v => {
		const td = document.createElement('td')
		td.classList.add('day')
		td.innerText = v
		thead_tr.appendChild(td)
	})
	
	const tbody = document.createElement('tbody')
	calendar_body.appendChild(tbody)
	let tbody_tr
	for(let i = 0; i < dateList.length; i++) {
		if(i == 0 || i % 7 == 0) {
			tbody_tr = document.createElement('tr')
			tbody.appendChild(tbody_tr)
		}
		const td = document.createElement('td')
		td.classList.add('dateTd')
		const date = document.createElement('div')
		date.classList.add('date')
		date.innerText = `${dateList[i].date}`
		td.appendChild(date)
		
		const value = document.createElement('div')
		value.classList.add('dateValue')
		value.innerText = new Date(`${dateList[i].year}`, `${dateList[i].month}`, `${dateList[i].date}`).getTime()
		td.appendChild(value)
		tbody_tr.appendChild(td)
		if(dateList[i].value == 'today') {td.classList.add('today')}
		else if(dateList[i].value == 'yesterday'){td.classList.add('yesterday')}
		else if(dateList[i].value == ''){td.classList.add('emptyDay')}
	}

	return calendar_body
}

function getDom(info, dateList, url) {
	const search_month = info.search_month < 10 ? '0' + info.search_month : info.search_month

	const calendar = document.createElement('div')
	calendar.classList.add('calendar')
	
	const navigation = document.createElement('div')
	navigation.classList.add('navigation')
	calendar.appendChild(navigation)
	
	if (url == null) {
		const before_after_month = document.createElement('a')
		before_after_month.classList.add('before_after_month')
		before_after_month.href = `/today_info?year=${info.before_year}&month=${info.before_month}`
		before_after_month.innerHTML = `<svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; fill: currentcolor;"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>`
		navigation.appendChild(before_after_month)
		
		const this_month = document.createElement('span')
		this_month.classList.add('this_month')
		this_month.innerText = `${info.search_year}년 ${search_month}월`
		navigation.appendChild(this_month)
	}
	else {
		const this_month = document.createElement('span')
		this_month.classList.add('this_month')
		this_month.innerText = `${info.search_year}년 ${search_month}월`
		navigation.appendChild(this_month)
		
		const before_after_month = document.createElement('a')
		before_after_month.classList.add('before_after_month')
		before_after_month.href = url
		before_after_month.innerHTML = `<svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; fill: currentcolor;"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg>`
		navigation.appendChild(before_after_month)
	}
	
	calendar.appendChild(getDate(dateList))
	
	return calendar
}

async function getDateList() {
	const url =  cpath + '/dateList'
	const opt = {method: 'GET'}
	const dateList = fetch(url,opt).then(result => result.json()).then(dateList => {return dateList})
	return dateList
}

async function getInfo(url) {
	url =  cpath + (url == null ? '/today_info' : url)
	const opt = {method: 'GET'}
	const today_info = fetch(url,opt).then(result => result.json()).then(today_info => {return today_info})
	return today_info
}

async function getCalendar(targetDiv, url) {
	targetDiv.innerHTML = ''
	const calendarList = document.createElement('div')
	calendarList.classList.add('calendarList')
	if(targetDiv.classList.contains('secondCalendar_div')){calendarList.classList.add('secondCalendarList')}
	
	const today_info = await getInfo(url)
	let dateList = await getDateList()	
	url = `/today_info?year=${today_info.after_year}&month=${today_info.after_month}`
	calendarList.appendChild(getDom(today_info, dateList))
	
	const tomorrow_info = await getInfo(url)
	dateList = await getDateList()
	calendarList.appendChild(getDom(tomorrow_info, dateList, url))
	
	const before_after_month = calendarList.querySelectorAll('.before_after_month')
	before_after_month.forEach(a => {
		a.addEventListener('click', function(event){
			event.preventDefault()
			event.stopPropagation()
			let target = event.target
			while(target.classList.contains('before_after_month') == false) {
				target = target.parentNode
			}
			const url = target.getAttribute('href')
			
			while(target.classList.contains('calendarList') == false) {
				target = target.parentNode
			}
			if(target.classList.contains('secondCalendarList')) {setSecondCalendar(url)}
			else{setCalendar(url)}
		})
	})
	
	const grandParent = targetDiv.parentNode.parentNode
	
	const selcetCheckIn = grandParent.querySelector('.checkIn .hidden_input')
	const selcetCheckOut = grandParent.querySelector('.checkOut .hidden_input')
	
	const dateTdList = calendarList.querySelectorAll('.dateTd:not(.emptyDay):not(.yesterday)')
	dateTdList.forEach(dateTd => {
		dateTd.addEventListener('click', selectDate)
		if(dateTd.lastChild.innerText == selcetCheckIn.value || dateTd.lastChild.innerText == selcetCheckOut.value ){
			dateTd.classList.toggle('selectDate')
		}
	})
	targetDiv.appendChild(calendarList)
	
	if(selcetCheckIn.value != '' && selcetCheckOut.value != ''){selectDateList(selcetCheckIn, selcetCheckOut)}
	
	const resetArea = document.createElement('div')
	resetArea.classList.add('resetArea')
	const resetBtn = document.createElement('button')
	resetBtn.classList.add('calendarResetBtn')
	resetBtn.innerText = '날짜 초기화'
	
	resetBtn.addEventListener('click', function(event) {
		event.preventDefault()
		let targetDiv = event.target
		while(targetDiv.classList.contains('detail_box') == false) {
			targetDiv = targetDiv.parentNode
		}
		resetSelect(targetDiv)
	})
	
	resetArea.appendChild(resetBtn)
	targetDiv.appendChild(resetArea)
}

// calendar 부르기
function setCalendar(url) {
   	const calendar_div = document.querySelectorAll('.calendar_div:not(.secondCalendar_div)')
   	calendar_div.forEach(div => {getCalendar(div, url)})
   	
}

function setSecondCalendar(url) {
	const calendar_div = document.querySelectorAll('.secondCalendar_div')
	calendar_div.forEach(div => {getCalendar(div, url)})
}

