var cssAnimation = (function($) {
  var speed = 500,
    easing = 'linear',
    cssTransition = 'cubic-bezier(0.39, 0.575, 0.565, 1)';

  return {
    setup: function(element) {
      var $element = $(element);

      $element.addClass('css3-animation');
      if(this._isCssAnimation()) {
        $element.css('position', 'static');
        $element.css(this._getVendorPrefix('transition'), this._getVendorPrefix('transform') + ' ' + speed + 'ms ' + cssTransition);
        $element.css(this._getVendorPrefix('transform'), 'translate3d(0, 0, 0)');
      } else {
        //$element.css({'left': 0, 'position': 'absolute'});
      }
    },
    animate: function(element) {
      var $element = $(element);
      if (!$element.is(":animated")){
      if(this._isCssAnimation()) {
        if (!$('.mobile-nav').hasClass('furl-open')){
          $element.css(this._getVendorPrefix('transition-duration'), speed + 'ms ');
          $element.css(this._getVendorPrefix('transform'), 'translate3d(' + 0 + 'px, 0, 0)');
          if ($(window).width() <= 767) {$('.nav-list-cntr').delay(300).hide(0);}
        }
        else {
          $('.nav-list-cntr').show();
        $element.css(this._getVendorPrefix('transition-duration'), speed + 'ms ');
        $element.css(this._getVendorPrefix('transform'), 'translate3d(' + 250 + 'px, 0, 0)');

        }
      } else {
        if (!$('.mobile-nav').hasClass('furl-open')){
        $element.animate({
          left: 0
        }, speed, easing, function(){if ($(window).width() <= 767) {$('.nav-list-cntr').hide();}});
                

        }
        else {
          $('.nav-list-cntr').show();
        $element.animate({
          left: 250
        }, speed, easing);
        }
      }
      }
    },
    _isCssAnimation: function() {
      //Mimic modernizr
      return (function() {
        var b = document.body || document.documentElement,
            s = b.style,
            p = 'transition',
            v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];

        if(typeof s[p] === 'string') {
          return true;
        }
        p = p.charAt(0).toUpperCase() + p.substr(1);

        for(var i = 0; i < v.length; i++) {
          if(typeof s[v[i] + p] === 'string') {
            return true;
          }
        }
        return false;
      }());
    },
    _getVendorPrefix: function(property) {
      if(!window.getComputedStyle) {
        return property;
      }

      var styles = window.getComputedStyle(document.documentElement, ''),
          pre = (Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
          )[1];

      return '-' + pre + '-' + property;
    }      
  }
}(jQuery));

