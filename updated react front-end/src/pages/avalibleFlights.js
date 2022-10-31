import { Link,useNavigate } from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios"

import Header from "../components/header"

export default function AvalibleFlights(){
    const [cities,setCities] = useState(null)
    const [ selectedCity, setSelectedCity] = useState("")
    const [ selectedDate, setSelectedDate] = useState("")
    const [flights,setFlights] = useState("")
    useEffect(()=>{
        axios({
            method:'get',
            url:"http://127.0.0.1:5000/allCities",
            // headers: { 'Content-Type': 'multipart/form-data'},
            // data:bodyFormData
        }).then((res)=>{
                if( res?.status == 200 && res?.data.error == false)
                {
                    console.log(res.data.result);

                    // navigate('/flights');
                    // console.log(res)
                    setCities(res.data.result)
                }
                else{
                    // setError(true);
                }
        })
    },[])

    function getFlights(){
        if(selectedCity!== "" && selectedDate !== "")
        {
            axios({
                method:'get',
                url:"http://127.0.0.1:5000/avalibleFlights/"+selectedCity,
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
        }
    }

    function bookFlight(FlightID)
    {
        console.log("bookFlight: ",FlightID)
        const passenger_id =  sessionStorage.getItem("passenger_id")
        var bodyFormData = new FormData();
        if(FlightID !="" && passenger_id !="")
        bodyFormData.append('flight_id', FlightID);//passenger_id
        bodyFormData.append('passenger_id',passenger_id);
        axios({
                method:'post',
                url:"http://127.0.0.1:5000/booking",
                headers: { 'Content-Type': 'multipart/form-data'},
                data:bodyFormData
            }).then((res)=>{
                console.log(res);
                    if( res?.status == 200 && res?.data.error == false)
                    {
                       console.log("booking Successfully")
                    }
                    else{
                        console.log("booking Not Done")
                    }
            })
    }
    return(
          <>
          <Header/>
    <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class=" border-0">
        <div class="row d-flex">
            <div class="col-lg-6">
                <div class=" pb-5">
                    <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
                        <img src="https://i.imgur.com/uNGdWHi.png" class="image"/>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <h2>Search For Available Flights</h2>
                <div className="row px-3">
                    <label className="mb-1"><h6 className="mb-0 text-sm">Departure City</h6></label>
                    <select className="mb-4" onChange={(e) => setSelectedCity(e.target.value)} id="departure-city" name="departure-city">
                    
                    {
                        cities?.map((city)=>{
                            <option value={null} selected disabled>Select The City</option>

                            return(
                                <option value={city.AirportCode}>{city.AirportName}</option>
                            )
                        })
                    }
                        {/* <option value="lahore">Lahore</option>
                        <option value="islamabad">Islamabad</option>
                        <option value="multan">Multan</option> */}
                    </select>
                </div>
                    <div className="row px-3 mb-4">
                    <label className="mb-1"><h6 className="mb-0 text-sm">Departure Date</h6></label>
                    <input onChange={(e) => setSelectedDate(e.target.value)} type="date" name="date" placeholder="Select Date"/>
                </div>
                <div className="row mb-3 px-3">
                    <button onClick={getFlights}  type="submit" className="btn btn-blue text-center">Search</button>
                </div>

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
                              <h5 class="card-title">{selectedCity} To {flight?.arival}</h5>
                              <p class="card-text">Departure Date : {flight?.FlightDate}</p>
                              <p class="card-text">Departure Time : {flight?.depTime}  ------- Arrival Time : {flight?.arrTime}</p>
                              <button onClick={()=>bookFlight(flight?.FlightID)} class="btn btn-blue text-center">Book flight Now</button>
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
</>
    )
}