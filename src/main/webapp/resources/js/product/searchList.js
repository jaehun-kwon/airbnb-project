//info가 보여질때 함수
//idx 가 같은 경우 hidden 삭제, 다른경우 hidden 추가
//info의 부모요소(지도 내부의 CustomOverlay) zIndex 변경
function viewInfo(event) {
	const idx = event.target.dataset.idx
	const infoProduct = document.querySelectorAll('.info')
	infoProduct.forEach(product => {
		if(product.dataset.idx == idx){
			product.classList.remove('hidden')
		} else {
			product.classList.add('hidden')
		}
		const infoParent = product.parentNode
		infoParent.style.zIndex = 4
	})
}
//(리스트나 마커)hover 시 선택된 마커 하나만 색상, zIndex 변경
function markerHover(event) {
	let target = event.target
	while(target.classList.contains('marker') == false && target.classList.contains('product_item') == false) {
		target = target.parentNode
	}
	
	const idx = target.dataset.idx
	if(target.classList.contains('marker') == false) {
		target = document.querySelector(`.marker[data-idx="${idx}"`)
	}
	target.style.color = '#fff'
	target.style.backgroundColor = '#000'
	target.parentNode.style.zIndex = 4
}
// (리스트나 마커) mouseOut 시 색상, zIndex 복구
function markerOut(event) {
	let target = event.target
	while(target.classList.contains('marker') == false && target.classList.contains('product_item') == false) {
		target = target.parentNode
	}
	const idx = target.dataset.idx
	if(target.classList.contains('marker') == false) {
		target = document.querySelector(`.marker[data-idx="${idx}"`)
	}
	target.style.color = '#000'
	target.style.backgroundColor = '#fff'
	target.parentNode.style.zIndex = 0
}
function productHover() {
	const productList = document.querySelectorAll('.product_item')
	productList.forEach(product => {
		product.onmouseover = markerHover
		product.onmouseout = markerOut
	})
}

// ==========================================================================================


const param = window.location.search
const bounds = new kakao.maps.LatLngBounds()

function infoDom(product, reviewInfo, type){
	const price = priceToString(product.price)
	const aParam = getChangeParam(param, type)
	const aLocation = `${cpath}/${type}/detail/${product.idx}/${aParam}`
	const options = product.opt != null ? product.opt.split(';') : null
	
	let dom = `<a class="detail_view" href="${aLocation}" target="_blank">
				<div class="info hidden" data-idx="${product.idx}">
					<div class="info_img">
						<img src="${product.img1}">
					</div>
					<div class="info_explan">
						<span class="wish_heart" tabindex="1" data-idx="${product.idx}" data-size="24"></span>
						<div class="info_e_review">
							<span class="review_star_icon" data-size="12"></span>
							${reviewInfo.reviewScore.toFixed(2)} (후기 ${reviewInfo.reviewCnt}개)
						</div>
						<div class="info_e_category">`
		if(options != null) {
			if(type == 'activity') dom += `제공 : `
			for(let i = 0; i < options.length-1; i++ ){
				dom += i == options.length-2 ? `${product_opt_ko(options[i], type)}` : `${product_opt_ko(options[i], type)} · `
			}
		}
		dom +=			`</div>
						<div class="info_e_name">${product.name}</div>
						<div class="info_e_price">₩ ${price} /`
		dom += type == 'house' ? `박` : `인`
		dom += `		</div>
					</div>
				</div>
			</a>`
	return dom
}

function getMarker(product, reviewInfo, type) {
	const geocoder = new kakao.maps.services.Geocoder()
	const productAdd = product.address
	const price = priceToString(product.price)
	let coordinate
	geocoder.addressSearch(productAdd, function(result, status) {
		if (status === kakao.maps.services.Status.OK) {
			coordinate = new kakao.maps.LatLng(result[0].y, result[0].x)
		}
		const markerDiv = document.createElement('div')
		markerDiv.classList.add('marker')
		markerDiv.dataset.idx = `${product.idx}`
		markerDiv.innerText = ` ₩ ${price}`
		markerDiv.onclick = viewInfo
		markerDiv.onmouseover = markerHover
		markerDiv.onmouseout = markerOut
		const marker = new kakao.maps.CustomOverlay({
									position: coordinate,
									content: markerDiv,
									clickable: true
								})
		marker.setMap(map)

		const infoDiv = infoDom(product, reviewInfo, type)
		const info = new kakao.maps.CustomOverlay({
									position: coordinate,
									content: infoDiv,
									zIndex : 5,
									xAnchor: 0,
									yAnchor: 1,
									map: map,
									clickable: true
								})	
		set_wish_heart()
		set_review_star()
		bounds.extend(coordinate)
		map.setBounds(bounds)
		if(sessionStorage.getItem('login') != '') wish_heart_checked()
	})
}

