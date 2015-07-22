$(document).ready( function(){
    //Get the canvas &
    var c = $('#splash');
    var ct = c.get(0).getContext('2d');
    var container = $(c).parent();

    //Run function when browser resizes
    $(window).resize( respondCanvas );

    function respondCanvas(){ 
        c.attr('width', $(container).width() ); //max width
        c.attr('height', $(container).height() ); //max height

        //Call a function to redraw other content (texts, images etc)
    }

    //Initial call 
    respondCanvas();

}); 

$(document).ready(function(){
    
    random = "&page=400&per_page=100"
    json = "https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=3ec8597c613fe74b1799d4e8a397950c&content_type=1&is_commons=true&format=json&jsoncallback=?"+random
    $.getJSON(json,
    function(data){
        console.log(data)
        index = Math.floor(Math.random()*100)
        console.log(index)
        c = data['photos']['photo'][index]
        url = "https://farm"+c['farm']+".staticflickr.com/"+c['server']+"/"+c['id']+"_"+c['secret']+".jpg"
        console.log(url)
        
        var myCanvas = document.getElementById('splash');
        var ctx = myCanvas.getContext('2d');
        var img = new Image;
        img.crossOrigin = 'anonymous';
        img.src = url;
        img.onload = function(){
            ctx.drawImage(img,0,0,myCanvas.clientWidth,myCanvas.clientHeight); // Or at whatever offset you like
        
            var image_data = ctx.getImageData( 0, 0, myCanvas.clientWidth, myCanvas.clientHeight)
            var parameters = { amount: 10, seed: 45, iterations: 30, quality: 30 }
            glitch( image_data, parameters, function drawImage( image_data )
            {
                console.log("test")
                ctx.putImageData( image_data, 0, 0 );
            } );
        };
    });
});

$(window).resize(resizeCanvas)