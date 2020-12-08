from flask import Flask, render_template, request
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.response_selection import get_random_response

app = Flask(__name__)
Mini_Cortana = ChatBot(name="Chatterbot", storage_adapter="chatterbot.storage.SQLStorageAdapter",
                       response_selection_method=get_random_response,
                       logic_adapters=[
                           {
                               'import_path': 'chatterbot.logic.SpecificResponseAdapter',
                               'input_text': 'empty',
                               'output_text': ''
                           },
                           {
                               'import_path': 'chatterbot.logic.BestMatch',
                               'default_response': 'I honestly have no idea how to respond to that.',
                               'maximum_similarity_threshold': 0.9
                           },
                           {
                               'import_path': 'chatterbot.logic.MathematicalEvaluation'
                           }

                       ],
                       database="db.sqlite3"
                       )
trainer = ChatterBotCorpusTrainer(Mini_Cortana)
trainer.train("chatterbot.corpus.english")
trainer.train("data/data.yml")


@app.route("/")
def index():
    return render_template("index.html")  # to send context to html


@app.route("/get")
def get_bot_response():
    userText = request.args.get("msg")
    bot_msg = str(Mini_Cortana.get_response(userText))
    return bot_msg


def run_Speech_Recognition():
    userText = request.args.get("msg")
    bot_msg = str(Mini_Cortana.get_response(userText))
    return bot_msg


if __name__ == "__main__":
    app.run(debug=True)
