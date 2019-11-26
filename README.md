# Interestify
An application that uses Twitter data to determine user interest in a particular topic.

## Getting started

### Setting up Backend
Setup virtual environment.
```bash
python3 -m venv env/
```
Activate the virtual environment and install the project dependencies. When the environment is active you should see the `env` at the start of the command prompt
```bash
source env/bin/activate
pip3 install -r requirements.txt
```
#### Adding/Updating packages
When new python packages are installed or existing packages are update, we need to update the `requirements.txt` folder.
```bash
pip3 freeze > requirements.txt
```
### Setting up Frontend
Install dependencies
```bash
cd client/
yarn
```
#### Serve from flask
To server the frontend from the server, we first need to build the app.
```bash
yarn build
```
**Note**: This is not how you would work on the frontend.

#### Working on the frontend
To work on the frontend use the react development server, to avoid having to build after every change. See `client/README.md` for more info
```bash
yarn start
```
 
#### Adding/Updating packages
New packages should be installed with `yarn` which updated the `package.json` file and the lockfile `yarn.lock`
```bash
# e.g. installing the package colors
cd client/
yarn add colors
```
