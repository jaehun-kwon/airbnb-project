function getRoomMarker(address, map) {
	var geocoder = new kakao.maps.services.Geocoder();

	geocoder.addressSearch(address, function(result, status) {
	     if (status === kakao.maps.services.Status.OK) {
	        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

	        const marker = new kakao.maps.CustomOverlay({
	            map: map,
	            position: coords,
	            content: productMarker()
	        });
	        map.setCenter(coords);
	    } 
	});    
}
function zoomIn() {        
    const level = map.getLevel();
    map.setLevel(level - 1);
}    
function zoomOut() {    
    const level = map.getLevel(); 
    map.setLevel(level + 1);
}    
function copyURL(event) {
	const url = window.location.href
	const copySection = document.createElement('textarea')
	document.body.appendChild(copySection)
	copySection.value = url
	copySection.select();
	document.execCommand('copy');
	document.body.removeChild(copySection);
	alert('링크 주소가 복사 되었습니다')
}

function getScoreBarLenght(){
	const scoreBarList = document.querySelectorAll('.d_h_scoreBar')
	const arr = []
	scoreBarList.forEach(scoreBar => {
		const score = scoreBar.nextSibling.nextSibling.innerText
		arr.push(+score)
		getScoreBarLenghtByArr(arr)
	})
} 
function getScoreBarLenghtByArr(arr) {
	const scoreBarList = document.querySelectorAll('.d_h_scoreBar')
	
	for(let i = 0; i < 3; i++){
		const blackLen = Math.round(30*arr[i])
		const greyLen = 150 - blackLen
		const blackLenBox = scoreBarList[i].querySelector('.d_h_s_black')
		blackLenBox.style.width = blackLen + 'px'
		const greyLenBox = scoreBarList[i].querySelector('.d_h_s_grey')
		greyLenBox.style.width = greyLen + 'px'
	}
}
function infoMore(event){
	const infoDiv = document.querySelector('.d_h_c_l_intro > div:first-child')
	if(infoDiv.style.maxHeight != '100%') {
		infoDiv.style.maxHeight = '100%'
	} else {
		infoDiv.style.maxHeight = '205px'		
	}
	
}

async function adminMsg(host) {
	const date = new Date().getTime()
	const content = `${user}님이 ${host}님의 ${productName}에 예약을 하였습니다. 예약 확정을 하시려면 버튼을 눌러주세요._${user}_${type}`
	const param = `?recipient=${host}&sender=관리자&date=${date}`
	const url = cpath + `/AdminMessage/${content}/` + param
	const opt = {method: 'GET'}
	const result = await fetch(url, opt).then(resp => resp.text())
	
	return result
}

async function booking(event){
	const windowUrl = window.location.pathname.split('/')
	const type = windowUrl[2]
	const len = windowUrl.length
	const idx = windowUrl[len -1]
	const param = window.location.search
	
	const url = cpath + `/${type}Booking/ajax/${idx}/` + param
	const opt = {method: 'GET'}
	const result = await fetch(url, opt).then(resp => resp.text())
	if(result == 1) {
		const sendMsg = await adminMsg(host)
		if(sendMsg == 1) {
			alert('호스트에게 예약 요청이 완료되었습니다.\n예약 상세 내용은 메일을 확인해 주세요.')
			location.href = beforeURL
		}
	} else {
		alert('예약이 진행되지 않았습니다.')
	}
}


function reviewScoreCnt(event) {
	let target = event.target
	while(target.classList.contains('review_star_icon') == false) {
		target = target.parentNode
	}
	let i = 0
	const stars = target.parentNode.querySelectorAll('.review_star_icon > svg')
	const pointInput = target.parentNode.querySelector('input')
	stars.forEach(star => star.style.color = '#ccc')
	for(star of stars) {
		star.style.color = '#fcba03'
		i += 1
		pointInput.value = i
		if(star.parentNode == target) {
			return
		}
	}
}

async function insertReview(event){
	event.preventDefault()
	let clean=0, accuracy=0, communication=0, point=0
	if(type == 'house') {
		clean = event.target.querySelector('input[name="clean"]').value
		accuracy = event.target.querySelector('input[name="accuracy"]').value
		communication = event.target.querySelector('input[name="communication"]').value
	} else {
		point = event.target.querySelector('input[name="point"]').value
	}
	const review_content = event.target.querySelector('textarea').value
	const param = `?type=${type}&clean=${clean}&accuracy=${accuracy}&communication=${communication}&point=${point}&review_content=${review_content}`
	const url = cpath + `/addReview/${productName}/` + param
	const opt = {method: 'GET'}
	
	const result = await fetch(url, opt).then(resp => resp.text())
	if(result == 1) {
		location.href = window.location.href
	}
}


function setBookingDate(targetDiv) {
	const URLSearch = new URLSearchParams(location.search)
	if(location.pathname.includes('house')) {
		const start_year = new Date(+URLSearch.get('start_date')).getFullYear()
		const end_year = new Date(+URLSearch.get('end_date')).getFullYear()
		targetDiv.innerText = start_year + '년 ' + dateToString(+URLSearch.get('start_date'))
							  + ' ~ '
							  + end_year + '년 ' + dateToString(+URLSearch.get('end_date'))
	}
	else{
		const selected_year = new Date(+URLSearch.get('selected_date')).getFullYear()
		targetDiv.innerText = selected_year + '년 ' + dateToString(+URLSearch.get('selected_date'))
	}
}

function bookingSubmit(event) {
	if(sessionStorage.getItem('login') == '') {
		event.preventDefault()
		interceptorOpenModal()
	}
}












