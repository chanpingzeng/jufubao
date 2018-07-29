var mySwiper = new Swiper('.swiper-container', {
	autoplay: true,//可选选项，自动滑动
	speed:500,
	autoplay : {
	   delay:4000
	},
	pagination: {
	    el: '.swiper-pagination',
	 },
})
// 底部弹起
function choice(){
	mui('#sheet1').popover('toggle');	
}


// 倒计时
timer('timer');//调用方法  
      
//时分秒倒计时方法  
function timer(eleId){  
    var element=document.getElementById(eleId);  
    if(element){  
        endTimer=element.getAttribute('data-timer');  
        var endTime=new Date(parseInt(endTimer.substr(0,4), 10),parseInt(endTimer.substr(4,2), 10),parseInt(endTimer.substr(6,2), 10),parseInt(endTimer.substr(8,2), 10),parseInt(endTimer.substr(10,2), 10),parseInt(endTimer.substr(12,2), 10));  
        var endTimeMonth=endTime.getMonth()-1;  
        endTime.setMonth(endTimeMonth);  
        var ts = endTime - new Date();  
        if(ts>0){  
            var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);  
            var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);  
            var mm = parseInt(ts / 1000 / 60 % 60, 10);  
            var ss = parseInt(ts / 1000 % 60, 10);  
            dd = dd<10?("0" + dd):dd;   //天  
            hh = hh<10?("0" + hh):hh;   //时  
            mm = mm<10?("0" + mm):mm;   //分  
            ss = ss<10?("0" + ss):ss;   //秒  
            document.getElementById("timer_d").innerHTML=dd;  
            document.getElementById("timer_h").innerHTML=hh;  
            document.getElementById("timer_m").innerHTML=mm;  
            document.getElementById("timer_s").innerHTML=ss;  
            setTimeout(function(){timer(eleId);},1000);  
        }else{  
            document.getElementById("timer_d").innerHTML=0;  
            document.getElementById("timer_h").innerHTML=0;  
            document.getElementById("timer_m").innerHTML=0;  
            document.getElementById("timer_s").innerHTML=0;  
        }  
    }  
}
(function($){
    // 产品选择
	var select = document.getElementById('select').children;
	var select_len = select.length;
	for (var i = 0; i < select_len; i++) {
		(function(j){
			select[i].addEventListener('tap',function(){
				console.log(this)
				// 获取选取的值
				var content = this.innerHTML;
				var _all = document.querySelectorAll("#select dd");
				var _all_len = _all.length;
				for (var k = 0; k < _all_len; k++) {
					_all[k].style.backgroundColor = '#b5adad';
				}
				this.style.backgroundColor = 'rgb(253,101,1)';
				document.querySelector('#the_chocie').innerHTML = '已选择:'+ content;
				document.querySelector('#select input').value = content;
    		});
		}(i));
	}
	// 点击立即购买
	document.querySelector('.foot_buy_now_buy').addEventListener('tap',function(){
		var content = document.querySelector('#select input').value;
		if(content==''){
			// 没有选择产品规格
			document.getElementById('the_chocie').click();
		}else{
			// 已选择产品规格跳转支付的操作
			window.location.href ="./shopping.html"
			// window.location.href = '';
		}
	});
	//点击购物车
	document.querySelector('.add_shop_car').addEventListener('tap',function(){
		var content = document.querySelector('#select input').value;
		// 所选产品的数量
		var num = document.querySelector('.mui-input-numbox').value;
		//购物车的数量
		var number = document.querySelector('.foot_buy_logo div span').innerHTML;
		var _num;
		if(content==''){
			// 没有选择产品规格
			document.getElementById('the_chocie').click();
		}else{
			// 已选择产品规格增加到购物车的操作
			// 前端的变化
			_num = parseInt(number) + parseInt(num);
			document.querySelector('.foot_buy_logo div span').innerHTML = _num;
			$.toast('已添加到购物车');
			// 后台的操作	
		}
	});
}(mui)) ;