# project/__init__.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from api.views import users_blueprint
from api.models import db, User

app = Flask(__name__)
app.debug = True
app.use_reloader = True
app.secret_key = "super secret key"

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./events.db'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()
    user = User.query.filter_by(is_active=True).first()
    if user:
        user.is_active = False
        db.session.add(user)
        db.session.commit()

# 运行跨域
CORS(app)

app.register_blueprint(users_blueprint)


if __name__ == "__main__":
    # run backend server on http://localhost:5000/
    app.run(host = 'localhost',port=5001, debug=True)