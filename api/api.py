from flask import Flask
from database import DB

app = Flask(__name__)
myDB = DB()
myDB.dropTable("user_accounts")
myDB.dropTable("charity_accounts")
myDB.createUserTable()
myDB.createCharitiesTable()
myDB.addCharity(0, 'BLM', 'password', 2)
myDB.addUser(1, 'Mel', 'password', 3)
myDB.addUser(2, 'Kai', 'password', 2)
myDB.getAllCharities()


@app.route('/api/user/<id>', methods=['GET'])
def getUserData(id):
    return {
        'name': 'Hello World'
    }

@app.route('/api/organization/<id>', methods=['GET'])
def getOrganizationData(id):
    return {
        'name': 'Hello World'
    }

@app.route('/api/registerUser', methods=['POST', 'GET'])
def createUser():
    return {
        'name': 'Hello World'
    }

@app.route('/api/registerOrganization', methods=['POST','GET'])
def createOrganization():
    return {
        'name': 'Hello World'
    }


if __name__ == '__main__':
    app.run(debug=True)
