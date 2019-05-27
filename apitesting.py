import requests
import sklearn
from twython import Twython
import json
import numpy as np

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
credentials['CONSUMER_KEY'] = "mmrICAk05jsj5NpbbD4Eek7wO"
credentials['CONSUMER_SECRET'] = "vZRC0EBOSYzcQvjwv63bhCxpb4tgDku7RlaEmtnBHdixIQ6rTh"
credentials['ACCESS_TOKEN'] = "182173029-biGHnuFDPiwZwikUQTWtYFG5A9VDaWj9QQf9mSmc"
credentials['TOKEN_SECRET'] = "pohXlFohtVM64AgIUD32ABV7sjFaCkzE6ejiYpaGSMsPf"

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

for result in results:
    tweet_list.append(result)

users = get_users(tweet_list)

for follower in followers:
    print(follower)

for result in tweet_list:
    print(result.get("user"))


# print(users[0].get("id"), users[0].get("screen_name"), users[0].get("followers_count"))
# searchResults = twitter.search(q='python', result_type='popular')
