// 주소별 헤더 변경
function header_change() {
	// 공용 element
	const search_box = document.querySelector('.search_box')
	const header_nav = document.querySelector('.header_nav')			
	const header_nav_inner = header_nav.querySelectorAll('span')
	header_nav_inner.forEach(span => h_n_inner_addEvent(span))
	
	const detail_search = document.querySelector('.detail_search')
	const header_filter = document.querySelector('.header_filter')
	const inner_icon = search_box.querySelector('.search_icon')
	
	// 주소별
	if(window.location.pathname.includes('houseList')){} // 하우스 리스트(기본이며 모든것 다불러옴)
	else if(window.location.pathname.includes('activityList')) { // 액티브 리스트
		search_box.innerHTML = ''
		search_box.innerHTML += '<div style="margin: 7px 7px 7px 0; padding: 10px;">검색 시작하기</div>'
		search_box.appendChild(inner_icon)
		header_nav.querySelector('span:last-child').click()
	}
	else if(window.location.pathname.includes('account_settings') ||  window.location.pathname.includes('personal_info')
			|| window.location.pathname.includes('booking') || window.location.pathname.includes('msg')
			|| window.location.pathname.includes('user_show') || window.location.pathname.includes('login_and_security')
			|| window.location.pathname.includes('edit_photo') || window.location.pathname.includes('experience_hosting')){ // 검색 불가 구역
		search_box.style.display = 'none'
		header_filter.style.display = 'none'
	}
	else if(window.location.pathname.includes('houseHosting') || window.location.pathname.includes('houseStart')
			|| window.location.pathname.includes('houseChoice')){
		const sticky_board = document.querySelector('.sticky_board')
		sticky_board.style.display = 'none'
	}
	else if(window.location.pathname.includes('detail')) {	// 디테일 헤더
		search_box.innerHTML = ''
		search_box.innerHTML += '<div style="margin: 7px 7px 7px 0; padding: 10px;">검색 시작하기</div>'
		search_box.appendChild(inner_icon)
		header_filter.style.display = 'none'
		if(window.location.pathname.includes('activity')){header_nav.querySelector('span:last-child').click()}
		
		const onlySearch_list = detail_search.querySelectorAll('.hidden_input')
		onlySearch_list.forEach(onlySearch_list => onlySearch_list.parentNode.classList.add('onlySearch'))
		
		const calendar_div_list = detail_search.querySelectorAll('.calendar_div')
		calendar_div_list.forEach(calendar_div => calendar_div.classList.add('secondCalendar_div'))
	}
	else { // 홈 헤더
		// 변경
		const header_logo = document.querySelector('.header_logo')
		header_logo.style.color = 'inherit'
		const header_nav = document.querySelector('.header_nav')
		header_nav.style.display = 'flex'
		const sticky = document.querySelector('.sticky')
		sticky.style.top = '-1px'
		sticky.style.backgroundColor = 'black'
		sticky.style.color = 'white'
		sticky.style.borderBottom = 0
		
		detail_search.style.borderBottom = 0
		detail_search.style.height = '100px'
		detail_search.style.visibility = 'visible'
		detail_search.style.position = 'relative'
		detail_search.style.transitionDuration = '0s'
		
		// 삭제
		search_box.style.display = 'none'
		header_filter.style.display = 'none'
	}
}

