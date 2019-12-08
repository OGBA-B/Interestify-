import requests
import sklearn
from twython import Twython
import json
import numpy as np
import os


credentials = {}
credentials['CONSUMER_KEY'] = os.environ.get('INTERESTIFY_CONSUMER_KEY', '')
credentials['CONSUMER_SECRET'] = os.environ.get('INTERESTIFY_CONSUMER_SECRET', '')
credentials['ACCESS_TOKEN'] = os.environ.get('INTERESTIFY_ACCESS_TOKEN', '')
credentials['TOKEN_SECRET'] = os.environ.get('INTERESTIFY_TOKEN_SECRET', '')

twitter = Twython(app_key=credentials['CONSUMER_KEY'],
                  app_secret=credentials['CONSUMER_SECRET'],
                  oauth_token=credentials['ACCESS_TOKEN'],
                  oauth_token_secret=credentials['TOKEN_SECRET']
                  )

# Gets user info from a list of tweets
def get_users(tweets):
    _users = []
    for result in tweets:
        _users.append(result.get("user"))
    return _users

# Gets the followers of a twitter user

def get_followers(screen_name):
    followers = twitter.get_followers_list(screen_name=screen_name)
    return followers.get("users")

# Returns popular tweets
def get_popular_tweets(search_term):
    results = twitter.cursor(twitter.search, q=search_term, result_type='popular')
    list = []
    try:
        for result in results:
            list.append(result)
    except NameError:
        print("Variable x is not defined")
    except Exception as e: print(e)

    return str(list)


#TESTS

# tweet_list = []
# results = get_popular_tweets("john boyega")
#print(results)

# users = get_users(tweet_list)
# followers = get_followers("pewdiepie")

# for follower in followers:
#     print(follower)

# for result in tweet_list:
#     print(result.get(""))

# print(followers)


# print(users[0].get("id"), users[0].get("screen_name"), users[0].get("followers_count"))
