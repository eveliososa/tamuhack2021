import mysql.connector

# initialize connection to Cloud MySQL server
mydb = mysql.connector.connect(
    host="34.122.158.6", user="root", password="tamuhack2021")
mycursor = mydb.cursor()

# select mysql databse
mycursor.execute("USE tamuhack;")


def createUser(user_id, username, bank_account, charity_id=None, charity_percentage=None, current_total=0, goal=None):
    # create user_accounts table if not already in database
    command = ["CREATE TABLE IF NOT EXISTS user_accounts ("
               "user_id INT NOT NULL,",
               "username VARCHAR(255) NOT NULL"
               "bank_account INT NOT NULL,",
               "charity_id VARCHAR(255),",
               "charity_percentage TINYINT,",
               "current_total INT NOT NULL,",
               "goal INT",
               ");"]
    mycursor.execute("".join(command))
    insert_command = ["INSERT INTO user_accounts (",
                      "user_id, username, ",
                      "bank_account, charity_id, ",
                      "charity_percentage, current_total, ",
                      "goal) VALUES (" + str(user_id) + ", ",
                      str(username) + ", ",
                      str(bank_account) + ", ",
                      str()
                      ");"]
    mycursor.execute()


a = 4
com = "SELECT * FROM user_accounts where user_id is " + str(a) + ";"
mycursor.execute(com)

for i in mycursor:
    print(i)
