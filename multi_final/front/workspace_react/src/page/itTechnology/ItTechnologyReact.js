import React, { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './itTechnologyMain.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';


const ItTechnologyReact = () => {
    const [techReact, setTechReact] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3000/itTech/react"); //axios 이용, 스프링부트에 기술 업데이트 데이터 요청
                console.log(response);
                setTechReact(response.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    if(loading) return <div>로딩중</div>
    if(error) return <div>오류가 발생했습니다. 관리자에게 문의해주세요.</div>
    if(!techReact) return null;
    return (
        <div>
            <span className="itTechSpan">
                <Link to={'/itTech/forum/React'} style={{ textDecoration: 'none'}}>
                    <img width="220px" height="150px" src="./assets/reactLogo.png" alt="img"/>
                    <br/><span className='shortcut'>☝ React 포럼 바로가기</span>
                </Link>
                <div className='titleList'>
                    {techReact.articles.map((a, index) => (
                        <div key={index}>
                                <p>
                                    {/* 글 제목 */}
                                    <span className="boardTitle" onClick={() => window.open(`https://ko.reactjs.org${a.titleLink}`, "_blank")}>
                                        {a.title}
                                        </span>
                                    {/* 날짜 */}
                                    <span className='boardDate'>{a.date}</span>
                                </p>
                        </div>
                    ))}
                </div>
            </span>
        </div>
    );
};

export default ItTechnologyReact;