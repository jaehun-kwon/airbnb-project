// 웹 창이 1325px 미만일때 지도 안보이게
function map_resize() {
	window_width = window.outerWidth
	if(window_width < 1325){
		container.style.visibility = 'hidden'
		product_main.style.width = '100%'
	}
	else {
		container.style.visibility = 'visible'
		product_main.style.width = '50%'
	}
}
// 검색 리스트에서 사용할 지도 표시
function getMap(container) {
	const mapOpt = { 
			center: new kakao.maps.LatLng(35.16704375305216, 129.1328204677092), 
			draggable: true,
			level: 3
	}
	const map = new kakao.maps.Map(container, mapOpt)
	
	return map
}
// 지도 클릭시 모든 infoDiv 안보이게함
function clickMap(event) {
	const infoList = document.querySelectorAll('.info')
	infoList.forEach(info => info.classList.add('hidden'))
}




