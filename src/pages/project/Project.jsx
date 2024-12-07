import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import ProjectDetail from '../../components/projectdetail/ProjectDetail';

const Project = () => {
    return (
        <>
            <div className='navcomp'>
                <Navbar/>
            </div>
                    
            <div className='projectcomp'>
                <ProjectDetail/> 
            </div>
        </>
    )
}

export default Project;