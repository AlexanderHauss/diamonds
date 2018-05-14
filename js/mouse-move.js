$(document).ready(function( ) {

	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		
			
		
		
	} else{
	  				
				// DESKTOP CODE
		
		
		
				/*$( "body" ).mouseenter(function() {
						setTimeout(function(){
							$('#standard-bg').removeClass('first-move');
							$('#blurred-bg').removeClass('first-move');
						}, 1000);
					});
*/
				 ww = $(window).width()

                //window.addEventListener('mousemove', function(e){
                $(document).on('mousemove', '.home-section', function(e){
                    mX = e.pageX;
                    element  = $('#center');
                    distance = Math.floor(Math.sqrt(Math.pow(mX - (element.offset().left+(element.width()/2)), 2)));
                    window.requestAnimationFrame(doSomeAnimation);
                });


                function doSomeAnimation(){

						var number = Math.min(Math.max(distance, 1), 9999);
						var pp = number*2/ww,
							/*halfww = ww/2,
							percent = number*100/halfww,
							op1 = (percent/100).toFixed(2);*/
							op = (pp).toFixed(2);

							//Calcolare lo scarto fra 1 (livello di zoom normale) e il livello di zoom minimo desiderato e aggiungerlo poi allo stesso.
							//var scale1 = (1-(percent/100)*0.04);
							var scale = (1-(pp*0.04));
//console.log(scale1+ ' === '+scale);
						$('#blurred-bg').css('opacity',op);
						$('#standard-bg').css('transform','scale('+scale+')');
						$('#blurred-bg').css('transform','scale('+scale+')');

                }

		}

	
	
});

