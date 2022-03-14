function gateOpen(event) {
            event.stopPropagation();
            modal.style.visibility = 'visible'
            modal_inner.style.bottom = 0
            modal_inner.style.opacity = 1
            document.body.style.overflow = 'hidden'
        }
function gateClose(event) {
    const target = event.target
    if(target == modal || target == modal_closeBtn || 
        target.parentNode == modal_closeBtn || 
        target.parentNode.parentNode == modal_closeBtn){

        modal_inner.style.bottom = -500 + 'px'
        modal_inner.style.opacity = 0
        modal_inner.style.padding = 0
        modal.style.visibility = 'hidden'
        setTimeout(() => {
        	document.body.style.overflow = 'visible'
        },800)
        modal_inner.style.maxWidth = '568px'
        modal_header.innerHTML = ''
       	modal_content.innerHTML = ''
    }
    else {
        return
    }
}
const modal = document.querySelector('.modal')
const modal_open = document.querySelectorAll('.modal_open')
const modal_closeBtn = document.querySelector('.modal_closeBtn')

modal_open.forEach(btn => {
    btn.onclick = gateOpen
})
modal.onclick = gateClose







