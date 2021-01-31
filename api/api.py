from flask import Flask, request
from flask_cors import CORS, cross_origin
from database import DB
import plaid
import json
from transaction import client_id, secret, access_token

app = Flask(__name__)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

myDB = DB()
myDB.dropTable("user_accounts")
myDB.dropTable("charity_accounts")
myDB.createUserTable()
myDB.createCharitiesTable()

client = plaid.Client(client_id=client_id,
                      secret=secret,
                      environment='sandbox',
                      api_version='2019-05-29')

response = client.Transactions.get(
    access_token, start_date='2021-01-05', end_date='2021-01-25')
transactions = response['transactions']


def pretty_print_response(response):
    print(json.dumps(response, indent=2, sort_keys=True))


# pretty_print_response(transactions)

# myDB.addCharity('BLM', 'blm', 'password')
# myDB.addUser('Mellisa', 'Perez', 'Mel', 'password')
# myDB.addUser('Kai', 'Gomes', 'kg', 'password')
# myDB.updateUserCharities('Mel', {'BLM': 50, 'ABC': 50})
# myDB.updateUserCharities('kg', {'BLM': 50, 'ABC': 50})
# myDB.getSubCount('BLM')

# Note id is username for all of the route functions


@app.route('/api/user/<username>', methods=['GET'])
@cross_origin()
def getUserData(username):
    return {
        myDB.getUserData(username)
    }


@app.route('/api/organization/<username>', methods=['GET'])
@cross_origin()
def getOrganizationData(username):
    print(myDB.getCharityData(username))
    return {
        'status': 'hello'
    }


@app.route('/api/organization/updateDescription/<username>', methods=['GET'])
@cross_origin()
def updateDescription(username):
    data = request.get_json()
    return {
        myDB.updateCharityDescription(username, data['description'])
    }


@app.route('/api/registerUser', methods=['POST'])
@cross_origin()
def createUser():
    data = request.get_json()
    return {"status": myDB.addUser(data['firstName'], data['lastName'], data['username'], data['password'])}


@app.route('/api/registerOrganization', methods=['POST'])
@cross_origin()
def createOrganization():
    data = request.get_json()
    return {"status": myDB.addCharity(data['organizationName'], data['username'], data['password'])}


if __name__ == '__main__':
    app.run(debug=True)
