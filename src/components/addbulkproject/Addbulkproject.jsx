import React, { useContext } from 'react';
import { useState } from 'react';
import { read,utils } from 'xlsx';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import baseurl from '../../baseurl/baseurl';
import { useNavigate } from 'react-router-dom';
import { ProjectsContext } from '../../contextapi.js/projectscontext';

const Addbulkproject = () => {

    const [filename,setfilename]=useState('No File');
    const [file,setfile]=useState('');
    const {setCurr_aof}=useContext(ProjectsContext);

    const [pro_title,setpro_title]=useState("");
    const [pro_desc,setpro_desc]=useState("");
    const [pro_dom,setpro_dom]=useState([]);
    const [program,setprogram]=useState("");
    const [grad_year,setgrad_year]=useState("");
    const [guide_id,setguide_id]=useState("");
    const [mem_1,setmem_1]=useState("");
    const [mem_2,setmem_2]=useState("");
    const [mem_3,setmem_3]=useState("");
    const [mem_4,setmem_4]=useState("");
    const [pro_status,setpro_status]=useState("true");
    const [abstract_link,setabstract_link]=useState("");

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
                    const response = await baseurl.post("/projects",{
                        pro_title:item[0],
                        pro_desc:item[1],
                        pro_domains:item[2],
                        program:item[3],
                        grad_year:item[4],
                        guide_id:item[5],
                        mem_1:item[6],
                        mem_2:item[7],
                        mem_3:item[8],
                        mem_4:item[9],
                        pro_status:item[10],
                        abstract_link:item[11]},
                      {
                        headers:
                        {
                            'authorization' : `Bearer ${token}`
                        }
                      }
                    );
                    console.log(response.data);
                    setCurr_aof([]);
                    navigate(`/projects`)
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
                <span>Upload Excel file of projects</span>
                <input type="file" className="customfile" onChange={change}/>
                <button className='logbut' onClick={bulkupload}>Upload</button>
            </div>
        </div>
    )
}

export default Addbulkproject;