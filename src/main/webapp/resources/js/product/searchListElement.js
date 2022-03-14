const container = document.getElementById('map')
const map = getMap(container)
let window_width = window.outerWidth
const product_main = document.querySelector('.product_main')
const product_list = document.querySelector('.product_list')
const product_list_footer = document.querySelector('.product_list_footer')

loadProductFilterList()
loadProductOptList()

map_resize()
window.addEventListener('resize', map_resize)

kakao.maps.event.addListener(map, 'click', clickMap)