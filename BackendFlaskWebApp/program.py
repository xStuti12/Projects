import psycopg2
import pandas as pd
from flask import Flask, request, jsonify

conn = psycopg2.connect(
    dbname='dvdRental',
    user='postgres',
    password='postgres',
    host='localhost',
    port=5433
)

app = Flask(__name__)

# CRUD Operations
def get_records(phrase):
    query = """
    SELECT f.film_id, f.title, f.description, f.release_year, f.length, c.name as category_name
    FROM film f
    LEFT JOIN film_category fc ON f.film_id = fc.film_id
    LEFT JOIN category c ON fc.category_id = c.category_id
    WHERE f.title LIKE %s
    LIMIT 10;
    """
    with conn.cursor() as cur:
        cur.execute(query, (f"%{phrase}%",))
        records = cur.fetchall()
        return records

def create_record(data):
    query = """
    INSERT INTO film (title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    RETURNING film_id;
    """
    with conn.cursor() as cur:
        cur.execute(query, (data['title'], data['description'], data['release_year'], data['language_id'], data['rental_duration'], data['rental_rate'], data['length'], data['replacement_cost'], data['rating']))
        conn.commit()
        return cur.fetchone()[0]

def update_record(film_id, data):
    query = """
    UPDATE film
    SET title = %s, description = %s, release_year = %s, language_id = %s, rental_duration = %s, rental_rate = %s, length = %s, replacement_cost = %s, rating = %s
    WHERE film_id = %s;
    """
    with conn.cursor() as cur:
        cur.execute(query, (data['title'], data['description'], data['release_year'], data['language_id'], data['rental_duration'], data['rental_rate'], data['length'], data['replacement_cost'], data['rating'], film_id))
        conn.commit()
        return cur.rowcount

def delete_record(film_id):
    query = """
    DELETE FROM film
    WHERE film_id = %s;
    """
    with conn.cursor() as cur:
        cur.execute(query, (film_id,))
        conn.commit()
        return cur.rowcount

# RESTful API Endpoints
@app.route('/api/records', methods=['GET'])
def fetch_records():
    phrase = request.args.get('phrase', default='', type=str)
    try:
        records = get_records(phrase)
        df = pd.DataFrame(records, columns=['film_id', 'title', 'description', 'release_year', 'length', 'category_name'])
        numeric_sums = df.select_dtypes(include='number').sum().reset_index()
        numeric_sums.columns = ['NazovStlpca', 'Suma']
        filename = 'exported_data.csv'
        numeric_sums.to_csv(filename, index=False)
        return jsonify({'status': 'success', 'file': filename}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/api/records', methods=['POST'])
def add_record():
    data = request.json
    try:
        film_id = create_record(data)
        return jsonify({'status': 'success', 'id': film_id}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/api/records/<int:film_id>', methods=['PUT'])
def modify_record(film_id):
    data = request.json
    try:
        rowcount = update_record(film_id, data)
        if rowcount > 0:
            return jsonify({'status': 'success'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'Record not found'}), 404
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/api/records/<int:film_id>', methods=['DELETE'])
def remove_record(film_id):
    try:
        rowcount = delete_record(film_id)
        if rowcount > 0:
            return jsonify({'status': 'success'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'Record not found'}), 404
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

# Run Flask app
if __name__ == '__main__':
    print("Starting Flask application...")
    app.run(host='0.0.0.0', port=5000, debug=True)
