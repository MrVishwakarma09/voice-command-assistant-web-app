// Check if the browser supports Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = "en-US";

// Automatically start listening when user says "Alex activate"
const wakeWord = "alex activate";
const stopWord = "alex deactivate";
let isListening = false;

// Start recognition when the wake word is detected
recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    console.log("Command received:", transcript);
    document.getElementById("status").innerText = `Command: "${transcript}"`;

    if (transcript === wakeWord) {
        isListening = true;
        speak("Hello!. How can I assist you today?");
    } else if (transcript === stopWord) {
        isListening = false;
        speak("Voice recognition deactivated");
    }

    if (isListening) {
        executeCommand(transcript);
    }
};

// Execute commands based on voice input
function executeCommand(command) {
    if (command.startsWith("search for")) {
        let query = command.replace("search for", "").trim();
        speak(`Searching for ${query}`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    } else if (command.startsWith("open")) {
        let app = command.replace("open", "").trim();
        speak(`Opening ${app}`);
        window.open(`https://${app}.com`, "_blank");
    } else if (command.startsWith("play music on spotify")) {
        speak("Playing music on Spotify");
        window.open("https://open.spotify.com", "_blank");
    } else if (command.startsWith("play this video on youtube")) {
        let video = command.replace("play this video on youtube", "").trim();
        speak(`Playing ${video} on YouTube`);
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(video)}`, "_blank");
    } else if (command === "what is the time") {
        let time = new Date().toLocaleTimeString();
        speak(`The time is ${time}`);
        document.getElementById("status").innerText = `Time: ${time}`;
    } else if (command === "what is today's date") {
        let date = new Date().toLocaleDateString();
        speak(`Today's date is ${date}`);
        document.getElementById("status").innerText = `Date: ${date}`;
    } else if (command === "what year is this") {
        let year = new Date().getFullYear();
        speak(`The year is ${year}`);
        document.getElementById("status").innerText = `Year: ${year}`;
    } else if (command === "search for weather") {
        speak("Checking the weather");
        window.open("https://www.google.com/search?q=current+weather", "_blank");
    } else if (command.startsWith("who is")) {
        let person = command.replace("who is", "").trim();
        speak(`Searching for ${person}`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(person)}`, "_blank");
    } else if (command.startsWith("send message to")) {
        let contact = command.replace("send message to", "").trim();
        speak(`Opening messaging app to send a message to ${contact}`);
        window.open("https://web.whatsapp.com", "_blank");
    } else if (command === "write an email") {
        speak("Opening email application");
        window.open("https://mail.google.com", "_blank");
    } else if (command === "save this") {
        speak("Saving this file");
        document.execCommand("saveAs");
    } else if (command.startsWith("download")) {
        let file = command.replace("download", "").trim();
        speak(`Downloading ${file}`);
        window.open(`https://www.google.com/search?q=download+${encodeURIComponent(file)}`, "_blank");
    } else if (command === "tell me a joke") {
        let joke = "Why don’t skeletons fight each other? Because they don’t have the guts.";
        speak(joke);
        document.getElementById("status").innerText = joke;
    } else if (command === "change background") {
        speak("Changing background color");
        document.body.style.backgroundColor = getRandomColor();
    } else {
        speak("Unknown command");
        document.getElementById("status").innerText = "Unknown command: " + command;
    }
}

// Function to make the system speak
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

// Function to generate a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

recognition.onerror = (event) => {
    console.error("Speech recognition error", event);
    document.getElementById("status").innerText = "Error: Speech recognition failed.";
    speak("An error occurred with speech recognition.");
};

// Start listening automatically
recognition.start();
