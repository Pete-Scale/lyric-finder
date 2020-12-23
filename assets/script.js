var qrImg = $('.qr-img');
var youTubeLink = $('.you-tube-link');
var qrScanInstructions = $('.qr-scan-instructions');
var lyricsContainer = $('#lyrics-container');
var lyricsText = $('#lyrics-text');
var errorMessage = $('#error-message');
// var lyricH3 = $('#lyric-h3')

// On page load hide these elements
function init () {
  qrImg.hide();
  youTubeLink.hide();
  qrScanInstructions.hide();
  errorMessage.hide();
  // lyricH3.hide();
}

init();

// When search button is clicked...
$('#search-btn').on('click', function(event){
  event.preventDefault();
  lyricsContainer.show();
  errorMessage.hide();
  // Empty lyric div container
  lyricsText.empty();
  
  // Initial lyric call and QR Code API needs artist and song title 
  var searchInput = $('#search-input').val();

  // QR Code API -----------------------------------------------------------------
  var qrURL = 'http://api.qrserver.com/v1/create-qr-code/?data=';

  var youTubeSearch = 'https://www.youtube.com/results?search_query=';

  // This API doesn't use an ajax call instead you use their api url in the <img> src
  qrImg.attr('src', qrURL + youTubeSearch + searchInput).show();
  youTubeLink.attr('href', youTubeSearch + searchInput).show();
  qrScanInstructions.show();
  // lyricH3.show();

  // Lyrics API ------------------------------------------------------------------
  var apiKey = "?apikey=f032e5LnKKIgW5iz3LxRnpzdRdC6b9J7YfJlOKVdGJI5QupsGzTDgGxi";

  var searchQueryURL = "https://api.happi.dev/v1/music" + apiKey + "&q=";

  // First call
  $.ajax({
    url: searchQueryURL + searchInput,
    method: "GET",
  }).then(function(response){
    // Returns only songs that hasLyrics
    var lyrics = response.result.filter(function(song){
      return song.haslyrics
    });

    // Second api call for lyrics from only hasLyrics songs
    var lyricQueryURL = lyrics[0].api_lyrics
    $.ajax({
      url: lyricQueryURL + apiKey,
      method: "GET"
    }).then(function(response){
      console.log(response.result);
      // Make tags and fill with artist and track text before lyrics
      var artistTag = $('<h4>').text(response.result.artist);
      var trackTag = $('<h5>').text(response.result.track);
      lyricsText.append(artistTag, trackTag);

      // Split lyrics into an array to format correctly at ↵
      var lyricArray = response.result.lyrics.split('\n');

      // Loop through lyric array and create new ptag for each line
      for (var i = 0; i < lyricArray.length; i++){
        var lyricPtag = $('<p>').text(lyricArray[i]); 
        lyricsText.append(lyricPtag);
      }
    });
  }).fail(function(){
    lyricsContainer.hide();
    errorMessage.show();
    errorMessage.text("Oh no! We couldn't find your lyrics. Are you sure you spelled everything correctly?")
  }).catch(function(error){
    console.error(error);
  });
});