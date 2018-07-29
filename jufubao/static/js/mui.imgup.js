(function($) {
  var imgup = $.imgup = function(holder, options) {
    var self = this;
    self.holder = holder;
    self.options = options || {};
    self.most = self.options.most || 1;
    self.cur_nums = 0;

    var $attr = self.options.list || '';
    var $urls = $attr.split(',');
    if($attr) {
      self.list($urls);
    } else {
      self.add();
    }
  };
  var $$ = {
    btfClass:function(obj){
      obj.className = obj.className.replace(/(^\s*)|(\s*$)/g, "");
    },
    hasClass: function(obj, name) {
      return obj.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
    },
    addClass: function(obj, name) {
      if (!$$.hasClass(obj, name)) {
        obj.className += " " + name;
        $$.btfClass(obj);
      }
    },
    removeClass: function(obj, name) {
      if ($$.hasClass(obj, name)) {
        var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
        $$.btfClass(obj);
      }
    },
    bind: function(obj, type, fn) {
      obj.addEventListener ? obj.addEventListener(type, fn, false) : obj.attachEvent('on' + type, fn);
    },
    attr: function(obj, name, val) {
      if (val) obj.setAttribute(name, val);
      else return obj.getAttribute(name);
    }
  };
  imgup.prototype.add = function(fun){
    var self = this;
    if(self.cur_nums >= self.most) return false;
    self.cur_nums++;
    var $name = self.options.inputname || "file";
    var close = document.createElement('div');
    $$.addClass(close, 'image-close');
    close.innerHTML = 'X';
    var img = document.createElement('input');
    img.type = "file";
    img.name = $name;
    if(!self.options.onlyImage) {
      $$.attr(img,"accept","image/*");
    }
    var wrap = document.createElement('div');
    $$.addClass(wrap,'image-item space');
    wrap.appendChild(img);
    wrap.appendChild(close);
    self.holder.appendChild(wrap);
    $$.bind(img,"change",function(){
      var $file = img.files[0];
      if ($file) {
        var $one = wrap.style.backgroundImage;
        var dataUrl = URL.createObjectURL($file);
        wrap.style.backgroundImage = 'url(' + dataUrl + ')';
        $$.removeClass(wrap,'space');
        if(!$one) self.add();
        if(typeof (self.options.changeFun) == 'function') self.options.changeFun(img);
      }
    });
    $$.bind(close,'click', function() {
      window.event.stopPropagation();
      window.event.cancelBubble = true;
      setTimeout(function() {
        self.cur_nums--;
        self.holder.removeChild(wrap);
        if(self.cur_nums <= 0 || !$$.hasClass(self.holder.lastChild,"space")) {
          self.add();
        }
      }, 1);
      return false;
    });
    if (typeof (fun) == 'function') fun(wrap,img,close);
  };
  imgup.prototype.list = function($urls) {
    var self = this;
    var block = self.holder;
    var len = $urls.length >= self.most ? self.most : $urls.length+1;
    for(var i = 0; i < len; i++) {(function () {
      var $src = $urls[i];
      self.add(function (wrap,img,close) {
        if($src) {
          wrap.style.backgroundImage = "url('"+$src+"')";
          $$.removeClass(wrap,'space');
          $$.bind(img,'change',function () {
            var isreplace = $$.attr(wrap,'isreplace');
            var $file = img.files[0];
            if($file && $file != $src && !isreplace) {
              var old = document.createElement('input');
              old.type = "hidden";
              old.name = 'delect_history[]';
              old.value = $src;
              block.insertBefore(old,block.childNodes[0]);
              $$.attr(wrap,'isreplace',1);
            }
          });
          $$.bind(close,'click', function() {
            var old = document.createElement('input');
            old.type = "hidden";
            old.name = 'delect_history[]';
            old.value = $src;
            block.insertBefore(old,block.childNodes[0]);
          });
        }
      });
    })();
    }
  };
  if($.fn) {
    $.fn.imgup = function(opt){
      this.each(function(i, element) {
        if (element.imgup) return;
        var _options = opt;
        if (!opt) {
          var cfg = element.getAttribute('data-imgup-options');
          _options = cfg ? JSON.parse(cfg) : {};
        }
          element.imgup = new imgup(element, _options);
      });
    }
  }
  $.ready(function() {
    $('.image-list').imgup();
  });
})(window.mui || window);