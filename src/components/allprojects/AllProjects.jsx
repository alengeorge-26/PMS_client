import React, { useContext, useEffect, useState } from 'react';
import './allprojects.css';
import { useNavigate } from 'react-router-dom';
import baseurl from '../../baseurl/baseurl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProjectsContext } from '../../contextapi.js/projectscontext';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const AllProjects = (props) => {

   const {domain,status,year,program}=useContext(ProjectsContext);
   const [projects,setProjects]=useState([]);

    let navigate = useNavigate();

    let filteredprojects=[];

    useEffect(()=>{
        const fetchData =async()=>{
        try{
            const response = await baseurl.get("/projects");
            setProjects(response.data);
            console.log(response.data);
        }catch(err){
            console.log(err)
        }
    };
        fetchData();    
  },[]);

    filteredprojects = projects;

    if (domain !== "All"){
        filteredprojects = filteredprojects.filter((item)=>item.pro_domains.includes(domain));
    }

    if (program !== "All"){
        filteredprojects = filteredprojects.filter((item)=>item.program===program);
    }

    if (year !== "All"){
        filteredprojects = filteredprojects.filter((item)=>item.grad_year===parseInt(year));
    }

    if (status !== "All"){
        if(status==="true"){
        filteredprojects = filteredprojects.filter((item)=>item.pro_status===true);
        }

        if(status==="false"){
        filteredprojects = filteredprojects.filter((item)=>item.pro_status===false);
        }
    }

    return(
        
    <div className='allprojects'>
        <div className='projectcontainer'>
            {filteredprojects.map((res,i)=>{
                return(
                    <div className='projectitem' key={res.pro_id}  onClick={()=>navigate(`/project/${res.pro_id}`)} id="projectpointer">
                        <span className='project-title'>{res.pro_title}</span>
                        <span className='project-domain'>
                            <span>Domians <FontAwesomeIcon icon={faLayerGroup}/> </span>
                            <br></br>
                            {res.pro_domains.map((item,i)=>{
                                return(
                                    <>
                                        <span key={i}>{item} </span>
                                        <br></br>
                                    </>
                                );
                            })}
                        </span>
                        <span className='project-status'>{res.pro_status ? "Completed" : "Ongoing"}</span>
                    </div>
                )
            })}
        </div>
    </div>
    )
}

export default AllProjects;