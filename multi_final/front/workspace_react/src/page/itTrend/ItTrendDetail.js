import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams,useNavigate } from 'react-router-dom';
import './ItTrendDetail.scss'
import axios from 'axios';


const ItTrendDetail = () => {
    const { title } = useParams();
    console.log(title);
    const navigate = useNavigate(); 
    const BackToItTrendMain = () => {
        navigate('/itTrend');
      };
    const [trendDetail, setTrendDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/itTrend/${title}`);
                setTrendDetail(response.data);
            } catch (error) {
                console.log(error);
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    },[]);
    if(loading) {
        return <div id="itTrendDetailAll">트렌드 기사 내용을 불러오는 중</div>
    }
    if (error) {
        return (
            <div id="itTrendDetailAll">
                오류가 발생했습니다. 관리자에게 문의해주세요.
                <button className='detailButton' value="목록으로" onClick={BackToItTrendMain} > </button>
            </div>
        );
    }
    if(!trendDetail) {
        return (
            <div id="itTrendDetailAll">
                오류가 발생했습니다. 관리자에게 문의해주세요.
                <button className='detailButton' value="원문보기" onClick={() => window.open(`${trendDetail.url}`, "_blank")}> </button>
                <button className='detailButton' value="목록으로" onClick={BackToItTrendMain} > </button>
            </div>
        );
    }

    if(trendDetail.summary === " ") {
        return (
          <div id="itTrendDetailAll">

            <p className="titleandimg">
              <p>{trendDetail.title}</p>
              <hr />
              <img src={trendDetail.urlToImage} alt="" />
            </p>

            <div className="trendContent">
                본문 요약 보기를 지원하지 않는 기사입니다. {trendDetail.content}
            </div>
            
            <input
              className="detailButton"
              type="button"
              value="원문보기"
              onClick={() => window.open(`${trendDetail.url}`, '_blank')}
            />
            <input
              className="detailButton"
              type="button"
              value="목록으로"
              onClick={BackToItTrendMain}
            />
          </div>
        );
    }

    return (
      <div id="itTrendDetailAll" className="detailMain">
        <p className='titleandimg'>
          <p>{trendDetail.title}</p>
          <hr />
          <img src={trendDetail.urlToImage} alt="" />
        </p>
        <div className="trendContent">
          <ol>
            {trendDetail.summary.split('\\n').map((line) => {
              return (
                <li>
                  {line}
                  <br />
                </li>
              );
            })}
          </ol>
        </div>
        <div>
          <button
            className="detailButton"
            value="원문보기"
            onClick={() => window.open(`${trendDetail.url}`, '_blank')}
          >
            뉴스원문
          </button>
          <button
            className="detailButton"
            value="목록으로"
            onClick={BackToItTrendMain}
          >
            목록
          </button>
        </div>
      </div>
    ); 
};

export default ItTrendDetail;