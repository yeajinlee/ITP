import React,{useState,useEffect} from 'react';
import { Card, Button} from 'react-bootstrap';
import './GroupBoard.scss'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { BsChevronRight, BsSearch } from "react-icons/bs";

const GroupBorad = () => {
  const page=1;
  const[Groupdatas,setGroupdata]=useState([]); //전체데이터
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const[title,settitle]=useState('');
  const[search,setsearch]=useState('');
  
  const[currentpage,setcurrentpage]=useState(1);
  const itemsPerPage=6;
  const pageNumberLimit=5;
  const[maxpageNumberLimit,setmaxpageNumberLimit]=useState(5);
  const[minpageNumberLimit,setminpageNumberLimit]=useState(0);
  const [isLogin,setIslogin]=useState();
  const [filterDatas,setFilterData]=useState(Groupdatas);
const handleClickpage=(e)=>{
  setcurrentpage(Number(e.target.id))
}

const handlesearch=()=>{
  setsearch(title); //title이 입력한내용
  console.log(search);
  const newFilter=Groupdatas.filter((val)=>{
    return val.g_title.includes(search);
  
  });

  if(search!==' '){
  setFilterData(newFilter);
 
  }else{
    setFilterData(Groupdatas);
  
  }
  console.log(filterDatas);

}


console.log(Groupdatas.length);

  const pagenums=[];
  for(let i=1;i<=Math.ceil((filterDatas.length)/itemsPerPage);i++){
    pagenums.push(i);
  }
  console.log(pagenums);

  const indexOfLastItem=currentpage*itemsPerPage; //마지막 갯수
  const indexOfFirstItem=indexOfLastItem-itemsPerPage;

  const currentItems=filterDatas.slice(indexOfFirstItem,indexOfLastItem);
  
  console.log(currentItems);

  const renderPagenum=pagenums.map((number)=>{
    if(number<maxpageNumberLimit+1&&number>minpageNumberLimit){
    return(
      
      <li 
      key={number} 
      id={number} 
      onClick={handleClickpage}
      className={currentpage===number?"active":null}>
      {number}
      </li>
      
    );
    }else{
      return null;
    }
  });

  useEffect(()=>{
    if(sessionStorage.getItem('m_name')===null &&localStorage.getItem('m_name')===null){
      setIslogin(false);
    }else if(sessionStorage.getItem('m_name')==='manager'){
      setIslogin(true);
    
    }
    else{setIslogin(true);}
  },[isLogin]);

  useEffect(()=>{
    const fetchGroup=async()=>{
      try {
     
          setError(null);
          
          // loading 상태를 true
          setLoading(true); 
          
          const response=await axios.get(`http://localhost:3000/group/listAll`,null);
          setGroupdata(response.data);
          setFilterData(response.data)
          
        }catch(e){
          setError(e);
      }
      setLoading(false);
    
  
};
fetchGroup();

 },[page]);

  const handlenextbtn=()=>{
    setcurrentpage(currentpage+1);
    
    if(currentpage+1>maxpageNumberLimit){
      setmaxpageNumberLimit(maxpageNumberLimit+pageNumberLimit);
      setminpageNumberLimit(minpageNumberLimit+pageNumberLimit);
    }
  }

  const handleprevbtn=()=>{
    setcurrentpage(currentpage-1);
    
    if((currentpage-1)%pageNumberLimit===0){
      setmaxpageNumberLimit(maxpageNumberLimit-pageNumberLimit);
      setminpageNumberLimit(minpageNumberLimit-pageNumberLimit);
    }
  }

  let pageIncrementBtn=null;
  if(pagenums.length>maxpageNumberLimit){
    pageIncrementBtn=<li onClick={handlenextbtn}>&hellip;</li>
  }

  let pageDecrementBtn=null;
  if(pagenums.length>maxpageNumberLimit){
    pageDecrementBtn=<li onClick={handleprevbtn}>&hellip;</li>
  }

 

 if (loading) return <div>로딩중..</div>;
 if (error) return <div>에러가 발생했습니다</div>;
if (!Groupdatas) return null;
    return (
        <div id='groupBoardAll'>
          <p className='groupTitle'>
          <Link to='/communityGroup' style={{textDecoration:'none',color:'black'}}><BsChevronRight/> 모임찾기</Link></p>
          <div>
          {(isLogin)?
          <Link to='/groupWriting' >
            <Button  className='writingButton'>글쓰기</Button>
          </Link>:
          <></>
          }
          </div>
          
          <div id='boardLine'>
            {currentItems.map((currentItems) =>
            <Card  className='groupCardCss'>
              <Card.Body key={currentItems.g_no}>
                <Link to={"/communityGroup/"+ currentItems.g_no} style={{ textDecoration: 'none' }}>
                  <Card.Img variant='top' src={currentItems.g_img} style={{height:'120px'}} />
                  <Card.Title className='title'>{currentItems.g_title}</Card.Title>
                  <Card.Text className='cardText'> {currentItems.g_subtitle}</Card.Text>
                </Link>
                <Card.Body className='bodyLink'>
                  <Card.Link className='link'>{currentItems.g_name}</Card.Link>
                  <Card.Link className='link'>{currentItems.g_tag}</Card.Link>
                </Card.Body>
              </Card.Body>
            </Card>
            )}
          </div>
          <div id='groupSearch'>
          {/* <select className="searchfilter" >
         <option value="1" >제목</option>
          <option value="2">내용</option>
          <option value="3">작성자</option>
 
          </select> */}
            <input 
              type="text"
              onChange={(e)=>settitle(e.target.value)} 
              className="searchInput"
              placeholder='제목검색'
              value={title}
            />
            <BsSearch className='searchButton' type="button" onClick={handlesearch}/>
          </div>
          <div>
            <ul id='pageButton'>
              <li>
                <button onClick={handleprevbtn}
                disabled={currentpage===pagenums[0]?true:false}>
                  &lt;
                </button>
              </li>
              {pageIncrementBtn}
              {renderPagenum}
              {pageDecrementBtn}
              <li>
                <button onClick={handlenextbtn}
                disabled={currentpage===pagenums[pagenums.length-1]?true:false}>
                  &gt;
                </button>
              </li>
            </ul>
          </div>
        </div>
    );
};

export default GroupBorad;