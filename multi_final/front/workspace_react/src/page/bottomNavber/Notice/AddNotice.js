import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { BsChevronRight } from 'react-icons/bs';
import './noticeWriting.scss';


const AddNotice = () => {
  const navigate = useNavigate();
  const BackToNotice = () => {
      navigate("/notice");
  };

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

   const submit=()=>{
     console.log(n_title)
     console.log(n_content)
     
     
     axios.post(`http://localhost:3000/addNotice`,null,{
       params:{
         'n_title':n_title,
         'n_content':n_content,
         'n_date':n_date
       }
     })
     .then(res=>{
       console.log(res)
       console.log(res.data.n_title)
       console.log(res.data.n_content)
      
       document.location.href=`/notice`;//성공시 목록으로 돌아가기
     })
     .catch()
   }
  
  return (
      <div id='noticeAll'>
        <p> <BsChevronRight/>공지사항</p>
        <Form className='writingForm'>
          <Form.Group id='writingTop' controlId="exampleForm.ControlInput1">
            <Form.Control type="text" onChange={(e)=>handlen_title(e)} placeholder="글 제목을 입력해주세요" />
          </Form.Group>
            <Form.Control as='textarea' onChange={(e)=>handlen_content(e)} className='writingText' type="text" placeholder="내용을 입력해주세요" />
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

export default AddNotice;