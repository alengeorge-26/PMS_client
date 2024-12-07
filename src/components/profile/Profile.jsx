import React, { useContext, useEffect } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ProjectsContext } from '../../contextapi.js/projectscontext';
import baseurl from '../../baseurl/baseurl';
import bg4 from './bg4.png';


const Profile = () => {
    const{isAdmin,auth,user_id,setCurr_guide_name,setCurr_designation,
        setCurr_aof,setCurr_contact,setCurr_password}=useContext(ProjectsContext);

    const navigate = useNavigate();

    let {id}=useParams();

    const [faculty_id,setfaculty_id]=useState("");
    const [faculty_name,setfaculty_name]=useState("");
    const [designation,setdesignation]=useState("");
    const [email,setemail]=useState("");
    const [aof,setaof]=useState([]);
    const [project,setproject]=useState([]);
    const [contact,setcontact]=useState("");

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response1=await baseurl.get(`/faculty/faculty_det/${id}`);
                const response2 =await baseurl.get(`/user/email/${id}`);
                setfaculty_id(response1.data[0].faculty_id);
                setfaculty_name(response1.data[0].faculty_name);
                setdesignation(response1.data[0].designation);
                setemail(response2.data[0].email);
                setaof(response1.data[0].area_of_interest);
                setcontact(response1.data[0].contact);

                setCurr_guide_name(response1.data[0].faculty_name);
                setCurr_designation(response1.data[0].designation);
                setCurr_contact(response1.data[0].contact);
                if(response1.data[0].area_of_interest)
                    setCurr_aof(response1.data[0].area_of_interest);
                else
                    setCurr_aof([]);
            }catch(err)
            {
                console.log(err);
            }
        };
        fetchData();
    },[]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response=await baseurl.get(`/projects/guide/${faculty_id}`);
                setproject(response.data);     
            }catch(err)
            {
                console.log(err);
            }
        };
        fetchData();
    },[faculty_id]);

    id=parseInt(id);

    return(
       
        <div className='profile'>
           
            <div className='profileall'>
                <h1>Profile</h1>

                <div className='profiledetails'>

                    <div className='profiledivison2'>

                        <div className='profileeachdetail'>
                            <label htmlFor="">Guide Id</label>
                            <input className='proin' type="text" readOnly value={faculty_id} />
                        </div>

                        <div className='profileeachdetail'>
                            <label htmlFor="">Guide Name</label>
                            <input className='proin' type="text" readOnly value={faculty_name} />
                        </div>

                        <div className='profileeachdetail'>
                            <label htmlFor="">Designation</label>
                            <input className='proin' type="text" readOnly value={designation} />
                        </div>

                        <div className='profileeachdetail'>
                            <label htmlFor="">E-Mail</label>
                            <input className='proin' type="text" readOnly value={email} />
                        </div>

                        <div className='profileeachdetail'>
                            <label htmlFor="">Contact</label>
                            <input className='proin' type="text" readOnly value={contact} />
                        </div>

                        {auth && (id === user_id || isAdmin) && (<button className='profbut' onClick={() => { navigate(`/editguide/${id}`); } }>Profile Edit</button>)}
                    </div>


                    <div className='profiledivison1'>
                        <h2>Areas Of Interest</h2>
                        <div className='guideskill'>      
                            {aof && aof.map((item, i) => {
                                return(
                                    <ul className='guideaof' key={i}>
                                        <li key={i}>{item}</li>
                                    </ul>
                                );
                            })}        
                        </div>
                    </div>

                    
                </div>

                <div className='table'>

                    <div className='listheading'>
                        <h2>Projects Guided</h2>
                    </div>

                    <br />
                    <div className='projectsitemguided'>
                        {project && project.map((item, i) => {
                            return (
                                <div key={item.pro_id} onClick={() => navigate(`/project/${item.pro_id}`)} className='projecteachitem'>
                                    <span>{item.pro_title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Profile;