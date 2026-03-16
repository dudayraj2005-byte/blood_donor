from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = "bloodconnect.db"


# ================= DATABASE INIT =================

def init_db():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS donors(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        blood_group TEXT,
        city TEXT,
        phone TEXT,
        lat REAL,
        lng REAL
    )
    """)

    conn.commit()
    conn.close()

init_db()


# ================= REGISTER DONOR =================

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    cur.execute("""
    INSERT INTO donors(name,age,blood_group,city,phone,lat,lng)
    VALUES(?,?,?,?,?,?,?)
    """, (
        data["name"],
        data["age"],
        data["blood_group"],
        data["city"],
        data["phone"],
        data.get("lat",None),
        data.get("lng",None)
    ))

    conn.commit()
    conn.close()

    return jsonify({"message":"Donor registered"})


# ================= SEARCH DONORS =================

@app.route("/search")
def search():

    blood = request.args.get("blood")
    city = request.args.get("city")

    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    query = "SELECT name,blood_group,city,phone,lat,lng FROM donors WHERE 1=1"
    params = []

    if blood:
        query += " AND blood_group=?"
        params.append(blood)

    if city:
        query += " AND city LIKE ?"
        params.append("%"+city+"%")

    cur.execute(query,params)

    rows = cur.fetchall()

    donors = []

    for r in rows:

        donors.append({
            "name":r[0],
            "blood_group":r[1],
            "city":r[2],
            "phone":r[3],
            "lat":r[4],
            "lng":r[5]
        })

    conn.close()

    return jsonify(donors)


# ================= SERVER =================

if __name__ == "__main__":
    app.run(debug=True)
