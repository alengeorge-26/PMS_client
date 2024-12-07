import React from 'react';
import './home.css';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const navigate = useNavigate();

    return(
        <>
            <Navbar home={true}/>
            <div className='homecontainer'>
                <div className='homeintro'>

                    <h1>Welcome to Project Management System</h1>   

                    <p>
                        Welcome to the project management system of the CSE departmant of College Of Engineering Trivandrum, <br></br>where you can find
                        previous year projects, guides, and also check the similarity 
                        of your abstracts.
                    </p>

                  

                </div>
                <div className='homemenu'>
                    <div className='homeitem' onClick={()=>navigate('/projects')}>
                        <img src={img1} alt="" />
                        <p>See Projects <FontAwesomeIcon icon={faArrowRight}/></p>
                    </div>

                    <div className='homeitem' onClick={()=>navigate('/guides')}>
                        <img src={img2} alt="" />
                        <p>See Guides <FontAwesomeIcon icon={faArrowRight} /></p>
                    </div>

                    <div className='homeitem' onClick={()=>navigate('/abstractsimilarity')}>
                        <img src={img3} alt="" />
                        <p>Similar Projects <FontAwesomeIcon icon={faArrowRight} /></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;