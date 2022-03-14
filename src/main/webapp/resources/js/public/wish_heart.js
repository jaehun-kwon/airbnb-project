async function heart_click(event) {
	let a = event.target
	while(a.classList.contains('detail_view') == false && a != document.body){
		a = a.parentNode
	}
	if(a.classList.contains('detail_view')) {
		a.addEventListener('click', detail_view_location)
	}
	
	let target = event.target
	while(target.classList.contains('wish_heart') == false) {
		target = target.parentNode
	}
	if(sessionStorage.getItem("login") == '') {
		interceptorOpenModal()
		return
	}
	const idx = target.dataset.idx
	const addURL = cpath + `/addWishHeart/${type}/${idx}`
	const delURL = cpath + `/delWishHeart/${type}/${idx}`
	const opt = {method: 'GET'}
	let result = 0
	if(target.style.color == 'red') {
		result = await fetch(delURL, opt).then(resp => resp.text())
	} else {
		result = await fetch(addURL, opt).then(resp => resp.text())
	}
	if(result == 1) {
		const sameIdxList = document.querySelectorAll(`.wish_heart[data-idx="${idx}"]`)
		sameIdxList.forEach(ele => {
			ele.style.color = ele.style.color == 'red' ? 'white' : 'red'
		})
	}
	
}

function detail_view_location(event) {
	event.preventDefault()
	let target = event.target
	while(target.classList.contains('wish_heart') == false && target.classList.contains('detail_view') == false) {
		target = target.parentNode
	}
	if(target.classList.contains('detail_view')) {
		window.open('about:blank').location.href = target.href
	}
}

async function wish_heart_checked() {
	const url = cpath + `/getWishList/${type}`
	const opt = {method: 'GET'}
	const json = await fetch(url, opt).then(resp => resp.json())
	
	json.forEach(wish => {
		const idx = wish.productIdx
		const heartList = document.querySelectorAll(`.wish_heart[data-idx="${idx}"`)
		if(heartList != null) {
			heartList.forEach(heart => heart.style.color = 'red')
		}
	})
	
}
