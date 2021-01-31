import json
import mysql.connector


class DB:
    def __init__(self):
        # IP Adress must be added to Google Cloud Platform in order to access
        self.mydb = mysql.connector.connect(
            host="34.122.158.6", user="root", password="tamuhack2021")
        self.mycursor = self.mydb.cursor(dictionary=True, buffered=True)
        self.mycursor.execute('USE tamuhack;')

    def commitDB(self):
        self.mydb.commit()

    def dropTable(self, table_name):
        self.mycursor.execute("DROP TABLE IF EXISTS " + str(table_name) + ";")
        self.commitDB()

    def createUserTable(self):
        # create user_accounts table if not already in database
        command = ["CREATE TABLE IF NOT EXISTS user_accounts ("
                   "user_id INT NOT NULL AUTO_INCREMENT, ",
                   "first_name VARCHAR(255) NOT NULL, ",
                   "last_name VARCHAR(255) NOT NULL, ",
                   "username VARCHAR(255) NOT NULL, ",
                   "password VARCHAR(255) NOT NULL, ",
                   "bank_account INT, ",
                   "charity_id_percent JSON, ",
                   "current_total INT NOT NULL, ",
                   "goal INT, ",
                   "PRIMARY KEY (user_id)"
                   ");"]
        self.mycursor.execute("".join(command))
        self.commitDB()

    def createCharitiesTable(self):
        command = ["CREATE TABLE IF NOT EXISTS charity_accounts ("
                   "charity_id INT NOT NULL AUTO_INCREMENT, ",
                   "charity_name VARCHAR(255) NOT NULL, ",
                   "username VARCHAR(255) NOT NULL, ",
                   "password VARCHAR(255) NOT NULL, ",
                   "bank_account INT, ",
                   "current_total INT NOT NULL, ",
                   "description VARCHAR(8000), ",
                   "total_received INT NOT NULL, ",
                   "PRIMARY KEY (charity_id)"
                   ");"]
        self.mycursor.execute("".join(command))
        self.commitDB()

    def getUserData(self, username):
        self.mycursor.execute(
            "SELECT * FROM user_accounts WHERE username='" + str(username) + "';")
        self.commitDB()

    def getCharityData(self, username):
        self.mycursor.execute(
            "SELECT * FROM charity_accounts WHERE username='" + str(username) + "';")
        self.commitDB()

    def addCharity(self, charity_name, username, password):
        self.mycursor.execute(
            "SELECT username from charity_accounts WHERE username='" + str(username) + "';")

        if self.mycursor.rowcount == 0:
            command = ["INSERT INTO charity_accounts (",
                       "charity_name, ",
                       "username, ",
                       "password, ",
                       "current_total, ",
                       "total_received, ",
                       ") VALUES (",
                       "'" + str(charity_name) + "', ",
                       "'" + str(username) + "', ",
                       "'" + str(password) + "', ",
                       "0, ",
                       "0"
                       ");"]
            self.mycursor.execute("".join(command))
            self.commitDB()
            return True
        else:
            return False

    def addUser(self, firstname, lastname, username, password):
        # Checks to see if user already in database
        self.mycursor.execute(
            "SELECT username from user_accounts WHERE username='" + str(username) + "';")

        # If not inserts into database and returns True
        if self.mycursor.rowcount == 0:
            command = ["INSERT INTO user_accounts (",
                       "first_name, ",
                       "last_name, ",
                       "username, ",
                       "password, ",
                       "current_total ",
                       ") VALUES (",
                       "'" + str(firstname) + "', ",
                       "'" + str(lastname) + "', ",
                       "'" + str(username) + "', ",
                       "'" + str(password) + "', ",
                       "0",
                       ");"]
            self.mycursor.execute("".join(command))
            self.commitDB()
            return True
        else:
            return False

    def userInDB(self, username):
        self.mycursor.execut("SELECT * FROM user_accounts WHERE username='" +
                             str(username) + "';")
        if self.mycursor.rowcount > 0:
            return True
        else:
            return False

    def charityInDB(self, username):
        self.mycursor.execut("SELECT * FROM charity_accounts WHERE username='" +
                             str(username) + "';")
        if self.mycursor.rowcount > 0:
            return True
        else:
            return False

    def validateCharityLogin(self, username, password):
        self.mycursor.execut("SELECT * FROM charity_accounts WHERE username='" +
                             str(username) + "' AND password='" + str(password) + "';")
        if self.mycursor.rowcount > 0:
            return True
        else:
            return False

    def validateUserLogin(self, username, password):
        self.mycursor.execut("SELECT * FROM user_accounts WHERE username='" +
                             str(username) + "' AND password='" + str(password) + "';")
        if self.mycursor.rowcount > 0:
            return True
        else:
            return False

    def updateUserCharities(self, username, charity_json):
        self.mycursor.execute("UPDATE user_accounts SET charity_id_percent = '"
                              + json.dumps(charity_json) + "' WHERE username='" + str(username) + "';")
        self.commitDB()

    def updateCharityDescription(self, username, description):
        self.mycursor.execute("UPDATE charity_accounts SET description='" +
                              str(description) + "' WHERE username='" + str(username) + "';")
        self.commitDB()

    def updateCharityTotalReceived(self, username, total_received):
        self.mycursor.execute("UPDATE user_accounts SET total_received ="
                              + str(total_received) + " WHERE username='" + str(username) + "';")
        self.commitDB()

    def updateUserTotal(self, username, current_total):
        self.mycursor.execute("UPDATE user_accounts SET current_total ="
                              + str(current_total) + " WHERE username='" + str(username) + "';")
        self.commitDB()

    def updateUserGoal(self, username, goal):
        self.mycursor.execute("UPDATE user_accounts SET goal ="
                              + str(goal) + " WHERE username='" + str(username) + "';")
        self.commitDB()

    def updateUserPassword(self, username, password):
        self.mycursor.execute("UPDATE user_accounts SET password ='"
                              + str(password) + "' WHERE username='" + str(username) + "';")
        self.commitDB()

    def updateUserBank(self, username, bank_account):
        self.mycursor.execute("UPDATE user_accounts SET bank_account ="
                              + str(bank_account) + " WHERE username='" + str(username) + "';")
        self.commitDB()

    def updateCharityPassword(self, username, password):
        self.mycursor.execute("UPDATE charity_accounts SET password ='"
                              + str(password) + "' WHERE username='" + str(username) + "';")
        self.commitDB()

    def updateCharityBank(self, username, bank_account):
        self.mycursor.execute("UPDATE charity_accounts SET bank_account ="
                              + str(bank_account) + " WHERE username='" + str(username) + "';")
        self.commitDB()

    def updateCharTotal(self, username, current_total):
        self.mycursor.execute("UPDATE charity_accounts SET current_total ="
                              + str(current_total) + " WHERE username='" + str(username) + "';")
        self.commitDB()

    def getUserBank(self, username):
        command = "SELECT bank_account FROM user_accounts WHERE username='" + \
            str(username) + "';"
        self.mycursor.execute(command)
        result = self.mycursor.fetchall()
        self.commitDB()
        return json.dumps(result)

    def getCharityBank(self, username):
        command = "SELECT bank_account FROM charity_accounts WHERE username='" + \
            str(username) + "';"
        self.mycursor.execute(command)
        result = self.mycursor.fetchall()
        self.commitDB()
        return json.dumps(result)

    def getUserGoal(self, username):
        command = "SELECT goal FROM user_accounts WHERE username='" + \
            str(username) + "';"
        self.mycursor.execute(command)
        result = self.mycursor.fetchall()
        self.commitDB()
        return json.dumps(result)

    def getUserTotal(self, username):
        command = "SELECT current_total FROM user_accounts WHERE username='" + \
            str(username) + "';"
        self.mycursor.execute(command)
        result = self.mycursor.fetchall()
        self.commitDB()
        return json.dumps(result)

    def getCharityTotal(self, username):
        command = "SELECT current_total FROM charity_accounts WHERE username='" + \
            str(username) + "';"
        self.mycursor.execute(command)
        result = self.mycursor.fetchall()
        self.commitDB()
        return json.dumps(result)

    def getAllCharities(self):
        command = "SELECT charity_name FROM charity_accounts;"
        self.mycursor.execute(command)
        result = self.mycursor.fetchall()
        self.commitDB()
        return json.dumps(result)

    def removeUser(self, username):
        self.mycursor.execute(
            "DELETE FROM user_accounts WHERE username='" + str(username) + "';")
        self.commitDB()

    def removeCharity(self, username):
        self.mycursor.execute(
            "DELETE FROM charity_accounts WHERE username='" + str(username) + "';")
        self.commitDB()

    def getSubCount(self, charity_name):
        self.mycursor.execute("SELECT charity_id_percent FROM user_accounts;")
        result = self.mycursor.fetchall()
        count = 0
        for item in result:
            for key in json.loads(item['charity_id_percent']).keys():
                if key == str(charity_name):
                    count += 1
        return count
