// QR Code API -----------------------------------------------------------------
var qrQueryURL = 'http://api.qrserver.com/v1/create-qr-code/?data=HelloWorld!&size=100x100';

var qrImg = $('#qr-img');

$.ajax({
    url: qrQueryURL,
    method: "GET"
}).then(function(response) {
    qrImg.attr('src', 'https://api.qrserver.com/v1/create-qr-code/?data=https://github.com/Pete-Scale&amp;size=100x100');
});

// Lyrics API ------------------------------------------------------------------
var apiKey = "?apikey=f032e5LnKKIgW5iz3LxRnpzdRdC6b9J7YfJlOKVdGJI5QupsGzTDgGxi"

var searchQueryURL = "https://api.happi.dev/v1/music" + apiKey + "&q="

$('#search-btn').on('click', function(event){
  event.preventDefault();
  var searchInput = $('#search-input').val()
  console.log(searchQueryURL + searchInput);
  // Initial call needs artist and song title
  $.ajax({
    url: searchQueryURL + searchInput,
    method: "GET"
  }).then(function(response){
    // Returns only songs that hasLyrics
    var lyrics = response.result.filter(function(song){
      return song.haslyrics 
    });
    console.log(lyrics);
    // Second api call for lyrics
    var lyricQueryURL = lyrics[0].api_lyrics
    $.ajax({
      url: lyricQueryURL + apiKey,
      method: "GET"
    }).then(function(response){
      console.log(response)
      console.log(response.result);
      var lyricArray = response.result.lyrics.split('\n');
  
      console.log(response.result.lyrics.split('\n'));
  
      for (var i = 0; i < lyricArray.length; i++){
        var newPtag = $('<p>').text(lyricArray[i]) 
        $('#lyrics-text').append(newPtag);
      }
    });
  }).catch(function(error){
    console.error(error)
  });
})


// var lyricQueryURL = "https://api.happi.dev/v1/music/artists/24661/albums/734148/tracks/13207101/lyrics?apikey=f032e5LnKKIgW5iz3LxRnpzdRdC6b9J7YfJlOKVdGJI5QupsGzTDgGxi"


