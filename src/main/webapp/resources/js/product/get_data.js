async function getProductList(offset) {
	offset = (offset == null ? 0 : offset -1)
	let newParam = `${param}`
	newParam += '&offset=' + (offset * 7)
	
	const url = cpath + `/getListAll/${type}` + newParam
	const opt = {method: 'GET'}
	const json = await fetch(url, opt).then(resp => resp.json())

	return json
}

async function getProductFilterList() {
	const URLSearch = new URLSearchParams(location.search)
	URLSearch.delete('price')
	URLSearch.delete('category')
	URLSearch.set('opt', '')
	const newParam = '?' + URLSearch.toString()
	const url = cpath + `/getListAll/${type}` + newParam
	const opt = {method: 'GET'}
	const json = await fetch(url, opt).then(resp => resp.json())
	
	return json
}

async function getPagingCnt() {
	const url = cpath + `/getListAll/${type}${param}`
	const opt = {method: 'GET'}
	const json = await fetch(url, opt).then(resp => resp.json())
	
	return json
}

async function getProductReview(name) {
	const url = cpath + `/${type}Review/ajax/${name}/`
	const opt = {method: 'GET'}
	const json = await fetch(url, opt).then(resp => resp.json())

	return json
}

async function getReviewUser(productName) {
	const url = cpath + `/${type}ReviewUser/${productName}/`
	opt = {method: 'GET'}
	const result = await fetch(url, opt).then(resp => resp.text())
	
	return result
}