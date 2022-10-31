import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import "./style.css";
import { useState,useEffect } from "react";

export default function StaffLogin(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [wrongError,setError] = useState(false)
    useEffect(()=>{

    })
    function loginFunction(){
        var bodyFormData = new FormData();
        if(email !="")
        bodyFormData.append('email', email);
        axios({
                method:'post',
                url:"http://127.0.0.1:5000/staffLogin",
                headers: { 'Content-Type': 'multipart/form-data'},
                data:bodyFormData
            }).then((res)=>{
                console.log(res);
                    if( res?.status == 200 && res?.data.error == false)
                    {
                        sessionStorage.setItem("staff_id", res?.data?.passenger_id);
                        navigate('/admin/passengerList');
                    }
                    else{
                        setError(true);
                    }
            })
    }
    return(
        <>
        



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
                        <h1>Staff Login</h1>

                        <div className="row mb-4 px-3">
                            <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                            <div className="facebook text-center mr-3"><div className="fa fa-facebook"></div></div>
                            <div className="twitter text-center mr-3"><div className="fa fa-twitter"></div></div>
                            <div className="linkedin text-center mr-3"><div className="fa fa-linkedin"></div></div>
                        </div>
                        <div className="row px-3 mb-4">
                            <div className="line"></div>
                            <small className="or text-center">Or</small>
                            <div className="line"></div>
                        </div>
                        {wrongError && <p style={{color:"red"}}>Wrong Email Adress, Please Try again</p>}
                        <div className="row px-3">
                            <label className="mb-1"><h6 className="mb-0 text-sm">Email Address</h6></label>
                            <input className="mb-4" onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Enter a valid email address"/>
                        </div>
                        <div className="row px-3 mb-4">
                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input id="chk1" type="checkbox" name="chk" className="custom-control-input"/> 
                                <label for="chk1" className="custom-control-label text-sm">Remember me</label>
                            </div>
                            {/* <a href="#" className="ml-auto mb-0 text-sm">Forgot Password?</a> */}
                        </div>
                        <div className="row mb-3 px-3">
                            <button   onClick={loginFunction} type="submit" className="btn btn-blue text-center">Login</button>
                        </div>
                        {/* <div className="row mb-4 px-3">
                            <small className="font-weight-bold">Don't have an account? <Link className="text-danger" to="/register">Register</Link></small>
                        </div> */}
                    </div>
                </div>
            </div>

        </div>
    </div>
    </>
    )
}