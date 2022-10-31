#Name-Gaurav Kumar
#Student ID- 1148636
# from distutils.log import error
from flask import Flask,request,jsonify,json,make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import engine_from_config, false, text
from sqlalchemy.exc import IntegrityError
import json
from flask_cors import CORS

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost:3307/airline'
db = SQLAlchemy(app)
CORS(app)
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
# @app.after_request
# def add_headers(response):
#     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3001')
#     response.headers.add('Content-Type', 'application/json')
#     response.headers.add('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
#     response.headers.add('Access-Control-Allow-Headers', 'content-type, traceid, withcredentials')
#     response.status=200
#     return response

# @app.after_request
# def after_request_func(response):
#     origin = request.headers.get('Origin')
#     if request.method == 'OPTIONS':
#         response = make_response()
#         response.headers.add('Access-Control-Allow-Credentials', 'true')
#         response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
#         response.headers.add('Access-Control-Allow-Headers', 'x-csrf-token')
#         response.headers.add('Access-Control-Allow-Methods',
#                             'GET, POST, OPTIONS, PUT, PATCH, DELETE')
#         if origin:
#             response.headers.add('Access-Control-Allow-Origin', origin)
#             # 'http://localhost:3000'
#     else:
#         response.headers.add('Access-Control-Allow-Credentials', 'true')
#         if origin:
#             response.headers.add('Access-Control-Allow-Origin', origin)

#     return response

@app.route("/allFlights",methods=['GET'])
def passengerList():
    if request.method == "GET":
        sql = text("select * from flight join route ON flight.FlightNum = route.FlightNum join airport ON route.ArrCode = airport.AirportCode ")
        result = db.engine.execute(sql).fetchall()
        data = []
        for row in result:
            item={"FlightID":row["FlightID"],"flightNumber":row["FlightNum"],"weekNumber":row["WeekNum"],"FlightDate":str(row["FlightDate"]),"depTime":str(row["DepTime"]),"arrTime":str(row["ArrTime"]),"duration":str(row["Duration"]),"depEstAct":str(row["DepEstAct"]),"arrEstAct":str(row["ArrEstAct"]),"flightStatus":row["FlightStatus"],"aircraft":row["Aircraft"], "arival":row["AirportName"]}
            data.append(item)
        return jsonify(error=False,result=data)
    
@app.route("/passengerList",methods=['GET'])
def passengerList():
    if request.method == "GET":
        sql = text("select * from passenger")
        result = db.engine.execute(sql).fetchall()
        data = []
        for row in result:
            item = { "PassengerID":str(row["PassengerID"]), "FirstName":row["FirstName"],"LastName":row["LastName"], "EmailAddress":row["EmailAddress"], "PhoneNumber":str(row["PhoneNumber"]),"PassportNumber":str(row["PassportNumber"]) ,"DateOfBirth":str(row["DateOfBirth"])}
            data.append(item)
        return jsonify(error=False,result=data)
        
@app.route('/staffLogin',methods=['Post'])
def staff_login():
    if request.method=="POST":
        email = request.form['email']
        sql = text("select * from staff where EmailAddress = :email")
        result = db.engine.execute(sql, email=email)
        data = result.fetchall()
        # print(len(data))
        if(len(data)>0):
            return jsonify(message="Loging successfully!!",error=False,staff_id=str(data[0]["StaffID"])),200
        else:
            return jsonify(message="No User Found",error=True),401
        # email address
    # return jsonify(message="Loging successfully!!",error=False),200

@app.route('/passengerProfile/<passenger_id>',methods=['GET','PUT'])
def passengerProfile(passenger_id):
    if request.method == "GET":
        status = "Cancelled"
        sql = text("select * from passenger where PassengerID = :passenger_id ")
        result = db.engine.execute(sql,passenger_id=passenger_id,status=status).fetchall()
        print(result)
        data=[]
        for row in result:
            item = { "PassengerID":str(row["PassengerID"]), "FirstName":row["FirstName"],"LastName":row["LastName"], "EmailAddress":row["EmailAddress"], "PhoneNumber":str(row["PhoneNumber"]),"PassportNumber":str(row["PassportNumber"]) ,"DateOfBirth":str(row["DateOfBirth"])}
            data.append(item)
        return jsonify(error=False,result=data)
    if request.method == "PUT":
        return ""

@app.route('/airportName/<airport_code>',methods=['GET'])
def airportName(airport_code):
    if request.method == "GET":
        sql = text("select * from airport where AirportCode = :airport_code ")
        result = db.engine.execute(sql,airport_code=airport_code).fetchall()
        print(result)
        data=[]
        for row in result:
            item = { "AirportName":row["AirportName"], "AirportCode":row["AirportCode"] }
            data.append(item)
        return jsonify(error=False,result=data)
    
