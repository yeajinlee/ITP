import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';

const MyPageCommunityComment = () => {
    const { m_name } = useParams();
    const[Repdatas,setRepdata]=useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const[Groupdatas,setGroupdata]=useState([]);
    const [forumData, setForumData] = useState([]);
    
  useEffect(()=>{
    const fetchGroup=async()=>{
      try {
     
          setError(null);
          
          // loading 상태를 true
          setLoading(true); 
          
          const response=await axios.get(`http://localhost:3000/mypage/group/rep?m_name=${m_name}`,null,{
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
  useEffect(()=>{
    const fetchCom=async()=>{
      try {
     
          setError(null);
          
          // loading 상태를 true
          setLoading(true); 
          
          const response=await axios.get(`http://localhost:3000/mypage/rep?m_name=${m_name}`,null,{
            params:{
                'm_name':m_name,
              }
          });
          setRepdata(response.data);
          
        }catch(e){
          setError(e);
      }
      setLoading(false);
    
  
};
fetchCom();

 },[m_name]);


    useEffect(() => {
        const fetchForum = async() => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/mypage/forum?m_name=${m_name}`, null, {params: {'m_name': m_name}});
                setForumData(response.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchForum();
    }, [m_name]);

 if (loading) return <div>로딩중..</div>;
 if (error) return <div>에러가 발생했습니다</div>;
if (!Repdatas) return null;

    return (
      <div id="myPageMain">
        <Sidebar />
        <div id="board">
          <Tabs className="myPageTabs">
            <Tab eventKey="group" title="모임찾기">
              <Table className="myPageTable">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>작성 글 제목</th>
                    <th>작성 댓글</th>
                  </tr>
                </thead>
                <tbody>
                  {Groupdatas.map((Groupdata) => (
                    <tr key={Groupdata.rg_rno}>
                      <td>{Groupdata.rg_rno}</td>
                      <td>
                        <Link
                          to={'/communityGroup/' + Groupdata.rg_no}
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          {Groupdata.g_title}
                        </Link>
                      </td>
                      <td>{Groupdata.rg_content}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="communication" title="소통공간">
              <Table className="myPageTable">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>작성 글 제목</th>
                    <th>작성 댓글</th>
                    <th>작성일</th>
                  </tr>
                </thead>
                <tbody>
                  {Repdatas.map((Repdata) => (
                    <tr key={Repdata.r_rno}>
                      <td>{Repdata.r_rno}</td>
                      <td>
                        <Link
                          to={'/Communication/' + Repdata.r_no}
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          {Repdata.c_title}
                        </Link>
                      </td>
                      <td>{Repdata.r_content}</td>
                      <td>{Repdata.r_date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="forum" title="기술 포럼">
              <Table className="myPageTable">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>카테고리</th>
                    <th>작성 댓글</th>
                    <th>작성일</th>
                  </tr>
                </thead>
                <tbody>
                    {forumData.map((forumData) => (
                        <tr key={forumData.t_no}>
                            <td>{forumData.t_no}</td>
                            <td>{forumData.t_tag}</td>
                            <td id='forumContent'>{forumData.t_content}</td>
                            <td>{forumData.t_date}</td>
                        </tr>
                    ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
};

export default MyPageCommunityComment;