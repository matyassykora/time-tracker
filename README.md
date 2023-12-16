## Dependencies
- python 3
- pip
- pipenv
```sh
pip install --user pipenv
```
- npm
- serve (optional)
```sh
npm install --global serve
```

## Running Django backend
Go to the _backend_ directory and:
```sh
pipenv install
```
```sh
pipenv shell
```
```sh
python manage.py migrate
```
```sh
python manage.py runserver
```

## Running React frontend
Go to the _frontend_ directory and:
```sh
npm i
```
```sh
npm run start
```
or (if you installed serve)
```sh
npm run build && serve -s build
```
