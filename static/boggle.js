$(function () {
    let $userInput = $('#user-input');
    let $alerts = $("#alerts");
    let currentScore = 0;
    let gameReady = true;

    $userInput.on('submit', async function (e) {
        e.preventDefault();
        
        if(gameReady) {
            let wordGuess = $("#word-guess").val()
            let message = await checkGuess(wordGuess)
            handleResult(message.data.result, wordGuess)
        }
    });


    async function checkGuess(wordGuess) {
        let response = await axios.get("/guess", {
            params: {
                "word-guess": wordGuess
            }
        })      
        return response;
    }

    function handleResult(result, wordGuess) {
        if (result === "not-on-board") {
            updateAlerts("danger","Sorry, that word isn't on the board.");
        } else if (result === "not-word") {
            updateAlerts("danger","Sorry, that's not a word.")
        } else {
            updateAlerts("success","Good job!");
            $(".guessed-words").append(`<li>${wordGuess}</li>`)
            currentScore += wordGuess.length;
            $(".current-score").text(currentScore);
        }
    }

    function handleTimer() {
        let timeRemaining = 5;
        
        let timer = setInterval(() => {
            if(timeRemaining > 0) {
                timeRemaining--;
            } else {
                updateAlerts("success",`Final score: ${currentScore}`);
                clearInterval(timer);
                gameReady = false;
                sendScore(currentScore);
            }
            updateTimeRemaining(timeRemaining);
        },1000);
    }
    handleTimer()

    async function sendScore(score) {
        console.log(score);
        let response = await axios.post("/update_score", {
                "current-score": score
        })

        updateScore(response.data);
    }

    function updateTimeRemaining(timeRemaining) {
        $('.time-left').text(timeRemaining);
    }

    function updateAlerts(type,alert) {
        let alertHTML = `<div class='alert alert-${type}' role='alert'>${alert}</div>`
        $alerts.html(alertHTML)
    }

    function updateScore(data) {
        console.log(data);
        $(".high-score").text(data["high-score"]);
        $(".num-plays").text(data["num-plays"]);
    }
});