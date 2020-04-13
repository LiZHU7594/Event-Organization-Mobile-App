from api.models import db, User, Event
from sqlalchemy import or_

session = db.session

def look_for_user_by_username(username):
    user = User.query.filter_by(username=username).first()
    if user:
        return user
    else:
        return None

def look_for_user_by_id(id):
    user = User.query.filter_by(id=id).first()
    if user:
        return user
    else:
        return None

def look_for_user_by_email(email):
    user = User.query.filter_by(email=email).first()
    if user:
        return user
    else:
        return None

def look_for_user_by_username_and_password(username, password):
    user = User.query.filter_by(username=username, password=password).first()
    if user:
        return user
    else:
        return None

def create_user(username, email, password):
    user = User(username=username, email=email, password=password)
    session.add(user)
    session.commit()
    return user

def set_user_active(username):
    user = User.query.filter_by(username=username).first()
    user.is_active = True
    session.add(user)
    session.commit()
    return user

def look_for_active_user():
    user = User.query.filter_by(is_active=True).first()
    if user:
        return user
    return None

def check_active_user():
    user = User.query.filter_by(is_active=True).first()
    if user:
        return True
    return None


def check_active_user_id():
    user = User.query.filter_by(is_active=True).first()
    if user:
        return user.id
    return None

def look_for_event_by_name(name):
    event = Event.query.filter_by(name=name).first()
    if event:
        return event
    else:
        return None

def create_event(place, name, time, category, creator_id, detail, page, now_time):
    events = Event.query.all()
    event = Event(place=place, name=name, time=time, category=category, creator_id=creator_id, detail=detail)
    session.add(event)
    session.commit()
    if page == 'event':
        unexpired_events = Event.query.filter(Event.time >= now_time).order_by(Event.time)
        events = Event.query.filter_by(is_active=True).all()
        events = list(set(events).intersection(set(unexpired_events)))
    if page == 'creation':
        active_user_id = check_active_user_id()
        events = Event.query.filter_by(creator_id=active_user_id).order_by(Event.time)
    event_list = []
    for item in events:
        event_list.append(item.id)
    if event:
        return event_list
    else:
        return None

def search_and_filter(keyword, time_from, time_to, place, category, page, now_time):
    events = Event.query.all()
    if keyword:
        events = Event.query.filter(or_(Event.name.contains(keyword), Event.detail.contains(keyword))).order_by(Event.time)
    if time_from:
        events_from = Event.query.filter(Event.time >= time_from).order_by(Event.time)
        events = list(set(events).intersection(set(events_from)))
    if time_to:
        events_to = Event.query.filter(Event.time <= time_to).order_by(Event.time)
        events = list(set(events).intersection(set(events_to)))
    if category:
        events_category = Event.query.filter_by(category=category).order_by(Event.time)
        events = list(set(events).intersection(set(events_category)))
    if place:
        events_place = Event.query.filter_by(place=place).order_by(Event.time)
        events = list(set(events).intersection(set(events_place)))
    if page == 'event':
        unexpired_events = Event.query.filter(Event.time >= now_time).order_by(Event.time)
        events = list(set(events).intersection(set(unexpired_events)))
        active_events = Event.query.filter_by(is_active=True).order_by(Event.time)
        events = list(set(events).intersection(set(active_events)))
    if page == 'participation':
        active_user_id = check_active_user_id()
        active_events = Event.query.filter_by(is_active=True).order_by(Event.time)
        event_participated = Event.query.filter(Event.participator_id.any(User.id == active_user_id)).order_by(Event.time)
        active_event_participated = list(set(active_events).intersection(set(event_participated)))
        events = list(set(events).intersection(set(active_event_participated)))
    if page == 'creation':
        active_user_id = check_active_user_id()
        event_created = Event.query.filter_by(creator_id=active_user_id).order_by(Event.time)
        events = list(set(events).intersection(set(event_created)))
    event_list = []
    for item in events:
        event_list.append(item.id)
    event_dic = {'event_list':event_list}
    return event_list