// 디테일 서치창 변경
function h_n_inner_addEvent(span) {
	const inner_p_list = document.querySelectorAll('.header_nav p')	
	const detail_search = document.querySelector('.detail_search')
	const change_box = detail_search.querySelectorAll('.detail_box > div:not(.d_b_location):not(.d_b_checkIn):not(.header_filter_line)')
	const header_filter_line = detail_search.querySelectorAll('.detail_box > .header_filter_line:not(.allWay)')
	const checkIn = detail_search.querySelector('.checkIn')
	const checkOut = detail_search.querySelector('.checkOut')
	span.addEventListener('click', function(event){
		let target = event.target
		while((target.tagName == 'SPAN') == false) {
			target = target.parentNode
		}
		const targetInner = target.querySelector('p')
		// 색 바꾸기
		if(targetInner.classList.contains('ub_cc')) {return}
		inner_p_list.forEach(p => p.classList.toggle('ub_cc'))
		
		// 캘린더 비우기
		resetSelect(detail_search)
		
		// 흰줄 삭제
		header_filter_line.forEach(line => {
			line.classList.toggle('disabled_box')
		})
		
		// 디테일바꾸기
		if(targetInner.innerText == '숙소'){
			detail_search.querySelector('form').action = cpath + '/house/houseList'
			checkIn.querySelector('div:first-child').innerText = '체크인'
			checkIn.querySelectorAll('input').forEach(input => {
				if(input.classList.contains('hidden_input')){input.name = "start_date"}
			})
			change_box.forEach(box => {
				box.classList.toggle('disabled_box')
				box.querySelectorAll('.hidden_input').forEach(input => {
					input.disabled = ''
				})
			})
		}
		else{
			detail_search.querySelector('form').action = cpath + '/activity/activityList'
			checkIn.querySelector('div:first-child').innerText = '체험 날짜'
			checkIn.querySelectorAll('input').forEach(input => {
				if(input.classList.contains('hidden_input')){input.name = "selected_date"}
			})
			change_box.forEach(box => {
				box.classList.toggle('disabled_box')
				box.querySelectorAll('.hidden_input').forEach(input => {
					input.disabled = 'disabled'
				})
			})
		}
	})
}

// 서치 창에 관련된 함수
function search_box_addEvent(event) {
    let target = event.target
    while(target.classList.contains('search_box') == false) {target = target.parentNode}
    header_nav.style.display = 'flex'
    target.style.display = 'none'
    	
    detail_search.style.height = '100px'
    detail_search.style.visibility = 'visible'
    
    document.addEventListener('click', search_box_close)
}

function detail_box_addEvent(inner) {
	inner.addEventListener('click', function(event) {
		let target = event.target
		while(target.classList.contains('hidden_div') == false && target != inner){
			target = target.parentNode
		}
		if(target == inner){
			if(inner.classList.contains('d_b_location')){inner.querySelector('input').focus()}
			if(detail_box.classList.contains('rgb247') == false) {detail_box.classList.toggle('rgb247')}
			
			detail_box_inner.forEach(inner => {
				if(inner.classList.contains('bs0510')) {inner.classList.toggle('bs0510')}
			})
			inner.classList.toggle('bs0510')
			hidden_div_visible(inner)
			document.addEventListener('click', detail_box_close)
		}
	})
}
function booking_box_result__write(type, totalCount,booking_box_price, booking_box_result) {
	if(type == 'house') {
		const start_date_value = +document.querySelector('.start_date_value').value
		const end_date_value = +document.querySelector('.end_date_value').value
		if(start_date_value != '' && end_date_value != '' ){
			const stay = (end_date_value - start_date_value) / (60*60*24*1000)
			booking_box_price.innerHTML = `₩ ${priceToString(price)} x ${stay} 박` 
			booking_box_result.innerHTML = `₩ ${priceToString(price*stay)}`
		} else {
			booking_box_price.innerHTML = '날짜를 선택해 주세요' 
			booking_box_result.innerHTML = '₩ 0'
		}
	} else {
		booking_box_price.innerHTML = `₩ ${priceToString(price)} x ${totalCount} 인`
		booking_box_result.innerHTML = `₩ ${priceToString(price*totalCount)}`
	}
}
// 캘린더 date자료형 변경시 문자열 자료형 변경 등 서치창 실시간/로드 시 변경
function valueAreaList_addEvent() {
	const valueAreaList = document.querySelectorAll('.detail_box .hidden_input')
	const booking_box_price = document.querySelector('.booking_box_price')
	const booking_box_result = document.querySelector('.booking_box_result')
	valueAreaList.forEach(valueArea => {
		let totalCount = 0
		// 윈도우 로드시
		if(valueArea.name == 'start_date' || valueArea.name == 'end_date' || valueArea.name == 'selected_date') {
			if(valueArea.value != '') {
				valueArea.parentNode.querySelector('input[placeholder="날짜 입력"]').value = dateToString(valueArea.value)
			}
			if(booking_box_result != null) booking_box_result__write(type, totalCount, booking_box_price, booking_box_result)
		}
		else if(valueArea.name == 'adult'){
			const countList = valueArea.parentNode.querySelectorAll('.hidden_input:not(input[name="baby"])')
			countList.forEach(count => {
				totalCount += count.value == '' ? +0 : +count.value
			})
			valueArea.parentNode.querySelector('input[placeholder="게스트 추가"]').value = totalCount == 0 ? null : '게스트 ' + totalCount + '명'
			if(booking_box_result != null) booking_box_result__write(type, totalCount, booking_box_price, booking_box_result)
		}
		// 실시간 변경
		valueArea.addEventListener('click', function(event){
			event.stopPropagation()
			let target = event.target
			let targetParent = target.parentNode
			totalCount = 0
			if(target.name == 'start_date' || target.name == 'end_date' || target.name == 'selected_date') {
				targetParent.querySelector('input[placeholder="날짜 입력"]').value = dateToString(target.value)
				if(target.name == 'start_date'){
					if(target.parentNode.classList.contains('onlySearch')){
						document.querySelector('.checkOut div input[name="end_date"]').value != '' ?
							selectDateList(target, document.querySelector('.checkOut div input[name="end_date"]')) : ''
					}
					else{
						document.querySelector('.checkOut div:not(.onlySearch) input[name="end_date"]').value != '' ?
							selectDateList(target, document.querySelector('.checkOut div:not(.onlySearch) input[name="end_date"]')) : ''
					}
						
				}
				else if(target.name == 'end_date'){
					if(target.parentNode.classList.contains('onlySearch')){
						document.querySelector('.checkIn div input[name="start_date"]').value != '' ?
								selectDateList(document.querySelector('.checkIn div input[name="start_date"]'), target) : ''
					}
					else{
						document.querySelector('.checkIn div:not(.onlySearch) input[name="start_date"]').value != '' ?
								selectDateList(document.querySelector('.checkIn div:not(.onlySearch) input[name="start_date"]'), target) : ''
					}
				}
			}
			else {
				const countList = targetParent.querySelectorAll('.hidden_input:not(input[name="baby"])')
				countList.forEach(count => {
					totalCount += count.value == '' ? 0 : +count.value
				})
				targetParent.querySelector('input[placeholder="게스트 추가"]').value = totalCount == 0 ? null : '게스트 ' + totalCount + '명'
			}
			event.target.blur()
			if(booking_box_result != null) booking_box_result__write(type, totalCount,booking_box_price, booking_box_result)

		})
	})
}

