import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsChevronRight, BsSearch } from "react-icons/bs";
import '../communityCommunication/communicationBoard.scss';

const CommunicationBoard = () => {

  const page=1;
  const[Comdatas,setComdata]=useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const[title,settitle]=useState('');
  const[search,setsearch]=useState('');

  const[currentpage,setcurrentpage]=useState(1);
  const itemsPerPage=10;
  const pageNumberLimit=5;
  const[maxpageNumberLimit,setmaxpageNumberLimit]=useState(5);
  const[minpageNumberLimit,setminpageNumberLimit]=useState(0);
  const [isLogin,setIslogin]=useState();
  const [filterDatas,setFilterData]=useState(Comdatas);
  
  const pagenums=[];
  for(let i=1;i<=Math.ceil((filterDatas.length)/itemsPerPage);i++){
    pagenums.push(i);
  }
  console.log(pagenums);

  const indexOfLastItem=currentpage*itemsPerPage; //마지막 갯수
  const indexOfFirstItem=indexOfLastItem-itemsPerPage;
  const currentItems=filterDatas.slice(indexOfFirstItem,indexOfLastItem);

  console.log(currentItems);

  const handlesearch=()=>{
    setsearch(title);

      console.log(search);
      const newFilter=Comdatas.filter((val)=>{
        return val.c_title.includes(search);
      
      });
    
      if(search!==' '){
      setFilterData(newFilter);
     
      }else{
        setFilterData(Comdatas);
      
      }
      console.log(filterDatas);
    
    }
   
  
  
  const handleClickpage=(e)=>{
    setcurrentpage(Number(e.target.id))
  }

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
    
    const fetchCom=async()=>{
      try {
     
          setError(null);
          
          // loading 상태를 true
          setLoading(true); 
          
          const response=await axios.get(`http://localhost:3000/com/listAll`,null);
          setComdata(response.data);
          setFilterData(response.data);
          
        }catch(e){
          setError(e);
      }
      setLoading(false);
    
  
};
fetchCom();

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
if (!Comdatas) return null;
    return (
        <div id='communityAll'>
          <div id='mainBoard'>
            <p id='communicationTitle'> <Link to='/communication' style={{textDecoration:'none',color:'black'}}><BsChevronRight/> 소통공간</Link></p>
            {(isLogin)?
            <Link to='/communicationWriting'><Button className='cWritingButton'>글쓰기</Button></Link>
            :<></>
            }
            <Table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  </tr>
                </thead>
              <tbody>
                {currentItems.map((currentItems,index) => (
                    <tr key={index}>
                      <td>{currentItems.c_no}</td>
                      <td>
                        <Link to={'/Communication/'+currentItems.c_no} className='communityTitle' style={{ textDecoration: 'none',color: 'black' }}>
                          {currentItems.c_title}
                        </Link>
                      </td>
                      <td>
                        {currentItems.c_name}
                      </td>
                      <td>
                          {currentItems.c_date}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <div id='communitySearch'>
            <input 
              as='input'
              type="text"
              onChange={(e)=>settitle(e.target.value)} 
              className="searchInput"
              value={title}
              placeholder='제목검색'
            />
            <BsSearch className='searchButton' type="button" onClick={handlesearch}/>
          </div>
          <div>
            <ul id='communityPageButton'>
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

export default CommunicationBoard;