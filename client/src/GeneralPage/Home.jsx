import React, {useState} from "react";
import './home.css';
import 'bootstrap/dist/js/bootstrap.bundle';

const Home = () => {

  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");

  // Handler functions to update the selected value of each dropdown
  const handleDropdownChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleDropdownChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleDropdownChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };

    return(
        <div>
            <main>
                <section id="Home">
                    <div className="container">
                        <div className="row">
                            <div className="main-col">  
                                <h1 className="display-4 fw-bolder mt-5"><div id="hoverText"><span id="text">Your</span></div> Partner <br/>In Housing & Relocation</h1>
                                <p className="lead text-left fs-4 mb-5">Bridging Homes, Building Futures: Where Landlords and Tenants Unite</p>
                            </div>
                        </div>
                    </div>
                </section>
            
                <section id="filter">
                    <div className="container">
                        <header className="subTitle text-center fs-2 fw-bolder mt-4">Find Your Dream Property</header>
                        <div class="row row-cols-1 row-cols-md-3 g-5">
                            <div className="col">
                            <label htmlFor="propertyType" className="filterTitle">Property Type</label>
                            <select
                                className="form-select"
                                id="propertyType"
                                value={selectedOption1}
                                onChange={handleDropdownChange1}
                            >
                                <option value="" disabled hidden>Please Select</option>
                                <option value="option1-1">Condo</option>
                                <option value="option1-2">Commercial</option>
                                <option style={{ fontSize: '16px', padding: '8px', color: '#333' }} value="option1-3">Landed</option>
                            </select>
                            </div>
                            <div className="col">
                            <label htmlFor="location" className="filterTitle">Location</label>
                            <select
                                id="location"
                                className="form-select"
                                value={selectedOption2}
                                onChange={handleDropdownChange2}
                            >
                                <option value="" disabled hidden>Please Select</option>
                                <option value="option2-1">Petaling Jaya</option>
                                <option value="option2-2">Cheras</option>
                                <option value="option2-3">Kajang</option>
                                <option value="option2-3">Ampang</option>
                            </select>
                            </div>
                            <div className="col">
                            <label htmlFor="priceRange" className="filterTitle">Price Range</label>
                            <select
                                id="priceRange"
                                className="form-select"
                                value={selectedOption3}
                                onChange={handleDropdownChange3}
                            >
                                <option value="" disabled hidden>Please Select</option>
                                <option value="option3-1">RM 500 - RM 1000</option>
                                <option value="option3-2">RM 1000 - RM 1500</option>
                                <option value="option3-3">RM 1500 - RM 2000</option>
                            </select>
                            </div>
                        </div>
                        <button className="searchButton" type="button">Search</button>
                    </div>
                </section>

                <section id="recommendation">
                    <header className="recommendationTitle text-left fs-2 fw-bolder mt-4">Recommendations</header>
                    <div class="row row-cols-1 row-cols-md-3 g-5">
                        <div class="col">
                            <div class="card h-100">
                            <img src="Images/condo2.jpg" class="card-img-top" alt="house picture"/>
                                <div class="card-body">
                                    <h4 class="card-title1">RM 500 Per Month</h4>
                                    <h6 class="card-title2">Tiara Damansara's Master Room</h6>
                                    <p class="card-text">Tiara Damansara Condominium<br></br>Seksyen 16, 46350 Petaling Jaya, Selangor</p>
                                    
                                    <ul className="room">
                                        <li className="roomDetails"><img src="Images/bedroom.png" alt="details" width="35" height="35"/> 1</li>
                                        <li className="roomDetails"><img src="Images/bathroom.png" alt="details" width="35" height="35"/> 2</li>
                                        <li className="roomDetails"><img src="Images/sqrt.png" alt="details" width="35" height="35"/> 350sf</li>
                                    </ul>
                                    
                                    <div className="viewButton"> 
                                        <a href="#"><button className="searchButton" type="button">View</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card h-100">
                            <img src="Images/bungalow.jpg" class="card-img-top" alt="house picture"/>
                            <div class="card-body">
                                <h4 class="card-title1">RM 500 Per Month</h4>
                                <h6 class="card-title2">Tiara Damansara's Master Room</h6>
                                <p class="card-text">Tiara Damansara Condominium<br></br>Seksyen 16, 46350 Petaling Jaya, Selangor</p>
                                    <ul className="room">
                                        <li className="roomDetails"><img src="Images/bedroom.png" alt="details" width="35" height="35"/> 1</li>
                                        <li className="roomDetails"><img src="Images/bathroom.png" alt="details" width="35" height="35"/> 2</li>
                                        <li className="roomDetails"><img src="Images/sqrt.png" alt="details" width="35" height="35"/> 350sf</li>
                                    </ul>
                                <div className="viewButton"> 
                                    <a href="#"><button className="searchButton" type="button">View</button></a>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card h-100">
                            <img src="Images/commercial.jpg" class="card-img-top" alt="house picture"/>
                            <div class="card-body">
                                <h4 class="card-title1">RM 500 Per Month</h4>
                                <h6 class="card-title2">Tiara Damansara's Master Room</h6>
                                <p class="card-text">Tiara Damansara Condominium<br></br>Seksyen 16, 46350 Petaling Jaya, Selangor</p>
                                <ul className="room">
                                    <li className="roomDetails"><img src="Images/bedroom.png" alt="details" width="35" height="35"/> 1</li>
                                    <li className="roomDetails"><img src="Images/bathroom.png" alt="details" width="35" height="35"/> 2</li>
                                    <li className="roomDetails"><img src="Images/sqrt.png" alt="details" width="35" height="35"/> 350sf</li>
                                </ul>
                                <div className="viewButton"> 
                                    <a href="#"><button className="searchButton" type="button">View</button></a>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card h-100">
                            <img src="Images/commercial2.jpg" class="card-img-top" alt="house picture"/>
                            <div class="card-body">
                                <h4 class="card-title1">RM 500 Per Month</h4>
                                <h6 class="card-title2">Tiara Damansara's Master Room</h6>
                                <p class="card-text">Tiara Damansara Condominium<br></br>Seksyen 16, 46350 Petaling Jaya, Selangor</p>
                                <ul className="room">
                                    <li className="roomDetails"><img src="Images/bedroom.png" alt="details" width="35" height="35"/> 1</li>
                                    <li className="roomDetails"><img src="Images/bathroom.png" alt="details" width="35" height="35"/> 2</li>
                                    <li className="roomDetails"><img src="Images/sqrt.png" alt="details" width="35" height="35"/> 350sf</li>
                                </ul>
                                <div className="viewButton"> 
                                    <a href="#"><button className="searchButton" type="button">View</button></a>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <br /><br /><br /><br /><br />
                    </section>

                <section id="info">
                    <div className="container">
                        <div class="row row-cols-1 row-cols-md-3 g-5">
                            <div className="col">
                                <div className="contain">
                                    <img src="Images/content1.png" class="contextImage" alt="house picture" width="100" height="100"/>
                                    <h5>Most Properties & Rental</h5>
                                    <div className="contextDetails">
                                        <p>Discover The Ideal Residence From Our Extensive Selection Of Premier Properties. Embark On Your Journey With Us As We Present The 
                                        <span className="highlightText"> Best Real Estate Options</span> In Malaysia, Including <span className="highlightText"> Stylish Condominiums, Charming Townhouses, Modern Apartments, Majestic Bingalows, And Spacious Semi-Detached Houses</span>
                                        , Tailored To Fulfill Your Aspirations.</p>  
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="contain">
                                    <img src="Images/content2.png" class="contextImage" alt="house picture" width="100" height="100"/>
                                    <h5>House Safe</h5>
                                    <div className="contextDetails">
                                        <p>Our Dedicated Property Services Are Designed To Ensure A
                                        <span className="highlightText"> Safe, Secure, And Seamless Experience For Homeowners Ans Renters</span> Alike. From <span className="highlightText">Verified Listings To State-Of-The-Art Security Features</span>
                                        , We Provide The Tools And Support You Need To Find Or Lease Properties With Confidence.</p>  
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="contain">
                                    <img src="Images/content3.png" class="contextImage" alt="house picture" width="100" height="100"/>
                                    <h5>Transparency</h5>
                                    <div className="contextDetails">
                                        <p>Our Property Website Stands On The Foundation Of Transparency. We Believe That Whether You're Buying, Selling, Or Renting, You Should Have Clear, Accessible Information At Your Fingertips. From Open Listings To Straightforward Pricing And Honest Property Conditions, We
                                        <span className="highlightText">Ensure That What You See Is What You Get. </span>Navigate Your Property Journey With Us, Where Transparency Isn't Just A promise-It's Our Practice.</p>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><br /><br />
                </section>
            </main>
        </div>
    );
}

export default Home;