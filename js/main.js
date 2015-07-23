function respondCanvas(){
    var c = $('#splash');
    var ct = c.get(0).getContext('2d');
    var container = $(c).parent();
    c.attr('width', $(container).width() ); //max width
    c.attr('height', $(container).height() ); //max height

    console.log("resize from respond")

    getImage();
    jQuery("h1").fitText();
    mutilateHeaders()
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
    $("h2").each(function(index){
       var x = $(this).clone()
       x.addClass("mutilate")
       x.attr('style','color:#DDD;font-family:"Times New Roman", serif;font-weight: normal;z-index:-5;')
       x.attr('id','mutilate-'+index)
       $(this).before(x)
    });
    $(".mutilate").each(function(index){
        for (var i=0; i < 5; i++){
            glitchAll('mutilate-'+index,'mutilate-'+index,false,false)
        }
        
    })
}

$(document).ready( function(){
    $("button.nav").click(function(){
        $("#mobileScreen").fadeToggle()
        $("#mobileMenu").fadeToggle()
        $("button.nav span").toggle()
    })
});

(function($, document, window, viewport){
    var size;
    $(document).ready(
        viewport.changed(function(){
            size = viewport.current()
            respondCanvas()
        })
    )
    $(window).resize(
        viewport.changed(function(){
            if (size!=viewport.current()) {
                size = viewport.current();
                console.log("breakpoint: " + size)
                respondCanvas()
            }
        }, 150)
    );
})(jQuery, document, window, ResponsiveBootstrapToolkit);