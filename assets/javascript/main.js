//to do:   
    // get user score into local storage array[]
    // make different api call based on score []
    // display thumbnails, and make watchable on click [X]

const apiKey = 'AIzaSyCzwyCf3RyC5VDnQVV_zLp0mqzG3WVaUP8';
const videoContainer = $('.video');
const videoClick = $('.click'); 
let video;


// api call grabs top 3 most viewed videos, will need to make the search url dependent on the "score" the user gets to load different video recomendations
fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSJ4gkVC6NrvII8umztf0Ow&maxResults=3&order=viewCount&key=${apiKey}`, { 
})
.then(response => response.json())
.then(data => {
  console.log(data);
  video = data.items;
  loadThumbnails(video);
})
.catch(error => console.error(error)); //this section looks ugly as hell, but lets me set the api return into a global var to be used.



function loadThumbnails(video) { //loads thumbnails of the channel on page load.
  video.forEach(video => { //this spits out errors but works......
    console.log(video.snippet.title);
    $(videoContainer).append(`
      <h3>${video.snippet.title}</h3>
      <img class='click' src="${video.snippet.thumbnails.high.url}">`); 
  });
  console.log(video);
}


//function that makes the clicked thumbnail a webplayer
$(document).on('click', '.click', function playVideo(){ //running this function spits out so many errors...... but it works, so oh well
  const index = $(this).index('.click');
  const selectedVideo = video[index];
  $(videoContainer).empty();
  $(videoContainer).append(`
    <h3>${selectedVideo.snippet.title}</h3>
    <iframe width="420" height="315" src="https://www.youtube.com/embed/${selectedVideo.id.videoId}">
    </iframe> 
  `);
});


loadThumbnails();