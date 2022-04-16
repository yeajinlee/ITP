import React,{useEffect, useState} from 'react';
import { useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const CommunityChange= () => {
  const navigate = useNavigate();
  const[Comdatas,setComdata]=useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const BackToComBoard = () => {
      navigate("/communication");
  };

   const {no}=useParams();
   const [c_title,setc_title] =useState('')
   const[c_content,setc_content]=useState('')
 
   const handlec_title=(e)=>{
     setc_title(e.target.value)
   }
   const handlec_content=(e)=>{
     setc_content(e.target.value)
   }
      
   const submit=()=>{
     console.log(c_title)
     console.log(c_content)
     
    
     axios.put(`http://localhost:3000/updateCom/${no}`,null,{
       params:{
         'c_title':c_title,
         'c_content':c_content,
       }
     })
     .then(
       
      window.location='/communication'//성공시 목록으로 돌아가기
     )
     
   }

   useEffect(()=>{
    const fetchCom=async()=>{
      try {
     
          setError(null);
          
          // loading 상태를 true
          setLoading(true); 
          
          const response=await axios.get(`http://localhost:3000/com/${no}`);
          setComdata(response.data);
          setc_title(response.data[0].c_title)
          setc_content(response.data[0].c_content)
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
    <div id='communityWritingAll'>
      <p className='communityTitle'>소통공간</p>
      <Form className='writingForm'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="text" onChange={(e)=>handlec_title(e)} value={c_title} placeholder="글 제목을 입력해주세요" autocomplete="off" />
        </Form.Group>
          <Form.Control as='textarea' onChange={(e)=>handlec_content(e)} value={c_content} className='writingText' type="text" placeholder="내용을 입력해주세요" />
      </Form>
      <div id='button'>
          <Button className='cancel me-2' onClick={BackToComBoard} >
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

export default CommunityChange;