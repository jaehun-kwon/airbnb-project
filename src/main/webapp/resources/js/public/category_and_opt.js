function total_category_ko(category) {
	switch (category) {
	case 'privateroom':
		return '개인실'
	case 'pension':
		return '펜션'
	case 'multiroom':
		return '다인실'
	case 'selfcheckin':
		return '셀프 체크인'
	case 'cancel':
		return '취소 가능'
	case 'cultureAndArt':
		return '문화예술'
	case 'culture':
		return '예술'
	case 'photo':         
		return '사진'
	case 'drawing':
		return '그림'
	case 'nature':
		return '자연 및 야외활동'
	case 'outdoor':
		return '야외활동'
	case 'hiking':
		return '하이킹'
	case 'fishing':
		return '낚시'
	case 'animal':
		return '동물'
	case 'habitat':
		return '동물 서식지'
	case 'farm':
		return '농장 동물'
	}
}
function total_category_en(category) {
	switch (category) {
	case '개인실':
		return 'privateroom'
	case '펜션':
		return 'pension'
	case '다인실':
		return 'multiroom'
	case '셀프 체크인':
		return 'selfcheckin'
	case '취소 가능':
		return 'cancel'
	case '문화예술':
		return 'cultureAndArt'
	case '예술':
		return 'culture'
	case '사진':         
		return 'photo'
	case '그림':
		return 'drawing'
	case '자연 및 야외활동':
		return 'nature'
	case '야외활동':
		return 'outdoor'
	case '하이킹':
		return 'hiking'
	case '낚시':
		return 'fishing'
	case '동물':
		return 'animal'
	case '동물 서식지':
		return 'habitat'
	case '농장 동물':
		return 'farm'
	}
}
function total_opt_ko(opt) {
	switch (opt) {
	case 'wifi':
		return '무선인터넷'
	case 'airconditioner':
		return '에어컨'
	case 'parking':
		return '주차 가능'
	case 'oven':
		return '전자레인지'
	case 'fridge':
		return '냉장고'
	case 'kitchen':
		return '주방'
	case 'tv':
		return 'TV'
	case 'washer':
		return '세탁기'
	case 'hairdryer':
		return '헤어드라이기'
	case 'hotwater':
		return '온수'
	case 'heater':
		return '난방'
	case 'barbecue':
		return '바베큐'
	case 'selfcheckin':
		return '셀프 체크인'
	case 'fireoff':
		return '소화기'
	case 'necessity':
		return '필수품목'
	case 'hanger':
		return '옷걸이'
	case 'equipment':
		return '장비'
	case 'drink':
		return '음료'
	case 'ticket':
		return '티켓'
	case 'transportation':
		return '교통'
	case 'equipment':
		return '장비'
	case 'drink':
		return '음료'
	case 'ticket':
		return '티켓'
	case 'transportation':
		return '교통'
	}
}
function house_category_ko(category) {
	switch (category) {
	case 'privateroom':
		return '개인실'
	case 'pension':
		return '펜션'
	case 'multiroom':
		return '다인실'
	case 'selfcheckin':
		return '셀프 체크인'
	case 'cancel':
		return '취소 가능'
	}
}
function house_opt_ko(opt){
	switch (opt) {
	case 'wifi':
		return '무선인터넷'
	case 'airconditioner':
		return '에어컨'
	case 'parking':
		return '주차 가능'
	case 'oven':
		return '전자레인지'
	case 'fridge':
		return '냉장고'
	case 'kitchen':
		return '주방'
	case 'tv':
		return 'TV'
	case 'washer':
		return '세탁기'
	case 'hairdryer':
		return '헤어드라이기'
	case 'hotwater':
		return '온수'
	case 'heater':
		return '난방'
	case 'barbecue':
		return '바베큐'
	case 'selfcheckin':
		return '셀프 체크인'
	case 'fireoff':
		return '소화기'
	case 'necessity':
		return '필수품목'
	case 'hanger':
		return '옷걸이'
	}
}

function activity_category_ko(category) {
	switch (category) {
	case 'cultureAndArt':
		return '문화예술'
	case 'culture':
		return '예술'
	case 'photo':         
		return '사진'
	case 'drawing':
		return '그림'
	case 'nature':
		return '자연 및 야외활동'
	case 'outdoor':
		return '야외활동'
	case 'hiking':
		return '하이킹'
	case 'fishing':
		return '낚시'
	case 'animal':
		return '동물'
	case 'habitat':
		return '동물 서식지'
	case 'farm':
		return '농장 동물'
	}
}
function activity_opt_ko(opt) {
	switch (opt) {
	case 'equipment':
		return '장비'
	case 'drink':
		return '음료'
	case 'ticket':
		return '티켓'
	case 'transportation':
		return '교통'
	}
}

function product_category_ko(category, type){
	if(type == 'house'){
		return house_category_ko(category)
	} else if(type == 'activity'){
		return activity_category_ko(category)
	}
}
function product_opt_ko(category, type){
	if(type == 'house'){
		return house_opt_ko(category)
	} else if(type == 'activity'){
		return activity_opt_ko(category)
	}
}

