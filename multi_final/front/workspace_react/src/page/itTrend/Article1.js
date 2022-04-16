import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\一-龥\s]/g;
const titleUrl = (title) => {
  return title.replace(reg,"-");
};

const Article1 = () => {
    const [articles1, setArticles1] = useState(null);
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/article1');
                console.log(response);
                setArticles1(response.data);
                console.log(articles1);
            } catch (error) {
                setError(error);
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    },[]);
    if (loading) {
        return <div>오늘의 트렌드를 불러오는 중</div>;
    }
    if (error) {
      return <div>오류가 발생했습니다. 관리자에게 문의해주세요.</div>
    }
    if(!articles1) {
        return <div>오류가 발생했습니다. 관리자에게 문의해주세요.</div>;
    }
    return (
      <div className='latestArticles'>
        {articles1.articles.map((a, index) => (
          <div key={index} id='article1'>
            <Link to={titleUrl(a.title)} className="todayLink">
              <div>
                <img src={a.urlToImage} alt=""></img>
                <div className='articleTitle'>{a.title}<br/></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
};


export default Article1;
