// import { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

import Header from "../components/header";
import axios from "axios";
import StaffHeader from "../components/staffHeader";

export default function AllFlights()
{
    const [cities,setCities] = useState(null)
    const [ selectedDate, setSelectedDate] = useState("28-10-30")
    const [ selectedCity, setSelectedCity] = useState("")
    const [flights,setFlights] = useState("")
    const [selectedName,setSelectedName] = useState(null)

    useEffect(()=>{
        axios({
            method:'GET',
            url:"http://127.0.0.1:5000/allFlights",
            // headers: { 'Content-Type': 'multipart/form-data'},
            // data:bodyFormData
        }).then((res)=>{
                if( res?.status == 200 && res?.data.error == false)
                {
                    console.log(res);
                    if(res.data.response.length >0){
                        setFlights(res.data.response)
                        console.log("data avai");
                    }
                    else{
                        setFlights(null)
                        console.log("NO data avai");
                    }
                    
                    // navigate('/flights');
                    // console.log(res)
                }
                else{
                    // setError(true);
                }
        })
        
    },[])

    function getFlights()
    {
       
        if(selectedCity!== "")
        {
 

           
        }
    }
    return(
        <>        
        {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a href="#" class="navbar-brand">Air Whakatū</a>
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                <div class="navbar-nav">
                    <a href="#" class="nav-item nav-link active">Home</a>
                    <a href="#" class="nav-item nav-link">Profile</a>
                    <Link to="/avalibleFlights" class="nav-item nav-link">Avalible Flights</Link>
                   
                </div>
           
              
            </div>
        </div>
    </nav> */}
        <StaffHeader/>
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div className="card card0 border-0">
            <div className="row d-flex">
                <div className="col-lg-6">
                    <div className="card1 pb-5">
                        <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                            <img src="https://i.imgur.com/uNGdWHi.png" className="image"/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card2 card border-0 px-4 py-5">
                        {/* <h3>Available Flights</h3> */}
                        {/* <div className="row px-3">
                            <label className="mb-1"><h6 className="mb-0 text-sm">Arrival City</h6></label>
                            <select className="mb-4" onChange={(e) => setSelectedCity(e.target.value)} id="arrival-city" name="arrival-city">
                            {
                                cities?.map((city)=>{
                                    <option value={null} selected disabled>Select The City</option>

                                    return(
                                        <option value={city.AirportCode}>{city.AirportName}</option>
                                    )
                                })
                            }
                            </select>
                        </div> */}
                        {/* <div className="row px-3 mb-4">
                            <label className="mb-1"><h6 className="mb-0 text-sm">Arrival Date</h6></label>
                            <input type="date" name="date" placeholder="Select Date"/>
                        </div> */}
                        {/* <div className="row px-3">
                            <label className="mb-1"><h6 className="mb-0 text-sm">Departure City</h6></label>
                            <select className="mb-4" id="departure-city" name="departure-city">
                                <option value="lahore">Lahore</option>
                                <option value="islamabad">Islamabad</option>
                                <option value="multan">Multan</option>
                            </select>
                        </div>
                           <div className="row px-3 mb-4">
                            <label className="mb-1"><h6 className="mb-0 text-sm">Departure Date</h6></label>
                            <input type="date" name="date" placeholder="Select Date"/>
                        </div> */}
                        {/* <div className="row mb-3 px-3">
                            <button  onClick={getFlights}  className="btn btn-blue text-center">Search</button>
                        </div> */}

                        <div class=" border-0 px-4 py-5">
                    {/* <div class="row px-3 mb-3">
                        <h3>Summary</h3>
                        <div class="card" style={{width:"100%"}}>
                            <div class="card-body">
                              <h5 class="card-title">Title</h5>
                              <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industr </p>
                              <a href="#" class="btn btn-blue text-center">Go somewhere</a>
                            </div>
                          </div>
                    </div> */}
                    <h3>Available Flights</h3>
                    {
                        flights!= "" && flights != null?
                        flights.map((flight)=>{
                            return(
                                <>
                    <div class="row px-3 mb-3">
                        
                        <div class="card" style={{width:"100%"}}>
                            <div class="card-body">
                              <h5 class="card-title">{flight?.flightNumber}</h5>
                              <h5 class="card-title">{flight?.arival} To {flight?.arival}</h5>
                              <p class="card-text">Departure Date : {flight?.FlightDate}</p>
                              <p class="card-text">Departure Time : {flight?.depTime}  ------- Arrival Time : {flight?.arrTime}</p>
                              {/* <button onClick={()=>bookFlight(flight?.FlightID)} class="btn btn-blue text-center">Book flight Now</button> */}
                            </div>
                          </div>
                    </div>
                    </>
                            )

                        }
                        )
                        
                    : <p>No Flights Available</p>
                    }
                </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
{/* 
    <div class="row" >
            <div class="col-md-12" style={{position:"absolute", bottom:"0"}}>
              <div class="copyright">
                <p>Copyright</p>
              </div>
            </div>
          </div> */}
    </>
    )
}