def search_and_filter_unavailable_participation(keyword, time_from, time_to, place, category):
    events = Event.query.all()
    if keyword:
        events = Event.query.filter(or_(Event.name.contains(keyword), Event.detail.contains(keyword))).order_by(Event.time)
    if time_from:
        events_from = Event.query.filter(Event.time >= time_from).order_by(Event.time)
        events = list(set(events).intersection(set(events_from)))
    if time_to:
        events_to = Event.query.filter(Event.time <= time_to).order_by(Event.time)
        events = list(set(events).intersection(set(events_to)))
    if category:
        events_category = Event.query.filter_by(category=category).order_by(Event.time)
        events = list(set(events).intersection(set(events_category)))
    if place:
        events_place = Event.query.filter_by(place=place).order_by(Event.time)
        events = list(set(events).intersection(set(events_place)))
    active_user_id = check_active_user_id()
    unavailable_events = Event.query.filter_by(is_active=False).order_by(Event.time)
    event_participated = Event.query.filter(Event.participator_id.any(User.id == active_user_id)).order_by(Event.time)
    unavailable_event_participated = list(set(unavailable_events).intersection(set(event_participated)))
    events = list(set(events).intersection(set(unavailable_event_participated)))
    event_list = []
    for item in events:
        event_list.append(item.id)
    event_dic = {'unavailable_event_list':event_list}
    return event_list


def user_logout():
    user = User.query.filter_by(is_active=True).first()
    if user:
        user.is_active = False
        session.add(user)
        session.commit()
        return user
    else:
        return None

def get_unexpired_event_list(now_time):
    unexpired_events = Event.query.filter(Event.time >= now_time).order_by(Event.time)
    events = Event.query.filter_by(is_active=True)
    events = list(set(events).intersection(set(unexpired_events)))
    event_list = []
    for item in events:
        event_list.append(item.id)
    return event_list

def get_event_detail(eventList):
    events = Event.query.filter(Event.id.in_(eventList)).order_by(Event.time)
    event_list = []
    active_user_id = check_active_user_id()
    for item in events:
        item_dic={}
        item_dic['id'] = item.id
        item_dic['name'] = item.name
        item_dic['place'] = item.place
        item_dic['time'] = item.time
        item_dic['category'] = item.category
        item_dic['detail'] = item.detail
        item_dic['is_active'] = item.is_active
        item_dic['connect_status'] = check_user_event_connect_status(item.id,active_user_id)
        event_list.append(item_dic)
    return event_list

def connet_event_user(event_id,active_user_id):
    user = User.query.filter_by(id=active_user_id).first()
    event = Event.query.filter_by(id=event_id).first()
    event.participator_id = [user]
    session.add(event)
    session.commit()
    return event

def disconnet_event_user(event_id,active_user_id):
    user = User.query.filter_by(id=active_user_id).first()
    event = Event.query.filter_by(id=event_id).first()
    for item in [user]:
        event.participator_id.remove(item)
    session.commit()
    return event

def check_user_event_connect_status(event_id,active_user_id):
    event = Event.query.filter_by(id=event_id).first()
    user = User.query.filter_by(id=active_user_id).first()
    if user in event.participator_id:
        return True
    else:
        return False

def see_participation_list():
    active_user_id = check_active_user_id()
    active_events = Event.query.filter_by(is_active=True).order_by(Event.time)
    event_participated = Event.query.filter(Event.participator_id.any(User.id == active_user_id)).order_by(Event.time)
    active_event_participated = list(set(active_events).intersection(set(event_participated)))
    event_list = []
    for item in active_event_participated:
        event_list.append(item.id)
    return event_list

def see_creation_list():
    active_user_id = check_active_user_id()
    events_created = Event.query.filter_by(creator_id=active_user_id).order_by(Event.time)
    event_list = []
    for item in events_created:
        event_list.append(item.id)
    return event_list

# def check_event_active_status(event_id):
#     event = Event.query.filter_by(id=event_id).first()
#     active_status = event.is_active
#     return active_status

def open_event(event_id):
    event = Event.query.filter_by(id=event_id).first()
    if event:
        event.is_active = True
        session.add(event)
        session.commit()
        return event.id
    else:
        return None

def close_event(event_id):
    event = Event.query.filter_by(id=event_id).first()
    if event:
        event.is_active = False
        session.add(event)
        session.commit()
        return event.id
    else:
        return None

def see_participator_list(event_id):   
    participators = User.query.filter(User.event_participated.any(Event.id == event_id)).all()
    participator_list = []
    for item in participators:
        item_dic = {}
        item_dic['id'] = item.id
        item_dic['name'] = item.username
        participator_list.append(item_dic)
    return participator_list

def see_unavailable_participation_list():
    active_user_id = check_active_user_id()
    unavailabl_events = Event.query.filter_by(is_active=False).order_by(Event.time)
    event_participated = Event.query.filter(Event.participator_id.any(User.id == active_user_id)).order_by(Event.time)
    unavailabl_event_participated = list(set(unavailabl_events).intersection(set(event_participated)))
    event_list = []
    for item in unavailabl_event_participated:
        event_list.append(item.id)
    return event_list
