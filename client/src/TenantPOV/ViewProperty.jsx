import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './viewproperty.css';
import DetailsPanel from "./component/DetailsPanel";
import CommentBox from "./component/CommentBox";
import AverageRating from "./component/AverageRating";
import Swal from 'sweetalert2';

const ViewProperty = () => {
    
    const propertyImageSrc = [
        "Images/propertyImg3.png",
        "Images/propertyImg4.png",
        "Images/propertyImg2.png",
        "Images/propertyImg5.png"
    ];

    const nav = useNavigate();
    const location = useLocation();

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => {
            let newIndex = prevIndex - 2;
            if (newIndex < 0) {
                newIndex = propertyImageSrc.length + newIndex;
            }
            return newIndex;
        });
    };
    
    const handleNext = () => {
        setCurrentIndex(prevIndex => {
            let newIndex = prevIndex + 2;
            if (newIndex >= propertyImageSrc.length) {
                newIndex = newIndex - propertyImageSrc.length;
            }
            return newIndex;
        });
    };
    
    const handleApplyPropertyPageButton = () => {
        if (localStorage.getItem("previousPath") !== "/tenantHome") {
            Swal.fire({
                title: 'Warning!',
                text: 'You need to register or log in to your account before performing this action.',
                icon: 'warning',
                confirmButtonColor: "#FF8C22",
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    nav("/logIn");
                }
            });
            return;
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            nav("/tenantApplyForm");
        }
    }
    
    return (
        <div>
            <main>
                <section id="PropertyImage">
                    <div className="container">
                        <div className="imageContainer">
                                <img src={propertyImageSrc[currentIndex]} alt='propertyImages' className='propertyImage'/>
                                <img src={propertyImageSrc[(currentIndex + 1) % propertyImageSrc.length]} alt='propertyImages' className='propertyImage' id='propertyImage2'/>
                        </div>

                        <div className="buttonContainer">
                            <button className="previousButton" onClick={handlePrevious}>
                                <svg width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse cx="23" cy="22" rx="23" ry="22" fill="#D9D9D9" fillOpacity="0.66"/>
                                    <path d="M14 21.5L25.3514 11L28 13.45L19.2973 21.5L28 29.55L25.3514 32L14 21.5Z" fill="#171616" fillOpacity="0.58"/>
                                </svg>
                            </button>
                            <button className="nextButton" onClick={handleNext}>
                                <svg width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse cx="23" cy="22" rx="23" ry="22" fill="#D9D9D9" fillOpacity="0.66"/>
                                    <path d="M30 21.5L18.6486 32L16 29.55L24.7027 21.5L16 13.45L18.6486 11L30 21.5Z" fill="#171616" fillOpacity="0.58"/>
                                </svg>
                            </button>
                        </div>

                        <div className="imgPageIconContainer">
                            <div className="imgPageText">{propertyImageSrc.length}</div>
                            <svg className="imgPageIcon" width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.6252 0H1.12481C0.503551 0 0 0.522316 0 1.16679V17.5H1.68751V1.74998H23.6252V0ZM6.21418 8.74992C6.21418 10.1996 7.34722 11.3749 8.74565 11.3749C10.1437 11.3749 11.2767 10.1996 11.2767 8.74992C11.2767 7.30046 10.1437 6.12494 8.74565 6.12494C7.34722 6.12494 6.21418 7.30046 6.21418 8.74992ZM25.3127 12.3087L21.9565 8.74992L16.4462 14.1285L13.497 11.6028L5.06254 19.2498V5.24995H25.3127V12.3087ZM3.37502 4.66655V19.8332C3.37502 20.4777 3.87858 21 4.50003 21H15.1876H25.8752C26.4964 21 27 20.4777 27 19.8332V4.66655C27 4.02228 26.4964 3.49997 25.8752 3.49997H4.50003C3.87858 3.49997 3.37502 4.02228 3.37502 4.66655Z" fill="white"/>
                            </svg>
                        </div>

                    </div>
                </section>

                <section id="PropertyDetails">
                    <div className="container"><DetailsPanel/></div>
                </section>

                <div className="applyButton"> 
                    <button className="applyNowButton" type="button" onClick={handleApplyPropertyPageButton}>Apply Now</button>
                </div>

                <section id="Comment">
                    <header className="commentTitle">Comment And Rating</header>

                    <section className="comment-avg">
                        <div className="comment-grid">
                            <AverageRating numOfReview="2" avg="4.0" />
                        </div>
                    </section>
                    
                    <section className="comments">
                        <div className="comment-grid">
                            <CommentBox username="Joyce Lim" date="2 days ago" />
                            <CommentBox username="Ali bin Abu" date="12/3/2021"/>
                        </div>
                    </section>
                </section>
            </main>
        </div>
    );
}

export default ViewProperty;