function renderProduct(product, reviewInfo, type){
	const categories = product.category.split(';')
	const options = product.opt != null ? product.opt.split(';') : null
	const price = priceToString(product.price)
	const aParam = getChangeParam(param, type)
	const aLocation = `${cpath}/${type}/detail/${product.idx}/${aParam}`

	let tag = `<a class="detail_view" href="${aLocation}" target="_blank"">
				<div class="product_item" data-idx="${product.idx}">
		  			<div class="h_i_img"><img src="${product.img1}"></div>
		  			<div class="h_i_desc">
			  			<span class="wish_heart" tabindex="1" data-idx="${product.idx}" data-size="24"></span>
						<div>${product.host_name }의 ${product_category_ko(categories[0], type)}</div>
						<div>${product.name }</div>
						<div class="product_under_line"></div>`
	if (type == 'house') {
			tag +=	`<div>
						최대 인원 ${product.count_person}명 · 
						침실 ${product.count_room}개 · 
						침대 ${product.count_bath}개
					</div>`
	}
		tag +=	`<div>`
	if(options != null) {
		for(let i = 0; i < options.length-1; i++ ){
		tag += i == options.length-2 ? `${product_opt_ko(options[i], type)}` : `${product_opt_ko(options[i], type)} · `
		}
	}
	tag	+=			`</div>
					<div>
						<span class="product_grade">
							<span class="review_star_icon" data-size="14"></span>
							<span style="font-weight:bold; color: black;">${reviewInfo.reviewScore.toFixed(2)}</span>
							<span>(후기 ${reviewInfo.reviewCnt}개)</span>
						</span>
						<span><span style="font-weight:bold; font-size: inherit;">₩${price}</span>/`
	tag += type == 'house' ? `박</span>` : `인</span>`
	tag +=			`</div>
				</div>
		   </div></a>`
	product_list.innerHTML += tag
}

async function loadProductList(offset){
	const productList = await getProductList(offset)
	
	product_list.innerHTML = ''
	document.querySelectorAll('.marker').forEach(marker => {
		marker.parentNode.removeChild(document.querySelector('.marker'))
	})
	
	for(let i = 0; i < productList.length; i++) {
		const reviewList = await getProductReview(productList[i].name)
		let reviewInfo = {}
		if(reviewList.length == 0) {
			reviewInfo = {reviewCnt: 0, reviewScore: 0}
		} else {
			const cnt = reviewList.length
			let sum = 0
			let avg = 0
			if(type == 'house') {
				reviewList.forEach(review => {
					sum += review.clean + review.accuracy + review.communication
				})
				avg = sum / (cnt*3)
			} else {
				reviewList.forEach(review => {
					sum += review.point
				})
				avg = sum / cnt
			}
			reviewInfo = {reviewCnt: cnt, reviewScore: avg}
		
		}
		renderProduct(productList[i], reviewInfo, type)
		getMarker(productList[i], reviewInfo, type)
	}
	productHover()
	if(sessionStorage.getItem('login') != '') wish_heart_checked()
}
async function loadProductOptList(){
	const pagingCnt = await getPagingCnt()
	let optList = []
	for(let i = 0; i < pagingCnt.length; i++) {
		if(pagingCnt[i].opt != null) {
			optList.push(pagingCnt[i].opt.split(";"))
		}
	}
	loadProductTotalCnt(pagingCnt.length, 0)
	setHeader_filter(optList)
	const h_f_btn_list = document.querySelectorAll('.header_filter_btn')
	h_f_btn_list.forEach(btn => h_f_btn_addEvent(btn))
}

function loadProductTotalCnt(totalCnt, pagingNumber) {
	const row = 7
	const offset = Math.floor(totalCnt / row) + (totalCnt % row == 0 ? 0 : 1)
	
	if(totalCnt == 0){
		product_list.innerHTML = '<h2 style="text-align: center; font-size: 24px; padding: 70px 0; border-top: 1px solid #dadada;">검색 결과가 없습니다</h2>'
		return
	}
	
	product_list_footer.innerHTML = ''
	if(pagingNumber >= 5) {
		const arrowLeftDiv = document.createElement('div')
		arrowLeftDiv.innerText = '<'
		arrowLeftDiv.classList.add('arrowPagingDiv')
		product_list_footer.appendChild(arrowLeftDiv)
		arrowLeftDiv.addEventListener('click', function() {
			loadProductTotalCnt(totalCnt, event.target.nextElementSibling.innerText -6)
		})
	}
	for(let i = (+pagingNumber + 1); i <= offset; i++) {
		if(i == (+pagingNumber + 6)) {
			const arrowRightDiv = document.createElement('div')
			arrowRightDiv.innerText = '>'
			arrowRightDiv.classList.add('arrowPagingDiv')
			product_list_footer.appendChild(arrowRightDiv)
			arrowRightDiv.addEventListener('click', function() {
				loadProductTotalCnt(totalCnt, event.target.previousElementSibling.innerText)
			})
			return
		}
		const pagingDiv = document.createElement('div')
		pagingDiv.innerText = i
		product_list_footer.appendChild(pagingDiv)
		
		pagingDiv.addEventListener('click', function(event) {
			if(event.target.classList.contains('selectPage')) {return}
			loadProductList(event.target.innerText)
			if(document.querySelector('.selectPage') != null){
				document.querySelector('.selectPage').classList.toggle('selectPage')
			}
			event.target.classList.toggle('selectPage')
		})
		if(i == (+pagingNumber + 1)) {pagingDiv.click()}
	}
}

async function loadProductFilterList(){
	const productFilterList = await getProductFilterList()
	let priceList = []
	let categoryList = []
	for(let i = 0; i < productFilterList.length; i++) {
		priceList.push(Math.floor(productFilterList[i].price / 10000))
		categoryList.push(productFilterList[i].category.split(";"))
	}
	setPriceFilter(priceList)
	setCategoryFilter(categoryList)
}