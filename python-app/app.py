from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory store
items = [
    {"id": 1, "name": "AWS EC2 Instance", "status": "running"},
    {"id": 2, "name": "S3 Bucket", "status": "active"}
]

@app.route('/health')
def health():
    return jsonify({"status": "ok", "service": "python-api"})

@app.route('/')
def index():
    return jsonify({"message": "Welcome to Python API", "version": "1.0.0"})

@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify({"success": True, "data": items})

@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = next((i for i in items if i["id"] == item_id), None)
    if not item:
        return jsonify({"success": False, "message": "Item not found"}), 404
    return jsonify({"success": True, "data": item})

@app.route('/api/items', methods=['POST'])
def create_item():
    data = request.get_json()
    if not data or not data.get("name"):
        return jsonify({"success": False, "message": "name is required"}), 400
    item = {"id": len(items) + 1, "name": data["name"], "status": data.get("status", "active")}
    items.append(item)
    return jsonify({"success": True, "data": item}), 201

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
