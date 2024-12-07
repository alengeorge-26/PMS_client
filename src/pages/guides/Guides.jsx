import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import GuideFilter from '../../components/guidefilter/GuideFilter';
import Allguides from '../../components/allguides/Allguides';

const Guides = () => {
    return (
      <div className='guides'>
        <Navbar/>
        <GuideFilter/>
        <Allguides/>
      </div>
    )
}
export default Guides;