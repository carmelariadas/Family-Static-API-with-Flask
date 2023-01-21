"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Jackson_member
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import json 
 
api = Blueprint('api', __name__)


########### MOSTRAR, CREAR Y BORRAR USERS
@api.route('/users', methods=['GET'])
def get_users():
 
    users = User.query.all()
    userlist = []
    for user in users:
        userlist.append(user.serialize())
 

    return jsonify(userlist), 200


# no funciona desde postman
@api.route('/users', methods=['POST'])
def add_user():
    # data = request.data
    # data = json.loads(data)
    data = request.json()
    new_user = User(
        email = data["email"],
        password = data["password"],
        is_active = data["is_active"]
    )
    db.session.add(new_user)
    db.session.commit()
    response_body = {
        "msg": "user añadido"
    }
    return jsonify(response_body), 200



# si funciona
@api.route('/users', methods=['DELETE'])
def delete_user():
    id_user = request.json.get("user_id", None)
    
    user = User.query.filter_by(id=id_user).first()
    print(user)
    
    db.session.delete(user)
    db.session.commit()
    response_body = {
            "msg": "user borrado"
        }
    return jsonify(response_body), 200


########### LOGIN USER

@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if  user == None:
        return jsonify({"msg": "usuario o password incorrecto"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200


########### MOSTRAR uno/todos, CREAR, MODIFICAR Y BORRAR MEMBERS (privado)
@api.route('/members', methods=['GET'])
@jwt_required()
def get_members():

    members = Jackson_member.query.all()
    members_list = []
    for member in members:
        members_list.append(member.serialize())

    return jsonify(members_list), 200


@api.route('/members/<int:id>', methods=['GET'])
@jwt_required()
def get_member(id):

    member = Jackson_member.query.filter_by(id=id).first()
    member = member.serialize()
    return jsonify(member), 200

# falla el fetch "error cors captura 093"
@api.route('/add_member', methods=['POST'])
@jwt_required()
def add_member():
    data = request.data
    data = json.loads(data)
    # data = request.get_json(force=True)
    new_member = Jackson_member(
        first_name = data["first_name"],
        last_name = data["last_name"],
        age = data["age"],
    )
    db.session.add(new_member)
    db.session.commit()

    response_body = {"msg" : "member added!!"}
    return jsonify(response_body), 200



# @api.route('/modify_member/<int:id>', methods=['PUT'])
# @jwt_required()
# def modify_member(id):
#     data = request.data
#     data = json.loads(data)
    
#     member_to_modify = Jackson_member.query.filter_by(id=id).one()
#     member_to_modify.first_name = data["first_name"],
#     member_to_modify.last_name = data["last_name"],
#     member_to_modify.age = data["age"]
#     member_to_modify.verified = True
    
#     db.session.commit()

#     response_body = {"msg" : "member modify"}
#     return jsonify(response_body), 200


@api.route('/members/<int:id>', methods=['PUT'])
@jwt_required()
def modify_member(id):
    data = request.data
    data = json.loads(data)
    
    member_to_modify = Jackson_member.query.filter_by(id=id).one()
    member_to_modify.first_name = data["first_name"],
    member_to_modify.last_name = data["last_name"],
    member_to_modify.age = data["age"]
    member_to_modify.verified = True
    
    db.session.commit()

    response_body = {"msg" : "member modify"}
    return jsonify(response_body), 200



@api.route('/delete_member/<first_name_member>', methods=['DELETE'])
@jwt_required()
def delete_member(first_name_member):

    member_to_delete = Jackson_member.query.filter_by(first_name=first_name_member).first()
    
    db.session.delete(member_to_delete)
    db.session.commit()
    response_body = {
            "msg": "member borrado"
        }
    return jsonify(response_body), 200


