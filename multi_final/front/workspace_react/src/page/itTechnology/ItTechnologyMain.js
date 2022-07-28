
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItTechnologyMain.scss'
import ItTechnologyReact from './ItTechnologyReact';
import ItTechnologySpring from './ItTechnologySpring';
import ItTechnologyVue from './ItTechnologyVue';
import { BsChevronRight } from 'react-icons/bs';


const ItTechnologyMain=()=>{
    return (   
        
            <div id='itTechMain'>
            <div className='itTechPageTitle'> <BsChevronRight/> 기술 업데이트</div>
            <div>
                <div className="skill_list">
                    <ItTechnologyReact/>
                    <hr/>
                    <ItTechnologySpring/>
                    <hr/>
                    <ItTechnologyVue/>
                </div>
                </div>
            </div>


    )}
     
           
     


export default ItTechnologyMain;


