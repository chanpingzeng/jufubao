(function($){
	if(typeof($) === 'undefined') return;
	var zp = {
		init: function(){
			$("#bottom").on('tap',"a",function(){
		        var $u = this.href;
		        $.openWindow({
		            url : $u + '.html',
		            id : $u
		        });
		    });
		}
	}
	zp.init();
})(window.mui || mui)