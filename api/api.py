from flask import Flask, request
from flask_cors import CORS, cross_origin
from database import DB

app = Flask(__name__)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

myDB = DB()
myDB.dropTable("user_accounts")
myDB.dropTable("charity_accounts")
myDB.createUserTable()
myDB.createCharitiesTable()
myDB.addCharity('BLM', 'password')
myDB.addUser('Mel', 'password')
myDB.addUser('Kai', 'password')
myDB.updateUserCharities('Kai', {'BML': 50, 'ABC': 50})
myDB.getAllCharities()

# Note id is username for all of the route functions


@app.route('/api/user/<username>', methods=['GET'])
def getUserData(id):
    return {
        myDB.getUserData(username)
    }


@app.route('/api/organization/<username>', methods=['GET'])
def getOrganizationData(id):
    return {
        myDB.getCharityData(username)
    }


@app.route('/api/registerUser', methods=['POST'])
@cross_origin()
def createUser():
    data = request.get_json()
    return {"status":myDB.addUser(data['firstName'], data['lastName'], data['username'], data['password'])}

@app.route('/api/registerOrganization', methods=['POST', 'GET'])
def createOrganization(charity_name, password):
    data = request.get_json()
    return {"status":myDB.addCharity(data['organizationName'], data['username'], data['password'])}


if __name__ == '__main__':
    app.run(debug=True)
