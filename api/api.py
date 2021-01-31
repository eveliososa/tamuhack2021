from flask import Flask
from database import DB

app = Flask(__name__)
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


@app.route('/api/user/<id>', methods=['GET'])
def getUserData(id):
    return {
        myDB.getUserData(id)
    }


@app.route('/api/organization/<id>', methods=['GET'])
def getOrganizationData(id):
    return {
        myDB.getCharityData(id)
    }


@app.route('/api/registerUser', methods=['POST', 'GET'])
def createUser(username, password):
    return {
        myDB.addUser(username, password)
    }


@app.route('/api/registerOrganization', methods=['POST', 'GET'])
def createOrganization(charity_name, password):
    return {
        myDB.addCharity(charity_name, password)
    }


if __name__ == '__main__':
    app.run(debug=True)
