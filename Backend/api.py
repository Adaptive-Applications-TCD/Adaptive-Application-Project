from flask import Flask, jsonify
from movie_recommender import *

import pandas as pd
import numpy as np

app = Flask(__name__)
# apiData = apiData.to_dict()
# print(type(apiData))


@app.route("/hello")
def hello():
    return {"hello world": "world hello"}


@app.route("/recommend/<id>")
def recommend(id):
    content = content_based_recommender(id)
    if isinstance(content, str):
        return jsonify(content)
    else:
        return jsonify(content)


if __name__ == "__main__":
    app.run()
