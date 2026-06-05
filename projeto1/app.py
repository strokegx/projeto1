from flask import Flask, render_template, request
import random
import os

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    numero = None
    if request.method == "POST":
        numero = random.randint(1, 100)
    return render_template("index.html", numero=numero)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)