function visible_div_hidden() {
	const visible_div = document.querySelector('.visible_div')
	if(visible_div != null)	{visible_div.classList.toggle('visible_div')}
}

function hidden_div_visible(targetDiv) {
	visible_div_hidden()
	if(targetDiv.querySelector('.hidden_div') != null){
		targetDiv.querySelector('.hidden_div').classList.toggle('visible_div')
	}
}