// 하기사항 전부 게스트 추가관련 함수
function countValue_addEvent(event) {
	event.stopPropagation()
	let target = event.target 
	const targetValue = target.innerText
	
	while (target.classList.contains('countArea') == false){
		target = target.parentNode
	}
	let targetClassName
	for (name of target.classList) {
		if(name != 'countArea') {targetClassName = name}
	}
	
	while(target.classList.contains('detail_box') == false){
		target = target.parentNode
	}
	const valueAreaList = target.querySelectorAll('.guestCount .hidden_input')
	valueAreaList.forEach(valueArea => {
		if(valueArea.name == targetClassName) {
			valueArea.value = targetValue
			if(targetValue == 0) {valueArea.value = ''}
			valueArea.click()
		}
	})
}
//버튼작동 이벤트
function downBtn_addEvent(event) {
	event.preventDefault()
	let target = event.target
	while (target.classList.contains('countArea') == false){
		target = target.parentNode
	}
	const countValue = target.querySelector('.countValue')
	countValue.innerText = +countValue.innerText -1
	countValue.focus()
	
	if(countValue.innerText == 0) {
		target.querySelector('button:first-child').disabled = 'disabled'
	}
	else {target.querySelector('button:last-child').disabled = null}
	
}

function upBtn_addEvent(event) {
	event.preventDefault()
	let target = event.target 
	while (target.classList.contains('countArea') == false){
		target = target.parentNode
	}
	const countValue = target.querySelector('.countValue')
	countValue.innerText = +countValue.innerText +1
	countValue.focus()
	
	if(countValue.innerText == 10) {
		target.querySelector('button:last-child').disabled = 'disabled'
	}
	else {target.querySelector('button:first-child').disabled = null}
}

