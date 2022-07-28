import React, { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItTechnologyMain.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';

const ItTechnologySpring = () => {
    const [techSpring, setTechSpring] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const resposne = await axios.get("http://localhost:3000/itTech/spring");
                setTechSpring(resposne.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, []);
    if(loading) return <div>로딩중</div>
    if(error) return <div>오류가 발생했습니다. 관리자에게 문의해주세요.</div>
    if(!techSpring) return null;
    return (
        <div>
            <span className="itTechSpan">
                <Link to={'/itTech/forum/Spring'} style={{ textDecoration: 'none'}}>
                    <img width="220px" height="150px" src="./assets/springLogo.png" alt="img" />
                    <br/><span className='shortcut'>☝ Spring 포럼 바로가기</span>
                </Link>
                <div className='titleList'>
                    {techSpring.articles.map((a, index) => (
                        <div key={index}>
                             <p>
                                <span className="boardTitle" onClick={() => window.open(`https://spring.io${a.titleLink}`, "_blank")}>{a.title} </span>
                                <span className='boardDate'>{a.date}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </span>
        </div>
    );
};

export default ItTechnologySpring;