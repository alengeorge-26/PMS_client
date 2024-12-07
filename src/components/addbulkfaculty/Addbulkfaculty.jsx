import React, { useContext } from 'react';
import './addbulkfaculty.css';
import { useState } from 'react';
import { read,utils } from 'xlsx';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import baseurl from '../../baseurl/baseurl';
import { useNavigate } from 'react-router-dom';
import { ProjectsContext } from '../../contextapi.js/projectscontext';

const Addbulkfaculty = () => {

    const [filename,setfilename]=useState('No File');
    const [file,setfile]=useState('');
    const {setCurr_aof}=useContext(ProjectsContext);

    const navigate=useNavigate();

    const change = (e) => {
        setfile(e.target.files[0]);
        setfilename(e.target.files[0].name);
    }

    const bulkupload = (e)=>{
        e.preventDefault();

        const token = localStorage.getItem('token');
        const reader = new FileReader();

        reader.onload = (e) => {

            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            {jsonData.map(async(item,i)=>{
                try{
                    const response = await baseurl.put(`/faculty/${item[0]}`,{
                        faculty_name:item[1],
                        designation:item[2],
                        contact:item[3],
                        area_of_interest:item[4] },
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
            })};
        };
        reader.readAsArrayBuffer(file);
    }

    return(
        <div className='addbulkguide'>
            <div className='bulkguide'>
                <span>Upload Excel file of faculties</span>
                <input type="file" className="customfile" onChange={change}/>
                <button className='logbut' onClick={bulkupload}>Upload</button>
            </div>
        </div>
    )
}

export default Addbulkfaculty;