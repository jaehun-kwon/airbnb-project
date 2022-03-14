getScoreBarLenght()

const container = document.querySelector('.d_h_l_m_map')

const map = getMap(container)
map.setZoomable(false)
getRoomMarker(address, map)

const form = document.querySelector('form')
form.addEventListener('submit', bookingSubmit)

const mapLevelupBtn = document.querySelector('.d_h_l_m_up')
const mapLeveldownBtn = document.querySelector('.d_h_l_m_down')
mapLevelupBtn.onclick = zoomIn
mapLeveldownBtn.onclick = zoomOut
 
const copyBtn = document.querySelector('.d_h_m_r_copy')
copyBtn.onclick = copyURL

const reviewModal = document.querySelectorAll('.reviewModal')
reviewAvg = reviewAvg.toFixed(2)
reviewModal.forEach(btn => btn.addEventListener('click', reveiwProductModalContent))

const mapModal = document.querySelector('.d_h_m_l_add')
mapModal.addEventListener('click', mapModalContent)


const optModal = document.querySelector('.d_h_c_l_opts > .modal_open')
if(optModal != null) optModal.addEventListener('click', optModalContent)

const infoMoreBtn = document.querySelector('.d_h_c_l_i_more')
infoMoreBtn.addEventListener('click', infoMore)
  
const wish_heart = document.querySelector('.wish_heart')
wish_heart.addEventListener('click', heart_click)

const booking_box_choose_inner = document.querySelectorAll('.booking_box_choose > .detail_box > *')
booking_box_choose_inner.forEach(inner => {
	setQueryString(inner)
	inner.addEventListener('click', function() {
		hidden_div_visible(inner)
		document.addEventListener('click', booking_box_close)
	})
})
setCalendar()
setSecondCalendar()
valueAreaList_addEvent()
if(sessionStorage.getItem('login') != '') wish_heart_checked()

const b_b_gc_hiddenDiv = document.querySelector('.b_b_guestCount > .hidden_div')
getCountArea(b_b_gc_hiddenDiv)