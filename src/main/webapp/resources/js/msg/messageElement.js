const body1_message = document.querySelector('.body1_message')
const body2_message = document.querySelector('.body2_message')
const textarea_message = document.getElementById('textarea_message')
const send_message = document.getElementById('send_message')
const ws = new SockJS(cpath + '/chat?nickname',null,{sessionId:generateSessionId})
const file = document.getElementById('chooseFile_message')
const submit_message = document.querySelector('.submit1_message')
const reader = new FileReader()
const head2_sub_message = document.querySelector('.head2_sub_message')

if (window.location.search.includes('?nickname') || window.location.search.includes('?partner')) window.addEventListener('load',newConnection)
window.addEventListener('load',loadMember)

function generateSessionId(){
	return user
}

ws.onopen 
ws.onmessage = onMessage
ws.onclose
ws.onerror = function(msg){}
send_message.onkeydown = keyHandler