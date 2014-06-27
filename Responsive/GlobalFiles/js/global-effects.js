$(document).ready(function() {
  setupNavigation();

  $('[data-clickable]').keyup(function(event) {
    if (event.keyCode == 13) {
      $(this).addClass('enter-pressed').click().removeClass('enter-pressed').focus();
    }
  });
});

function setupNavigation() {
  var isDesktop = true,
      isMobile = false,
      element = $('body');

  $(window).resize(function() {
    if ($(window).width() > 767 && !isDesktop) {
      isDesktop = true;
      $('.nav-list-cntr').removeAttr('style');
      var mobileTrigger = $('.mobile-nav');
      if (mobileTrigger.hasClass('furl-open')) {
        $('.mobile-nav').click();
      }
    }
    else {
      isDesktop = false;
    }
  });

  $('.has-secondary').on('mouseenter mouseleave', function(e){
    $(e.currentTarget).children('.secondary-nav').toggleClass('active');
  });

  cssAnimation.setup(element);

  //Navigation setup
  $('.trigger-chan').click(function(e) {
    var el = $(this);

    if ($('body').width() < 768 || el.hasClass('mobile-nav')) {
      //e.preventDefault();
      if(el.hasClass('furl-open')) {
        el.removeClass('furl-open');
        if(el.hasClass('nav-next')) {
          el.next().slideUp();
        }
      } else {
        el.addClass('furl-open');
        if (el.hasClass('nav-next')) {
          el.next().slideDown().parent().siblings().find('.furl-open').removeClass('furl-open').next().slideUp();
        } else {
          $('body').css('position','relative');
        }
      }

      if(!el.hasClass('nav-next')) {
        $('.nav-l1 .furl-open').removeClass('furl-open').next().hide();
        $('.nav-active').parents('li').find('> .trigger-chan').addClass('furl-open').next().show();
        cssAnimation.animate(element);
      }
    }
  });


  $('.furl-trigger').click(function(e) {
    e.preventDefault();
    if(!$(this).hasClass('furl-open')) {
      $(this).addClass('furl-open').next().slideDown();
    } else {
      $(this).removeClass('furl-open').next().slideUp();
    }
  });

}

/* Global Scripts */
function setupTracking(selectors) {
  //Can pass in selectors as string or array
  if(typeof selectors === 'string') {
    if(!selectors.match(/,/g)) {
      selectors = $.makeArray(selectors);
    } else {
      selectors = selectors.split(',');
    }
  //If nothing is supplied, use the default data attributes
  } else if(selectors === undefined) {
    selectors = ['[data-dctracking]', '[data-tracking]'];
  }

  //Loop through selectors and set up tracking
  $.each(selectors, function(index, selector) {
    $(selector+':not([data-tracking-registered])').on('click', function(e) {
      var $self = $(this);

      if($self.data('dctracking') !== undefined) {
        var trackingType = $self.data('dctype') || waDcType,
            trackingAccount = $self.data('dcacct') || waDcSrc,
            trackingCat = $self.data('dctracking') || waDcCat;

        try {
          DcOnClickTracking(trackingType, trackingCat);
        } catch (error) {
          console.log( "Error Message:", error.message );
        }
      }

      if ($self.data('tracking') !== undefined) {
        var trackingId = $self.data('tracking'),
            trackingType = $self.data('type') || 'o',
            share = $self.data('share') || false;

        try {
          if (share) {
            scatShareLinkTrack(trackingType, trackingId);
          } else {
            scatCustomLinkTrack(trackingType, trackingId);
          }
        } catch (error) {
          console.log( "Error Message:", error.message );
        }
      }
    });

    //Attribute to show that this element has already been registered for tracking
    $(selector).attr('data-tracking-registered', '');
  });
}

function setupNewWindow() {
  $('.newWindow').click(function(){window.open($(this).attr('href')); return false;});
}

function checkForEnter(event) {
  if (event.keyCode == 13) {
    $(this).addClass('enter-pressed').click().removeClass('enter-pressed');
  }
}

function addContactMenu() {
  $('.contactTrigger').click(function(e){
    e.preventDefault();
    if ($(this).parent().hasClass('contact-us-bg')) {
      $('.closeTrigger').trigger('click');
    } else {
      $(this).parent().addClass('contact-us-bg');
      $('.nav-contact-us span a').removeClass('nav-arrow');
      $('.contact-overlay-btm', $(this).parent().parent()).fadeIn('fast');
      $('.closeTrigger').click(function(){
        $('.contactTrigger').addClass('nav-arrow');
        $('.contact-us-bg').removeClass('contact-us-bg');
        $('.contact-overlay-btm').hide();
      });
    }
  });
}

