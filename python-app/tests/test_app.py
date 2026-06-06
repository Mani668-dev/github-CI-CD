import pytest
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as c:
        yield c

def test_health(client):
    res = client.get('/health')
    assert res.status_code == 200
    assert res.get_json()['status'] == 'ok'

def test_index(client):
    res = client.get('/')
    assert res.status_code == 200

def test_get_items(client):
    res = client.get('/api/items')
    assert res.status_code == 200
    assert isinstance(res.get_json()['data'], list)

def test_get_item(client):
    res = client.get('/api/items/1')
    assert res.status_code == 200
    assert res.get_json()['data']['id'] == 1

def test_get_item_not_found(client):
    res = client.get('/api/items/999')
    assert res.status_code == 404

def test_create_item(client):
    res = client.post('/api/items', json={"name": "Test Item"})
    assert res.status_code == 201
    assert res.get_json()['data']['name'] == 'Test Item'
