# project/api/views.py
from flask import Blueprint, jsonify, request, render_template
from sqlalchemy import exc
from api.models import User,db
from api.services import *
import json
from datetime import datetime

users_blueprint = Blueprint('users', __name__, template_folder='./templates')

@users_blueprint.route('/login', methods=["POST"])
def login():
    data = request.json
    username = data["username"]
    password = data['password']
    user = look_for_user_by_username_and_password(username, password)
    if user:
        set_user_active(username)
        response_object = {
            'status': 'login success',
            'data': {
                'userid': user.id,
            }
        }
        code = 200
    else:
        response_object = {
            'status': 'login fail',
            'message': 'cant find user'
        }
    code = 200
    return jsonify(response_object), code

@users_blueprint.route('/register', methods=['GET','POST'])
def register():
    data = request.json
    username = data["username"]
    if look_for_user_by_username(username):
        response_object = {
            'status': 'register fail',
            'message': 'repeated username'
        }
        code = 200
        return jsonify(response_object), code
    email = data["email"]
    if look_for_user_by_email(email):
        response_object = {
            'status': 'register fail',
            'message': 'repeated email'
        }
        code = 200
        return jsonify(response_object), code
    password = data["password"]
    user = create_user(username, email, password)
    set_user_active(username)
    if user:
        set_user_active(username)
        response_object = {
            'status': 'register success',
            'data': {
                'userid': user.id,
            }
        }
        code = 200
    else:
        response_object = {
            'status': 'register fail',
            'message': 'cant create user'
        }
        code = 200
    return jsonify(response_object), code


@users_blueprint.route('/active_status', methods=['GET'])
def active_status():
    active_status = check_active_user()
    active_user_id = check_active_user_id()
    response_object = {
        'data':{
            'active_status': active_status,
            'active_user_id': active_user_id
        },
        'status': 'success',
        'message': 'get active status info success'
    }
    code = 200
    return jsonify(response_object), code

@users_blueprint.route('/events', methods=['GET'])
def events():
    now_time = datetime.now()
    eventList = get_unexpired_event_list(now_time)
    eventNum = len(eventList)
    response_object = {
        'data':{
            'eventNum': eventNum,
            'eventList': eventList,
        },
        'status': 'success',
        'message': 'get event info success'
    }
    code = 200
    return jsonify(response_object), code

# event detail
@users_blueprint.route('/search_and_filter', methods=['POST'])
def event_search_and_filter():
    data = request.json
    keyword = None
    time_from = None
    time_to = None
    category = None
    place = None
    page = data["page"]
    if data["keyword"]:
        keyword = data["keyword"]
    if data["from"]:
        time_from = datetime.strptime(data["from"],'%Y-%m-%d')
    if data["to"]:
        time_to = datetime.strptime(data["to"],'%Y-%m-%d')
    if data["category"]:
        category = data["category"]
    if data["place"]:
        place = data["place"]
    if(page=="participation"):
        event_list = search_and_filter(keyword, time_from, time_to, place, category, page)
        unavailable_event_list = search_and_filter_unavailable_participation(keyword, time_from, time_to, place, category)
        response_object = {
            'data':{
                'event_list': event_list,
                'unavailable_event_list': unavailable_event_list,
            },
            'status': 'success',
            'message': 'search and filter success'
        }
        code = 200
    else:
        event_list = search_and_filter(keyword, time_from, time_to, place, category, page)
        response_object = {
            'data':{
                'event_list': event_list,
            },
            'status': 'success',
            'message': 'search and filter success'
        }
        code = 200
    return jsonify(response_object), code

@users_blueprint.route('/create', methods=['POST'])
def create():
    data = request.json
    name = data["name"]
    if look_for_event_by_name(name):
        response_object = {
            'status': 'create event fail',
            'message': 'repeated name'
        }
        code = 200
        return jsonify(response_object), code
    place = data["place"]
    time = datetime.strptime(data["time"],'%Y-%m-%d %H:%M')
    category = data["category"]
    detail = data["detail"]
    page = data["page"]
    current_user = look_for_active_user()
    if current_user:
        creator_id = current_user.id
    else:
        response_object = {
            'status': 'event creation fail',
            'message': 'cant find current user'
        }
        code = 200
        return jsonify(response_object), code
    now_time = datetime.now()
    event_list = create_event(place, name, time, category, creator_id, detail, page, now_time)
    if event_list:
        response_object = {
            'status': 'event creation success',
            'data': {
                'eventNum': len(event_list),
                'eventList': event_list,
            }
        }
        code = 200
    else:
        response_object = {
            'status': 'event creation fail',
            'message': 'cant create user'
        }
        code = 200
    return jsonify(response_object), code

