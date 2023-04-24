from flask import Flask, jsonify
from movie_recommender import *
from collaborative_recommender import *

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
    

#endpoint for collaborative filtering based on 10 similar users
@app.route("/cfrecommend/<value>")
def cbRecommend(value):
    content = collaborative_recommender(value)
    return jsonify(content)


#endpoint for genre base content filtering
@app.route("/genre/<value>")
def genre(value):
    genres = [value]
    content = genreRecommender(genres)
    return jsonify(content)




if __name__ == "__main__":
    app.run()
