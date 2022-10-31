import axios from "axios";
import { useEffect,useState } from "react";
import Header from "../components/header";

export default function Profile(){
    const [profile,setProfile] = useState(null);
    useEffect(()=>{
        const passenger_id = sessionStorage.getItem("passenger_id")
        axios({
            method:'get',
            url:"http://127.0.0.1:5000/passengerProfile/" + passenger_id,
            // headers: { 'Content-Type': 'multipart/form-data'},
            // data:bodyFormData
        }).then((res)=>{
                if( res?.status == 200 && res?.data.error == false)
                {
                    setProfile(res.data.result)
                    console.log(res)
                }
        })
    },[])
    return(
        <>
        <Header/>
        
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div className="card card0 border-0">
            <div className="row d-flex">
                <div className="col-lg-6">
                    <div className="card1 pb-5">
                        {/* <div className="row">
                            <img src="https://i.imgur.com/CXQmsmF.png" className="logo"/>
                        </div> */}
                        <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                            <img src="https://i.imgur.com/uNGdWHi.png" className="image"/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card2 card border-0 px-4 py-5">
                        <h3 >Profile</h3>

                        <div class="row px-3 mb-3">
                                {/* <h3>Summary</h3> */}
                                <div class="card" style={{width:"100%"}} >
                                    <div class="card-body">
                                    <h5>PassengerID : {profile?.[0]?.PassengerID}</h5>
                                    {/* <input class="card-title" value={passenger?.FirstName}></input> */}
                                    <div className="row px-3">
                                        <label className="mb-1"><h6 className="mb-0 text-sm">First name</h6></label>
                                        <input className="mb-4"  type="text" name="user" value={profile?.[0].FirstName}/>
                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1"><h6 className="mb-0 text-sm">Last name</h6></label>
                                        <input className="mb-4"  type="text" name="user" value={profile?.[0]?.LastName}/>
                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1"><h6 className="mb-0 text-sm">Passport Number</h6></label>
                                        <input className="mb-4"  type="text" name="user" value={profile?.[0]?.PassportNumber}/>
                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1"><h6 className="mb-0 text-sm">Phone Number</h6></label>
                                        <input className="mb-4"  type="text" name="user" value={profile?.[0]?.PhoneNumber}/>
                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1"><h6 className="mb-0 text-sm">Email Address</h6></label>
                                        <input className="mb-4"  type="text" name="user" value={profile?.[0]?.EmailAddress}/>
                                    </div>
                                    <div className="row px-3">
                                        <label className="mb-1"><h6 className="mb-0 text-sm">Date Of Birth</h6></label>
                                        <input  type="date" value={profile?.[0]?.DateOfBirth} />
                                    </div>
                                    {/* <button  class="btn btn-blue text-center">see all bookings</button> */}
                                    <button  class="btn btn-blue text-center">Update My Profile</button>
                                    </div>
                                </div>
                            </div>
      

                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}