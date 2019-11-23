from flask import Flask, render_template

app = Flask(__name__, static_folder="./client/build/static", template_folder="./client/build")

@app.route("/")
def index():
    return render_template("index.html", token="Sample Token")

if __name__ == "__main__":
    app.run(debug=True)