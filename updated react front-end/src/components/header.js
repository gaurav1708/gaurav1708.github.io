import { Link,useNavigate } from "react-router-dom"

export default function Header(){
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <img src="./assects/logo_blue.jpg" alt="Air Whakatū" style={{height:"70px"}} class="navbar-brand"></img>
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                <div class="navbar-nav">
                    <Link to="/flights" class="nav-item nav-link active">Home</Link>
                    <Link to="/profile" class="nav-item nav-link">Profile</Link>
                    <Link to="/avalibleFlights" class="nav-item nav-link">Avalible Flights</Link>
                    <Link to="/myFlights" class="nav-item nav-link">My Flights</Link>
                    <Link to="/" class="nav-item nav-link">Logout</Link>

                   
                </div>
           
              
            </div>
        </div>
    </nav>
    )
}