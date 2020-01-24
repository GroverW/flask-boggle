$(function () {
    let $userInput = $('#user-input');
    let currentScore = 0;

    $userInput.on('submit', async function (e) {
        e.preventDefault();
        let wordGuess = $("#word-guess").val()
        let message = await checkGuess(wordGuess)
        handleResult(message.data.result, wordGuess)
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
        let $alerts = $("#alerts");
        $alerts.empty();
        if (result === "not-on-board") {
            $alerts.append("<p class='alert alert-danger' role='alert'>Sorry, that word isn't on the board.</p>")
        } else if (result === "not-word") {
            $alerts.append("<p class='alert alert-danger' role='alert'>Sorry, that's not a word.</p>")
        } else {
            $alerts.append("<p class='alert alert-success' role='alert'>Good job!</p>");
            $(".guessed-words").append(`<li>${wordGuess}</li>`)
            currentScore += wordGuess.length;
            $(".current-score").text(currentScore);
        }
    }
});