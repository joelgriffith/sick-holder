;(function(){
	$.fn.sickHolder = function(){

		// Global functions && variables
		var getPlaceholder = function(elem){
			return elem.attr('placeholder');
		}
		var sickHolder = 'sick-holder';

		// Event Handelers
		this
			.focus(function(){
				if( !$(this).val() == '' ){
					return false;
				}
				$(this).next(sickHolder).addClass('focus');
			})
			.blur(function(){
				if( !$(this).val() == '' ){
					return false;
				}
				$('.sick-holder').show();
				$('.sick-holder').removeClass('focus');
			})
			.keydown(function(e){
				var val= e.keyCode;

				// If keypress is alphanumeric
				if( !/[^A-Za-z0-9 ]/.test(String.fromCharCode(val)) ){
					$(this).next('.sick-holder').hide();
				}
			})
			.keyup(function(e){
				var val = e.keyCode;
				// If keypress is backspace or delete and value is empty
				if( $(this).val() == '' && val === 8){
					$(this).next('.sick-holder').show();
				}
			})
			// The loop!
			.each(function(i){
				var pos = {};
				var placeholderText = getPlaceholder( $(this) );
				var $label = $('<label>' + placeholderText + '</label>')
							 	.addClass('sick-holder');
				pos = $(this).offset();

				$(this).after($label);
				$label.css({
					'position': 'absolute', 
					'top': pos.top, 
					'left': pos.left
				});			
			});
	}	
})(jQuery);