@app.route('/passengerFlights/<passenger_id>',methods=['GET'])
def passengerFlights(passenger_id):
    if request.method == "GET":
        status = "Cancelled"
        sql = text("select * from passengerflight JOIN flight ON passengerflight.FlightID = flight.FlightID where PassengerID = :passenger_id ")
        result = db.engine.execute(sql,passenger_id=passenger_id,status=status).fetchall()
        print(result)
        data=[]
        for row in result:
            item = { "FlightNum":row["FlightNum"], "FlightDate":str(row["FlightDate"]), "DepTime":str(row["DepTime"]), "ArrTime":str(row["ArrTime"]),"FlightStatus":row["FlightStatus"] ,"Aircraft":row["Aircraft"]}
            data.append(item)
        return jsonify(error=False,result=data)

@app.route('/userLogin',methods=['Post'])
def user_login():
    if request.method=="POST":
        email = request.form['email']
        sql = text("select * from passenger where EmailAddress = :email")
        result = db.engine.execute(sql, email=email)
        data = result.fetchall()
        print(data)
        if (len(data)>0):
            return jsonify(message="Loging successfully!!",error=False, passenger_id = data[0]['PassengerID']),200
        else:
            return jsonify(message="No User Found",error=True)
        # email address
    return jsonify(message="Invalid Request",error=True),400
       
@app.errorhandler(404)
def error_handle_404(_eror):
    return make_response(jsonify({"error":"Not Found"}),404)

@app.errorhandler(500)
def error_handle_500(_eror):
    return make_response(jsonify({"error":"Internal Server Error"}),500)

@app.errorhandler(401)
def error_handle_401(_eror):
    return make_response(jsonify({"error":"Unauthorized"}),401)

@app.route('/booking',methods=['GET','POST','DELETE'])
def booking():
    if request.method == "GET":
        passenger_id = request.form['passenger_id']
        sql_select = text('SELECT * from passengerflight JOIN flight ON passengerflight.FlightID = flight.FlightID where PassengerID = :passenger_id')
        data = db.engine.execute(sql_select, passenger_id=passenger_id)
        result = data.fetchall()
        data1 = []
        for row in result:
            item = { "FlightNum":row["FlightNum"], "FlightDate":str(row["FlightDate"]), "DepTime":str(row["DepTime"]), "ArrTime":str(row["ArrTime"]),"FlightStatus":row["FlightStatus"] ,"Aircraft":row["Aircraft"]}
            # item["FlightID"] = row["FlightID"]
            # item["FlightNum"] = row["FlightNum"]
            # item["FlightDate"] = row["FlightDate"]
            # item["DepTime"] = row["DepTime"]
            # item["ArrTime"] = row["ArrTime"]
            data1.append(item)
            
        print(data1)
        return jsonify({"error":False, "message":"successfully get all data", "data":data1})
        
    if request.method == "POST":
        flight_id = request.form['flight_id']
        passenger_id = request.form['passenger_id']
        sql = text('INSERT INTO passengerflight Values(:flight_id,:passenger_id)')
        result = db.engine.execute(sql, flight_id=flight_id, passenger_id=passenger_id)
        return jsonify(error=False ,message="Flight Booked Successfully!!"),200
    
    if request.method == "DELETE":
        flight_id = request.form['flight_id']
        passenger_id = request.form['passenger_id']
        sql_select = text('SELECT count(*) from passengerflight where FlightID = :flight_id AND PassengerID = :passenger_id')
        count = db.engine.execute(sql_select, flight_id=flight_id, passenger_id=passenger_id)
        flight_count = count.fetchall()
        print("count = ",flight_count[0][0])
        if flight_count[0][0] > 0:
            sql = text('DELETE FROM passengerflight WHERE 	FlightID = :flight_id AND PassengerID = :passenger_id')
            result = db.engine.execute(sql, flight_id=flight_id, passenger_id=passenger_id)
            print("result = ",result)
            return jsonify(error=False ,message="Flight Deleted Successfully!!"),200
        return jsonify(error=False ,message="No Booking Found"),200

@app.route('/allCities',methods=['GET','POST'])
def getCities():
    if request.method == "GET":
        sql = text("select AirportCode,AirportName from airport")
        result = db.engine.execute(sql).fetchall()
        print(result)
        data=[]
        for row in result:
            item={"AirportCode":row["AirportCode"],"AirportName":row["AirportName"]}
            data.append(item)
        return jsonify(error=False,result=data)

