/*
  Validation for forms - jQuery Plugins
  @author Munkhtsogt Tsogbadrakh - munkhuu48@gmail.com
*/

(function($){

  $.fn.validation = function(options) {
  
    var settings = $.extend(
    {
		rules: {},
		messages: {}
    }, options);  

	var rules = settings.rules;
	var messages = settings.messages;
    return this.each(function()
    {
		var $this = $(this);
		var invalid = false;	
		if(rules.email == true)
		{
			$this.find('input[valid="email"]').each(function()
			{
				var value = $(this).val();
				var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/;
				if(!emailReg.test(value)){
					$(this).parent().find("p").remove();
					var p = document.createElement("p");
					$(p).attr("style", "color: red");
					$(p).empty();
					$(p).html(messages.email);
					$(this).parent().append(p);
					invalid = true;
				}
				else $(this).parent().find("p").remove();
			});	
		}
		if(rules.numeric == true)
		{
			$this.find('input[valid="numeric"]').each(function()
			{
				var value = $(this).val();
				var numericReg = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/;
				if(!numericReg.test(value))
				{
					$(this).parent().find("p").remove();
					var p = document.createElement("p");
					$(p).attr("style", "color: red");
					$(p).empty();
					$(p).html(messages.numeric);
					$(this).parent().append(p);
					invalid = true;
				}
				else $(this).parent().find("p").remove();
			});	
		}  
		if(rules.date == true)
		{
			$this.find('input[valid="date"]').each(function()
			{
				var value = $(this).val();
				var dateReg1 = /^(0[1-9]|[1-2][0-9]|3[0-1])[\/\-](0[1-9]|1[012])[\/\-]\d{4}$/;
				var dateReg2 = /^(\d{4})[\/\-](0[1-9]|1[012])[\/\-](0[1-9]|[1-2][0-9]|3[0-1])/;
				if(!dateReg1.test(value) && !dateReg2.test(value))
				{
					$(this).parent().find("p").remove();
					var p = document.createElement("p");
					$(p).attr("style", "color: red");
					$(p).empty();
					$(p).html(messages.date);
					$(this).parent().append(p);
					invalid = true;
				}
				else $(this).parent().find("p").remove();
			});	
		}
		if(invalid == true)
		{
			settings.success.call($this, true);
		}		
    });
    
  };
})(jQuery);
