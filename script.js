const searchForm = document.querySelector("#search-form"),
    searchInput = document.querySelector("#search-input"),
    //
    speechBtnDiv = document.querySelector("#speech-btn"),
    micBtn = document.querySelector(".btn .fas"),
    instruction = document.querySelector(".instruction");


const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

//Check for browser Support
if (speechRecognition) {
    console.log("Speech recognition supported");
    const recognition = new speechRecognition();
    micBtn.addEventListener("click", micBtnClicked)

    function micBtnClicked(e) {
        e.preventDefault();
        if (micBtn.classList.contains("fa-microphone")) {
            recognition.start()
        } else {
            recognition.stop()
        }
    }
    //Start Speech Recognition
    recognition.addEventListener("start", () => {
        micBtn.classList.remove("fa-microphone")
        micBtn.classList.add("fa-microphone-slash")
        instruction.textContent = "Recording ... Press Ctrl + m to stop"
        searchInput.focus();
        console.log("Speech enabled");
    })
    //Stop Speech Recognition
    recognition.addEventListener("end", () => {
        micBtn.classList.remove("fa-microphone-slash")
        micBtn.classList.add("fa-microphone")
        instruction.textContent = "Press ctrl + x or Click the Mic icon to start"
        searchInput.focus();
        console.log("Speech Disabled");
    })

    //Get Result of Speech Recognition
    recognition.continuous = true
    // let content = "";
    recognition.addEventListener("result", (e) => {
        // console.log(e);
        const current = e.resultIndex;
        const transcript = e.results[current][0].transcript;

        if (transcript.toLowerCase().trim() === "stop recording") {
            recognition.stop()
        } else if (!searchInput.value) {
            searchInput.value = transcript;
        } else {
            if (transcript.toLowerCase().trim() === "search") {
                searchForm.submit();
            } else if (transcript.toLowerCase().trim() === "reset form") {
                searchInput.value = "";
            } else {
                searchInput.value = transcript;

            }
        }
    });
    //Add Keyboard Event Listener
    document.addEventListener("keydown", (e) => {
        if(e.ctrlKey && e.key === "x") {
            recognition.start();
        }
        if(e.ctrlKey && e.key === "m") {
            recognition.stop();
        }
    })
 
} else {
    console.log("Speech recognition not supported");
    speechBtnDiv.style.visibility = "hidden"
}