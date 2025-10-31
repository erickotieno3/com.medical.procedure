from flask import Flask, jsonify

app = Flask(__name__)

# ✅ Simple test route
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "Python backend is working!"})

if __name__ == "__main__":
    # Run on all network interfaces and port 5000
    app.run(host="0.0.0.0", port=5000)
