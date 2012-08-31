/*
 * Pentagon graph - jQuery plugin 
 * @author Munkhtsogt Tsogbadrakh <munkhuu48@gmail.com>
 */

(function($){

  $.fn.hexagon = function( options )
  {
    var settings = $.extend(
    {
      width: '',
      height: '',
      edges: [],
      entries: []
    }, options);
  
    return this.each(function()
    {
      var $this = $(this);
      
      var canvas = document.createElement('canvas');
      
      canvas.setAttribute('width', settings.width);
      canvas.setAttribute('height', settings.height);
      
      var context = canvas.getContext('2d');
      
      canvas.width=canvas.width;
      
      var x = 70;
      var y = 70;
      var radius = 140;
  
      var edges = settings.edges;
      var entries = settings.entries;

      prepare_background(context, x, y, radius, edges);
      draw_financial_graph(context, x, y, radius, entries, edges);
      
      $this.empty();
      $this.append(canvas);
    });  
  
  };
  
  function draw_financial_graph(ctx, x, y, size, entries, edges)
  {
    var a = 0.5 * size;
    var b = Math.sin(Math.PI/3) * size;
      
    var set = 0;  
    for(var i=0; i<entries.length; i++)
    {
    
      var c = 0;
      var g = 0;
      var p = 0;
      var e = 0;
      var s = 0;
      var pr = 0;
      for(var j=0; j<entries[i].values.length; j++)
      {
        if(edges[0].id == entries[i].values[j].id)
          p = parseInt(entries[i].values[j].value);
        if(edges[1].id == entries[i].values[j].id)  
          c = parseInt(entries[i].values[j].value);
        if(edges[2].id == entries[i].values[j].id)
          g = parseInt(entries[i].values[j].value);
        if(edges[3].id == entries[i].values[j].id)
          pr = parseInt(entries[i].values[j].value);
        if(edges[4].id == entries[i].values[j].id)
          s = parseInt(entries[i].values[j].value);
        if(edges[5].id == entries[i].values[j].id)
          e = parseInt(entries[i].values[j].value);
      }
      
      if(p > 140)
        p = 140;
      if(c > 140)
        c = 140;  
      if(g > 140)
        g = 140;
      if(pr > 140)
        pr = 140;
      if(s > 140)
        s = 140;
      if(e > 140)
        e = 140;
        
      var counter = 0;
      var points = new Array();
      
      var offset = 0;
      for(var j=y; j<=y+size; j+= size/140)
      {
        offset += size/140;
        if(counter == 140 - p)
        {
          var point = new Object;
          point['index'] = 1;
          point['x'] = x+b;
          point['y'] = y + offset;
          points.push(point);
        }
        if(counter == 140 - c)
        {
          var point = new Object;
          point['index'] = 2;
          point['x'] = x + offset - offset/7;
          point['y'] = y + a + offset - offset/2 ;
          points.push(point);
        }
        if(counter == 140 - g)
        {
          var point = new Object;
          point['index'] = 3;
          point['x'] = x + offset - offset/7;
          point['y'] = y + a + size - offset + offset/2; 
          points.push(point);
        }
        if(counter == 140 - pr)
        {
          var point = new Object;
          point['index'] = 4;
          point['x'] = x+b;
          point['y'] = y + 2*size - offset
          points.push(point);
        }
        if(counter == 140 - s)
        {
          var point = new Object;
          point['index'] = 5;
          point['x'] = x + 2*b - offset + offset/7;
          point['y'] = y + a + size - offset + offset/2;
          points.push(point);
        }
        if(counter == 140 - e)
        {
          var point = new Object;
          point['index'] = 6;
          point['x'] = x + 2*b - offset + offset/7;
          point['y'] = y + a + offset - offset/2;
          points.push(point);
        }
        counter++;
      }
      
      points.sort(function(obj1, obj2) {
        return obj1.index < obj2.index ? -1 : 
        (obj1.index > obj2.index ? 1: 0);
       });
      
      var color = "#" + toHex(i*300) + toHex(i*290) + toHex(i*280);
      
      
      ctx.strokeStyle = color;
      ctx.lineWidth = '3';
      
      drawLine(ctx, x+180, y-50+set, x+200, y-50+set);
      ctx.fillText(entries[i].text, x+202, y-50+set);
      
      ctx.beginPath();
      
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
      ctx.lineTo(points[2].x, points[2].y);
      ctx.lineTo(points[3].x, points[3].y);
      ctx.lineTo(points[4].x, points[4].y);
      ctx.lineTo(points[5].x, points[5].y);
      ctx.lineTo(points[0].x, points[0].y);
      
      ctx.closePath();
      ctx.stroke();
      
      set += 10;
    }
  }
  
  function prepare_background(ctx, x, y, size, edges)
  {
  
    drawHex(ctx, x, y, size);
    drawHex(ctx, x+17, y+20, size-20);
    drawHex(ctx, x+2*17, y+2*20, size-40);
    drawHex(ctx, x+3*17, y+3*20, size-60);
    drawHex(ctx, x+4*17, y+4*20, size-80);
    drawHex(ctx, x+5*17, y+5*20, size-100);
    drawHex(ctx, x+6*17, y+6*20, size-120);

    var a = 0.5 * size;
    var b = Math.sin(Math.PI/3) * size;
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = '0.15';
    
    ctx.beginPath();
    
    ctx.moveTo(x+b, y);
    ctx.lineTo(x+b, y+2*size);
    
    ctx.moveTo(x, y+a);
    ctx.lineTo(x+2*b, y+a+size);
    ctx.moveTo(x, y+a+size);
    ctx.lineTo(x+2*b, y+a);
    
    ctx.closePath();
    ctx.stroke();
    
    var counter=0; 
    for(var i=y; i<= y+size; i+= size/7)
    {
      ctx.fillText(140-counter+'%', x+b, i);
      counter+=20;
    }
   
    // fill 6 sides of text
    ctx.fillText(edges[0].text, x+b-10, y-20);
    ctx.fillText(edges[1].text, x-size/2, y+a);
    ctx.fillText(edges[2].text, x-size/2, y+a+size);
    ctx.fillText(edges[3].text, x+b-10, y+2*size+20);
    ctx.fillText(edges[4].text, x+2*b+10, y+a+size);
    ctx.fillText(edges[5].text, x+2*b+10, y+a);
  }
  
  function drawHex(ctx, x, y, c)
  {
  
    var a = 0.5 * c;
    var b  = Math.sin(Math.PI/3) * c;
   
    ctx.strokeStyle = "black";
    ctx.lineWidth = '0.15';
    
    ctx.beginPath();
    
    ctx.moveTo(x, y+a+c);
    ctx.lineTo(x, y+a);
    ctx.lineTo(x+b, y);
    ctx.lineTo(x+2*b, y+a);
    ctx.lineTo(x+2*b, y+a+c);
    ctx.lineTo(x+b, y+2*c);
    ctx.lineTo(x, y+a+c);
    

    ctx.closePath();
    ctx.stroke();
  }
  function drawLine(ctx, sx, sy, ex, ey)
  {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.closePath();
    ctx.stroke();
  }
  function toHex(n) 
  {
    if (n == null || n == 0) 
      return "00";
    else 
      return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
  }
  
}) (jQuery); 