@users_blueprint.route('/show_event', methods=['POST'])
def show():
    data = request.json
    eventList = data['eventList']
    eventDetailList = get_event_detail(eventList)
    if eventDetailList:
        response_object = {
            'status': 'get event detail info success',
            'data': {
                'eventDetailList': eventDetailList,
            }
        }
        code = 200
    else:
        response_object = {
            'status': 'get event detail info success',
            'data': {
                'eventDetailList': [],
            }
        }
        code = 200
    return jsonify(response_object), code

@users_blueprint.route('/join', methods=['POST'])
def join():
    data = request.json
    event_id = data['event_id']
    active_user_id = check_active_user_id()
    if active_user_id and event_id:
        if connet_event_user(event_id,active_user_id):
            participator_list = see_participator_list(event_id)
            response_object = {
                'status': 'connect user event sucessfully',
                'data': participator_list
            }
            code = 200
    else:
        response_object = {
            'status': 'connect user event failure',
            'message': 'cant find user or event',
        }
        code = 200
    return jsonify(response_object), code

@users_blueprint.route('/quit', methods=['POST'])
def quit():
    data = request.json
    event_id = data['event_id']
    active_user_id = check_active_user_id()
    if active_user_id and event_id:
        if disconnet_event_user(event_id,active_user_id):
            participator_list = see_participator_list(event_id)
            response_object = {
                'status': 'disconnect user event sucessfully',
                'data': participator_list
            }
            code = 200
    else:
        response_object = {
            'status': 'connect user event failure',
            'message': 'cant find user or event',
        }
        code = 200
    return jsonify(response_object), code

@users_blueprint.route("/logout", methods=['POST'])
def logout():
    user = user_logout()
    if user:
        response_object = {
            'status': 'logout success',
            'data': {
                'userid': user.id,
            }
        }
        code = 200
    else:
        response_object = {
            'status': 'logout fail',
            'message': 'already logout'
        }
        code = 200
    return jsonify(response_object), code

@users_blueprint.route('/check_connect_status', methods=['POST'])
def check_connect_status():
    data = request.json
    event_id = data['event_id']
    active_user_id = check_active_user_id()
    if active_user_id and event_id:
        if check_user_event_connect_status(event_id,active_user_id):
            
            response_object = {
                'data':{
                    'connect_status':True
                },
                'status': 'check sucessfully',
            }
            code = 200
        else:
            response_object = {
                'data':{
                    'connect_status':False
                },
                'status': 'check sucessfully',
            }
            code = 200
    else:
        response_object = {
            'status': 'connect user event failure',
            'message': 'cant find user or event',
        }
        code = 200
    return jsonify(response_object), code


@users_blueprint.route('/participation', methods=['GET'])
def participations():
    eventList = see_participation_list()
    unavailableParticipatorList = see_unavailable_participation_list()
    eventNum = len(eventList)
    response_object = {
        'data':{
            'eventNum': eventNum,
            'eventList': eventList,
            'eventListUnavailable': unavailableParticipatorList
        },
        'status': 'success',
        'message': 'get event info success'
    }
    code = 200
    return jsonify(response_object), code

@users_blueprint.route('/creation', methods=['GET'])
def creations():
    eventList = see_creation_list()
    eventNum = len(eventList)
    response_object = {
        'data':{
            'eventNum': eventNum,
            'eventList': eventList,
        },
        'status': 'success',
        'message': 'get event info success'
    }
    code = 200
    return jsonify(response_object), code

# @users_blueprint.route('/check_active_status', methods=['POST'])
# def check_active_status():
#     data = request.json
#     event_id = data['event_id']
#     if check_event_active_status(event_id):
#         response_object = {
#             'data':{
#                 'active_status':True
#             },
#             'status': 'check sucessfully',
#         }
#         code = 200
#     else:
#         response_object = {
#             'data':{
#                 'active_status':False
#             },
#             'status': 'check sucessfully',
#         }
#         code = 200
#     return jsonify(response_object), code

@users_blueprint.route('/open', methods=['POST'])
def open():
    data = request.json
    event_id = data['event_id']
    if open_event(event_id):
        response_object = {
            'status': 'activate event sucessfully',
        }
        code = 200
    else:
        response_object = {
            'status': 'activate user event failure',
            'message': 'cant find user or event',
        }
        code = 200
    return jsonify(response_object), code

@users_blueprint.route('/close', methods=['POST'])
def close():
    data = request.json
    event_id = data['event_id']
    if close_event(event_id):
        response_object = {
            'status': 'close event sucessfully',
        }
        code = 200
    else:
        response_object = {
            'status': 'close user event failure',
            'message': 'cant find user or event',
        }
        code = 200
    return jsonify(response_object), code

@users_blueprint.route('/see_participator', methods=['POST'])
def see_participator():
    data = request.json
    event_id = data['event_id']
    participator_list = see_participator_list(event_id)
    response_object = {
        'status': 'look for participator sucessfully',
        'data': participator_list
    }
    code = 200
    return jsonify(response_object), code