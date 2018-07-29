function c(a){
	console.log(a)
}
// 编辑
(function($){
	var flag = false;
	var del = document.querySelectorAll('.shop_del');
	var text = document.querySelectorAll('.shop_text');
	var money =  document.getElementById('money');
	var check = true;
	var _len = del.length;
	// 计算所有的价格
	function countAll(){
		var input = $('.mui-input-numbox');
		var len = input.length;
		var price = 0;
		for (var i = 0; i < len; i++) {
			price += parseInt(input[i].getAttribute('date-money')) * parseInt(input[i].value);
		}
		money.innerHTML = price;
	}
	// 查看多少选择
	function countMany(){
		var all =  $(".shop-check");
		var len = all.length;
		var num =0;
		var allcheck = document.querySelector('.selectall');
		for (var i = 0; i < len; i++) {
			if(all[i].checked == true){
				num++;
			}
		}
		if(num == len){
			allcheck.checked = true;
			check = true;
		}else{
			allcheck.checked = false;
			check = false;
		}
	}
	// 编辑
	mui(document.body).on('tap', '#eduit', function(e) {
		if(flag == false){
			this.innerHTML = '完成';
			for (var i = 0; i < _len; i++) {
				del[i].style.display = 'block';
				text[i].style.display = 'none';
			}
			flag = true;
		}else{
			this.innerHTML = '编辑';
			for (var j = 0; j < _len; j++) {
				del[j].style.display = 'none';
				text[j].style.display = 'block';
			}
			flag = false;
		}
	});
	// 全选
	$(document.body).on('tap', '.selectall', function(e) {
		var all =  $(".shop-check");
		var len = all.length;
		if(check == true){
			for (var i = 0; i < len; i++) {
				all[i].checked = false;
			}
			money.innerHTML = '0.00';
			check = false;
		}else{
			for (var j = 0; j < len; j++) {
				all[j].checked = true;
			}
			countAll();
			check = true;
		}
	});
	// 删除
	$(document.body).on('tap', '.delete', function() {
		var id = this.getAttribute('date-id');
		mui.confirm('您确实要把该商品移出购物车吗？','小提醒',new Array('取消','确认'),function(e){
			if(e.index ==1){
				mui.post('https://www.baidu.com',{id:id},function(data){
					if(data.code == 200) {
						document.getElementById("item_list").removeChild(document.getElementById("item_"+id));
						countAll();
					} else {
						alert(data.message);
					}
				},'json');
			}
		});
	});
	// 勾选
	$(document.body).on('tap', '.shop-check', function() {
		var input = this.parentNode.parentNode.querySelector('.mui-input-numbox');
		var price = parseInt(input.getAttribute('date-money')) * parseInt(input.value);
		if(this.checked == true){
			money.innerHTML = parseInt(money.innerHTML) - parseInt(price);
		}else{
			money.innerHTML = parseInt(money.innerHTML) + parseInt(price);
		}
		setTimeout(function(){
			countMany();
		},100)
	});
	// 加减
	$(document.body).on('tap', '.addN', function(e) {
		var id = this.getAttribute('date-id');
		var num = this.parentNode.querySelector('.mui-input-numbox').value;
		var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode;
		mui.post('https://www.baidu.com',{id:id,num:num},function(data){
			if(data.code == 200) {
				// 缺ajax返回的操作
				parent.querySelector('.shop-check').value = num;
				parent.querySelector('.number').innerHTML = num;
				// countAll();
			} else {
				alert(data.message);
			}
		},'json');
	});
	$(document.body).on("tap",".shop_pay",function(){
		window.location.href = "./confirm_order.html"
	})
	window.onload = countAll();
}(mui));