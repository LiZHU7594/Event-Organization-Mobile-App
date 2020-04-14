from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

collections = db.Table('collections',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'))
)

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    event_created = db.relationship('Event',backref='User')
    event_participated = db.relationship('Event',secondary=collections,
    	backref=db.backref('users',lazy='dynamic'),lazy='dynamic')
    is_active = db.Column(db.Boolean, nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.is_active = False

class Event(db.Model):
    __tablename__ = "events"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    place = db.Column(db.String(128), nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    category = db.Column(db.String(128), nullable=False)
    detail = db.Column(db.String(1000))
    is_active = db.Column(db.Boolean, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    participator_id = db.relationship('User',secondary=collections,
    	backref=db.backref('events',lazy='dynamic'),lazy='dynamic')

    def __init__(self, place, name, time, category, creator_id, detail):
        self.place = place
        self.name = name
        self.time = time
        self.category = category
        self.creator_id = creator_id
        self.detail = detail
        self.is_active = True
