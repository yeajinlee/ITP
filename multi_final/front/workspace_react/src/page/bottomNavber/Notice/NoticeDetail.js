import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './noticeDetail.scss'
import { BsChevronRight } from "react-icons/bs";


const NoticeDetail = () => {
  const { no } = useParams();
  const navigate = useNavigate();
  const BackToNotice = () => {
    navigate('/notice');
  };
 
  const[Noticedatas,setNoticedata]=useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  function Update(no){
   navigate(`/changeNotice/${no}`)
  }
  function Delete(no){
       
    axios.delete(`http://localhost:3000/deleteNotice/${no}`)
         .then(window.location='/notice').catch(err=>console.log(err))
      }
  
  useEffect(()=>{
      const fetchNotice=async()=>{
          try {
              //error 와 notice 를 초기화
              setError(null);
              setNoticedata(null);
              // loading 상태를 true
              setLoading(true);    
              const response=await axios.get(`http://localhost:3000/notice/${no}`);
              console.log(response.data);
              setNoticedata(response.data);
          }catch(e){
              setError(e);
          }
          setLoading(false);
        
      
  };
  fetchNotice();
  
},[no]);


if (loading) return <div>로딩중..</div>;
if (error) return <div>에러가 발생했습니다</div>;
if (!Noticedatas) return null;

  return (
    <div id='noticeDetailAll'>
      <p className='noticeDetailTop'> <BsChevronRight/> 공지사항</p>
     <div id='detailNoticePost'>
      {Noticedatas.map((Noticedata,index) => (
      <Table>
        <tbody>
          <div key={index} id='detailTitle'>
            <p className='noticeTitle'>
           {Noticedata.n_title}    <span id='noticedate'> 
            {Noticedata.n_date}</span>
            </p>
            </div>
          <div className='noticeContent'>{Noticedata.n_content}</div>
        </tbody>
        
      </Table>
      ))}
     </div>

      {sessionStorage.getItem('m_name') === 'manager' ||
      localStorage.getItem('m_name') === 'manager' ? (
        <>
          <button value="삭제하기" onClick={() => Delete(no)}>
            삭제
          </button>
          <button value="수정하기" onClick={() => Update(no)}>
            수정
          </button>
          <button value="목록으로" onClick={BackToNotice}>
            목록
          </button>
        </>
      ) : (
        <>
          <button value="목록으로" onClick={BackToNotice}>
            목록
          </button>
        </>
      )}
    </div>
  );
};



export default NoticeDetail;