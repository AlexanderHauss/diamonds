var VHChromeFix = function(selectors) {
  var self = this;
  var userAgent = navigator.userAgent.toLowerCase();
  var isAndroidChrome = /chrome/.test(userAgent) && /android/.test(userAgent);
  var isIOSChrome = /crios/.test(userAgent);

  if (isAndroidChrome || isIOSChrome) {
	  
    // If we detected Chrome on Android or iOS
    // Cache elements and trigger fix on init
    this.getElements(selectors);
    this.fixAll();

    // Cache window dimensions
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    window.addEventListener('resize', function() {
      // Both width and height changed (orientation change)
      // This is a hack, as Android when eyboard pops up
      // Triggers orientation change
      if (self.windowWidth !== window.innerWidth && self.windowHeight !== window.innerHeight) {
        self.windowWidth = window.innerWidth;
        self.windowHeight = window.innerHeight;
        self.fixAll();
      }
    });
  }
};

VHChromeFix.prototype.getElements = function(selectors) {
  this.elements = [];
  // Convert selectors to array if they are not
  selectors = this.isArray(selectors) ? selectors : [selectors];

  for (var i = 0; i < selectors.length; i++) {
    // Get all elements for selector
    var selector = selectors[i].selector;
    var elements = document.querySelectorAll(selector);

    // Go through all elements for one selector to filter them
    for (var j = 0; j < elements.length; j++) {
      this.elements.push({
        domElement: elements[j],
        vh: selectors[i].vh
      });
    }
  }
};

VHChromeFix.prototype.isArray = function(array) {
  return Object.prototype.toString.call(array) === '[object Array]';
};

VHChromeFix.prototype.fixAll = function() {
  for (var i = 0; i < this.elements.length; i++) {
    var element = this.elements[i];
    element.domElement.style.height = (window.innerHeight * element.vh / 100) + 'px';
  }
};

