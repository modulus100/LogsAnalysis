from flask import Flask, Response, json, request, redirect
from database_service import DatabaseService as Service

import psycopg2
import sys

app = Flask(__name__)


# Set Access Control for the client
@app.after_request
def apply_caching(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080'
    response.headers['Access-Control-Allow-Headers'] = \
        'Origin, X-Requested-With, Content-Type, Accept'
    return response


@app.route('/', methods=['GET'])
def main():
    return redirect('http://localhost:8080', code=302)


@app.route('/api/articles', methods=['GET'])
def get_articles():
    try:
        articles = Service.get_popular_articles()
    except (psycopg2.Error, ValueError):
        data = {'message': "%s" % sys.exc_info()[1]}
        return Response(json.dumps(data), status=503,
                        mimetype='application/json')

    data = {'message': articles}
    return Response(json.dumps(data), status=200, mimetype='application/json')


@app.route('/api/authors', methods=['GET'])
def get_authors():
    try:
        authors = Service.get_popular_authors()
    except (psycopg2.Error, ValueError):
        data = {'message': "%s" % sys.exc_info()[1]}
        return Response(json.dumps(data), status=503,
                        mimetype='application/json')

    data = {'message': authors}
    return Response(json.dumps(data), status=200, mimetype='application/json')


@app.route('/api/dates', methods=['GET'])
def get_dates():
    try:
        dates = Service.get_dates()
    except (psycopg2.Error, ValueError):
        data = {'message': "%s" % sys.exc_info()[1]}
        return Response(json.dumps(data), status=503,
                        mimetype='application/json')

    data = {'message': dates}
    return Response(json.dumps(data), status=200, mimetype='application/json')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
