import React, {useState} from 'react';
import './communicationWriting.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { BsChevronRight} from "react-icons/bs";


// eslint-disable-next-line
const CommunicationWriting = () => {
  const navigate = useNavigate();

  const BackToCommunitcationBoard = () => {
    navigate("/communication");
};
     
    const [c_title,setc_title] =useState('')
    const[c_content,setc_content]=useState('')
    const[g_tag,setc_tag]=useState('')
    const c_name=sessionStorage.getItem('m_name');

    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    
    const c_date= year + '-' + month  + '-' + day;

    const handlec_title=(e)=>{
      setc_title(e.target.value)
      console.log(c_title);
     
    }

   
    const handlec_content=(e)=>{
      setc_content(e.target.value)
      console.log(c_content);
    }

   
    const submit=()=>{
     console.log(c_title);

     console.log(c_content);
     if(c_title===''||c_content===''){alert('제목,내용 모두 입력해주세요')}
     else{      
      axios.post(`http://localhost:3000/addCom`,null,{
        params:{
          'c_name':c_name,
          'c_title':c_title,
          'c_content':c_content,
          'c_date':c_date,
        
         
        }
      })
      .then(res=>{
        console.log(res)
        console.log(res.data.c_title)
        console.log(res.data.c_content)
       
        document.location.href=`/communication`;//성공시 목록으로 돌아가기
      })
      .catch()
    }
    }
   
    return (
      
 
      <div id='communityWritingAll'>
        <p className='communityTitle'><BsChevronRight/> 소통공간</p>
        <Form className='writingForm'>
          <Form.Group id='writingTop' controlId="exampleForm.ControlInput1">
           
            <Form.Control type="text" onChange={(e)=>handlec_title(e)} placeholder="글 제목을 입력해주세요" autocomplete="off" />
          </Form.Group>
            <Form.Control as='textarea' onChange={(e)=>handlec_content(e)} className='writingText' type="text" placeholder="내용을 입력해주세요" />
        </Form>
        <div id='button'>
            <Button className='cancel me-2' onClick={BackToCommunitcationBoard}>
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
}

export default CommunicationWriting;