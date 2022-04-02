const textarea = document.querySelector("textarea"),
    voicelist = document.querySelector("select"),
    speachbtn = document.querySelector("button");


let synth = speechSynthesis,
    isSpeaking = true;

synth.addEventListener("voicechanged", voices);

function voices() {
    for (let voice of synth.getVoices()) {
        // creating an option tag with passing voice name and voice language

        // by default select the lang
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voicelist.insertAdjacentHTML("beforeend", option);
        // inserting option tag beforeend of select tag
    }
}
synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
    // SpeechSynthesisUtterance = represents a speech request
    // speechSynthesis = controler interface for the speech service
    let utternance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        // voicelist.value returns the lists of value

        // if the available device voice name is equal to the user selected voice
        if (voice.name === voicelist.value) {
            utternance.voice = voice;
        }
    }
    synth.speak(utternance); //speak the speech/utterance
    // whatever inside the text it will speak
}


speachbtn.addEventListener("click", e => {
    e.preventDefault(); //nothing do default
    if (textarea.value !== "") {
        // if we tap again and again this will not repeat
        if (!synth.speaking) //if an utterance / speach is not currently in the process of speaking 
        {
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            // if speaking is true then change it value to false and resume the utterance speech else change it value to true and pause the speech
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speachbtn.innerText = "Pause Speech";
            } else {
                synth.pause();
                isSpeaking = true;
                speachbtn.innerText = "Resume Speech";
            }
            // checking is utterance/speach in speaking process or not in every 100ms if not then set the value of is speaking to true and change the button text
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speachbtn.innerText = "Convert Speach";
                } else {
                    speachbtn.innerText = "Convert Speach";
                }
            })
        }
    }

})