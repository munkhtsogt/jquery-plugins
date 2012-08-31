/*
  * Simple SWOT table create plugins
  *
  * Copyright 2012, ALCHEMIST TECHNOLOGIES LLC
  * http://www.alchemisthq.com
  * 
  * Code by Munkhtsogt Tsogbadrakh (Zi)
  *
  * Start date: Wed May 23 12:47:00 2012
  *
  * Usage:
  * $('#div').swot({
      'title': 'CSF strategy: Strategie option by (SWOT/Cross-Swot Analysis)',
      'table_1': { title: "Internal & External Factors"},
      s: { title: "Header II" , elements: [{id: '1', text:'a'}, {id: '2', text:'b'}, {id: '3', text:'c'}], editable: true},
      w: { title: "Header III" ,elements: [{id: '1', text:'a'}, {id: '2', text:'b'}, {id: '3', text:'c'}], editable: true},
    });
*/

(function($){

  $.fn.swot = function(options)
  {
    var settings = $.extend(
    {
      'title': 'SWOT/Cross-Swot Analysis',
      'table_1' : { title: "Header I",   elements: []},
      s  : { title: "Header S",  elements: [], editable: false},
      w  : { title: "Header W",  elements: [], editable: false},
      o  : { title: "Header O",  elements: [], editable: false},
      t  : { title: "Header T",  elements: [], editable: false},
      so : { title: "Header SO", elements: [], editable: false},
      st : { title: "Header ST", elements: [], editable: false},
      wo : { title: "Header WO", elements: [], editable: false},
      wt : { title: "Header WT", elements: [], editable: false},
      onInsert: function(id, text) {},
      onChange: function(id) {},
      onDelete: function(id) {}
    }, options)
    
    return this.each(function()
    {
      var $this = $(this);
      var table = document.createElement('table');
      var tbody = document.createElement('tbody');
      $(table).attr('width', '100%');  
      $(table).attr('border', '0');
      $(table).attr('cellspaceing', '0');
      $(table).attr('cellpadding', '0');
      
      var tr = document.createElement('tr');
      var th = document.createElement('th');
      $(th).attr('colspan', '3');
      $(th).html(settings.title);
      tr.appendChild(th);
      tbody.appendChild(tr);
                   
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      $(td).attr('valign', 'middle');
      var table_1 = document.createElement('table');
      $(table_1).attr('id', 'swot_table_1');
      $(table_1).attr('width', '100%');
      $(table_1).attr('cellspacing', '0');
      $(table_1).attr('cellpadding', '0');
      $(table_1).attr('border', '1');
      var tbody_1 = document.createElement('tbody');
      
      $.each(settings.table_1, function(key, value){
        if(key == 'title')
        {
             var tr_1 = document.createElement('tr');
             var td_1 =   document.createElement('td');
             $(td_1).attr('align', 'center');
             $(td_1).html(value)
             tr_1.appendChild(td_1);
             tbody_1.appendChild(tr_1); 
        }
        else if(key == 'elements')
        {
          for(var i=0; i<value.length; i++)
          {
            var id = value[i].id;
            var text = value[i].text;
            var tr = document.createElement('tr');
            $(tr).attr('id', id);
            var td_1 = document.createElement('td');
            $(td_1).attr('width', '5%');
            var a = document.createElement('a');
            $(a).attr('href', 'javascript:;');
            $(a).html('Remove');
            $(a).click(function()
            {
              settings.onDelete.call(this, $(this).parent().parent().attr('id'));
            });
            td_1.appendChild(a);
            tr.appendChild(td_1);
            var td_2 = document.createElement('td');
            $(td_2).attr('width', '95%');
            $(td_2).html(text);
            $(td_2).dblclick(function(){
              concole.log(text);
            }); 
            tr.appendChild(td_2);
            tbody_1.appendChild(tr);
          }  
        }
      });
      table_1.appendChild(tbody_1);
      
      td.appendChild(table_1);
      tr.appendChild(td);
      
      var td = document.createElement('td');
      $(td).attr('valign', 'top');
      var table_2 = document.createElement('table');
      $(table_2).attr('id', 'swot_table_2');
      $(table_2).attr('width', '100%');
      $(table_2).attr('cellspacing', '0');
      $(table_2).attr('cellpadding', '0');
      $(table_2).attr('border', '1');
      var tbody_2 = document.createElement('tbody');
      
      var tr_1 = document.createElement('tr');
      $(tr_1).attr('align', 'right');
      var td_1 = document.createElement('td');
      $(td_1).attr('colspan', '2');
      var a_1 = document.createElement('a');
      $(a_1).attr('href', 'javascript:;');
      $(a_1).html('Add');
      
      $(a_1).click(function()
      {
        var new_tr = document.createElement('tr');
        $(new_tr).attr('id', '');
        var new_td = document.createElement('td');
        $(new_td).attr('width', '5%');
        var new_a = document.createElement('a');
        $(new_a).attr('href', 'javascript:;');
        $(new_a).html('Remove');
        $(new_a).click(function(){
          settings.onDelete.call($this, $(this).parent().parent().attr('id'))
        });
        new_td.appendChild(new_a);
        new_tr.appendChild(new_td);
        
        var new_td2 = document.createElement('td');
        $(new_td2).attr('width', '95%');
        $(new_td2).dblclick(function(){
          var input = document.createElement('input');
          var t = $(this);
          $(input).attr('type', 'text');
          $(input).attr('value', $(this).text());
          $(input).blur(function(){
            t.empty().append($(this).val());
            settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
          });
          t.empty().append(input);
      
        });
        new_tr.appendChild(new_td2);
        
        tbody_2.appendChild(new_tr);
      });                 
      td_1.appendChild(a_1);
      tr_1.appendChild(td_1);
      tbody_2.appendChild(tr_1);
          
      $.each(settings.s, function(key, value){
        if(key == 'title')
        {
             var tr_1 = document.createElement('tr');
             var th_1 =   document.createElement('th');
             $(th_1).attr('colspan', '3');
             $(th_1).html(value)
             tr_1.appendChild(th_1);
             tbody_2.appendChild(tr_1); 
        }
        else if(key == 'elements')
        {
          for(var i=0; i<value.length; i++)
          {
            var id = value[i].id;
            var text = value[i].text;
            var tr_1 = document.createElement('tr');
            $(tr_1).attr('id', id);
            
            var td_1 = document.createElement('td');
            $(td_1).attr('width', '5%');
            var a = document.createElement('a');
            $(a).attr('href', 'javascript:;');
            $(a).html('Remove');
            $(a).click(function()
            {
              settings.onDelete.call($this, $(this).parent().parent().attr('id'));
            });
            td_1.appendChild(a);
            tr_1.appendChild(td_1);
            var td_2 = document.createElement('td');
            $(td_2).attr('width', '95%');
            $(td_2).html(text);
            $(td_2).dblclick(function(){
              var input = document.createElement('input');
              var t = $(this);
              $(input).attr('type', 'text');
              $(input).attr('value', $(this).text());
              $(input).blur(function(){
                t.empty().append($(this).val());
                settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
              });
              t.empty().append(input);
          
            });
            tr_1.appendChild(td_2);
            tbody_2.appendChild(tr_1);
          }  
        }
      });
      table_2.appendChild(tbody_2);
      
      td.appendChild(table_2);
      tr.appendChild(td);
      
      var td = document.createElement('td');
      $(td).attr('valign', 'top');
      var table_3 = document.createElement('table');
      $(table_3).attr('id', 'swot_table_2');
      $(table_3).attr('width', '100%');
      $(table_3).attr('cellspacing', '0');
      $(table_3).attr('cellpadding', '0');
      $(table_3).attr('border', '1');
      var tbody_3 = document.createElement('tbody');
      
      var tr_1 = document.createElement('tr');
      $(tr_1).attr('align', 'right');
      var td_1 = document.createElement('td');
      $(td_1).attr('colspan', '2');
      var a_1 = document.createElement('a');
      $(a_1).attr('href', 'javascript:;');
      $(a_1).html('Add');
      $(a_1).click(function(){
        var new_tr = document.createElement('tr');
        $(new_tr).attr('id', '');
        var new_td = document.createElement('td');
        $(new_td).attr('width', '5%');
        var new_a = document.createElement('a');
        $(new_a).attr('href', 'javascript:;');
        $(new_a).html('Remove');
        $(new_a).click(function(){
          settings.onDelete.call($this, $(this).parent().parent().attr('id'))
        });
        new_td.appendChild(new_a);
        new_tr.appendChild(new_td);
        
        var new_td2 = document.createElement('td');
        $(new_td2).attr('width', '95%');
        $(new_td2).dblclick(function(){
          var input = document.createElement('input');
          var t = $(this);
          $(input).attr('type', 'text');
          $(input).attr('value', $(this).text());
          $(input).blur(function(){
            t.empty().append($(this).val());
          });
          t.empty().append(input);
      
        });
        new_tr.appendChild(new_td2);
        
        tbody_3.appendChild(new_tr);
        settings.onInsert.call($this, $(this).parent().parent().attr('id'), '');
      });                 
      td_1.appendChild(a_1);
      tr_1.appendChild(td_1);
      tbody_3.appendChild(tr_1);
          
      $.each(settings.w, function(key, value){
        if(key == 'title')
        {
             var tr_1 = document.createElement('tr');
             var th_1 =   document.createElement('th');
             $(th_1).attr('colspan', '3');
             $(th_1).html(value)
             tr_1.appendChild(th_1);
             tbody_3.appendChild(tr_1); 
        }
        else if(key == 'elements')
        {
          for(var i=0; i<value.length; i++)
          {
            var id = value[i].id;
            var text = value[i].text;
            var tr_1 = document.createElement('tr');
            $(tr_1).attr('id', id);
            
            var td_1 = document.createElement('td');
            $(td_1).attr('width', '5%');
            var a = document.createElement('a');
            $(a).attr('href', 'javascript:;');
            $(a).html('Remove');
            $(a).click(function()
            {
              settings.onDelete.call($this, $(this).parent().parent().attr('id'));
            });
            td_1.appendChild(a);
            tr_1.appendChild(td_1);
            var td_2 = document.createElement('td');
            $(td_2).attr('width', '95%');
            $(td_2).html(text);
            $(td_2).dblclick(function(){
              var input = document.createElement('input');
              var t = $(this);
              $(input).attr('type', 'text');
              $(input).attr('value', $(this).text());
              $(input).blur(function(){
                t.empty().append($(this).val());
                settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
              });
              t.empty().append(input);
      
            });
            tr_1.appendChild(td_2);
            tbody_3.appendChild(tr_1);
          }  
        }
      });
      table_3.appendChild(tbody_3);
      
      td.appendChild(table_3);
      tr.appendChild(td);
      
      tbody.appendChild(tr);
      
      //2
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      $(td).attr('valign', 'top');
      var table_4 = document.createElement('table');
      $(table_4).attr('id', 'swot_table_4');
      $(table_4).attr('width', '100%');
      $(table_4).attr('cellspacing', '0');
      $(table_4).attr('cellpadding', '0');
      $(table_4).attr('border', '1');
      var tbody_4 = document.createElement('tbody');
       
      var tr_1 = document.createElement('tr');
      $(tr_1).attr('align', 'right');
      var td_1 = document.createElement('td');
      $(td_1).attr('colspan', '2');
      var a_1 = document.createElement('a');
      $(a_1).attr('href', 'javascript:;');
      $(a_1).html('Add');
      $(a_1).click(function(){
        var new_tr = document.createElement('tr');
        $(new_tr).attr('id', '');
        var new_td = document.createElement('td');
        $(new_td).attr('width', '5%');
        var new_a = document.createElement('a');
        $(new_a).attr('href', 'javascript:;');
        $(new_a).html('Remove');
        $(new_a).click(function(){
          settings.onDelete.call($this, $(this).parent().parent().attr('id'))
        });
        new_td.appendChild(new_a);
        new_tr.appendChild(new_td);
        
        var new_td2 = document.createElement('td');
        $(new_td2).attr('width', '95%');
        $(new_td2).dblclick(function(){
          var input = document.createElement('input');
          var t = $(this);
          $(input).attr('type', 'text');
          $(input).attr('value', $(this).text());
          $(input).blur(function(){
            t.empty().append($(this).val());
            settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
          });
          t.empty().append(input);
      
        });
        new_tr.appendChild(new_td2);
        
        tbody_4.appendChild(new_tr);
        settings.onInsert.call($this, $(this).parent().parent().attr('id'), '');
      });                 
      td_1.appendChild(a_1);
      tr_1.appendChild(td_1);
      tbody_4.appendChild(tr_1);
      
      $.each(settings.o, function(key, value){
        if(key == 'title')
        {
             var tr_1 = document.createElement('tr');
             var th_1 =   document.createElement('th');
             $(th_1).attr('colspan', '3');
             $(th_1).html(value)
             tr_1.appendChild(th_1);
             tbody_4.appendChild(tr_1); 
        }
        else if(key == 'elements')
        {
          for(var i=0; i<value.length; i++)
          {
            var id = value[i].id;
            var text = value[i].text;
            var tr = document.createElement('tr');
            $(tr).attr('id', id);
            var td_1 = document.createElement('td');
            $(td_1).attr('width', '5%');
            var a = document.createElement('a');
            $(a).attr('href', 'javascript:;');
            $(a).html('Remove');
            $(a).click(function()
            {
              settings.onDelete.call(this, $(this).parent().parent().attr('id'));
            });
            td_1.appendChild(a);
            tr.appendChild(td_1);
            var td_2 = document.createElement('td');
            $(td_2).attr('width', '95%');
            $(td_2).html(text);
            $(td_2).dblclick(function(){
              var input = document.createElement('input');
              var t = $(this);
              $(input).attr('type', 'text');
              $(input).attr('value', $(this).text());
              $(input).blur(function(){
                t.empty().append($(this).val());
                settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
              });
              t.empty().append(input);
      
            });
            tr.appendChild(td_2);
            tbody_4.appendChild(tr);
          }  
        }
      });
      table_4.appendChild(tbody_4);
      
      td.appendChild(table_4);
      tr.appendChild(td);
      
      var td = document.createElement('td');
      $(td).attr('valign', 'top');
      var table_5 = document.createElement('table');
      $(table_5).attr('id', 'swot_table_2');
      $(table_5).attr('width', '100%');
      $(table_5).attr('cellspacing', '0');
      $(table_5).attr('cellpadding', '0');
      $(table_5).attr('border', '1');
      var tbody_5 = document.createElement('tbody');
      
      var tr_1 = document.createElement('tr');
      $(tr_1).attr('align', 'right');
      var td_1 = document.createElement('td');
      $(td_1).attr('colspan', '2');
      var a_1 = document.createElement('a');
      $(a_1).attr('href', 'javascript:;');
      $(a_1).html('Add');
      $(a_1).click(function(){
        var new_tr = document.createElement('tr');
        $(new_tr).attr('id', '');
        var new_td = document.createElement('td');
        $(new_td).attr('width', '5%');
        var new_a = document.createElement('a');
        $(new_a).attr('href', 'javascript:;');
        $(new_a).html('Remove');
        $(new_a).click(function(){
          settings.onDelete.call($this, $(this).parent().parent().attr('id'))
        });
        new_td.appendChild(new_a);
        new_tr.appendChild(new_td);
        
        var new_td2 = document.createElement('td');
        $(new_td2).attr('width', '95%');
        $(new_td2).dblclick(function(){
          var input = document.createElement('input');
          var t = $(this);
          $(input).attr('type', 'text');
          $(input).attr('value', $(this).text());
          $(input).blur(function(){
            t.empty().append($(this).val());
            settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
          });
          t.empty().append(input);
      
        });
        new_tr.appendChild(new_td2);
        
        tbody_5.appendChild(new_tr);
        settings.onInsert.call($this, $(this).parent().parent().attr('id'), '');
      });                 
      td_1.appendChild(a_1);
      tr_1.appendChild(td_1);
      tbody_5.appendChild(tr_1);
          
      $.each(settings.so, function(key, value){
        if(key == 'title')
        {
             var tr_1 = document.createElement('tr');
             var th_1 =   document.createElement('th');
             $(th_1).attr('colspan', '3');
             $(th_1).html(value)
             tr_1.appendChild(th_1);
             tbody_5.appendChild(tr_1); 
        }
        else if(key == 'elements')
        {
          for(var i=0; i<value.length; i++)
          {
            var id = value[i].id;
            var text = value[i].text;
            var tr_1 = document.createElement('tr');
            $(tr_1).attr('id', id);
            
            var td_1 = document.createElement('td');
            $(td_1).attr('width', '5%');
            var a = document.createElement('a');
            $(a).attr('href', 'javascript:;');
            $(a).html('Remove');
            $(a).click(function()
            {
              settings.onDelete.call($this, $(this).parent().parent().attr('id'));
            });
            td_1.appendChild(a);
            tr_1.appendChild(td_1);
            var td_2 = document.createElement('td');
            $(td_2).attr('width', '95%');
            $(td_2).html(text);
            $(td_2).dblclick(function(){
              var input = document.createElement('input');
              var t = $(this);
              $(input).attr('type', 'text');
              $(input).attr('value', $(this).text());
              $(input).blur(function(){
                t.empty().append($(this).val());
                settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
              });
              t.empty().append(input);
      
            });
            tr_1.appendChild(td_2);
            tbody_5.appendChild(tr_1);
          }  
        }
      });
      table_5.appendChild(tbody_5);
      
      td.appendChild(table_5);
      tr.appendChild(td);
      
      var td = document.createElement('td');
      $(td).attr('valign', 'top');
      var table_6 = document.createElement('table');
      $(table_6).attr('id', 'swot_table_2');
      $(table_6).attr('width', '100%');
      $(table_6).attr('cellspacing', '0');
      $(table_6).attr('cellpadding', '0');
      $(table_6).attr('border', '1');
      var tbody_6 = document.createElement('tbody');
      
      var tr_1 = document.createElement('tr');
      $(tr_1).attr('align', 'right');
      var td_1 = document.createElement('td');
      $(td_1).attr('colspan', '2');
      var a_1 = document.createElement('a');
      $(a_1).attr('href', 'javascript:;');
      $(a_1).html('Add');
      $(a_1).click(function(){
        var new_tr = document.createElement('tr');
        $(new_tr).attr('id', '');
        var new_td = document.createElement('td');
        $(new_td).attr('width', '5%');
        var new_a = document.createElement('a');
        $(new_a).attr('href', 'javascript:;');
        $(new_a).html('Remove');
        $(new_a).click(function(){
          settings.onDelete.call($this, $(this).parent().parent().attr('id'))
        });
        new_td.appendChild(new_a);
        new_tr.appendChild(new_td);
        
        var new_td2 = document.createElement('td');
        $(new_td2).attr('width', '95%');
        $(new_td2).dblclick(function(){
          var input = document.createElement('input');
          var t = $(this);
          $(input).attr('type', 'text');
          $(input).attr('value', $(this).text());
          $(input).blur(function(){
            t.empty().append($(this).val());
            settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
          });
          t.empty().append(input);
      
        });
        new_tr.appendChild(new_td2);
        
        tbody_6.appendChild(new_tr);
        settings.onInsert.call($this, $(this).parent().parent().attr('id'), '');
      });                 
      td_1.appendChild(a_1);
      tr_1.appendChild(td_1);
      tbody_6.appendChild(tr_1);
          
      $.each(settings.wo, function(key, value){
        if(key == 'title')
        {
             var tr_1 = document.createElement('tr');
             var th_1 =   document.createElement('th');
             $(th_1).attr('colspan', '3');
             $(th_1).html(value)
             tr_1.appendChild(th_1);
             tbody_6.appendChild(tr_1); 
        }
        else if(key == 'elements')
        {
          for(var i=0; i<value.length; i++)
          {
            var id = value[i].id;
            var text = value[i].text;
            var tr_1 = document.createElement('tr');
            $(tr_1).attr('id', id);
            
            var td_1 = document.createElement('td');
            $(td_1).attr('width', '5%');
            var a = document.createElement('a');
            $(a).attr('href', 'javascript:;');
            $(a).html('Remove');
            $(a).click(function()
            {
              settings.onDelete.call($this, $(this).parent().parent().attr('id'));
            });
            td_1.appendChild(a);
            tr_1.appendChild(td_1);
            var td_2 = document.createElement('td');
            $(td_2).attr('width', '95%');
            $(td_2).html(text);
            $(td_2).dblclick(function(){
              var input = document.createElement('input');
              var t = $(this);
              $(input).attr('type', 'text');
              $(input).attr('value', $(this).text());
              $(input).blur(function(){
                t.empty().append($(this).val());
                settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
              });
              t.empty().append(input);
      
            });
            tr_1.appendChild(td_2);
            tbody_6.appendChild(tr_1);
          }  
        }
      });
      table_6.appendChild(tbody_6);
      
      td.appendChild(table_6);
      tr.appendChild(td);
      
      tbody.appendChild(tr);
      
      //3
      
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      $(td).attr('valign', 'top');
      var table_7 = document.createElement('table');
      $(table_7).attr('id', 'swot_table_7');
      $(table_7).attr('width', '100%');
      $(table_7).attr('cellspacing', '0');
      $(table_7).attr('cellpadding', '0');
      $(table_7).attr('border', '1');
      var tbody_7 = document.createElement('tbody');
       
      var tr_1 = document.createElement('tr');
      $(tr_1).attr('align', 'right');
      var td_1 = document.createElement('td');
      $(td_1).attr('colspan', '2');
      var a_1 = document.createElement('a');
      $(a_1).attr('href', 'javascript:;');
      $(a_1).html('Add');
      $(a_1).click(function(){
        var new_tr = document.createElement('tr');
        $(new_tr).attr('id', '');
        var new_td = document.createElement('td');
        $(new_td).attr('width', '5%');
        var new_a = document.createElement('a');
        $(new_a).attr('href', 'javascript:;');
        $(new_a).html('Remove');
        $(new_a).click(function(){
          settings.onDelete.call($this, $(this).parent().parent().attr('id'))
        });
        new_td.appendChild(new_a);
        new_tr.appendChild(new_td);
        
        var new_td2 = document.createElement('td');
        $(new_td2).attr('width', '95%');
        $(new_td2).dblclick(function(){
          var input = document.createElement('input');
          var t = $(this);
          $(input).attr('type', 'text');
          $(input).attr('value', $(this).text());
          $(input).blur(function(){
            t.empty().append($(this).val());
            settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
          });
          t.empty().append(input);
      
        });
        new_tr.appendChild(new_td2);
        
        tbody_7.appendChild(new_tr);
        settings.onInsert.call($this, $(this).parent().parent().attr('id'), '');
      });                 
      td_1.appendChild(a_1);
      tr_1.appendChild(td_1);
      tbody_7.appendChild(tr_1);
      
      $.each(settings.t, function(key, value){
        if(key == 'title')
        {
             var tr_1 = document.createElement('tr');
             var th_1 =   document.createElement('th');
             $(th_1).attr('colspan', '3');
             $(th_1).html(value)
             tr_1.appendChild(th_1);
             tbody_7.appendChild(tr_1); 
        }
        else if(key == 'elements')
        {
          for(var i=0; i<value.length; i++)
          {
            var id = value[i].id;
            var text = value[i].text;
            var tr = document.createElement('tr');
            $(tr).attr('id', id);
            var td_1 = document.createElement('td');
            $(td_1).attr('width', '5%');
            var a = document.createElement('a');
            $(a).attr('href', 'javascript:;');
            $(a).html('Remove');
            $(a).click(function()
            {
              settings.onDelete.call(this, $(this).parent().parent().attr('id'));
            });
            td_1.appendChild(a);
            tr.appendChild(td_1);
            var td_2 = document.createElement('td');
            $(td_2).attr('width', '95%');
            $(td_2).html(text);
            $(td_2).dblclick(function(){
              var input = document.createElement('input');
              var t = $(this);
              $(input).attr('type', 'text');
              $(input).attr('value', $(this).text());
              $(input).blur(function(){
                t.empty().append($(this).val());
                settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
              });
              t.empty().append(input);
      
            });
            tr.appendChild(td_2);
            tbody_7.appendChild(tr);
          }  
        }
      });
      table_7.appendChild(tbody_7);
      
      td.appendChild(table_7);
      tr.appendChild(td);
      
      var td = document.createElement('td');
      $(td).attr('valign', 'top');
      var table_8 = document.createElement('table');
      $(table_8).attr('id', 'swot_table_8');
      $(table_8).attr('width', '100%');
      $(table_8).attr('cellspacing', '0');
      $(table_8).attr('cellpadding', '0');
      $(table_8).attr('border', '1');
      var tbody_8 = document.createElement('tbody');
      
      var tr_1 = document.createElement('tr');
      $(tr_1).attr('align', 'right');
      var td_1 = document.createElement('td');
      $(td_1).attr('colspan', '2');
      var a_1 = document.createElement('a');
      $(a_1).attr('href', 'javascript:;');
      $(a_1).html('Add');
      $(a_1).click(function(){
        var new_tr = document.createElement('tr');
        $(new_tr).attr('id', '');
        var new_td = document.createElement('td');
        $(new_td).attr('width', '5%');
        var new_a = document.createElement('a');
        $(new_a).attr('href', 'javascript:;');
        $(new_a).html('Remove');
        $(new_a).click(function(){
          settings.onDelete.call($this, $(this).parent().parent().attr('id'))
        });
        new_td.appendChild(new_a);
        new_tr.appendChild(new_td);
        
        var new_td2 = document.createElement('td');
        $(new_td2).attr('width', '95%');
        $(new_td2).dblclick(function(){
          var input = document.createElement('input');
          var t = $(this);
          $(input).attr('type', 'text');
          $(input).attr('value', $(this).text());
          $(input).blur(function(){
            t.empty().append($(this).val());
            settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
          });
          t.empty().append(input);
      
        });
        new_tr.appendChild(new_td2);
        
        tbody_8.appendChild(new_tr);
        settings.onInsert.call($this, $(this).parent().parent().attr('id'), '');
      });                 
      td_1.appendChild(a_1);
      tr_1.appendChild(td_1);
      tbody_8.appendChild(tr_1);
          
      $.each(settings.st, function(key, value){
        if(key == 'title')
        {
             var tr_1 = document.createElement('tr');
             var th_1 =   document.createElement('th');
             $(th_1).attr('colspan', '3');
             $(th_1).html(value)
             tr_1.appendChild(th_1);
             tbody_8.appendChild(tr_1); 
        }
        else if(key == 'elements')
        {
          for(var i=0; i<value.length; i++)
          {
            var id = value[i].id;
            var text = value[i].text;
            var tr_1 = document.createElement('tr');
            $(tr_1).attr('id', id);
            
            var td_1 = document.createElement('td');
            $(td_1).attr('width', '5%');
            var a = document.createElement('a');
            $(a).attr('href', 'javascript:;');
            $(a).html('Remove');
            $(a).click(function()
            {
              settings.onDelete.call($this, $(this).parent().parent().attr('id'));
            });
            td_1.appendChild(a);
            tr_1.appendChild(td_1);
            var td_2 = document.createElement('td');
            $(td_2).attr('width', '95%');
            $(td_2).html(text);
            $(td_2).dblclick(function(){
              var input = document.createElement('input');
              var t = $(this);
              $(input).attr('type', 'text');
              $(input).attr('value', $(this).text());
              $(input).blur(function(){
                t.empty().append($(this).val());
                settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
              });
              t.empty().append(input);
      
            });
            tr_1.appendChild(td_2);
            tbody_8.appendChild(tr_1);
          }  
        }
      });
      table_8.appendChild(tbody_8);
      
      td.appendChild(table_8);
      tr.appendChild(td);
      
      var td = document.createElement('td');
      $(td).attr('valign', 'top');
      var table_9 = document.createElement('table');
      $(table_9).attr('id', 'swot_table_9');
      $(table_9).attr('width', '100%');
      $(table_9).attr('cellspacing', '0');
      $(table_9).attr('cellpadding', '0');
      $(table_9).attr('border', '1');
      var tbody_9 = document.createElement('tbody');
      
      var tr_1 = document.createElement('tr');
      $(tr_1).attr('align', 'right');
      var td_1 = document.createElement('td');
      $(td_1).attr('colspan', '2');
      var a_1 = document.createElement('a');
      $(a_1).attr('href', 'javascript:;');
      $(a_1).html('Add');
      $(a_1).click(function(){
        var new_tr = document.createElement('tr');
        $(new_tr).attr('id', '');
        var new_td = document.createElement('td');
        $(new_td).attr('width', '5%');
        var new_a = document.createElement('a');
        $(new_a).attr('href', 'javascript:;');
        $(new_a).html('Remove');
        $(new_a).click(function(){
          settings.onDelete.call($this, $(this).parent().parent().attr('id'))
        });
        new_td.appendChild(new_a);
        new_tr.appendChild(new_td);
        
        var new_td2 = document.createElement('td');
        $(new_td2).attr('width', '95%');
        $(new_td2).dblclick(function(){
          var input = document.createElement('input');
          var t = $(this);
          $(input).attr('type', 'text');
          $(input).attr('value', $(this).text());
          $(input).blur(function(){
            t.empty().append($(this).val());
            settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
          });
          t.empty().append(input);
      
        });
        new_tr.appendChild(new_td2);
        
        tbody_9.appendChild(new_tr);
      });                 
      td_1.appendChild(a_1);
      tr_1.appendChild(td_1);
      tbody_9.appendChild(tr_1);
          
      $.each(settings.wt, function(key, value){
        if(key == 'title')
        {
             var tr_1 = document.createElement('tr');
             var th_1 =   document.createElement('th');
             $(th_1).attr('colspan', '3');
             $(th_1).html(value)
             tr_1.appendChild(th_1);
             tbody_9.appendChild(tr_1); 
        }
        else if(key == 'elements')
        {
          for(var i=0; i<value.length; i++)
          {
            var id = value[i].id;
            var text = value[i].text;
            var tr_1 = document.createElement('tr');
            $(tr_1).attr('id', id);
            
            var td_1 = document.createElement('td');
            $(td_1).attr('width', '5%');
            var a = document.createElement('a');
            $(a).attr('href', 'javascript:;');
            $(a).html('Remove');
            $(a).click(function()
            {
              settings.onDelete.call($this, $(this).parent().parent().attr('id'));
            });
            td_1.appendChild(a);
            tr_1.appendChild(td_1);
            var td_2 = document.createElement('td');
            $(td_2).attr('width', '95%');
            $(td_2).html(text);
            $(td_2).dblclick(function(){
              var input = document.createElement('input');
              var t = $(this);
              $(input).attr('type', 'text');
              $(input).attr('value', $(this).text());
              $(input).blur(function(){
                t.empty().append($(this).val());
                settings.onInsert.call($this, t.parent().attr('id'), $(this).val());
              });
              t.empty().append(input);
      
            });
            tr_1.appendChild(td_2);
            tbody_9.appendChild(tr_1);
          }  
        }
      });
      table_9.appendChild(tbody_9);
      
      td.appendChild(table_9);
      tr.appendChild(td);
      
      tbody.appendChild(tr);
      
      table.appendChild(tbody);
      $this.html(table);
    });
  };

})(jQuery)
