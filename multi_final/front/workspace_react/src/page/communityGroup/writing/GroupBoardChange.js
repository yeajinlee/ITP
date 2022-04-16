import React,{useEffect, useState} from 'react';
import { useNavigate,useParams} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './GroupBoardChange.scss'


const GroupBoardChange= () => {
  const navigate = useNavigate();
  const[Groupdatas,setGroupdata]=useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BackToGroupBoard = () => {
      navigate("/communityGroup");
  };

   const {no}=useParams();
   const [g_title,setg_title] =useState('')
   const [g_subtitle,setg_subtitle] =useState('')
   const[g_content,setg_content]=useState('')
   const[g_tag,setg_tag]=useState('')
 
   const handlen_title=(e)=>{
     setg_title(e.target.value)
   }

   const handlen_subtitle=(e)=>{
     setg_subtitle(e.target.value)
     console.log(g_subtitle);
   }

   const handlen_content=(e)=>{
     setg_content(e.target.value)
   }

   const handlen_tag=(e)=>{
    setg_tag(e.target.value)
    console.log(g_tag)
  }
   const submit=()=>{
     console.log(g_title)
     console.log(g_content)
     
    
     axios.put(`http://localhost:3000/updateGroup/${no}`,null,{
       params:{
         'g_title':g_title,
         'g_subtitle':g_subtitle,
         'g_content':g_content,
         'g_tag':g_tag
       }
     })
     .then(
       
      window.location='/communityGroup'//성공시 목록으로 돌아가기
     )
     
   }

   useEffect(()=>{
    const fetchGroup=async()=>{
        try {
            //error 와 notice 를 초기화
            setError(null);
            setGroupdata(null);
            // loading 상태를 true
            setLoading(true);    
            const response=await axios.get(`http://localhost:3000/group/${no}`);
            console.log(response.data);
            setGroupdata(response.data);
            setg_title(response.data[0].g_title)
            setg_subtitle(response.data[0].g_subtitle)
            setg_tag(response.data[0].g_tag)
            setg_content(response.data[0].g_content)

        }catch(e){
            setError(e);
        }
        setLoading(false);
      
    
};
fetchGroup();

},[no]);


if (loading) return <div>로딩중..</div>;
if (error) return <div>에러가 발생했습니다</div>;
if (!Groupdatas) return null;
  
  return (
    <div>
      <div id='groupModifyAll'>   
       <Form className='modifyForm'>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" onChange={(e)=>handlen_title(e)} placeholder="글 제목을 입력해주세요" value={g_title} autocomplete="off"/>
          </Form.Group>
          <Form.Group id='modifySub' controlId="exampleForm.ControlTextarea1">
            <Form.Control className='modifySubTitle' onChange={(e)=>handlen_subtitle(e)} type="text" placeholder='소제목 입력' value={g_subtitle} autocomplete="off" />
            <Form.Select className='modifySelect' onChange={(e)=>handlen_tag(e)} aria-label="Default select example" value={g_tag}>
              <option>주제</option>
              <option value="스터디" >스터디</option>
              <option value="프로젝트">프로젝트</option>
              <option value="기타">기타</option>
            </Form.Select>
          </Form.Group>
          <Form.Control as='textarea' onChange={(e)=>handlen_content(e)} className='modifyText' type="text" placeholder="내용을 입력해주세요" value={g_content} />
        </Form>
        <div id='groupModifyButton'>
        <Button className='cancel me-2' onClick={BackToGroupBoard}>
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
    </div>
  );
};

export default GroupBoardChange;