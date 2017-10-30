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


@app.route('/api', methods=['POST'])
def record_post_id():
    post_id = request.get_json().get('id')

    if post_id is None:
        data = {'message': 'id is missing'}
        return Response(json.dumps(data), status=422,
                        mimetype='application/json')

    try:
        Service.add_author(post_id + 3, "lol2")
    except (psycopg2.Error, ValueError):
        data = {'message': "%s" % sys.exc_info()[1]}
        return Response(json.dumps(data), status=503,
                        mimetype='application/json')

    data = {'message': 'success', 'id': post_id}
    return Response(json.dumps(data), status=200, mimetype='application/json')


@app.route('/api/authors', methods=['GET'])
def get_authors():
    try:
        authors = Service.get_authors()
    except (psycopg2.Error, ValueError):
        data = {'message': "%s" % sys.exc_info()[1]}
        return Response(json.dumps(data), status=503,
                        mimetype='application/json')

    data = {'message': authors}
    return Response(json.dumps(data), status=200, mimetype='application/json')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
