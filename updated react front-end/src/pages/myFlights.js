import { useEffect, useState } from "react";
import axios from "axios"

import Header from "../components/header";

export default function MyFlights(){
    const [myFlights,setMyFlights] = useState(null)
    useEffect(()=>{
        const passenger_id =  sessionStorage.getItem("passenger_id")
        if(passenger_id){
            axios({
                method:'get',
                url:"http://127.0.0.1:5000/passengerFlights/"+passenger_id,
                // headers: { 'Content-Type': 'multipart/form-data'},
                // data:bodyFormData
            }).then((res)=>{
                console.log(res);

                    if( res?.status == 200 && res?.data?.result?.length >0 )
                    {
                        console.log("yahoo",res.data.result);
                        setMyFlights(res.data.result)

                    }
                    else{
                        // setError(true);
                    }
            })
        }
    },[])
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
            <h2>My Flights</h2>
                <div class=" border-0 px-4 py-5">
                { myFlights != null?
                    myFlights.map((flight)=>{
                        return(
                            <div class="row px-3 mb-3">
                                {/* <h3>Summary</h3> */}
                                <div class="card" style={{width:"100%"}} >
                                    <div class="card-body">
                                    
                                    <h4 class="card-title">{flight?.FlightNum}</h4>
                                    <h5 class="card-title">{flight.FlightStatus}</h5>
                                    <h6 class="card-title">Aircraft : {flight?.Aircraft}</h6>


                                    <p class="card-text">Departure Date : {flight?.FlightDate}</p>
                                    <p class="card-text">Departure Time : {flight?.DepTime}  ------- Arrival Time : {flight?.ArrTime}</p>
                                    <a href="#" class="btn btn-blue text-center">Cancel Booking</a>
                                    </div>
                                </div>
                            </div>
                        )
                    }):<p>You don't have any booking yet</p>
                    
                }
                    {/* <div class="row px-3 mb-3">
                        <h3>Summary2</h3>
                        <div class="card" style="width:100%">
                            <div class="card-body">
                              <h5 class="card-title">Title</h5>
                              <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.orem Ipsum is simply dummy text of the printing and typesetting industryorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                              <a href="#" class="btn btn-blue text-center">Go somewhere</a>
                            </div>
                          </div>
                    </div> */}
                </div>
            </div>
        </div>

    </div>
</div>
</>
    )
}