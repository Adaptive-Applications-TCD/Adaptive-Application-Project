# Data processing
import pandas as pd
import numpy as np
import scipy.stats

# Similarity
from sklearn.metrics.pairwise import cosine_similarity
from scipy import stats
from ast import literal_eval
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
from nltk.stem.snowball import SnowballStemmer
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import wordnet
#from surprise import Reader, Dataset, SVD

import warnings; warnings.simplefilter('ignore')

# User based collaborative filtering taken from a tutorial notebook ref: [1] https://colab.research.google.com/drive/1cN44RlIEaB28FTD30qFiHkN3rqcDgcng?usp=sharing#scrollTo=pfdmVtLIP7IM

def collaborative_filtering_reccomender(number_similar_users, number_movies, user_id ):
    # [1]
    ratings=pd.read_csv('ratings.csv')
    movies = pd.read_csv('movies.csv')
    df = pd.merge(ratings, movies, on='movieId', how='inner')
    agg_ratings = df.groupby('title').agg(mean_rating = ('rating', 'mean'),
                                                    number_of_ratings = ('rating', 'count')).reset_index()
    agg_ratings_GT100 = agg_ratings[agg_ratings['number_of_ratings']>100]
    agg_ratings_GT100.sort_values(by='number_of_ratings', ascending=False).head()
    df_GT100 = pd.merge(df, agg_ratings_GT100[['title']], on='title', how='inner')
    matrix = df_GT100.pivot_table(index='userId', columns='title', values='rating')
    matrix_norm = matrix.subtract(matrix.mean(axis=1), axis = 'rows')
    user_similarity = matrix_norm.T.corr()
    user_similarity_cosine = cosine_similarity(matrix_norm.fillna(0))
    user_similarity_threshold = 0.3
    similar_users = user_similarity[user_similarity[user_id]>user_similarity_threshold][user_id].sort_values(ascending=False)[:number_similar_users]
    picked_userid_watched = matrix_norm[matrix_norm.index == user_id].dropna(axis=1, how='all')
    similar_user_movies = matrix_norm[matrix_norm.index.isin(similar_users.index)].dropna(axis=1, how='all')
    similar_user_movies.drop(picked_userid_watched.columns,axis=1, inplace=True, errors='ignore')
    item_score = {}
    for i in similar_user_movies.columns:
        movie_rating = similar_user_movies[i]
        total = 0
        count = 0
        for u in similar_users.index:
            if pd.isna(movie_rating[u]) == False:
                score = similar_users[u] * movie_rating[u]
                total += score
                count +=1
        item_score[i] = total / count

    item_score = pd.DataFrame(item_score.items(), columns=['movie', 'movie_score'])
    ranked_item_score = item_score.sort_values(by='movie_score', ascending=False)
    m = number_movies
    top_n_movies = ranked_item_score.head(m)

    avg_rating = matrix[matrix.index == user_id].T.mean()[user_id]

    ranked_item_score['predicted_rating'] = ranked_item_score['movie_score'] + avg_rating

    return top_n_movies,  ranked_item_score['predicted_rating'], avg_rating






def collaborative_recommender(user):
    final_list = []
    x,y,z = collaborative_filtering_reccomender(10,50,int(user))
    #print(f'the predicted rating: \n', y)
    #print(f'The average movie rating for user {2}: ', z)
    x = x.values.tolist()
    for movie in x:
        movie_obj = {"Title": movie[0], "Score": movie[1]}
        final_list.append(movie_obj)
    return final_list



#collaborative_recommender(2)


# First time user recommender from a tutorial ref: [2] https://www.kaggle.com/code/rounakbanik/movie-recommender-systems/notebook

def weighted_rating(x):
    # [2]
    v = x['vote_count']
    R = x['vote_average']
    return (v/(v+m) * R) + (m/(m+v) * C)


def build_chart(genre, percentile=0.85):
    # [2]
    df = gen_md[gen_md['genre'] == genre]
    vote_counts = df[df['vote_count'].notnull()]['vote_count'].astype('int')
    vote_averages = df[df['vote_average'].notnull()]['vote_average'].astype('int')
    C = vote_averages.mean()
    m = vote_counts.quantile(percentile)
    
    qualified = df[(df['vote_count'] >= m) & (df['vote_count'].notnull()) & (df['vote_average'].notnull())][['title', 'year', 'vote_count', 'vote_average', 'popularity']]
    qualified['vote_count'] = qualified['vote_count'].astype('int')
    qualified['vote_average'] = qualified['vote_average'].astype('int')
    
    qualified['wr'] = qualified.apply(lambda x: (x['vote_count']/(x['vote_count']+m) * x['vote_average']) + (m/(m+x['vote_count']) * C), axis=1)
    qualified = qualified.sort_values('wr', ascending=False).head(250)
    
    return qualified

def first_time_user(genres):
    list_movies = pd.DataFrame()
    for x in genres:
        top_movies = build_chart(x).head(50)
        list_movies = pd.concat([top_movies,list_movies])
    list_movies = list_movies.sort_values('wr', ascending=False).head(250)
    return list_movies

# [2]
md = pd.read_csv('movies_metadata.csv', engine='python')

md['genres'] = md['genres'].fillna('[]').apply(literal_eval).apply(lambda x: [i['name'] for i in x] if isinstance(x, list) else [])
vote_counts = md[md['vote_count'].notnull()]['vote_count'].astype('int')
vote_averages = md[md['vote_average'].notnull()]['vote_average'].astype('int')
C = vote_averages.mean()
C
m = vote_counts.quantile(0.95)
md['year'] = pd.to_datetime(md['release_date'], errors='coerce').apply(lambda x: str(x).split('-')[0] if x != np.nan else np.nan)
qualified = md[(md['vote_count'] >= m) & (md['vote_count'].notnull()) & (md['vote_average'].notnull())][['title', 'year', 'vote_count', 'vote_average', 'popularity', 'genres']]
qualified['vote_count'] = qualified['vote_count'].astype('int')
qualified['vote_average'] = qualified['vote_average'].astype('int')
qualified['wr'] = qualified.apply(weighted_rating, axis=1)
qualified = qualified.sort_values('wr', ascending=False).head(250)
s = md.apply(lambda x: pd.Series(x['genres']),axis=1).stack().reset_index(level=1, drop=True)
s.name = 'genre'
gen_md = md.drop('genres', axis=1).join(s)



def genreRecommender(genres):
    final_list = []
    list_movies = first_time_user(genres).values.tolist()
    for movie in list_movies:
        movie_obj = {"Title": movie[0], "Year": movie[1], "Vote Count": movie[2], "Vote Average": movie[3]} 
        final_list.append(movie_obj)
    return final_list



