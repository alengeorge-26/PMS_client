import React, { useContext, useState } from 'react';
import './editguide.css'
import { ProjectsContext } from '../../contextapi.js/projectscontext';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import baseurl from '../../baseurl/baseurl';
import DynamicForm from '../../components/dynamicinput/DynamicInput';

const EditGuide = () => {
    const {curr_guide_name,curr_designation,user_id,isAdmin,auth,setCurr_guide_name,
        setCurr_designation,curr_aof,setCurr_aof,inputs,setInputs,
        curr_contact,setCurr_contact,curr_password,setCurr_password}=useContext(ProjectsContext);
    
    const {id}=useParams();

    const navigate=useNavigate();

    const updateprofile = async(e)=>{
        e.preventDefault();

        const aof=[...curr_aof,...inputs];
      
        const token = localStorage.getItem('token');

        try{
            const response = await baseurl.put(`/faculty/${id}`,{
                faculty_name:curr_guide_name,
                designation:curr_designation,
                contact:curr_contact,
                area_of_interest:aof },
                {
                    headers:{
                        'authorization' : `Bearer ${token}`
                    }
                }
            );

            const result = await baseurl.put(`/user/changepassword/${id}`,{
                password:curr_password },
                {
                    headers:{
                        'authorization' : `Bearer ${token}`
                    }
                }
            );
            
            setInputs(['Machine Learning']);
            setCurr_password("");
            setCurr_aof([]);
            setCurr_guide_name("");
            setCurr_designation("");
            setCurr_contact("");
            navigate(`/guide/${id}`);  
            console.log(response.data) 
            console.log(result.data);
        }catch(err){
            console.log(err);
        }
    }
    
    return(
        <>
            <Navbar/>
            <div className='editguide'>
                <h1>Edit Profile</h1>
                <div className='editguidedetails'> 

                    <div className='editguideinput'>
                        <label htmlFor="name">Name</label>
                        <input name="name" className='editin' type="text" onChange={(e)=>setCurr_guide_name(e.target.value)} placeholder={curr_guide_name}/>
                    </div>

                    <div className='editguideinput'>
                        <label htmlFor="designation">Designation</label>
                        <input name="name" className='editin' type="text" readOnly placeholder={curr_designation}/>
                        <select name="year" className='editin' onClick={(e)=>setCurr_designation(e.target.value)} placeholder={curr_designation}>
                            <option value="Proffesor">Proffesor</option>
                            <option value="Associate Proffesor">Associate Proffesor</option>
                            <option value="Assistant Proffesor">Assistant Proffesor</option>
                            <option value="Guest Proffesor">Guest Proffesor</option>
                        </select>
                    </div>

                    <div className='editguideinput'>
                        <label htmlFor="designation">Skills</label>
                        <div className='editin'>
                            {curr_aof.map((res,i)=>{
                                return(
                                    <ul key={i}>
                                        <li>{res}</li>
                                    </ul>
                                )
                            })}
                        </div>
                    </div>

                    <div>
                        <label>Add New Skills</label>
                        <DynamicForm/>
                    </div>

                    <div className='editguideinput'>
                        <label htmlFor="name">Contact</label>
                        <input name="name" className='editin' type="text" onChange={(e)=>setCurr_contact(e.target.value)} placeholder={curr_contact}/>
                    </div>

                    <div className='editguideinput'>
                        <label>Password</label>
                        <input className='editin' type="password" onChange={(e)=>setCurr_password(e.target.value)}/>
                    </div>
                </div>
                {auth && (parseInt(id)===user_id || isAdmin) && (<button className='editupd' onClick={updateprofile}>Update</button>)}
            </div>
        </>
    )
}

export default EditGuide;