function countAreaDom() {
	const dom = document.createElement('div')
	dom.classList.add('countArea')
	
	const dom_inner1 = document.createElement('div')
	dom.appendChild(dom_inner1)
	const p1 = document.createElement('p')
	dom_inner1.appendChild(p1)
	const p2 = document.createElement('p')
	dom_inner1.appendChild(p2)
	
	const dom_inner2 = document.createElement('div')
	dom.appendChild(dom_inner2)
	
	const btn1 = document.createElement('button')
	dom_inner2.appendChild(btn1)
	const span1 = document.createElement('span')
	btn1.appendChild(span1)
	span1.innerHTML = '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;"><path d="m2 16h28"></path></svg>'
	
	const span2 = document.createElement('span')
	span2.classList.add('countValue')
	span2.tabIndex = 2
	dom_inner2.appendChild(span2)
	
	const btn2 = document.createElement('button')
	dom_inner2.appendChild(btn2)
	const span3 = document.createElement('span')
	btn2.appendChild(span3)
	span3.innerHTML = '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;"><path d="m2 16h28m-14-14v28"></path></svg>'
	
	btn1.addEventListener('click', downBtn_addEvent)
	btn2.addEventListener('click', upBtn_addEvent)
	span2.addEventListener('focus', countValue_addEvent)

	return dom
}

function getCountArea(targetDiv) {
	const typeList = [
		{className: 'adult', type: '성인', desc: '만 13세 이상'},
		{className: 'kid', type: '어린이', desc: '만 2~12세'},
		{className: 'baby', type: '유아', desc: '만 2세미만'}
	]
	
	typeList.forEach(type => {
		const dom = countAreaDom()
		dom.classList.add(`${type.className}`)
		dom.querySelector('p:first-child').innerText = `${type.type}`
		dom.querySelector('p:last-child').innerText = `${type.desc}`
			
		const valueArea = targetDiv.parentNode.querySelector(`.hidden_input[name="${type.className}"]`).value
		const countValue = dom.querySelector('.countValue')
		if(valueArea == '') {countValue.innerText = 0}
		else {countValue.innerText = valueArea}
		
		if(countValue.innerText == 0){dom.querySelector('button:first-child').disabled = 'disabled'}
		else if(countValue.innerText == 10){dom.querySelector('button:last-child').disabled = 'disabled'}
			
		targetDiv.appendChild(dom)
	})
}

// 로그인 하이드 메뉴 관련
function showMenu(event){
	hideMenu.classList.remove('hidden')
	overlay.classList.remove('hidden')
	overlay.style='position : fixed; z-index : -1;'
	
}

function closeMenu(event){
	overlay.style=''
	overlay.classList.add('hidden')
	hideMenu.classList.add('hidden')
}

// filter 관련
function h_f_btn_addEvent(btn) {
	if(btn.querySelector('.down_arrow') != null) {
		btn.addEventListener('click', function(event) {
			let target = event.target
			while(target != btn){
				target = target.parentNode
			}
			const header_filter = btn.parentNode.parentNode
			header_filter.querySelectorAll('.down_arrow').forEach(da => {
				if(da.classList.contains('arrow_hidden')){
					da.classList.toggle('arrow_hidden')
					da.parentNode.querySelector('.up_arrow').classList.toggle('arrow_hidden')
					da.parentNode.classList.toggle('selected_h_f_btn')
					visible_div_hidden()
					return
				}
			})
			target.querySelector('.up_arrow').classList.toggle('arrow_hidden')
			target.querySelector('.down_arrow').classList.toggle('arrow_hidden')
			target.classList.toggle('selected_h_f_btn')
			hidden_div_visible(target.parentNode)
			document.addEventListener('click', h_f_btn_close)
		})
	}
	else {
		if(btn.classList.contains('filter_search_btn')){
			btn.addEventListener('click', function(event) {
				const URLSearch = new URLSearchParams(location.search)
				URLSearch.delete('price')
				const priceFilter = document.querySelector('.header_filter_btn[name="price"]')
				if(priceFilter.value != ''){URLSearch.append('price', priceFilter.value)}
					
				URLSearch.delete('category')
				const categoryFilter = document.querySelector('.header_filter_btn[name="category"]')
				if(categoryFilter.value != ''){URLSearch.append('category', categoryFilter.value)}
				
				URLSearch.delete('opt')
				document.querySelectorAll('.header_filter_list .header_filter_btn:not(.filter_search_btn)').forEach(btn => {
					if(btn.classList.contains('selected_h_f_btn')){
						URLSearch.append('opt', btn.value)
					}
				})
				if(URLSearch.get('opt') == null) {URLSearch.set('opt', '')}
				location.href = location.pathname + '?' + URLSearch.toString()
			})
		}
		else {
			btn.addEventListener('click', function(event) {
				const header_filter = btn.parentNode.parentNode.parentNode
				header_filter.querySelectorAll('.down_arrow').forEach(da => {
					if(da.classList.contains('arrow_hidden')){
						da.classList.toggle('arrow_hidden')
						da.parentNode.querySelector('.up_arrow').classList.toggle('arrow_hidden')
						da.parentNode.classList.toggle('selected_h_f_btn')
						visible_div_hidden()
						document.removeEventListener('click', h_f_btn_close)
					}
				})
				let target = event.target
				while(target != btn){
					target = target.parentNode
				}
				target.classList.toggle('selected_h_f_btn')
			})
		}
	}
}

