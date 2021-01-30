import mysql.connector

mydb = mysql.connector.connect(
    host="34.122.158.6", user="root", password="tamuhack2021")

mycursor = mydb.cursor()
mycursor.execute("show databases")

for i in mycursor:
    print(i)
