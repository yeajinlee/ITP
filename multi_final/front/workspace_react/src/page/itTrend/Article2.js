import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\一-龥\s]/g;
const titleUrl = (title) => {
  return title.replace(reg,"-");
};

const Article2 = () => {
    const [articles2, setArticles2] = useState(null);
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/article2');
                console.log(response);
                setArticles2(response.data);
                console.log(articles2);
            } catch (error) {
                console.log(error);
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    if (loading) {
        return <div>이번주의 트렌드를 불러오는 중</div>;
    }
    if (error) {
      return <div>오류가 발생했습니다. 관리자에게 문의해주세요.</div>
    }
    if(!articles2) {
        return null;
    }
    articles2.articles.splice(0, 2);
    return (
      <div id="article2">
        {articles2.articles.map((a, index) => (
          <div key={index} className="article2A">
            <Link to={titleUrl(a.title)} className="articleLink">
              <img src={a.urlToImage} alt=""></img>
              <div className='articleTitle'>{a.title}</div>
            </Link>
          </div>
        ))}
      </div>
    );
  };


export default Article2;