function setHeader_filter(optListData) {
	const header_filter = document.querySelector('.header_filter')
	const header_filter_list = header_filter.querySelector('.header_filter_list')
	
	let optList = []
	if(optListData != null){
		optListData.forEach(optData => {
		for(let i = 0; i < optData.length - 1; i++) {
            if(optList[optData[i]]) {}
            else{optList[optData[i]] = total_opt_ko(optData[i])}
         	}
		})
	}
	if(optList != null) {
		const URLSearch = new URLSearchParams(location.search)
		const priceParam = URLSearch.get('price')
		if(priceParam != null) {document.querySelector('.priceFilter_output').innerText = (priceParam / 10000) + ' 만원대'}
		
		const categoryParam = URLSearch.get('category')
		if(categoryParam != null) {document.querySelector('.categoryFilter_output').innerText = total_category_ko(categoryParam)}
		const paramList = URLSearch.getAll('opt')
		
		header_filter_list.innerHTML = ''
		for(key in optList) {
			const header_filter_box = document.createElement('div')
			header_filter_box.classList.add('header_filter_box')
			const header_filter_btn = document.createElement('button')
			header_filter_btn.classList.add('header_filter_btn')
			header_filter_box.appendChild(header_filter_btn)
			const inner_span = document.createElement('span')
			header_filter_btn.appendChild(inner_span)
			
			const value = optList[key]
			header_filter_btn.value = key
			inner_span.innerText = value
				
			paramList.forEach(param => {
				if(param == header_filter_btn.value) {
					header_filter_btn.classList.toggle('selected_h_f_btn')
				}
			})
			header_filter_list.appendChild(header_filter_box)
		}
	}
	if(optListData == null) {
		const header_filter_box = document.createElement('div')
		header_filter_box.classList.add('header_filter_box')
		const filter_search_btn = document.createElement('button')
		filter_search_btn.classList.add('header_filter_btn')
		filter_search_btn.classList.add('filter_search_btn')
		header_filter_box.appendChild(filter_search_btn)
		const inner_span = document.createElement('span')
		inner_span.innerText = '필터 검색'
		filter_search_btn.appendChild(inner_span)
		const search_icon = document.querySelector('.search_icon')
		filter_search_btn.appendChild(search_icon.cloneNode(true))
		header_filter.appendChild(filter_search_btn)
	}
}