$(document).ready(function(){
	
	
var options = [
  {
    selector: '#errea-section', // Mandatory, CSS selector
    vh: 90,  // Mandatory, height in vh units
  },
  {
    selector: '.work-container',
    vh: 100
  },
  {
    selector: '.home-section',
    vh: 100
  }
];

var vhFix = new VHChromeFix(options);
	
	$( ".anim, .work-txt" ).hover(
	  function() {
		$( this ).parent().css('transform', 'translateX(6px)');
		//$( this ).css('transform', 'translateX(6px)');
	  }, function() {
		$( this ).parent().css('transform', 'translateX(0px)');
		//$( this ).css('transform', 'translateX(0px)');
	  }
	);

/*	
	$( ".anim" ).hover(
	  function() {
		$( this ).parent().find('.work-txt').css('transform', 'translateX(6px)');
		$( this ).css('transform', 'translateX(6px)');
	  }, function() {
		$( this ).parent().find('.work-txt').css('transform', 'translateX(0px)');
		$( this ).css('transform', 'translateX(0px)');
	  }
	);
	
	$( ".work-txt" ).hover(
	  function() {
		  $( this ).css('transform', 'translateX(6px)');
		  $( this ).parent().find('.anim').css('transform', 'translateX(6px)');
	  }, function() {
		   $( this ).css('transform', 'translateX(0px)');
		   $( this ).parent().find('.anim').css('transform', 'translateX(0px)');
	  }
	);
*/	
	Pace.on("done", function() {
		setTimeout(function(){ 
			$('.home-txt h1').addClass('home-in');
		}, 1600);
		setTimeout(function(){ 
			$('.home-txt p').addClass('home-in');
		}, 3050);
		setTimeout(function(){ 
			$('#scroll-down').fadeTo('fast',1);
		}, 4050);
	});

	//init scrollmagic
	var controller = new ScrollMagic.Controller();
	
	//Loop per tutte le animazioni facendo un ciclo delle sezioni disponibili
	$( ".work-section" ).each(function() {
		
	 var bgColor = $(this).attr('data-bg');
	  var tweenBg = TweenMax.to($('#bg-blend'),1, {backgroundColor: bgColor, ease:Linear.easeNone});
		
		var sceneBg = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 0.6,
			duration:'40%',
			//useFrames:true,
		})
		.setTween(tweenBg)
		//.addIndicators()
		.addTo(controller);
		
	  var ID = $(this).attr('id');
	  var animaDATA = $(this).attr('data-data');
	  var animID = $(this).attr('data-anim')
	  
	  .animID = bodymovin.loadAnimation({
		  container: document.getElementById(animaDATA),
		  renderer: 'svg',
		  loop: false,
		  autoplay: false,
		  path: 'includes/anim/'+animaDATA+'.json'
	  });
	
		if ($(window).width() >= 960) { var yPar = 150; var trigger_w = 0.5; }else{ var yPar = 0; var trigger_w = 0.8; }
		//var tween parallax
		var tweenParallax = TweenMax.fromTo($('#'+ID+' .work-container img'), 90, {y: yPar}, {ease:Linear.easeNone, y: -(yPar)/*, force3D:true*/}); 
		//creo la scena
		var parallaxScene = new ScrollMagic.Scene({
			triggerElement:'#'+ID,
			triggerHook: trigger_w,
			duration:'125%'
		})
		.on("progress",function (e){
			if(e.progress >= 0.35){
				animID.play();
			}
		})
		.setTween(tweenParallax)
		//indicatori
		//.addIndicators({ name: 'Parallax',colortrigger:'black',colorStart: '#75C695',colorEnd: 'pink'})
		//gasse
		.addTo(controller);

	});
	
			

	
	
	
	$(".work-section").on( "click", function() {
			var url = $(this).attr('data-url');
			var workID = $(this).attr('id');
			$(this).addClass('disable-hover');
			$(".back").attr('data-id', workID);
			$(this).find('.progress-bar').fadeTo( "slow", 1 ).delay(100).find('.progress').startBar();
			$("html, body").animate({ scrollTop: $(this).offset().top }, 1000, function() {
				  //consento lo scroll solo entro lo spazio del progetto
				  $(this).addClass('disable-scroll');
				  document.ontouchmove = function(e){ e.preventDefault(); };

				  //Carico la pagina dentro lo spazio del progetto
				  $('#landing-proj-content').load(url, function() {
					var images = $('#landing-proj img'); var nimages = images.length;
					images.load(function() {
						nimages--;
						if(nimages === 0) {
								$('#'+workID+' .progress').doneBar();
								setTimeout(function() { 
									$('#landing-proj').show(function() {
										$('.back').addClass('active');
										$('#landing-proj-content').addClass('active');
										$('#'+workID+' .progress').resetBar();
										$('#landing-proj').addClass('allow-scroll');
										document.ontouchmove = function(e){ return true; };
			
										
										$.getScript( "js/work-home.js", function( data, textStatus, jqxhr ) {
	
										});

									});
								}, 100);
						}
					});
				});
				//FINE carico la pagina dentro lo spazio del progetto

			});
	 });
	
	//TASTO INDIETRO SUI LAVORI
  
	 $(".back").on( "click", function() {
		 var backID = $(this).attr('data-id');
		  $('#'+backID).removeClass('disable-hover');
		  $("#landing-proj").animate({ scrollTop: 0 }, 1000, function() {
			  $(this).addClass('disable-scroll');
			  document.ontouchmove = function(e){ e.preventDefault(); };
			  $('#landing-proj #landing-proj-content').removeClass('active');
			  setTimeout(function() { 
				   $('#landing-proj').hide();
				   $('#landing-proj #project-container').remove();
				   setTimeout(function() {
							 $("html, body").removeClass('disable-scroll');
					   		 document.ontouchmove = function(e){ return true; };
					}, 100);
			  }, 1500);
			  $('.back').removeClass('active').attr('data-id', '');
		  });
	 });
	
	

});

//FUNZIONE PROGRESSBAR ALVORI
	
	(function( $ ){
			var timer;

			$.fn.startBar = function() {

				$(this).css("transform", 'translate3d(10%, 0px, 0px)');

				var w = 15;
				timer = setInterval($.proxy(function () {
					if(w>74){
						clearInterval(timer);
					}else{
						w = w + 8;
						$(this).css("transform", "translate3d("+w+"%, 0px, 0px)");
					}
				}, this), 1000);

		   };


		   $.fn.doneBar = function() {
			 clearInterval(timer);
			 $(this).css("transform", 'translate3d(200%, 0px, 0px)');
		   };

			$.fn.resetBar = function() {
			 $(this).parent().fadeTo( "slow" , 0, function() {
				 $(this).children().css("transform", 'translate3d(0%, 0px, 0px)');
			  });


		   };
		})( jQuery );


