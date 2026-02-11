from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_routes
from routes.profile_routes import profile_routes
app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_routes)
app.register_blueprint(profile_routes)

@app.route("/")
def home():
    return "Backend running successfully!"

if __name__ == "__main__":
    app.run(debug=True)
