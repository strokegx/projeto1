from flask import Flask, render_template, request
import random

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    numero = None

    if request.method == "POST":
        print("gerando o seu número lendário...")
        numero = random.randint(1, 100)

    return render_template("index.html", numero=numero)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)