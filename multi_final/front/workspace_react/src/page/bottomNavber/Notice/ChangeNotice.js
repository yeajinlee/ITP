import React,{useEffect, useState} from 'react';
import { useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { BsChevronRight } from 'react-icons/bs';
import './noticeWriting.scss';


const ChangeNotice = () => {
  const navigate = useNavigate();
  const[Noticedatas,setNoticedata]=useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BackToNotice = () => {
      navigate("/notice");
  };

   const {no}=useParams();
  
   const [n_title,setn_title] =useState('')
   const[n_content,setn_content]=useState('')

   const handlen_title=(e)=>{
     setn_title(e.target.value)
   }
   const handlen_content=(e)=>{
     setn_content(e.target.value)
   }
  
   var today = new Date();

   var year = today.getFullYear();
   var month = ('0' + (today.getMonth() + 1)).slice(-2);
   var day = ('0' + today.getDate()).slice(-2);
   
   const n_date= year + '-' + month  + '-' + day;

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
            setn_title(response.data[0].n_title);
            setn_content(response.data[0].n_content);

        }catch(e){
            setError(e);
        }
        setLoading(false);
      
    
};
fetchNotice();

},[no]);

   
   const submit=()=>{
     console.log(n_title)
     console.log(n_content)
     
    
     axios.put(`http://localhost:3000/updateNotice/${no}`,null,{
       params:{
         'n_title':n_title,
         'n_content':n_content,
         'n_date':n_date
       }
     })
     .then(
       
       navigate('/notice')//성공시 목록으로 돌아가기
     )
     
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
            setn_title(response.data[0].n_title)
            setn_content(response.data[0].n_content)
           

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
      /* 옵션 기능만 빼면 소통공간 게시글 작성과 같기에 css를 넣지 않음. */
    <div id='noticeAll'>
    <p><BsChevronRight/>공지사항</p>
    <Form className='writingForm'>
      <Form.Group id='writingTop' controlId="exampleForm.ControlInput1">
        <Form.Control type="text" onChange={(e)=>handlen_title(e)} value={n_title} placeholder="글 제목을 입력해주세요" />
      </Form.Group>
        <Form.Control as='textarea' onChange={(e)=>handlen_content(e)} className='writingText' type="text" value={n_content} placeholder="내용을 입력해주세요" />
    </Form>
    <div id='button'>
        <Button className='cancel me-2' onClick={BackToNotice}>
          취소
        </Button>
      <Button 
      type="submit"
      className="submit-button"
      onClick={()=>submit()}
      >
        등록
      </Button>
    </div>
    </div>
  );
};

export default ChangeNotice;