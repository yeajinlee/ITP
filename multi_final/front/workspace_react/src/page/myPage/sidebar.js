import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import SidebarItem from "./PageSide";


function Sidebar() {
  const [issession,setissession]=useState();
  const [rg_name,setrg_name]=useState(''); //댓글쓴 이름

  const myWrite = [
    { name: "작성 글", path: `/myPageBoard/${rg_name}` },
    { name: "댓글", path: `/myPageComment/${rg_name}` },
    { name: "모임신청", path:`/applymylist/${rg_name}` }
  ];
  const menus = [
    { name: "정보 수정", path: `/myPageInformationModify/${rg_name}`}
  ];



      
  useEffect(()=>{
    if(sessionStorage.getItem('m_name')===null || localStorage.getItem('m_name')!==null){
      setissession(true);setrg_name(localStorage.getItem('m_name'));
    }else if(sessionStorage.getItem('m_name')!==null ||localStorage.getItem('m_name')===null){
      setissession(false); setrg_name(sessionStorage.getItem('m_name'));
     
    }
   
  },[issession]);
  return (
    <div id="sideBar">
      {rg_name} 님의 정보
      <div className="Menu">
        {myWrite.map((menu, index) => {
          return (
          <NavLink
            exact
            style={{ color: 'gray', textDecoration: 'none' }}
            to={menu.path}
            key={index}
            activeStyle={{ color: 'black' }}
          >
            {(window.location.pathname === menu.path ? <b><SidebarItem menu={menu} /></b> : <SidebarItem menu={menu} />)}
            
          </NavLink>
          )
          
        })}
      </div>
      <div className="Menu">
        {menus.map((menu, index) => {
          return (
            <NavLink
              exact
              style={{ color: 'gray', textDecoration: 'none' }}
              to={menu.path}
              key={index}
              activeStyle={{ color: 'black' }}
            >
              {(window.location.pathname === menu.path ? <b><SidebarItem menu={menu} /></b> : <SidebarItem menu={menu} />)}
              {/* <SidebarItem menu={menu} /> */}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;