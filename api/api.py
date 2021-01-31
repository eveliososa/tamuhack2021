from flask import Flask, request
from flask_cors import CORS, cross_origin
from database import DB
import json

app = Flask(__name__)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

myDB = DB()
# myDB.dropTable("user_accounts")
# myDB.dropTable("charity_accounts")
myDB.createUserTable()
myDB.createCharitiesTable()

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
    return {"status":True}


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

@app.route('/api/allOrganizations', methods=['GET'])
@cross_origin()
def getCharities():
    data = myDB.getAllCharities()[0]
    print(data)
    return data

if __name__ == '__main__':
    app.run(debug=True)
