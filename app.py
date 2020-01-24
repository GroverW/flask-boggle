from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret-key"

app.debug = True

toolbar = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route("/") 
def game():
    board = boggle_game.make_board()
    session['board'] = board

    return render_template('game.html',board=board)

@app.route("/guess")
def check_word():
    word = request.args.get("word-guess")

    board = session["board"]

    result = boggle_game.check_valid_word(board, word)
    # result = "ok"

    return jsonify({"result": result}), 201, {"Content-Type": "application/json"}


