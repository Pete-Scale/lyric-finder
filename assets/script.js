// When search button is clicked...
$('#search-btn').on('click', function(event){
  event.preventDefault();
  // Empty lyric div container
  $('#lyrics-text').empty();
  
  // Initial lyric call and QR Code API needs artist and song title 
  var searchInput = $('#search-input').val();
  // console.log(searchQueryURL + searchInput);
  console.log(searchInput);

  // QR Code API -----------------------------------------------------------------
  var qrURL = 'http://api.qrserver.com/v1/create-qr-code/?data=';

  var qrImg = $('#qr-img');

  var youTubeSearch = 'https://www.youtube.com/results?search_query=';

  qrImg.attr('src', qrURL + youTubeSearch + searchInput);

  // Lyrics API ------------------------------------------------------------------
  var apiKey = "?apikey=f032e5LnKKIgW5iz3LxRnpzdRdC6b9J7YfJlOKVdGJI5QupsGzTDgGxi";

  var searchQueryURL = "https://api.happi.dev/v1/music" + apiKey + "&q=";
  
  // First call
  $.ajax({
    url: searchQueryURL + searchInput,
    method: "GET"
  }).then(function(response){
    // Returns only songs that hasLyrics
    var lyrics = response.result.filter(function(song){
      return song.haslyrics
    });
    // console.log(lyrics);

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
      $('#lyrics-text').append(artistTag, trackTag);

      // Split lyrics into an array to format correctly at ↵
      var lyricArray = response.result.lyrics.split('\n');
      console.log(response.result.lyrics.split('\n'));

      // Loop through lyric array and create new ptag for each line
      for (var i = 0; i < lyricArray.length; i++){
        var newPtag = $('<p>').text(lyricArray[i]); 
        $('#lyrics-text').append(newPtag);
      }
    });
  }).catch(function(error){
    console.error(error);
  });
});



