import { Link,useNavigate } from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios"


export default function Register()
{
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    function registerFunction(){
        var bodyFormData = new FormData();

        if(firstName!="" && lastName!="" && email != '' && passportNumber!='' && phoneNumber!='' && dob !='')
        {
            
            bodyFormData.append('firstname', firstName);
            bodyFormData.append('lastname', lastName);
            bodyFormData.append('email', email);
            bodyFormData.append('passportNumber', passportNumber);//phoneNumber
            bodyFormData.append('phoneNumber', phoneNumber);
            bodyFormData.append('dateOfBirth', String(dob));
            axios({
                method:'post',
                url:"http://127.0.0.1:5000/userRegister",
                headers: { 'Content-Type': 'multipart/form-data'},
                data:bodyFormData
            }).then((res)=>{
                console.log(res);
                    if( res?.status == 200 && res?.data.error == false)
                    {
                        navigate('/');
                        console.log("NOT Error")

                    }
                    else{
                        console.log("Error")
                    }
            })
            


        }
        
    }
    return(
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
                        <h3 >Register</h3>

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
                        <div className="row px-3">
                            <label className="mb-1"><h6 className="mb-0 text-sm">First name</h6></label>
                            <input className="mb-4" onChange={(e) => setFirstName(e.target.value)} type="text" name="user" placeholder="Enter First Name"/>
                        </div>
                        <div className="row px-3">
                            <label className="mb-1"><h6 className="mb-0 text-sm">Last name</h6></label>
                            <input className="mb-4" onChange={(e) => setLastName(e.target.value)} type="text" name="user" placeholder="Enter Last Name"/>
                        </div>
                        <div className="row px-3">
                            <label className="mb-1"><h6 className="mb-0 text-sm">Email Address</h6></label>
                            <input className="mb-4" onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Enter a valid email address"/>
                        </div>
                        <div className="row px-3">
                            <label className="mb-1"><h6 className="mb-0 text-sm">Passport Number</h6></label>
                            <input className="mb-4" onChange={(e) => setPassportNumber(e.target.value)} type="text" name="password" placeholder="Enter Passport Number"/>
                        </div>
                        <div className="row px-3">
                            <label className="mb-1"><h6 className="mb-0 text-sm">Phone Number</h6></label>
                            <input  type="text" onChange={(e) => setPhoneNumber(e.target.value)} name="confirm-password" placeholder="Enter Phone Number"/>
                        </div>
                        <div className="row px-3">
                            <label className="mb-1"><h6 className="mb-0 text-sm">Date Of Birth</h6></label>
                            <input  type="date" onChange={(e) => setDob(e.target.value)} name="confirm-password" />
                        </div>
                        <div className="row px-3 mb-4">
                            <div className="custom-control custom-checkbox custom-control-inline">
                                <input id="chk1" type="checkbox" name="chk" className="custom-control-input"/> 
                                <label for="chk1" className="custom-control-label text-sm">Remember me</label>
                            </div>
                         
                        </div>
                        <div className="row mb-3 px-3">
                            <Link type="submit" onClick={registerFunction} className="btn btn-blue text-center" > Register</Link>
                        </div>
                        <div className="row mb-4 px-3">
                            <small className="font-weight-bold">Have an account? <Link className="text-danger " to="/">Login</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}