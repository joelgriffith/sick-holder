;(function(){
	$.fn.sickHolder = function(){
		var getPlaceholder = function(elem){
			return elem.attr('placeholder');
		}

		this.focus(function(){
			$(this).next('.sick-holder').css('color', 'gray');
		});

		this.blur(function(){
			$('.sick-holder').css('color', 'black');
		});

		this.each(function(i){
			var pos = {};
			var placeholderText = getPlaceholder( $(this) );
			var $label = $('<label>' + placeholderText + '</label>')
						 	.addClass('sick-holder');
			pos = $(this).offset();
			console.log(pos);

			$(this).after($label);
			$label.css({
				'position': 'absolute', 
				'top': pos.top, 
				'left': pos.left
			});			
		});
	}	
})(jQuery);