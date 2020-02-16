import axios from 'axios'

const API = axios.create({
    baseURL: 'http://127.0.0.1:5000'
});

export default class ApiService {
    searchTweets(query: string) {
        return API.get(`search/${query}`);
    }

    getFollowers(query: string) {
        return API.get(`followers/${query}`);
    }
}