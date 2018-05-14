$(document).ready(function(){
	
	var introID = bodymovin.loadAnimation({
	  container: document.getElementById('data-intro-about'),
	  renderer: 'svg',
	  loop: false,
	  autoplay: false,
	  path: '../includes/anim/data-intro-about.json'
	});
	

	Pace.on("done", function() {
		setTimeout(function(){ 
			introID.play();
		}, 1200);
	});
	
	//animazioni pagina about
	 var animApproccio = bodymovin.loadAnimation({
		  container: document.getElementById('anim-approccio'),
		  renderer: 'svg',
		  loop: false,
		  autoplay: false,
		  path: 'https://blendingpoint.com/includes/anim/approccio.json'
	  });
	
	//init scrollmagic
	var controllerAbout = new ScrollMagic.Controller();
	
	$( ".path-text-item" ).each(function() {
		
	  var obj = (this);
	  //var tweenTextAppr = TweenMax.from($(this).find('.path-text-item-inner'),1, {yPercent: 40,autoAlpha:0},0);
		
		var sceneTextAppr = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 0.5,
			duration:'50%'
		})
		.on("start",function(ev){
			if ($(window).width() >= 960) {
				var direction = ev.scrollDirection;
				if(direction=='FORWARD'){
					$(obj).find('.path-text-item-inner').fadeTo('slow',1);
				}else{
					$(obj).find('.path-text-item-inner').fadeTo('slow',0);
				}
			}else{ $(obj).find('.path-text-item-inner').fadeTo('slow',1); }
		}).on("end",function(ev){
			if ($(window).width() >= 960) {
				var direction = ev.scrollDirection;
				if(direction=='FORWARD'){
					$(obj).find('.path-text-item-inner').fadeTo('slow',0);
				}else{
					$(obj).find('.path-text-item-inner').fadeTo('slow',1);
				}
			}else{ $(obj).find('.path-text-item-inner').fadeTo('slow',1); }
		})
		//.addIndicators()
		.addTo(controllerAbout);

	});

	//Posizione di partenza approccio
		var sceneApproccio = new ScrollMagic.Scene({
			triggerElement: '#desk-section',
			triggerHook:0
		})
		.on('start', function () {
			 animApproccio.playSegments([0,60],true);
		})
		//.addIndicators()
		.addTo(controllerAbout);
	
	
	
	//Fisso la sezione approccio
		if ($(window).width() >= 960) { var bgDurEase = '150%'; }else{ var bgDurEase = '360%'; }
		var sceneApproccio = new ScrollMagic.Scene({
			triggerElement: '#path-section',
			triggerHook:0.3,
			duration:bgDurEase
		})
		.on('start', function () {
			$('#about-container').addClass('bg-ease');
		})
		.on('end', function (event) {
			var direction = event.scrollDirection;
			if(direction=='FORWARD'){
				$('#about-container').removeClass('bg-ease');
			}else{
				$('#about-container').addClass('bg-ease');
			}
			
		})
		.setPin('#anim-approccio')
		//.addIndicators({name:'endbg'})
		.addTo(controllerAbout);
	
	
	
	
		//Animazioni approccio
		if ($(window).width() >= 960) { var bgDur1 = '50%'; }else{ var bgDur1 = '90%'; }
		var approccio1 = new ScrollMagic.Scene({
			triggerElement: '#path-section',
			duration: bgDur1
		})
		
		.on('end', function (event) {
				var direction = event.scrollDirection;
				if(direction=='FORWARD'){
					$('#about-container').css('background-color','rgb(219,219,219)');
					animApproccio.playSegments([60,120],true);
				}else{
					$('#about-container').css('background-color','rgb(255,255,255)');
					animApproccio.playSegments([120,60],true);
				}
			
		})
		//.addIndicators()
		.addTo(controllerAbout);
	
	    if ($(window).width() >= 960) { var bgDur2 = '100%'; }else{ var bgDur2 = '180%'; }
		var approccio2 = new ScrollMagic.Scene({
			triggerElement: '#path-section',
			duration:bgDur2
		})
		.on('end', function (event) {
				var direction = event.scrollDirection;
				if(direction=='FORWARD'){
					$('#about-container').css('background-color','rgb(255,255,255)');
					animApproccio.playSegments([120,180],true);
				}else{
					$('#about-container').css('background-color','rgb(219,219,219)');
					animApproccio.playSegments([180,120],true);
				}
		})
		//.addIndicators()
		.addTo(controllerAbout);
	
		 if ($(window).width() >= 960) { var bgDur3 = '150%'; }else{ var bgDur3 = '270%'; }
		var approccio3 = new ScrollMagic.Scene({
			triggerElement: '#path-section',
			duration:bgDur3
		})
		.on('end', function (event) {
				var direction = event.scrollDirection;
				if(direction=='FORWARD'){
					$('#about-container').css('background-color','rgb(219,219,219)');
					animApproccio.playSegments([180,240],true);
				}else{
					$('#about-container').css('background-color','rgb(255,255,255)');
					animApproccio.playSegments([240,180],true);
				}

		})
		//.addIndicators()
		.addTo(controllerAbout);
	
	
	
	$( ".static-appr" ).each(function() {
	
	  var StaticAnimaDATA = $(this).attr('data-data');
	  
	  var StaticAprrID = bodymovin.loadAnimation({
		  container: document.getElementById(StaticAnimaDATA),
		  renderer: 'svg',
		  loop: false,
		  autoplay: false,
		  path: '../includes/anim/'+StaticAnimaDATA+'.json'
	  });
	
		
		//creo la scena
		var StaticAprrScene = new ScrollMagic.Scene({
			triggerElement:this,
			triggerHook: 0.40,
			duration: '50%'
		})
		.on("progress",function (e){
			if(e.progress >= 0.01){
				StaticAprrID.play();
			}
		})
		//indicatori
		//.addIndicators({ name: 'OP',colortrigger:'red',colorStart: 'green',colorEnd: 'green'})
		//gasse
		.addTo(controllerAbout);
		
		
	
		
    });
	
	
	
	
	$( ".team-item" ).each(function() {

	  var ID = $(this).attr('id');
	  var animaDATA = $(this).attr('data-data');
	  var animID = $(this).attr('data-anim')
	  
	  .animID = bodymovin.loadAnimation({
		  container: document.getElementById(animaDATA),
		  renderer: 'svg',
		  loop: false,
		  autoplay: false,
		  path: '../includes/anim/'+animaDATA+'.json'
	  });
	
	
		//var tween
		var tweenAboutTeam = TweenMax.fromTo($('#'+ID+' .team-item-inner img'), 1, {yPercent: 10}, {yPercent: -10}); 
		//creo la scena
		var homeScene = new ScrollMagic.Scene({
			triggerElement:'#'+ID,
			triggerHook:0.8,
			duration: '200%'
		})
		
		.setTween(tweenAboutTeam)
		//indicatori
		//.addIndicators({ name: 'anim',colortrigger:'black',colorStart: '#75C695',colorEnd: 'pink'})
		//gasse
		.addTo(controllerAbout);
		
		
		//var tween
		var tweenOp = TweenMax.from($('#'+ID+' .team-text'), 1, {autoAlpha:0});

		//creo la scena
		var OpScene = new ScrollMagic.Scene({
			triggerElement:'#'+ID,
			triggerHook: 0.40,
			duration: '50%'
		})
		.on("progress",function (e){
			if(e.progress >= 0.01){
				animID.play();
			}
		})
		.setTween(tweenOp)
		//indicatori
		//.addIndicators({ name: 'OP',colortrigger:'red',colorStart: 'green',colorEnd: 'green'})
		//gasse
		.addTo(controllerAbout);
	
	});
	

	//Loop per tutte le animazioni facendo un ciclo delle sezioni disponibili
	$( ".bg-change" ).each(function() {
		
	  var bgColor = $(this).attr('data-bg');
	  var tweenBg = TweenMax.to($('#about-container'),1, {backgroundColor: bgColor, ease:Linear.easeNone});
		
		var sceneBg = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 0.7,
			duration:'50%'
		})
		.setTween(tweenBg)
		//.addIndicators({name:'bg'})
		.addTo(controllerAbout);
	
	
	});
	
	$( ".down-line span" ).each(function() {
		
	  var tweenLine = TweenMax.fromTo($(this), 1, {css: {'height': '0px'}}, {css:{'height': '100px'}});
		
		var sceneLine = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 0.7,
			duration:'200px'
		})
		.setTween(tweenLine)
		//.addIndicators()
		.addTo(controllerAbout);
	
	
	});
	
	$( ".in-text" ).each(function() {

	  var tweenText = TweenMax.from($(this).find('.in-text-item'),1, {yPercent: 40,autoAlpha:0},0);
		
		var sceneText = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 0.7
		})
		.setTween(tweenText)
		//.addIndicators()
		.addTo(controllerAbout);

	});
	
});

