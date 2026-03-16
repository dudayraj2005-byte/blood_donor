from flask import Flask,request,jsonify
import sqlite3
from flask_cors import CORS

app=Flask(__name__)
CORS(app)


@app.route("/register",methods=["POST"])
def register():

    data=request.json

    conn=sqlite3.connect("bloodconnect.db")
    cur=conn.cursor()

    cur.execute("INSERT INTO donors(name,blood_group,city,phone) VALUES(?,?,?,?)",
                (data["name"],data["blood_group"],data["city"],data["phone"]))

    conn.commit()
    conn.close()

    return jsonify({"message":"Donor registered"})


@app.route("/login",methods=["POST"])
def login():

    data=request.json

    conn=sqlite3.connect("bloodconnect.db")
    cur=conn.cursor()

    cur.execute("SELECT * FROM donors WHERE phone=?",(data["phone"],))

    user=cur.fetchone()

    conn.close()

    if user:
        return jsonify({"message":"Login successful"})
    else:
        return jsonify({"message":"User not found"})


@app.route("/search")
def search():

    blood=request.args.get("blood")
    city=request.args.get("city")

    conn=sqlite3.connect("bloodconnect.db")
    cur=conn.cursor()

    cur.execute("SELECT name,blood_group,city,phone FROM donors WHERE blood_group=? AND city=?",(blood,city))

    rows=cur.fetchall()

    conn.close()

    donors=[]

    for r in rows:

        donors.append({
        "name":r[0],
        "blood_group":r[1],
        "city":r[2],
        "phone":r[3]
        })

    return jsonify(donors)


app.run(debug=True)
