import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';


function MyPageCommunityBoard(props) {
    const { m_name } = useParams();
    const[Groupdatas,setGroupdata]=useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const[Comdatas,setComdata]=useState([]);
 
  

  useEffect(()=>{
    const fetchGroup=async()=>{
      try {
     
          setError(null);
          
          // loading 상태를 true
          setLoading(true); 
          
          const response=await axios.get(`http://localhost:3000/mypage/group/?m_name=${m_name}`,null,{
            params:{
                'm_name':m_name,
              }
          });
          setGroupdata(response.data);
          
        }catch(e){
          setError(e);
      }
      setLoading(false);
    
  
};
fetchGroup();

 },[m_name]);

 console.log(m_name);
 
 useEffect(()=>{
    const fetchCom=async()=>{
      try {
     
          setError(null);
          
          // loading 상태를 true
          setLoading(true); 
          
          const response=await axios.get(`http://localhost:3000/mypage/com?m_name=${m_name}`,null,{
            params:{
                'm_name':m_name,
              }
          });
          setComdata(response.data);
          
        }catch(e){
          setError(e);
      }
      setLoading(false);
    
  
};
fetchCom();

 },[m_name]);

 
 if (loading) return <div>로딩중..</div>;
 if (error) return <div>에러가 발생했습니다</div>;
if (!Groupdatas) return null;
if (!Comdatas) return null;
    return (
        <div id='myPageMain'>
            <Sidebar /> 
            <div id='board'>
            <Tabs className='myPageTabs'>
                <Tab eventKey="group" title="모임찾기" >
                    <Table className='myPageTable'>
                        <thead>
                            <tr>
                                <th id="g_no">번호</th>
                                <th id="g_title">제목</th>
                                <th id="g_tag">카테고리</th>
                                <td id="g_apply">신청현황</td>
                            </tr>
                        </thead>
                        <tbody>
                            {Groupdatas.map((Groupdata) => (
                            <tr key={Groupdata.g_no}>
                                <td id="g_no1">{Groupdata.g_no}</td>
                                <td id="g_title1">
                                    <Link to={'/communityGroup/'+Groupdata.g_no} style={{ textDecoration: 'none',color:'black'}}>
                                        {Groupdata.g_title}
                                    </Link>
                                </td>
                                <td id="g_tag1">
                                    {Groupdata.g_tag}
                                </td>
                                <td id="apply">  <Link to={'/applylist/'+Groupdata.g_no} style={{ textDecoration: 'none',color:'black'}}><input type="button" value="확인" id="applybutton" /></Link></td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="communication" title="소통공간">
                    <Table className='myPageTable'>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Comdatas.map((Comdata) => (
                            <tr key={Comdata.c_no}>
                                <td>{Comdata.c_no}</td>
                                <td>
                                    <Link to={'/Communication/'+Comdata.c_no} style={{ textDecoration: 'none',color:'black'}}>
                                        {Comdata.c_title}
                                    </Link>
                                </td>
                                <td>
                                    {Comdata.c_date}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
            </div>
        </div>
    );
}

export default MyPageCommunityBoard;
