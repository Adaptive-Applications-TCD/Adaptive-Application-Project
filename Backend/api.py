from flask import Flask
from movie_recommender import *

import pandas as pd
import numpy as np

app = Flask(__name__)
#apiData = apiData.to_dict()
#print(type(apiData))

@app.route("/")
def hello():
    return "hello world"

@app.route("/<id>")
def recommend(id):
    content = content_based_recommender(id)
    if isinstance(content,str):
        return content
    else:
        return content.to_dict()
if __name__ == "__main__":
    app.run()