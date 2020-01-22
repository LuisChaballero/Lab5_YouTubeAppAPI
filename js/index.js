//AIzaSyD2gy976AMFHEamHGSp8NnDcQ1lRmwR4XY
//pageToken=CAUQAA
//nextPageToken="CAoQAA"
//PrevPageToken="CAUQAQ"
// https://www.googleapis.com/youtube/v3/search?key=[YOUR_API_KEY]
function fetch(){
    //let URL = "https://www.googleapis.com/youtube/v3/search?part=id&key=AIzaSyD2gy976AMFHEamHGSp8NnDcQ1lRmwR4XY";
    let topic = $(".input").val();
    let URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${topic}&key=AIzaSyD2gy976AMFHEamHGSp8NnDcQ1lRmwR4XY`;
    $.ajax({
        url : URL,
        method : "GET",
        dataType : "json",
        success : function (responseJSON){
            //respon
            displayStuff(responseJSON);
        },
        error : function (err){
            console.log(err);
        }
    });
}

function displayStuff(responseJSON){
    console.log("Display");
    $('.result').empty();
    let section = $('.result');
    
    let searchResults = responseJSON.items;
    
    $(searchResults).each(function(index, element){
        
        // ${element.snippet.title}
        section.append(`
        <section>
            <a href="https://www.youtube.com/watch?v=${element.id.videoId}" target="_blank"><img src="${element.snippet.thumbnails.high.url}"></img></a>
            <h2><a href="https://www.youtube.com/watch?v=${element.id.videoId}" target="_blank">${element.snippet.title}</a></h2>
        </section>

        `);    
    });

    pageButtons(responseJSON);
}

function pageButtons(responseJSON){
    //nextPageToken="CAoQAA"
    //&pageToken=CAUQAA
    //PrevPageToken="CAUQAQ"
    let topic = $('.input').val();

    //event for previous button
    $('.previous').on('click', function(e){
        if(responseJSON.prevPageToken !== ""){
            let pageToken = responseJSON.prevPageToken; 
            console.log("back");
            URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${pageToken}&q=${topic}&key=AIzaSyD2gy976AMFHEamHGSp8NnDcQ1lRmwR4XY`;
            $.ajax({
                url : URL,
                method : "GET",
                dataType : "json",
                success : function (responseJSON){
                    displayStuff(responseJSON);
                },
                error : function (err){
                    console.log(err);
                }
            });
        }
    }); 
    //event for next button
    $('.next').on('click', function(e){
        if(responseJSON.nextPageToken !== ""){
            let pageToken = responseJSON.nextPageToken;
            console.log("next");
            URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${pageToken}&q=${topic}&key=AIzaSyD2gy976AMFHEamHGSp8NnDcQ1lRmwR4XY`;
            $.ajax({
                url : URL,
                method : "GET",
                dataType : "json",
                success : function (responseJSON){
                    displayStuff(responseJSON);
                },
                error : function (err){
                    console.log(err);
                }
            });
        }
    });
}

function listenButton(){
    //event for search button
    $('.frm').on('submit', function(e){
        e.preventDefault();
        if ($('.input').val() !== ""){
            $('.result').html("");
            fetch();
        }
    })

}

function init(){
    listenButton();
    
}

init();