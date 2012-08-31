/*
 * Pentagon graph - jQuery plugin 
 * @author Munkhtsogt Tsogbadrakh <munkhuu48@gmail.com>
 */

(function($){

  $.fn.pentagon = function( options )
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
      draw_achievement_graph(context, x, y, radius, entries, edges);
      
      $this.empty();
      $this.append(canvas);
    });  
  
  };
  
  function draw_achievement_graph(ctx, x, y, size, entries, edges)
  {
    var a = 0.5 * size;
    var b = Math.sin(Math.PI/3) * size;
      
    var set = 0;  
    for(var i=0; i<entries.length; i++)
    {
      var f = 0;
      var c = 0;
      var p = 0;
      var h = 0;
      var o = 0;
      for(var j=0; j<entries[i].values.length; j++)
      {
        if(edges[0].id == entries[i].values[j].id)
          f = parseInt(entries[i].values[j].value);
        if(edges[1].id == entries[i].values[j].id)  
          c = parseInt(entries[i].values[j].value);
        if(edges[2].id == entries[i].values[j].id)
          p = parseInt(entries[i].values[j].value);
        if(edges[3].id == entries[i].values[j].id)
          h = parseInt(entries[i].values[j].value);
        if(edges[4].id == entries[i].values[j].id)
          o = parseInt(entries[i].values[j].value);
      }
      
      if(f > 140)
        f = 140;
      if(c > 140)
        c = 140;  
      if(p > 140)
        p = 140;
      if(h > 140)
        h = 140;
      if(o > 140)
        o = 140;
        
      var counter = 0;
      var points = new Array();
      
      var offset = 0;
      for(var j=y; j<=y+size-20; j+= 17/20)
      {
        offset += 17/20;
        if(counter == 140 - f)
        {
          var point = new Object;
          point['index'] = 1;
          point['x'] = x+b;
          point['y'] = y + offset;
          points.push(point);
        }
        if(counter == 140 - o)
        {
          var point = new Object;
          point['index'] = 2;
          point['x'] = x + offset - offset/27;
          point['y'] = y + a + offset - offset/1.7;
          points.push(point);
        }
        if(counter == 140 - h)
        {
          var point = new Object;
          point['index'] = 3;
          point['x'] = x+b/2 + offset - offset/2;
          point['y'] = y + a + size - offset + offset/4;
          points.push(point);
        }
        if(counter == 140 - p)
        {
          var point = new Object;
          point['index'] = 4;
          point['x'] = x +b/2+b - offset + offset/2;
          point['y'] = y + a + size - offset + offset/4; 
          points.push(point);
        }
        if(counter == 140 - c)
        {
          var point = new Object;
          point['index'] = 5;
          point['x'] = x + 2*b - offset + offset/27;
          point['y'] = y + a + offset - offset/1.7 ;
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

      ctx.closePath();
      ctx.stroke();
      
      set += 10;
    }
  }
 function prepare_background(ctx, x, y, size, edges)
 {
    ctx.storkeStyle = 'black';
    ctx.lineWidth = '0.15';
    var a = 0.5 * size;
    var b = Math.sin(Math.PI/3) * size;
    
    drawPent(ctx, x, y, size);
    drawPent(ctx, x+17.5, y+17, size-20);
    drawPent(ctx, x+2*17.5, y+2*17, size-40);
    drawPent(ctx, x+3*17.5, y+3*17, size-60);
    drawPent(ctx, x+4*17.5, y+4*17, size-80);
    drawPent(ctx, x+5*17.5, y+5*17, size-100);
    drawPent(ctx, x+6*17.5, y+6*17, size-120);
    
    drawLine(ctx, x+b, y, x+b, y+size-20);
    drawLine(ctx, x, y+a, x+b, y+size-20);
    drawLine(ctx, x+2*b, y+a, x+b, y+size-20);
    drawLine(ctx, x+b/2, y+a+size, x+b, y+size-20);
    drawLine(ctx, x+b/2+b, y+a+size, x+b, y+size-20);
    
    var counter=0; 
    for(var i=y; i<= y+size-20; i+= 17)
    {
      ctx.fillText(140-counter+'%', x+b, i);
      counter+=20;
    }
    
    
    //fill 5 sides of text
    ctx.fillText(edges[0].text, x+b-20, y-20);
    ctx.fillText(edges[1].text, 0, y+a);
    ctx.fillText(edges[2].text, 0, y+a+size);
    ctx.fillText(edges[3].text, x+b/2+b+10, y+a+size);
    ctx.fillText(edges[4].text, x+2*b+10, y+a);
 }
 function drawPent(ctx, x, y, r)
 {
    var a = 0.5 * r;
    var b = Math.sin(Math.PI/3) * r;
    
    ctx.storkeStyle = 'black';
    ctx.lineWidth = '0.15';
    ctx.beginPath();
    
    ctx.moveTo(x+b/2, y+a+r);
    ctx.lineTo(x, y+a);
    ctx.lineTo(x+b, y);
    ctx.lineTo(x+2*b, y+a);
    ctx.lineTo(x+b/2+b, y+a+r);
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
