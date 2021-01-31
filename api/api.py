from flask import Flask, request
from flask_cors import CORS, cross_origin
from database import DB
import plaid
import json
from transaction import client_id, secret, access_token
from math import ceil

app = Flask(__name__)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

myDB = DB()
# myDB.dropTable("user_accounts")
# myDB.dropTable("charity_accounts")
myDB.createUserTable()
myDB.createCharitiesTable()

client = plaid.Client(client_id=client_id,
                      secret=secret,
                      environment='sandbox',
                      api_version='2019-05-29')

response = client.Transactions.get(
    access_token, start_date='2021-01-05', end_date='2021-01-25')
transactions = response['transactions']


def processTransactions():
    amount = 0
    for val in transactions:
        amount += (ceil(val['amount']) - val['amount'])
    return round(amount, 2)

# Need to be Moved


def getDonation(username):
    donation = processTransactions()
    current_total = myDB.getUserTotal(username)[0]['current_total']
    myDB.updateUserTotal(username, current_total + donation)
    output = json.loads(myDB.getUserCharity(
        username)[0]['charity_id_percent'])  # json with mapping
    for k, v in output.items():
        current_charity = myDB.getCharityTotal(k)[0]['current_total']
        val = current_charity + round(v * .01 * donation, 2)
        myDB.updateCharTotal(k, val)
        myDB.updateCharityTotalReceived(k, val)


myDB.addCharity('PetSmart Charities', 'petsmart', 'password')
myDB.addCharity('The Hunger Project', 'thp', 'password')
myDB.addCharity('American Wildlife Foundation', 'awf', 'password')
myDB.addUser('Mellisa', 'Perez', 'Mel', 'password')
myDB.addUser('Kai', 'Gomes', 'kg', 'password')
myDB.updateCharityDescription(
    'PetSmart Charities', 'To find lifelong, loving homes for all pets by supporting programs and thought leadership that bring people and pets together.')
myDB.updateCharityDescription('American Wildlife Foundation',
                              'To ensure wildlife and wildlands thrive in modern Africa.')
myDB.updateCharityDescription('The Hunger Project',
                              'To end hunger and poverty by pioneering sustainable, grassroots, women-centered strategies and advocating for their widespread adoption in countries throughout the world.')
myDB.updateUserCharities(
    'Mel', {'The Hunger Project': 50, 'PetSmart Charities': 50})
myDB.updateUserCharities('kg', {'American Wildlife Foundation': 10,
                                'The Hunger Project': 50, 'PetSmart Charities': 40})
getDonation('kg')

# Note id is username for all of the route functions


@app.route('/api/donation/<username>', methods=['POST'])
@cross_origin()
def processDonation(username):
    getDonation(username)


@app.route('/api/user/<username>', methods=['GET'])
@cross_origin()
def getUserData(username):
    data = myDB.getUserData(username)[0]
    print(data)
    return data


@app.route('/api/organization/<username>', methods=['GET'])
@cross_origin()
def getOrganizationData(username):
    data = myDB.getCharityData(username)[0]
    data['subscribers'] = myDB.getSubCount(data['charity_name'])
    return data


@app.route('/api/organizationUpdateDescription', methods=['POST'])
@cross_origin()
def updateDescription():
    data = request.get_json()
    myDB.updateCharityDescription(data['username'], data['newDescription'])
    return {"status": True}


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


@app.route('/api/userOrganizations/<username>', methods=['GET'])
@cross_origin()
def getUserOrganizations(username):
    results = myDB.getUserCharity(username)[0]['charity_id_percent']
    if results is None:
        return {'subscriptions': []}
    else:
        return {'subscriptions': list(json.loads(results).keys())}


@app.route('/api/allOrganizations', methods=['GET'])
@cross_origin()
def getCharities():
    data = myDB.getAllCharities()
    count = 1
    template = {}
    for entry in data:
        entry['description'] = myDB.getCharityData(
            entry['charity_name'])[0]['description']
        entry['total_received'] = myDB.getCharityData(
            entry['charity_name'])[0]['total_received']
        entry['subcriptions'] = myDB.getSubCount(entry['charity_name'])

    for entry in data:
        template[str(count)] = entry
        count += 1

    print(template)
    return template


if __name__ == '__main__':
    app.run(debug=True)
