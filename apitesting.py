import requests
import sklearn
from twython import Twython
import json
import numpy as np
import os


class TwitterApi:
    def __init__(self):
        self.credentials = {}
        self.credentials['CONSUMER_KEY'] = os.environ.get('INTERESTIFY_CONSUMER_KEY', '')
        self.credentials['CONSUMER_SECRET'] = os.environ.get('INTERESTIFY_CONSUMER_SECRET', '')
        self.credentials['ACCESS_TOKEN'] = os.environ.get('INTERESTIFY_ACCESS_TOKEN', '')
        self.credentials['TOKEN_SECRET'] = os.environ.get('INTERESTIFY_TOKEN_SECRET', '')

        self.twitter = Twython(app_key=self.credentials['CONSUMER_KEY'],
                          app_secret=self.credentials['CONSUMER_SECRET'],
                          oauth_token=self.credentials['ACCESS_TOKEN'],
                          oauth_token_secret=self.credentials['TOKEN_SECRET']
                          )

    # Gets user info from a list of tweets
    def get_users(self, tweets):
        _users = []
        for result in tweets:
            _users.append(result.get("user"))
        return _users

    # Gets the followers of a twitter user

    def get_followers(self, screen_name):
        followers = self.twitter.get_followers_list(screen_name=screen_name)
        return followers.get("users")

    # Returns popular tweets
    def get_popular_tweets(self, search_term):
        results = self.twitter.cursor(self.twitter.search, q=search_term, result_type='popular')
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
