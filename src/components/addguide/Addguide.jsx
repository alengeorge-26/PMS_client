import React, { useState } from 'react';
import './addguide.css';
import baseurl from '../../baseurl/baseurl';
import { useContext } from 'react';
import { ProjectsContext } from '../../contextapi.js/projectscontext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

const Addguide = () => {
    const navigate=useNavigate();

    const [user_name,setuser_name]=useState("");
    const [faculty_id,setfaculty_id]=useState("");
    const [email,setemail]=useState("");

    const {setCurr_aof}=useContext(ProjectsContext);
   
    const submitForm = async(e)=>{
        e.preventDefault();

        const token = localStorage.getItem('token');
        const password = "password";
        try{
            const response = await baseurl.post("/auth/create",{
              user_name,email,faculty_id,password},
              {
                headers:
                {
                    'authorization' : `Bearer ${token}`
                }
              }
            );
            console.log(response.data);
            setCurr_aof([]);
            navigate(`/guides`)
        }catch(err){
            console.log(err);
        }
    };

    return(
        <>
            <div className='addguide'>
                <div className='inputform'>
                        <div className='inputuserdet'>
                            <label className='inputuserdetlab'>Username</label>
                            <input className='guideinput' type="text" value={user_name} onChange={e=>setuser_name(e.target.value)} placeholder="ID"/>
                        </div>
                        <div className='inputuserdet'>
                            <label className='inputuserdetlab'>Email</label>
                            <input className='guideinput' type="text" value={email} onChange={e=>setemail(e.target.value)} placeholder="Email"/>
                        </div>
                        <div className='inputuserdet'>
                            <label className='inputuserdetlab'>Faculty Id</label>
                            <input className='guideinput' type="text" value={faculty_id} onChange={e=>setfaculty_id(e.target.value)} placeholder="Faculty Id"/>
                        </div>
                </div>
                <button className='guidebut' type="submit"  onClick={submitForm}><FontAwesomeIcon icon={faFileCirclePlus}/> Add</button> 
            </div>
        </>
    );
}

export default Addguide;