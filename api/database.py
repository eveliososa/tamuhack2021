import json
import mysql.connector
# from flask import Flask
# from flaskext.mysql import MySQL


class DB:
    def __init__(self):
        # initialize connection to Cloud MySQL server
        # app.config['MYSQL_HOST'] = '34.122.158.6'
        # app.config['MYSQL_USER'] = 'root'
        # app.config['MYSQL_PASSWORD'] = 'tamuhack2021'
        # app.config['MYSQL_DB'] = 'tamuhack'
        # self.mysql = MySQL()
        # self.mysql.init_app(app)
        # self.mycursor = self.mysql.get_db().cursor()
        self.mydb = mysql.connector.connect(
            host="34.122.158.6", user="root", password="tamuhack2021")
        self.mycursor = self.mydb.cursor()
        self.mycursor.execute('USE tamuhack;')

    def commitDB(self):
        self.mydb.commit()

    def dropTable(self, table_name):
        self.mycursor.execute("DROP TABLE IF EXISTS " + str(table_name) + ";")
        self.commitDB()

    def createCharitiesTable(self):
        command = ["CREATE TABLE IF NOT EXISTS charity_accounts ("
                   "charity_id INT NOT NULL, ",
                   "charity_name VARCHAR(255) NOT NULL, ",
                   "password VARCHAR(255), ",
                   "bank_account INT NOT NULL, ",
                   "current_total INT NOT NULL",
                   ");"]
        self.mycursor.execute("".join(command))
        self.commitDB()

    def addCharity(self, charity_id, charity_name, password, bank_account):
        command = ["INSERT INTO charity_accounts (",
                   "charity_id, ",
                   "charity_name, ",
                   "password, ",
                   "bank_account, ",
                   "current_total",
                   ") VALUES (" + str(charity_id) + ", ",
                   "'" + str(charity_name) + "', ",
                   "'" + str(password) + "', ",
                   str(bank_account) + ", ",
                   "0",
                   ");"]
        self.mycursor.execute("".join(command))
        self.commitDB()

    def createUserTable(self):
        # create user_accounts table if not already in database
        command = ["CREATE TABLE IF NOT EXISTS user_accounts ("
                   "user_id INT NOT NULL, ",
                   "username VARCHAR(255) NOT NULL, ",
                   "password VARCHAR(255) NOT NULL, ",
                   "bank_account INT NOT NULL, ",
                   "charity_id INT, ",
                   "charity_percentage TINYINT, ",
                   "current_total INT NOT NULL, ",
                   "goal INT",
                   ");"]
        self.mycursor.execute("".join(command))
        self.commitDB()

    def addUser(self, user_id, username, password, bank_account):
        command = ["INSERT INTO user_accounts (",
                   "user_id, ",
                   "username, ",
                   "password, ",
                   "bank_account, ",
                   "current_total ",
                   ") VALUES (" + str(user_id) + ", ",
                   "'" + str(username) + "', ",
                   "'" + str(password) + "', ",
                   str(bank_account) + ", ",
                   "0",
                   ");"]
        self.mycursor.execute("".join(command))
        self.commitDB()

    def getBankInfo(self, user_id):
        command = "SELECT bank_account FROM user_accounts WHERE user_id=" + \
            str(user_id)+";"
        self.mycursor.execute(command)
        self.commitDB()

    def getBankInfo(self, charity_id):
        command = "SELECT bank_account FROM charity_acounts WHERE charity_id=" + \
            str(charity_id)+";"
        self.mycursor.execute(command)
        self.commitDB()

    def getGoal(self, user_id):
        command = "SELECT goal FROM user_accounts WHERE user_id="+str(user_id)";"
        self.mycursor.execute(command)
        self.commitDB()

    def getTotal(self, user_id):
        command = "SELECT current_total FROM user_accounts WHERE user_id="+str(user_id)";"
        self.mycursor.execute(command)
        self.commitDB()

    def getAllCharities(self):
        command = "SELECT charity_name FROM charity_accounts"
        self.mycursor.execute(command)
        self.commitDB()

    def allCharityPercent(self, user_id):
        command = "SELECT charity_percent FROM user_accounts WHERE user_id="+str(user_id)";"
        self.mycursor.execute(command)
        self.commitDB()
