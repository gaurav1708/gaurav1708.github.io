 import axios from "axios";
 import { useEffect,useState } from "react";
 import StaffHeader from "../components/staffHeader"
 export default function PassengerList(){
    const [passengersProfile,setPassengerProfile] = useState(null)
    useEffect(()=>{
        axios({
            method:'get',
            url:"http://127.0.0.1:5000/passengerList",
            // headers: { 'Content-Type': 'multipart/form-data'},
            // data:bodyFormData
        }).then((res)=>{
                if( res?.status == 200 && res?.data.error == false)
                {
                    console.log(res.data.result);

                    // navigate('/flights');
                    // console.log(res)
                    setPassengerProfile(res.data.result)
                }
                else{
                    // setError(true);
                }
        })
    },[])
    return(
        <>
        <StaffHeader/>
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
            <h2>All Passengers</h2>
                <div class=" border-0 px-4 py-5">
                { passengersProfile != null?
                    passengersProfile.map((passenger)=>{
                        return(
                            <div class="row px-3 mb-3">
                                {/* <h3>Summary</h3> */}
                                <div class="card" style={{width:"100%"}} >
                                    <div class="card-body">
                                    <h5>PassengerID : {passenger?.PassengerID}</h5>
                                    {/* <input class="card-title" value={passenger?.FirstName}></input> */}
                                    <div className="row px-3">
                                        <label className="mb-1"><h6 className="mb-0 text-sm">First name</h6></label>
                                        <input className="mb-4"  type="text" name="user" value={passenger?.FirstName}/>
                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1"><h6 className="mb-0 text-sm">Last name</h6></label>
                                        <input className="mb-4"  type="text" name="user" value={passenger?.LastName}/>
                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1"><h6 className="mb-0 text-sm">Passport Number</h6></label>
                                        <input className="mb-4"  type="text" name="user" value={passenger?.PassportNumber}/>
                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1"><h6 className="mb-0 text-sm">Phone Number</h6></label>
                                        <input className="mb-4"  type="text" name="user" value={passenger?.PhoneNumber}/>
                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1"><h6 className="mb-0 text-sm">Email Address</h6></label>
                                        <input className="mb-4"  type="text" name="user" value={passenger?.EmailAddress}/>
                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1"><h6 className="mb-0 text-sm">Date Of Birth</h6></label>
                                        <input  type="date" value={passenger?.DateOfBirth} />
                                    </div>
                                    <button  class="btn btn-blue text-center">see all bookings</button>
                                    <button  class="btn btn-blue text-center">Update Passenger</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :<p>Did'nt find any Passenger</p>
                    
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