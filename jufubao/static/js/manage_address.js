(function($){
	$(document.body).on('tap', '.del', function() {
		var id = this.getAttribute('date-id');
		var ul = this.parentNode.parentNode.parentNode;
		mui.confirm('删除这个地址','小提醒',new Array('取消','确定'),function(e){
			if(e.index == 1){
				mui.post('http://server-name/login.php',{id:id},function(data){
					ul.parentNode.removeChild(ul);
				},'json');
			}
		});
	});
	$(document.body).on('tap', '.address_select', function() {
		var id = this.getAttribute('date-id');
		var input = mui('.address_select');
		var len = input.length;
		for (var i = 0; i < len; i++) {
			input[i].checked = false;
		}
		mui.post('http://server-name/login.php',{id:id},function(data){
			// mui.
		},'json');
	});
}(mui));