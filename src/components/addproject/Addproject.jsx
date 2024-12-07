import React, { useEffect, useState } from 'react';
import './addproject.css';
import baseurl from '../../baseurl/baseurl';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectsContext } from '../../contextapi.js/projectscontext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fileuploader from '../fileuploader/Fileuploader'
import {faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import DynamicForm from '../dynamicinput/DynamicInput';


const Addproject = () => {
    let navigate = useNavigate();
    
    const [pro_title,setpro_title]=useState("");
    const [pro_desc,setpro_desc]=useState("");
    const [program,setprogram]=useState("BTECH");
    const [grad_year,setgrad_year]=useState("");
    const [guide_id,setguide_id]=useState("");
    const [mem_1,setmem_1]=useState("");
    const [mem_2,setmem_2]=useState("");
    const [mem_3,setmem_3]=useState("");
    const [mem_4,setmem_4]=useState("");
    const [pro_status,setpro_status]=useState("true");
    const [abstract_link,setabstract_link]=useState("");
    const [report_link,setreport_link]=useState("");
    const [hosted_link,sethosted_link]=useState("");
    const [code_link,setcode_link]=useState("");
    
    const {abstract_url,report_url,hosted_url,code_url,inputs,setInputs,
        setclkabs,setabstatus,setclkrep,setrepstatus}=useContext(ProjectsContext);
  
    const submitForm = async(e)=>{
        e.preventDefault();

        setclkabs(false);
        setabstatus(false);
        setclkrep(false);
        setrepstatus(false);

        const token = localStorage.getItem('token');

        try{
            const response = await baseurl.post("/projects",{
                pro_title,
                pro_desc,
                pro_domains:inputs,
                program,
                grad_year,
                guide_id,
                mem_1,
                mem_2,
                mem_3,
                mem_4,
                pro_status,
                abstract_link:abstract_link,
                report_link:report_url,
                hosted_link:hosted_url,
                code_link:code_url},
                {
                    headers:{
                        'authorization' : `Bearer ${token}`
                    }
                }
            );
            console.log(response.data[0]);
            setInputs(['Machine Learning']);
            navigate(`/project/${response.data[0].pro_id}`);
        }catch(err){
            console.log(err);
        }
    };

    return(
        <>
            <div className='addproject'>
                <div className='projectenter'>
                    <div className='projectinputeach'>
                        <label className='projectinputlabel'>Project Title</label>
                        <input className='inp' type="text" value={pro_title} onChange={e=>setpro_title(e.target.value)} placeholder="Title"/>                
                    </div>

                    <div className='projectinputeach'>
                        <label className='projectinputlabel'>Description</label>
                        <input className='inp' type="text" value={pro_desc} onChange={e=>setpro_desc(e.target.value)} placeholder="Desc"/>
                    </div>

                    <div className='projectinputeach'>
                        <label className='projectinputlabel'>Domains</label>
                        <DynamicForm/>
                    </div>

                    <div className='projectinputeach'>
                    <label className='projectinputlabel'>Program</label>  
                    <select className='projectselectinput' onChange={e=>setprogram(e.target.value)}>
                        <option value="BTECH">B.TECH</option>
                        <option value="MTECH">M.TECH</option>
                    </select>
                    </div>

                    <div className='projectinputeach'>
                    <label className='projectinputlabel'>Graduation Year</label>                                 
                    <input className='inp' type="text" value={grad_year} onChange={e=>setgrad_year(e.target.value)} placeholder="Grad_Year"/>
                    </div>

                    <div className='projectinputeach'>
                        <label className='projectinputlabel'>Guided By</label>
                        <input className='inp' type="text" value={guide_id} onChange={e=>setguide_id(e.target.value)} placeholder="Guide"/>
                    </div>

                    <div className='projectinputeach'>
                        <label className='projectinputlabel'>Members</label>
                        <input className='inp' type="text" value={mem_1} onChange={e=>setmem_1(e.target.value)} placeholder="mem 1"/>
                        <input className='inp' type="text" value={mem_2} onChange={e=>setmem_2(e.target.value)} placeholder="mem 2"/>
                        <input className='inp' type="text" value={mem_3} onChange={e=>setmem_3(e.target.value)} placeholder="mem 3"/>
                        <input className='inp' type="text" value={mem_4} onChange={e=>setmem_4(e.target.value)} placeholder="mem 4"/>
                    </div>

                    <div className='projectinputeach'>
                        <label className='projectinputlabel'>Pro Status</label>
                        <select className='projectselectinput' onChange={e=>setpro_status(e.target.value)}>
                            <option value="true">Complete</option>
                            <option value="false">Ongoing</option>
                        </select>
                    </div>

                    <div className="projectinputeach">
                        <label className='projectinputlabel'>Documents</label> 
                        <input className='inp' type="text" value={abstract_link} onChange={e=>setabstract_link(e.target.value)} placeholder="Paste Link"/>  
                        <br></br>
                        <span>OR</span>
                        <Fileuploader/>
                    </div>
                </div>
                <button type="submit" className='addprobut' onClick={submitForm}><FontAwesomeIcon icon={faFileCirclePlus}/> Add</button>   
            </div> 
        </>
    );
}

export default Addproject;