/*
  Shift select checkbox with in table - jQuery Plugins
  @author Munkhtsogt Tsogbadrakh - munkhuu48@gmail.com
  
  usage: $('tableId').shiftselectcheckbox();
*/

(function($){

  $.fn.shiftselectcheckbox = function(options) {

    return this.each(function()
    {
		var $this = $(this);
		var td_index = -1;
		var start = -1;
		$this.find('tr').each(function(){
		    $(this).find('td').each(function(){	       
		        $(this).find('input[type="checkbox"]').click(function(e){
		            td_index = $(this).parent().index();            
		            var shiftsel = 0
		            $this.find('tr').each(function(){
		                $(this).find('td').each(function(){
		                    if($(this).index() == td_index) {
		                        $(this).find('input[type="checkbox"]').attr("shiftsel", shiftsel);
		                        $(this).find('input[type="checkbox"]').attr("td_index", td_index);
		                    } 
		                });
		                shiftsel++;
		            });
		            if(start == -1) {
		                start = parseInt($(this).attr("shiftsel"), 10);
		            }           
		            if(e.shiftKey){
                         var end = parseInt($(this).attr("shiftsel"), 10);
                         $this.find('input[type="checkbox"]').each(function(){
                            if( $(this).attr("td_index") == td_index && (parseInt($(this).attr("shiftsel"), 10) > start && parseInt($(this).attr("shiftsel"), 10) <= end)){
                                if($(this).is(':checked') && $(this).attr("shiftsel") != end) 
                                    $(this).attr('checked', false);
                                else 
                                    $(this).attr('checked', true);
                            }
                         });
                         start = -1;
		            }
		        }); 
		    });
		});
    });    
  };
})(jQuery);