function rrWidgetLogic(windowCntr, RR_VERTICAL_OFFSET, rrTriggerCntr, rrCntr) {
  var topOffsetTrigger = rrTriggerCntr.offset().top,
      currTopOffset = windowCntr.scrollTop();

  if ((currTopOffset > topOffsetTrigger-20) && (currTopOffset < ($('.footer-cntr').offset().top-RR_VERTICAL_OFFSET)) && (rrCntr.css('position')!='fixed')) {
    rrTriggerCntr.height(rrTriggerCntr.height());
    rrCntr.css({
      'top': '20px',
      'left': rrCntr.offset().left,
      'position': 'fixed'
    }).addClass( "site-message-fixed" );
  } else if ((currTopOffset <= topOffsetTrigger-20) && (rrCntr.css('position')=='fixed')) {
    rrTriggerCntr.css( "height", "auto" );
    rrCntr.css('position', 'static').removeClass( "site-message-fixed" );
  } else if ((currTopOffset >= ($('.footer-cntr').offset().top-RR_VERTICAL_OFFSET)) && (rrCntr.css('position')=='fixed') && (rrCntr.css('position')!='absolute')) {
    rrCntr.css({
      'left': 'auto',
      'right': '0',
      'top': 'auto',
      'bottom': '40px',
      'position': 'absolute'
    });
  }
}

function addRRScroller() {
  var RR_VERTICAL_OFFSET =  $('.main-content-cntr-rr').height() + 42,
      rrTriggerCntr = $('.main-content-cntr-body, .faqs-content-cntr-body'),
      rrCntr = $('.main-content-cntr-rr'),
      windowCntr = $(window);

  windowCntr.bind("scroll resize", function(){
    rrWidgetLogic(windowCntr, RR_VERTICAL_OFFSET, rrTriggerCntr, rrCntr);
  });
}

function setupFurls() {
  $('.furlTrigger').click(function() {
    var RR_VERTICAL_OFFSET =  $( ".main-content-cntr-rr" ).height() + 42;
    var rrTriggerCntr = $( ".main-content-cntr-body, .faqs-content-cntr-body" );
    var rrCntr = $( ".main-content-cntr-rr" );
    var windowCntr = $(window);
    if ($('.faqs-content-cntr-body')) {$('.faqs-content-cntr-body').css('height','auto');}
    windowCntr.unbind("scroll resize");
    $(this).next().slideToggle('fast');
    if (!$(this).hasClass("furlOpen")) {
      $(this).addClass('furlOpen');
    } else if ($(this).hasClass('furlOpen')) {
      $(this).removeClass('furlOpen');
    }
      windowCntr.bind("scroll resize", function(){
        rrWidgetLogic(windowCntr, RR_VERTICAL_OFFSET, rrTriggerCntr, rrCntr);
      });
    return false;
  });

  $('.readMoreTrigger').click(function() {
    var RR_VERTICAL_OFFSET =  $( ".main-content-cntr-rr" ).height() + 42;
    var rrTriggerCntr = $( ".main-content-cntr-body, .faqs-content-cntr-body" );
    var rrCntr = $( ".main-content-cntr-rr" );
    var windowCntr = $(window);
    if ($('.main-content-cntr-body')) {$('.main-content-cntr-body').css('height','auto');}
    windowCntr.unbind("scroll resize");
    if (!$(this).hasClass("readMoreOpen")) {
     $(this).addClass('readMoreOpen').text("Read less");
    } else {
     $(this).removeClass('readMoreOpen').text("Read more");
    }
    $(this).next().slideToggle('fast',function(){
      windowCntr.bind("scroll resize", function(){
        rrWidgetLogic(windowCntr, RR_VERTICAL_OFFSET, rrTriggerCntr, rrCntr);
      });
    });
     return false;
   });
};

function checkIfMobile() {
  var deviceIphone = "iphone",
      deviceIpod = "ipod",
      deviceS60 = "series60",
      deviceSymbian = "symbian",
      deviceAndroid = "android",
      deviceWinMob = "windows ce",
      deviceBB = "blackberry",
      devicePalm = "palm",
      mobileList = ['iphone','ipod','ipad','series60','symbian','windows ce','blackberry','palm'],
      isMobileDevice = false,
      uagent = navigator.userAgent.toLowerCase();

  for (mobileDevice in mobileList) {
    if (uagent.search(mobileList[mobileDevice]) > -1) {
      isMobileDevice = true;
    }
  }
  return isMobileDevice;
}

function isDevice(deviceName) {
  var isMobileDevice = false,
      mobileList = ['series60','symbian','windows ce','blackberry','palm'],
      uagent = navigator.userAgent.toLowerCase();
  if (deviceName) {
    if (uagent.search(deviceName) > -1)
      {isMobileDevice = true;}
  } else {
    for (mobileDevice in mobileList) {
      if (uagent.search(mobileList[mobileDevice]) > -1) {
        isMobileDevice = true;
      }
    }
  }
  return isMobileDevice;
}

function checkDevice() {
  if (isDevice('iphone')||isDevice('ipod')) {
    document.location.href = 'iphone-mob.html';
  }
  else if (isDevice('android')) {
    document.location.href = 'android-mob.html';
  }
  else if (isDevice(false)) {
    document.location.href = 'mobile-web-mob.html';
  }
}

// Mobile Only mid-content expanded information
$(document).ready(function() {
  $('.mid-info-box').click(function(){
    $(this).toggleClass('shrink');
    $(this).toggleClass('bg-white');
    $(this).children('.mid-info-text-wrap').toggleClass('hideBelow590');
    $(this).find('.plus-sign').toggleClass('hide');
    $(this).find('.minus-sign').toggleClass('hide');
  });
});
