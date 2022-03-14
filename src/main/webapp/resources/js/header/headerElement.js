// 로딩화면
const loadingPageDiv = document.querySelector('.loadingPage')
function loadingPageVisible() {
    document.body.style.overflow = 'hidden'
    
    function loadingPageHidden() {
    	loadingPageDiv.style.visibility = 'hidden'
    	document.body.style.overflow = 'visible'
    }
    
    setTimeout(loadingPageHidden, 700)
}
loadingPageVisible()

// 헤더 내용 자동변경
header_change()

// header_nav 관련
const header_nav = document.querySelector('.header_nav')	

// search 관련
const search_box = document.querySelector('.search_box')
search_box.addEventListener('click', search_box_addEvent)

const search_box_inner = document.querySelectorAll('.search_box > span')
const search_box_location = document.querySelector('.search_box > span:first-child')

const detail_search = document.querySelector('.detail_search')
const detail_box = document.querySelector('.detail_box')
const detail_box_inner = document.querySelectorAll('.detail_box > *:not(.header_filter_line)')
detail_box_inner.forEach(inner => detail_box_addEvent(inner))

// 로그인 관련 
const openBtn = document.querySelector('.openBtn')
openBtn.addEventListener('click', showMenu)
const overlay = document.querySelector('.overlay')
overlay.addEventListener('click', closeMenu)
const hideMenu = document.querySelector('.hideMenu')

// filter 관련
setHeader_filter()
filterResetBtn_addEvent()
const h_f_btn_list = document.querySelectorAll('.header_filter_btn')
h_f_btn_list.forEach(btn => h_f_btn_addEvent(btn))

//public 함수 구역
// queryString 관련 
search_box_inner.forEach(inner => setQueryString(inner))
detail_box_inner.forEach(inner => setQueryString(inner))
valueAreaList_addEvent()

// 캘린더 관련
setCalendar() 

// 인원수 계산 관련
const d_b_gc_hiddenDiv = detail_box.querySelector('.d_b_guestCount > .hidden_div')
getCountArea(d_b_gc_hiddenDiv)


// interseptor login 관련
if(window.location.href.includes('loginmodal=open')){
	window.addEventListener('load', interceptorOpenModal)
}
