/*
 * Strategy map definition - jQuery plugin 
 * @author Munkhtsogt Tsogbadrakh <munkhuu48@gmail.com>
 */
 
(function($)
{

  $.fn.strategymap_def = function( options )
  {
    var settings = $.extend({
      width: '',
      height: '',
      perspectives: []
    }, options);
    
    return this.each(function()
    {
      var $this = $(this);
      var canvas = document.createElement('canvas');
      canvas.setAttribute('width', settings.width);
      canvas.setAttribute('height', settings.height);
      var context = canvas.getContext('2d');
      
      canvas.width = canvas.width;
      
      var len = settings.perspectives.length;
      var offset = canvas.height/len;
      
      for(var i=0; i<settings.perspectives.length; i++)
      {
        
        var titles = settings.perspectives[i].title;
        var len = titles.length;
                 
        if(i == 0)
        {
          drawEllipse(context, offset, i*offset, 100, 60);
          for(var j=0; j<len; j++)
          {
            context.fillStyle = 'black';
            drawLine(context, offset, i*offset+60/2, offset+100, i*offset+60/2);
            context.fillText(titles[j], offset+30, i*offset+20+60/len*j);
          }
        }
        else if( i == 1)
        {
         
          drawEllipse(context, offset, i*offset, 100, 60);
           
          for(var j=0; j<len; j++)
          {
           
            context.fillStyle = 'black';
            drawLine(context, offset, i*offset+60/2, offset+100, i*offset+60/2);
            context.fillText(titles[j], offset+30, i*offset+20+60/len*j);
          }
        }
        else if( i == 2)
        {
          drawRectTran(context, offset, i*offset, 100, 70);
          for(var j=0; j<len; j++)
          {
            context.fillStyle = 'black';
            drawLine(context, offset, i*offset+70/len*j, offset+100, i*offset+70/len*j);
            context.fillText(titles[j], offset+10, i*offset+10+70/len*j);
          }
        }
        else if( i == 3)
        {
          drawRectTran(context, offset, i*offset, 100, 70);
          for(var j=0; j<len; j++)
          {
            context.fillStyle = 'black';
            drawLine(context, offset, i*offset+70/len*j, offset+100, i*offset+70/len*j);
            context.fillText(titles[j], offset+10, i*offset+10+70/len*j);
          }
        }
      }
      
      $this.empty();
      $this.append(canvas);
      
    });
     
  };
  function drawLine(ctx, sx, sy, ex, ey)
  {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = '0.1'
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.closePath()
    ctx.stroke();
  }
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
