import React, { useContext } from 'react';
import './projectfilter.css';
import { ProjectsContext } from '../../contextapi.js/projectscontext';

const ProjectFilter = () => {

    const {setDomain,setProgram,setYear,setStatus}=useContext(ProjectsContext);

    return(
    <div className='headercontainer'>
        <h1>Explore Projects</h1>
            <div className='filter'>
                <div className='drop'>
                    <label htmlFor="program">Program </label>
                    <select name="program" onChange={(e)=>setProgram(e.target.value)}>
                        <option value="All">All</option>
                        <option value="BTECH">B.TECH</option>
                        <option value="MTECH">M.TECH</option>
                    </select>
                </div>

                <div className='drop'>
                    <label htmlFor="year">Year </label>
                    <select name="year" onChange={(e)=>setYear(e.target.value)}>
                        <option value="All">All</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                </div>

                <div className='drop'>
                    <label htmlFor="domain">Domain </label>
                    <select name="domain" onChange={(e)=>setDomain(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Blockchain">Blockchain</option>
                        <option value="Web App">Web App</option>
                        <option value="IoT">IoT</option>
                        <option value="Deep Learning">Deep Learning</option>
                        <option value="Computer Networks">Computer Networks</option>
                        <option value="Data Mining">Data Mining</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                        <option value="Image processing">Image processing</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Data structures">Data structures</option>
                        <option value="Cryptography">Cryptography</option>
                        <option value="Model Checking">Model Checking</option>
                        <option value="Formal Methods">Formal Methods</option>
                        <option value="Model Checking">Model Checking</option>
                    </select>
                </div>

                <div className='drop'>
                    <label htmlFor="status">Status </label>
                    <select name="status" onChange={(e)=>setStatus(e.target.value)}>
                        <option value="All">All</option>
                        <option value="true">Completed</option>
                        <option value="false">Ongoing</option>
                    </select>
                </div>
            </div>
    </div>
    );
}

export default ProjectFilter;