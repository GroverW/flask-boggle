$(function () {
    $userInput = $('#user-input');

    $userInput.on('submit', async function (e) {
        e.preventDefault();
        let wordGuess = $("#word-guess").val()
        let message = await checkGuess(wordGuess)
        console.log(message)
    });
});

async function checkGuess(wordGuess) {
    let response = await axios.post("localhost:5000/", {
        params: {
            "word-guess": wordGuess
        }
    })
    return response
}