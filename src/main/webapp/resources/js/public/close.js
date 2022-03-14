function search_box_close(event) {
	let target = event.target
	while(target.classList.contains('sticky') == false && target.classList.contains('modal') == false && target != document.body){
		target = target.parentNode
	}
	if(target == document.body) {
		header_nav.style.display = 'none'
		search_box.style.display = 'flex'
	    	
		detail_search.style.height = 0
    	detail_search.style.visibility = 'hidden'
    	document.removeEventListener('click', search_box_close)
	}
}

function detail_box_close(event) {
	let target = event.target
	while(target.classList.contains('detail_search') == false && target.classList.contains('modal') == false && target != document.body){
		target = target.parentNode
	}
	if(target == document.body) {
		if(detail_box.classList.contains('rgb247')) {detail_box.classList.toggle('rgb247')}
		detail_box_inner.forEach(inner => {
			if(inner.classList.contains('bs0510')) {inner.classList.toggle('bs0510')}
		})
		visible_div_hidden()
		document.removeEventListener('click', detail_box_close)
	}
}

function booking_box_close(event) {
	let target = event.target
	while(target.classList.contains('booking_box') == false && target.classList.contains('modal') == false && target != document.body){
		target = target.parentNode
	}
	if(target == document.body) {
		visible_div_hidden()
		document.removeEventListener('click', booking_box_close)
	}
}

function h_f_btn_close(event) {
	let target = event.target
	while(target.classList.contains('header_filter_btn') == false && target.classList.contains('hidden_div') == false && target != document.body){
		target = target.parentNode
	}
	if(target == document.body) {
		let btn
		document.querySelectorAll('.down_arrow').forEach(da => {
			if(da.classList.contains('arrow_hidden')) {
				btn = da.parentNode
			}
		})
		
		btn.querySelector('.up_arrow').classList.toggle('arrow_hidden')
		btn.querySelector('.down_arrow').classList.toggle('arrow_hidden')
		btn.classList.toggle('selected_h_f_btn')
		visible_div_hidden()
		document.removeEventListener('click', h_f_btn_close)
	}
}

