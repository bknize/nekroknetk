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
        //"https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg"
    });
});
