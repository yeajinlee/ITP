import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './communityDetail.scss'
import CommunityReply from './CommunityReply'
import { BsChevronRight } from 'react-icons/bs';

const CommunityDetail = () => {
  const { no } = useParams();
  const navigate = useNavigate();
  const BackToComBoard = () => {
    navigate('/communication');
  };


  const[Comdatas,setComdata]=useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const[c_name,setc_name]=useState('');
  
  function Update(no){
   navigate(`/changeCom/${no}`)
  }
  function Delete(no){
    if(window.confirm("게시글을 삭제하시겠습니까?")){
      axios.delete(`http://localhost:3000/deleteCom/${no}`)
         .then(window.location='/communication').catch(err=>console.log(err))
    }
  }
  
    
  

  useEffect(()=>{
      const fetchCom=async()=>{
          try {
              //error 와 notice 를 초기화
              setError(null);
              setComdata(null);
              // loading 상태를 true
              setLoading(true);    
              const response=await axios.get(`http://localhost:3000/com/${no}`);
              console.log(response.data);
              setComdata(response.data);
              setc_name(response.data[0].c_name);
          }catch(e){
              setError(e);
          }
          setLoading(false);
        
      
  };
  fetchCom();
  
},[no]);


if (loading) return <div>로딩중..</div>;
if (error) return <div>에러가 발생했습니다</div>;
if (!Comdatas) return null;

  return (
    <div id='communityDetailAll'>
      <p className='communityDetailTop'>  <BsChevronRight/> <Link to='/communication' style={{textDecoration:'none',color:'black'}}>소통공간</Link></p>
     <div id='detailContentPost'>
      {Comdatas.map((Comdata,index) => (
      <Table>
        <tbody>
          <div key={index} className='detailTitle'>
            <p className='communityTitle'>
              {Comdata.c_title}
             <span id='communitynamedate'> 
            {Comdata.c_name} | {Comdata.c_date}</span></p>
            </div>
          <div className='detailContent'>{Comdata.c_content}</div>
        </tbody>
      </Table>
      ))}
     </div>
     {
        ((sessionStorage.getItem('m_name'))===c_name||(localStorage.getItem('m_name'))=== c_name|| (sessionStorage.getItem('m_name'))==='manager'||(localStorage.getItem('m_name'))==='manager')?
        
     <div id='detailButton'>
      <button className='communityDetailButton' value="목록으로" onClick={BackToComBoard} > 목록 </button>
      <button className='communityDetailButton' value="수정하기" onClick={()=>Update(no)} > 수정 </button>
      <button className='communityDetailButton' value="삭제하기" onClick={()=>Delete(no)} > 삭제 </button>
     </div>
     :
     <div id='detailButton'>
     <button className='communityDetailButton' value="목록으로" onClick={BackToComBoard} > 목록 </button>
     
    </div>
      }
      <CommunityReply/>
    </div>
  
  );
};



export default CommunityDetail;