function setPriceFilter(priceList) {
	const priceFilter = document.querySelector('.header_filter > .header_filter_box:nth-child(1)')
	const priceFilter_div = priceFilter.querySelector('.filterArea')
	// 데이터 가공
	priceList = priceList.sort(function(a, b){return a-b})
	let priceData = {}
	priceList.forEach(price => {
		if(priceData[price]) {priceData[price] = priceData[price] + 1}
		else{priceData[price] = 0 + 1}
	})
	let chartData = []
	for(key in priceData){
		const value = priceData[key]
		chartData.push([key + ' 만원대', value])
	}
	
    // 차트 그리기
	google.charts.load('current', {packages: ['corechart']})

    google.charts.setOnLoadCallback(drawChart)
	function drawChart() {
        const table = new google.visualization.DataTable()

        table.addColumn('string', '가격대')
        table.addColumn('number', '수량')

        table.addRows(chartData)

        const opt = {
            width: 400,
            height: 300,
            vAxis: {textPosition: 'none'},
            hAxis: {textPosition: 'none'},
            bar: {groupWidth : '90%'},
            colors: ['#dadada'],
            tooltip: {textStyle: {fontSize: 12}},
            legend: {
                position: 'top', maxLines: 500
            }
        }
        const chart = new google.visualization.ColumnChart(priceFilter_div)
        chart.draw(table, opt)
        google.visualization.events.addListener(chart, 'select', chartSelectHandler)
        
        function chartSelectHandler() {
            const selection = chart.getSelection()
            const item = selection[0]
            if(item == null) {return}
            const wonIndex = table.getValue(item.row, 0).indexOf('만')
            const result = table.getValue(item.row, 0).substring(0, wonIndex)
            const header_filter_btn = priceFilter.querySelector('.header_filter_btn')
            header_filter_btn.value = result * 10000
            header_filter_btn.querySelector('span:first-child').innerText = table.getValue(item.row, 0)
            document.querySelector('.filter_search_btn').click()
        }
    }
}

function setCategoryFilter(categoryList) {
	const priceFilter = document.querySelector('.header_filter > .header_filter_box:nth-child(2)')
	const priceFilter_div = priceFilter.querySelector('.filterArea')
	// 데이터 가공
	let categoryData = {}
	categoryList.forEach(category =>{
		for(let i = 0; i < category.length - 1; i++) {
			if(categoryData[category[i]]) {categoryData[category[i]] = categoryData[category[i]] + 1}
			else{categoryData[category[i]] = 0 + 1}
		}
	})
	let chartData = []
	for(key in categoryData){
		const value = categoryData[key]
		chartData.push([total_category_ko(key), value])
	}
	
	// 차트 그리기
	google.charts.load('current', {packages: ['corechart']})

    google.charts.setOnLoadCallback(drawChart)
	function drawChart() {
        const table = new google.visualization.DataTable()

        table.addColumn('string', '카테고리')
        table.addColumn('number', '수량')

        table.addRows(chartData)

        const opt = {
            width: 400,
            height: 300,
            vAxis: {textPosition: 'none'},
            hAxis: {textPosition: 'none'},
            bar: {groupWidth : '90%'},
            colors: ['#dadada'],
            tooltip: {textStyle: {fontSize: 12}},
            legend: {
                position: 'top', maxLines: 500
            }
        }
        const chart = new google.visualization.ColumnChart(priceFilter_div)
        chart.draw(table, opt)
        google.visualization.events.addListener(chart, 'select', chartSelectHandler)
        
        function chartSelectHandler() {
            const selection = chart.getSelection()
            const item = selection[0]
            if(item == null) {return}

            const selectCategory = table.getValue(item.row, 0)
            const result = total_category_en(selectCategory)
            const header_filter_btn = priceFilter.querySelector('.header_filter_btn')
            header_filter_btn.value = result
            header_filter_btn.querySelector('span:first-child').innerText = selectCategory
            document.querySelector('.filter_search_btn').click()
        }
    }
}

function filterResetBtn_addEvent() {
	const filterResetBtn = document.querySelectorAll('.filterResetBtn')
	filterResetBtn.forEach(btn => {
		btn.addEventListener('click', function(event) {
			let target = event.target
			while(target.classList.contains('header_filter_box') == false){
				target = target.parentNode
			}
			target.querySelector('.header_filter_btn').value = ''
			const output = target.querySelector('.header_filter_btn > span:first-child')
			if(output.classList.contains('categoryFilter_output')){
				output.innerText = '유형'
			}
			else {
				output.innerText = '요금'
			}
			document.querySelector('.filter_search_btn').click()
		})
	})
}

function interceptorOpenModal(event){
	const loginAndJoin = document.querySelector('.loginAndJoin')
	loginAndJoin.click()
}