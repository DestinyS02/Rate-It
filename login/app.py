from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_session import Session
import hashlib

app = Flask(__name__)

# Configuration
app.secret_key = 'your_secret_key_here'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
CORS(app, supports_credentials=True)

# Simulated user database
USER_DATABASE = {
    'user1@wachrayk.com': hashlib.sha256('password123'.encode()).hexdigest(),
    'user2@wachrayk.com': hashlib.sha256('password123'.encode()).hexdigest()
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    remember_me = data.get('rememberMe', False)

    # Validate input
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Hash password and verify credentials
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if USER_DATABASE.get(email) == hashed_password:
        session['user'] = email
        if remember_me:
            session.permanent = True  # Makes the session persistent
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully'})

@app.route('/api/check-session', methods=['GET'])
def check_session():
    user = session.get('user')
    if user:
        return jsonify({'loggedIn': True, 'user': user})
    else:
        return jsonify({'loggedIn': False}), 401

if __name__ == '__main__':
    app.run(debug=True)
