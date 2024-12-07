import React, { useContext } from 'react';
import './guidefilter.css';
import { ProjectsContext } from '../../contextapi.js/projectscontext';

const GuideFilter = () => {
    const {setSkill}=useContext(ProjectsContext);

    return(
    <div className='headercontainer'>
        <h1>Explore Guides</h1>
        <div className='filter'>
            <div className='drop'>
                <label htmlFor="skill">Area Of Interest</label>
                <select name="skill" onChange={(e)=>setSkill(e.target.value)}>
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
                    <option value="Natural Language Processing">Natural Language Processing</option>
                    <option value="Computer Vision">Computer Vision</option>
                </select>
            </div>
        </div>
    </div>
    );
}

export default GuideFilter;