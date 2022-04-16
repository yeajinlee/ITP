import React, { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './itTechnologyMain.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';


const ItTechnologyVue = () => {
    const [techVue, setTechVue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const resposne = await axios.get("http://localhost:3000/itTech/vue");
                setTechVue(resposne.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, []);
    if(loading) return <div>로딩중</div>
    if(error) return <div>오류가 발생했습니다. 관리자에게 문의해주세요.</div>
    if(!techVue) return null;
    return (
        <div>
            <span className="itTechSpan">
                <Link to={'/itTech/forum/Vue'} style={{ textDecoration: 'none'}}>
                    <img width="220px" height="150px" src="./assets/vueLogo.png" alt="img" />
                    <br/><span className='shortcut'>☝ Vue 포럼 바로가기</span>
                </Link>
                <div className='titleList'>
                    {techVue.articles.map((a, index) => (
                        <div key={index}>
                            <p >
                                <span className="boardTitle" onClick={() => window.open(`https://news.vuejs.org/${a.titleLink}`, "_blank")}>{a.title}</span>
                                <span className='boardDate'>{a.date}</span>
                            </p>
                        </div>
                    ))}
                </div>
                
            </span>
        </div>
    );
};

export default ItTechnologyVue;