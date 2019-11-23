import requests
import sklearn
from twython import Twython
import json
import numpy as np
import os

# Gets user info from a list of tweets

def get_users(tweets):
    _users = []
    for result in tweets:
        _users.append(result.get("user"))
    return _users


response = requests.get("http://api.open-notify.org/iss-now.json")
# Print the status code of the response.
# print(response.status_code)


# print('response ->', response.content)

data = response.json()
data1 = response.json().get('message')
# print('data', data['iss_position']['latitude'], data1)

credentials = {}
credentials['CONSUMER_KEY'] = os.environ.get('INTERESTIFY_CONSUMER_KEY', '')
credentials['CONSUMER_SECRET'] = os.environ.get('INTERESTIFY_CONSUMER_SECRET', '')
credentials['ACCESS_TOKEN'] = os.environ.get('INTERESTIFY_ACCESS_TOKEN', '')
credentials['TOKEN_SECRET'] = os.environ.get('INTERESTIFY_TOKEN_SECRET', '')

# Save the credentials object to file
with open("twitter_credentials.json", "w") as credentialsFile:
    json.dump(credentials, credentialsFile)


twitter = Twython(app_key=credentials['CONSUMER_KEY'],
                  app_secret=credentials['CONSUMER_SECRET'],
                  oauth_token=credentials['ACCESS_TOKEN'],
                  oauth_token_secret=credentials['TOKEN_SECRET']
                  )

results = twitter.cursor(twitter.search, q='Game of Thrones', result_type='popular')

followers = twitter.get_followers_list(screen_name="pewdiepie")
tweet_list = []

try:
    for result in results:
        tweet_list.append(result)
        print(1)
except:
    pass

users = get_users(tweet_list)

for follower in followers:
    print(follower)

for result in tweet_list:
    print(result.get("user"))


# print(users[0].get("id"), users[0].get("screen_name"), users[0].get("followers_count"))
# searchResults = twitter.search(q='python', result_type='popular')
