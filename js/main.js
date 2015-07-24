

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
    
        $('.twitter').twittie({
            dateFormat: '%b. %d, %Y',
            template: '{{tweet}} <div class="date">{{date}}</div> <a href="{{url}}" target="_blank">Details</a>',
            count: 1,
            hideReplies: true
        });
    
    
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