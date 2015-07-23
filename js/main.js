function getAverageColourAsRGB (img) {
  var canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      rgb = {r:102,g:102,b:102}, // Set a base colour as a fallback for non-compliant browsers
      pixelInterval = 5, // Rather than inspect every single pixel in the image inspect every 5th pixel
      count = 0,
      i = -4,
      data, length;

  // return the base colour for non-compliant browsers
  if (!context) { return rgb; }

  // set the height and width of the canvas element to that of the image
  var height = canvas.height = img.naturalHeight || img.offsetHeight || img.height,
      width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;

  context.drawImage(img, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch(e) {
    // catch errors - usually due to cross domain security issues
    alert(e);
    return rgb;
  }

  data = data.data;
  length = data.length;
  while ((i += pixelInterval * 4) < length) {
    count++;
    rgb.r += data[i];
    rgb.g += data[i+1];
    rgb.b += data[i+2];
  }
  
  // floor the average values to give correct rgb values (ie: round number values)
  rgb.r = Math.floor(rgb.r/count);
  rgb.g = Math.floor(rgb.g/count);
  rgb.b = Math.floor(rgb.b/count);

  return rgb;
}

function respond(size){
    var c = $('#splash');
    var ct = c.get(0).getContext('2d');
    var container = $(c).parent();
    c.attr('width', $(container).width() ); //max width
    c.attr('height', $(container).height() ); //max height

    console.log("resize from respond. size: "+size)
    
    rgb =
    getImage();
    
    //console.log(rgb)
    jQuery("h1").fitText(1);
    jQuery("h2").fitText(1.2);
    //$('.headline.image').imagefill({runOnce:true})
    mutilateHeaders()
    ghostContent()
    if (size=="xs") {
        $("button.nav").addClass("mobileFix")
        $("#headlinerNav").addClass("mobileFix")
    }
    else{
        $("button.nav").removeClass("mobileFix")
        $("#headlinerNav").removeClass("mobileFix")
    }
}

function draw(url){
    var myCanvas = document.getElementById('splash');
        var ctx = myCanvas.getContext('2d');
        var img = new Image;
        img.crossOrigin = 'anonymous';
        img.src = url
        img.onload = function(){
            ctx.drawImage(img,0,0,myCanvas.clientWidth,myCanvas.clientHeight); // Or at whatever offset you like
            var image_data = ctx.getImageData( 0, 0, myCanvas.clientWidth, myCanvas.clientHeight)
            var parameters = { amount: 10, seed: 45, iterations: 30, quality: 30 }
            glitch( image_data, parameters, function drawImage( image_data )
            {
                
                ctx.putImageData( image_data, 0, 0 );
                console.log("done drawing")
                $("#splashContainer").animate({opacity: 1}, 150, function(){});
            } );  
        };
}

function getImage(){
    console.log("get image")
    random = "&page=400&per_page=100"
    json = "https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=3ec8597c613fe74b1799d4e8a397950c&content_type=1&is_commons=true&format=json&jsoncallback=?"+random
    url = "nothing"
    console.log(url)
    $.getJSON(json,
    function(data){
        index = Math.floor(Math.random()*100)
        console.log(index)
        c = data['photos']['photo'][index]
        url = "https://farm"+c['farm']+".staticflickr.com/"+c['server']+"/"+c['id']+"_"+c['secret']+".jpg"
        draw(url)
    });
};

function mutilateHeaders(){
    $(".mutilate").remove();
    $("h3").each(function(index){
        var x = $(this).clone()
        x.addClass("mutilate")
        x.attr('id','mutilate-'+index)
        $(this).before(x)
        $(x).css('top', (Math.floor(Math.random()/2*100)-25).toString()+"px");
        $(x).css('left', (Math.floor(Math.random()/2*100)-50).toString()+"px");
        
       
    });
    $(".mutilate").each(function(index){
        for (var i=0; i < 5; i++){
            glitchAll('mutilate-'+index,'mutilate-'+index,false,false)
        }
        
    })
}

function ghostContent(){
   $(".content").each(function(index){
    $(this).attr('id','content-'+index)
    x = $(this).clone()
    x.attr('id','content-'+index+'-ghost')
    x.addClass('mutilate')
    $(this).before(x)
    glitchAll('content-'+index,'content-'+index+'-ghost',false,false)
    /*
        var x = "<div id='contentGhost' class='mutilate'>"+$(this).text()+"</div>";
        $(this).after(x)
        console.log(x)*/
    })
}
$(document).ready( function(){
    $("button.nav").click(function(){
        $("#mobileScreen").toggle()
        $("#mobileMenu").toggle()
    })
    $("#archiveToggleButton").click(function(){
        $("#archiveContainer").toggle()
    })
});

(function($, document, window, viewport){
    var size;
    $(document).ready(
        viewport.changed(function(){
            size = viewport.current()
            respond(size)
        })
    )
    $(window).resize(
        viewport.changed(function(){
            if (size!=viewport.current()) {
                size = viewport.current();
                console.log("breakpoint: " + size)
                respond(size)
            }
        }, 150)
    );
})(jQuery, document, window, ResponsiveBootstrapToolkit);