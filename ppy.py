from flask import Flask, render_template_string
import random

app = Flask(__name__)

html = """
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Número da Sorte</title>
<style>

body{
font-family: Arial;
background: linear-gradient(135deg,#111,#2b0a3d);
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
margin:0;
}

.container{
background:rgba(255,255,255,0.08);
padding:40px;
border-radius:20px;
text-align:center;
width:350px;
}

.numero{
font-size:60px;
color:gold;
margin:20px;
}

button{
background:#ff4d6d;
color:white;
border:none;
padding:12px 25px;
font-size:16px;
border-radius:10px;
cursor:pointer;
}

button:hover{
background:#e63956;
}

</style>
</head>

<body>

<div class="container">
<h1>Número da Sorte</h1>
<div class="numero">{{numero}}</div>

<form method="get">
<button type="submit">Gerar número</button>
</form>

</div>

</body>
</html>
"""

@app.route("/")
def home():
    numero = random.randint(1,100)
    return render_template_string(html, numero=numero)

app.run(debug=True)
