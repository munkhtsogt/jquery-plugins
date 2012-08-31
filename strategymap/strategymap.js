/*
 * Strategy map - jQuery plugin 
 * @author Munkhtsogt Tsogbadrakh <munkhuu48@gmail.com>
 */

(function($){

  $.fn.strategymap = function( options )
  {
    var settings = $.extend(
    {
      width: '',
      height: '',
      perspectives: [],
      links: []
    }, options); 
    
    return this.each(function()
    {
      var $this = $(this);
      
      var canvas = document.createElement('canvas');
      
      canvas.setAttribute('width', settings.width);
      canvas.setAttribute('height', settings.height);
      
      var context = canvas.getContext('2d');
      
      canvas.width=canvas.width;
      
      var len = settings.perspectives.length;
      var offset = canvas.height/len;
      // draw horizontal lines
      var c = 0;
      var addpossition = new Array();
      for(var i=0; i <= canvas.height; i+= offset)
      {
        context.fillStyle = "black";
        if( c < len )
        {
          var oset = new Object();
          oset['left'] = canvas.width - 20;
          oset['right'] = canvas.width;
          oset['top'] = ((c+1)*offset) - offset/2-20;
          oset['bottom'] = ((c+1)*offset) - offset/2+20;
          addpossition.push(oset);
          context.font = "15px sans-serif";
          context.fillText('+', canvas.width - 10, ((c+1)*offset) - offset/2)
          context.font = "10px sans-serif";
          context.fillText(settings.perspectives[c].title, 10, ((c+1)*offset) - offset/2);
          drawLine(context, 0, i, canvas.width, i);
          c++;
        }
      }
      // draw vertical line
      drawLine(context, offset, 0, offset, canvas.height);
      
      // draw perspectives
      var fps_offset = new Array();
      var cps_offset = new Array();
      var bps_offset = new Array();
      var hrps_offset = new Array();
      
      for(var i=0; i<settings.perspectives.length; i++)
      {
        if(i == 0)
        {
          addpossition[i].perspective_level = i;
          var bandwidth = (canvas.width-offset)/settings.perspectives[i].objectives.length;
          for(var j=0; j<settings.perspectives[i].objectives.length; j++)
          {
            var title = settings.perspectives[i].objectives[j].title;
            var id = settings.perspectives[i].objectives[j].id;
            var len = title.length;  
            drawEllipse(context, offset+j*bandwidth+10, offset/3, 100, 60);
            var off = 0;
            for(var k=0; k<len; k++)
            {
              var oset = new Object();
              oset['id'] = id;
              oset['title'] = title;
              oset['left'] = offset+ j*bandwidth+10;
              oset['right'] = offset+j*bandwidth+110;
              oset['top'] = offset/3 + off;
              oset['bottom'] = offset/3 + off+30;
              oset['width'] = 100;
              oset['height'] = 60;
              oset['g_index'] = i;
              oset['index'] = j;
              oset['t_index'] = k;
              fps_offset.push(oset);
              context.fillStyle = 'black';
              drawLine(context, offset+j*bandwidth+10, offset/3+60/2, offset+j*bandwidth+110, offset/3+60/2);
              var text = '';
              if(title[k].length > 15)
              {
                for(var e=0; e<12; e++)
                  text += title[k][e];
                text += '...';
                context.fillText(text, offset+j*bandwidth+30, offset/3+20+60/len*k);
              }
              else
              {
                text = title[k];
                context.fillText(text, offset+j*bandwidth+30, offset/3+20+60/len*k);
              }
              
              off += 30;
            }
          }
        }
        else if(i == 1)
        {
          addpossition[i].perspective_level = i;
          var bandwidth = (canvas.width-offset)/settings.perspectives[i].objectives.length;
          for(var j=0; j<settings.perspectives[i].objectives.length; j++)
          {
            var title = settings.perspectives[i].objectives[j].title;
            var id = settings.perspectives[i].objectives[j].id;
            var len = title.length; 
            drawEllipse(context, offset+j*bandwidth+30, offset+offset/3, 100, 60);
            var off = 0;
            for(var k=0; k<len; k++)
            {
              var oset = new Object();
              oset['id'] = id;
              oset['title'] = title;
              oset['left'] = offset + j*bandwidth + 30;
              oset['right'] = offset + j*bandwidth + 130;
              oset['top'] = offset/3 + offset + off;  
              oset['bottom'] = offset/3 + offset + off+30;
              oset['width'] = 100;
              oset['height'] = 60;
              oset['g_index'] = i;
              oset['index'] = j;
              oset['t_index'] = k;
              cps_offset.push(oset);
              context.fillStyle = 'black';
              drawLine(context, offset+j*bandwidth+30, offset+offset/3+60/2, offset+j*bandwidth+130, offset+offset/3+60/2);
              var text = '';
              if(title[k].length > 15)
              {
                for(var e=0; e<12; e++)
                  text += title[k][e];
                text += '...';
                context.fillText(text, offset+j*bandwidth+50, offset+offset/3+20+60/len*k);
              }
              else
              {
                context.fillText(title[k], offset+j*bandwidth+50, offset+offset/3+20+60/len*k);
              }
              
              off += 30;
            }
          }
        }
        else if(i == 2)
        {
          addpossition[i].perspective_level = i;
          var bandwidth = (canvas.width-offset)/settings.perspectives[i].objectives.length;
          for(var j=0; j<settings.perspectives[i].objectives.length; j++)
          {
            var title = settings.perspectives[i].objectives[j].title;
            var id = settings.perspectives[i].objectives[j].id;
            var len = title.length;  
            drawRectTran(context, offset+j*bandwidth+10, 2*offset+offset/3, 100, 70);
            var off = 0;
            for(var k=0; k<len; k++)
            {
              off += 70/len;
              var oset = new Object();
              oset['id'] = id;
              oset['title'] = title;
              oset['left'] = offset + j*bandwidth + 10;
              oset['right'] = offset + j*bandwidth + 110;
              oset['top'] = offset/3 + 2*offset + off - 70/len;  
              oset['bottom'] = offset/3 + 2*offset + off + 70/len;
              oset['width'] = 100;
              oset['height'] = 70;
              oset['g_index'] = i;
              oset['index'] = j;
              oset['t_index'] = k;
              bps_offset.push(oset);
              context.fillStyle = 'black';
              drawLine(context, offset+j*bandwidth+10, 2*offset+offset/3+70/len*(k+1), offset+j*bandwidth+110, 2*offset+offset/3+70/len*(k+1));
              var text = '';
              if(title[k].length > 15)
              {
                for(var e=0; e<12; e++)
                  text += title[k][e];
                text += '...';
                context.fillText(text, offset+j*bandwidth+20, 2*offset+offset/3+10+70/len*k);  
              }
              else
              {
                text = title[k];
                context.fillText(text, offset+j*bandwidth+20, 2*offset+offset/3+10+70/len*k);
              }
              
            }
          }
        }
        else if(i == 3)
        {
          addpossition[i].perspective_level = i;
          var bandwidth = (canvas.width-offset)/settings.perspectives[i].objectives.length;
          for(var j=0; j<settings.perspectives[i].objectives.length; j++)
          {
            var title = settings.perspectives[i].objectives[j].title;
            var id = settings.perspectives[i].objectives[j].id;
            var len = title.length;  
            drawRectTran(context, offset+j*bandwidth+10, 3*offset+offset/3, 100, 70); 
            for(var k=0; k<len; k++)
            {
              var oset = new Object();
              oset['id'] = id;
              oset['title'] = title;
              oset['left'] = offset + j*bandwidth + 10;
              oset['right'] = offset + j*bandwidth + 110;
              oset['top'] = offset/3 + 3*offset + 70/len*k;  
              oset['bottom'] = offset/3 + 3*offset + 70/len*(k+1);
              oset['width'] = 100;
              oset['height'] = 70;
              oset['g_index'] = i;
              oset['index'] = j;
              oset['t_index'] = k;
              hrps_offset.push(oset);
              context.fillStyle = 'black';
              drawLine(context, offset+j*bandwidth+10, 3*offset+offset/3+70/len*(k+1), offset+j*bandwidth+110, 3*offset+offset/3+70/len*(k+1));
              var text = '';
              if(title[k].length > 15)
              {
                for(var e=0; e<12; e++)
                  text += title[k][e];
                text += '...';
                context.fillText(text, offset+j*bandwidth+20, 3*offset+offset/3+10+70/len*k);
              }
              else
              {
                text = title[k];
                context.fillText(text, offset+j*bandwidth+20, 3*offset+offset/3+10+70/len*k);
              }
              
            }
          }
        }
      }
      
      // draw connections
      for(var i=0; i<settings.links.length; i++)
      {
        var sx, ex;
        var sy, ey;
        var from = settings.links[i].from;
        var to = settings.links[i].to;
        for(var j=0; j<fps_offset.length; j++)
        {
          if(fps_offset[j].id == from)
          {
            sx = fps_offset[j].left + fps_offset[j].width/2;
            sy = fps_offset[j].top + fps_offset[j].height/2;
            break;
          }
          if(fps_offset[j].id == to)
          {
            ex = fps_offset[j].left + fps_offset[j].width/2;
            ey = fps_offset[j].top + fps_offset[j].height/2;
            break;
          }
        }
        for(var j=0; j<cps_offset.length; j++)
        {
          if(cps_offset[j].id == from)
          {
            sx = cps_offset[j].left + cps_offset[j].width/2;
            sy = cps_offset[j].top + cps_offset[j].height/2;
            break;
          }
          if(cps_offset[j].id == to)
          {
            ex = cps_offset[j].left + cps_offset[j].width/2;
            ey = cps_offset[j].top + cps_offset[j].height/2;
            break;
          }
        }
        for(var j=0; j<bps_offset.length; j++)
        {
          if(bps_offset[j].id == from)
          {
            sx = bps_offset[j].left + bps_offset[j].width/2;
            sy = bps_offset[j].top + bps_offset[j].height/2;
            break;
          }
          if(bps_offset[j].id == to)
          {
            ex = bps_offset[j].left + bps_offset[j].width/2;
            ey = bps_offset[j].top + bps_offset[j].height/2;
            break;
          }
        }
        for(var j=0; j<hrps_offset.length; j++)
        {
          if(hrps_offset[j].id == from)
          {
            sx = hrps_offset[j].left + hrps_offset[j].width/2;
            sy = hrps_offset[j].top + hrps_offset[j].height/2;
            break;
          }
          if(hrps_offset[j].id == to)
          {
            ex = hrps_offset[j].left + hrps_offset[j].width/2;
            ey = hrps_offset[j].top + hrps_offset[j].height/2;
            break;
          }
        }
        drawLine(context, sx, sy, ex, ey, "#FD6192");
      }
      
      // editable  
      var div = document.createElement('div');
      $(div).hide();
      $(canvas).mousedown(function myDown(e) 
      {
        var input = document.createElement('input');
        $(input).hide();
        var position = $(canvas).position();
        var x = e.pageX-position.left;
        var y = e.pageY-position.top;
        for(var i=0; i<fps_offset.length; i++)
        {
          if (x>fps_offset[i].left && x<fps_offset[i].right && 
              y>fps_offset[i].top && y<fps_offset[i].bottom) 
          {           
            $(input).show();
            $(input).attr('type', 'text');
            $(input).attr('value', fps_offset[i].title[fps_offset[i].t_index]);
            $(input).attr('g_index', fps_offset[i].g_index);
            $(input).attr('index', fps_offset[i].index);
            $(input).attr('t_index', fps_offset[i].t_index);
            break;
          }         
        }
        for(var i=0; i<cps_offset.length; i++)
        {
          if (x>cps_offset[i].left && x<cps_offset[i].right && 
              y>cps_offset[i].top && y<cps_offset[i].bottom) 
          {
            $(input).show();
            $(input).attr('type', 'text');
            
            $(input).attr('value', cps_offset[i].title[cps_offset[i].t_index]);
            $(input).attr('g_index', cps_offset[i].g_index);
            $(input).attr('index', cps_offset[i].index); 
            $(input).attr('t_index', cps_offset[i].t_index);     
            break;
          } 
            
        }
        for(var i=0; i<bps_offset.length; i++)
        {
          if (x>bps_offset[i].left && x<bps_offset[i].right && 
              y>bps_offset[i].top && y<bps_offset[i].bottom) 
          {
            $(input).show();
            $(input).attr('type', 'text');
            
            $(input).attr('value', bps_offset[i].title[bps_offset[i].t_index]);
            $(input).attr('g_index', bps_offset[i].g_index);
            $(input).attr('index', bps_offset[i].index);
            $(input).attr('t_index', bps_offset[i].t_index);     
            break;
          }  
        }
        for(var i=0; i<hrps_offset.length; i++)
        {
          if (x>hrps_offset[i].left && x<hrps_offset[i].right && 
              y>hrps_offset[i].top && y<hrps_offset[i].bottom) 
          {
            $(input).show();
            $(input).attr('type', 'text');
            
            $(input).attr('value', hrps_offset[i].title[hrps_offset[i].t_index]);
            $(input).attr('g_index', hrps_offset[i].g_index);
            $(input).attr('index', hrps_offset[i].index);     
            $(input).attr('t_index', hrps_offset[i].t_index);
            break;
          }  
        }
        
        
        $(div).empty();
        $(div).show();
        var button = document.createElement('button');
        $(button).html('Update');
        $(button).click(function(){
          var value = $(input).val();
          var g_index = $(input).attr('g_index');
          var index = $(input).attr('index');
          var t_index = $(input).attr('t_index');
          settings.perspectives[g_index].objectives[index].title[t_index] = value;
        
          $this.strategymap({
            width: settings.width,
            height: settings.height,
            perspectives: settings.perspectives,
            links: settings.links
          });
          settings.onChange.call($this, settings.perspectives[g_index].id, settings.perspectives[g_index].objectives[index].id, t_index, value);  
        });
        
        var del = document.createElement('button');
        $(del).html('Delete');
        $(del).click(function(){
          var g_index = $(input).attr('g_index');
          var index = $(input).attr('index');
          
          var del_id = settings.perspectives[g_index].objectives[index].id;
          
          var links = new Array();
          
          for(var i=0; i<settings.links.length; i++)
          {
            if(settings.links[i].from != del_id && settings.links[i].to != del_id)
            {
              links.push(settings.links[i]);
            }
          }
                 
          settings.perspectives[g_index].objectives.splice(index, 1);
          
          $this.strategymap({
            width: settings.width,
            height: settings.height,
            perspectives: settings.perspectives,
            links: links
          });

          settings.onDelete.call($this, del_id, settings.perspectives[g_index].objectives[index].id);
          
        });
        div.appendChild(input);
        div.appendChild(button);
        div.appendChild(del);
        
        for(var i=0; i<addpossition.length; i++)
        {
          if (x>addpossition[i].left && x<addpossition[i].right && 
              y>addpossition[i].top && y<addpossition[i].bottom) 
          {
            settings.onAdd.call($this, addpossition[i].perspective_level);
            break;
          }  
        }
        
      });
      
      
      $this.empty();
      $this.append(canvas);
      $this.append(div);  
    });
       
  };

  function drawEllipse(ctx, x, y, w, h)
  {
    var kappa = .5522848;
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle
    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    ctx.fillStyle = "#09A3AE";
    ctx.closePath();
    ctx.fill();
  }
  function drawLine(ctx, startx, starty, endx, endy, color)
  {
    ctx.beginPath();
    ctx.lineWidth = "0.5";    
    ctx.moveTo(startx, starty);
    ctx.lineTo(endx, endy);
    if(color) ctx.strokeStyle = color;
    else ctx.strokeStyle = "#bbb";
    ctx.closePath();
    ctx.stroke();
  }
  function drawRectTran(ctx, startx, starty, width, height)
  {
    ctx.fillStyle = '#ACF6FB';
    
    ctx.lineWidth   = 0.5;
    ctx.fillRect(startx, starty, width, height);
    
    //draw small triangular
    ctx.beginPath();
    ctx.moveTo(startx + width, starty); // Top Corner
    ctx.lineTo(startx + width+10, starty+height/2); // Bottom Right
    ctx.lineTo(startx + width, height + starty); // Bottom Left
    ctx.closePath();
    
    ctx.fill();
  }
    
}) (jQuery);