@app.route('/avalibleFlights/<airport>',methods=['GET','POST'])
def avalibleFlights(airport):
    if request.method == "GET":
        sql = text("select * from flight join route ON flight.FlightNum = route.FlightNum join airport ON route.ArrCode = airport.AirportCode  where DepCode = :airport ")
        result = db.engine.execute(sql,airport=airport).fetchall()
        print(result)
        data=[]
        for row in result:
            item={"FlightID":row["FlightID"],"flightNumber":row["FlightNum"],"weekNumber":row["WeekNum"],"FlightDate":str(row["FlightDate"]),"depTime":str(row["DepTime"]),"arrTime":str(row["ArrTime"]),"duration":str(row["Duration"]),"depEstAct":str(row["DepEstAct"]),"arrEstAct":str(row["ArrEstAct"]),"flightStatus":row["FlightStatus"],"aircraft":row["Aircraft"], "arival":row["AirportName"]}
            data.append(item)
        return jsonify({"error":False,"response":data})
        
    
@app.route('/flights',methods=['GET','POST'])
def flights():
    if request.method == "GET":
        sql = text("select * from flight")
        result = db.engine.execute(sql).fetchall()
        print(result)
        data=[]
        for row in result:
            item={"id":row["FlightID"],"flightNumber":row["FlightNum"],"weekNumber":row["WeekNum"],"FlightDate":str(row["FlightDate"]),"depTime":str(row["DepTime"]),"arrTime":str(row["ArrTime"]),"duration":str(row["Duration"]),"depEstAct":str(row["DepEstAct"]),"arrEstAct":str(row["ArrEstAct"]),"flightStatus":row["FlightStatus"],"aircraft":row["Aircraft"]}
            data.append(item)
            
        # data = [dict(row) for row in result]
        return jsonify({"error":False,"response":data})
    elif request.method == "POST":
        # staffEmail = request.form['staffEmail']
        flightNumber = request.form['flightNumber']
        weekNumber = request.form['weekNumber']
        flightDate = request.form['flightDate']
        depTime = request.form['depTime']
        arrTime = request.form['arrTime']
        duration = request.form['duration']
        depEstAct = request.form['depEstAct']
        arrEstAct = request.form['arrEstAct']
        flightStatus = request.form['flightStatus']
        aircraft = request.form['aircraft']
        sql = text("INSERT INTO flight(FlightNum,WeekNum,FlightDate,DepTime,ArrTime,Duration,DepEstAct,ArrEstAct,FlightStatus,Aircraft) Values (:flightNumber,:weekNumber,:flightDate,:depTime,:arrTime,:duration,:depEstAct,:arrEstAct,:flightStatus,:aircraft) ")
        result = db.engine.execute(sql, flightNumber=flightNumber, weekNumber=weekNumber, flightDate=flightDate, depTime=depTime, arrTime=arrTime, duration=duration, depEstAct=depEstAct, arrEstAct=arrEstAct, flightStatus=flightStatus, aircraft=aircraft)
        return jsonify({"Error":False,"message":"Flight Added Successfully"})
    
@app.route('/userRegister',methods=['Post'])
def user_register():
    if request.method=="POST":
        email = request.form['email']
        firstName = request.form['firstname']
        lastName = request.form['lastname']
        passportNumber = request.form['passportNumber']
        phoneNumber = request.form['phoneNumber']
        dateOfBirth = request.form['dateOfBirth']
        # INSERT INTO table_name VALUES (:email, :firstname, :lastname, :passportNumber, :phoneNumber, :dtaeOfBirth);
        try: 
            sql = text("INSERT INTO passenger (FirstName,LastName,EmailAddress,PhoneNumber,PassportNumber,DateOfBirth,LoyaltyTier) VALUES ( :firstname, :lastname, :email, :phoneNumber, :passportNumber,  :dateOfBirth,1)")
            db.engine.execute(sql,firstname=firstName,lastname=lastName, email=email, phoneNumber=phoneNumber, passportNumber=passportNumber, dateOfBirth=dateOfBirth)
            print("Try accepted")
            return jsonify(message="Passenger Added successfully!!",error=False),200
        except IntegrityError:
            print("an Error accousr")
            # db.rollback()
            return make_response(jsonify({"error":True,"message":"Invalid Input"}),400)

            
        return jsonify(message="Passenger Added successfully!!",error=False),200
        # db.commit()
        # email address
        
if __name__ == '__main__':
    app.run(debug=True)