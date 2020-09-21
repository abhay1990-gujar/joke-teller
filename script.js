const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
// disable/enable button
function toggleButton(){
    button.disabled = !button.disabled;
}

// passing joke to voice rss api
function tellMe(joke){
    VoiceRSS.speech({
            key: 'df5d4ed47d264e51a8c1af8782384014',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
}

// get jokes from joke api
async function getJokes(){
    let joke = ''
    const apiUrl = "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
    try{
          const response = await fetch(apiUrl);
          const data = await response.json();
          if (data.setup){
              joke = `${data.setup} ... ${data.delivery}`;
          } else{
              joke = data.joke;
          }
        //   text to speech
          tellMe(joke);
        //   disable button
        toggleButton();
    }catch (error){
        // catch errors
        console.log("whopes", error);
    }
}

// eventlistners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);



