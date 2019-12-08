import apitesting as api
from flask import Flask, render_template

app = Flask(__name__, static_folder="./client/build/static", template_folder="./client/build")


@app.route("/")
def index():
    return render_template("index.html", token="Sample Token")


@app.route("/search/<search_term>")
def search_tweets(search_term=None):
    return api.get_popular_tweets(search_term)


if __name__ == "__main__":
    app.run(debug=True)