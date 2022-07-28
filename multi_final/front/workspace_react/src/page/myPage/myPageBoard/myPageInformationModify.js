import React,{useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {  useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './MyPageInformationModify.scss';
import CryptoJS from 'crypto-js';
import axios from 'axios';


const MyPageInformationModify = () => {

    const navigate = useNavigate();

    const { m_name } = useParams();

    const [isLogin,setIslogin]=useState();
    const [m_passwd, setm_passwd]=useState(""); //변경할 비밀번호
    const [m_passwdd, setm_passwdd]=useState(""); //기존 비밀번호
    const [m_passwdchecked, setm_passwdchecked]=useState("");
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordcheck, setIsPasswordcheck] = useState(false);

    //암호화
    //const encrypted=CryptoJS.AES.encrypt(JSON.stringify(m_passwd), 'itp123').toString();
    //복호화
    //const decrypted=CryptoJS.AES.decrypt(m_passwdd, 'itp123');
    //    var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    //console.log(m_passwdd);

    const checkPassword = (e) => {
        const pwdRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/
        //const pwdRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

        if(m_passwd===''){
            setIsPassword(false); 
        }
        else if(!pwdRegex.test(e.target.value))
           {
           setIsPassword(false); 
        }
        else setIsPassword(true); 
        
    }
    const checkPassword2=()=>{
        if(m_passwdchecked===''){
             setIsPasswordcheck(false);  
            }
        else if(!(m_passwd===m_passwdchecked)){
             setIsPasswordcheck(false); 
            }
        else setIsPasswordcheck(true); 
        
    }
    //새 비밀번호
    const changePasswd = (e) => { 
        setm_passwd(e.target.value);
     };

    axios.get(`http://localhost:3000/member/dupliname?m_name=${m_name}`)
    .then(response => {    
        console.log(response.data);
      setm_passwdd(response.data[0].m_passwd);    
      console.log(m_passwdd);
    })
    .catch(error => {
        console.log(error);
    });

     //복호화
     const decrypted=CryptoJS.AES.decrypt(m_passwdd, 'itp123');
     var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
     console.log(decryptedData)
     console.log(m_passwd)
     //회원정보 수정 버튼
     const submit=()=>{
         if(isPassword===false||isPasswordcheck===false){
            alert('입력이 올바르지 않은 항목이 있습니다. 확인해주세요')
         } else if(m_passwd===decryptedData) {
            setIsPassword(false); alert('기존 비밀번호와 같습니다')
         }
          else if(isPassword===true&&isPasswordcheck===true){
        console.log(m_passwd)
         //암호화
        const encrypted=CryptoJS.AES.encrypt(m_passwd, 'itp123').toString();
        alert('회원정보가 정상적으로 변경되었습니다')
        axios.put(`http://localhost:3000/member/${m_name}`,null,{
          params:{
            'm_passwd': encrypted
          }
        })
        .then(
            navigate('/')//성공시 메인 화면으로 돌아가기
        )   
       }
      }

      //회원탈퇴 버튼
      function Delete(m_name){

        axios.delete(`http://localhost:3000/member/delete/${m_name}`)
             .then(window.location='/', Logout()).catch(err=>console.log(err))

          }

        function Logout() {
            localStorage.clear();
            sessionStorage.clear();
            setIslogin(false);
            console.log(setIslogin);
          alert('회원탈퇴가 완료되었습니다');
        }
      

    return (
        <div id='myPageMain'>
            <Sidebar />
            <div id='modifyForm'>
                <Form>
                    <Form.Group id='modifynicknameForm' controlId="formBasicEmail">
                        <Form.Label className='modifyLabel'>닉네임</Form.Label>
                        <Form.Control className='nicknameInput' type="input" placeholder={m_name} disabled/>
                        <Form.Text className='modifyText'>
                        </Form.Text>
                    </Form.Group>
                    <div id='modifyPassword'>
                    <Form.Group  controlId="formBasicPassword">
                        <Form.Label className='modifyLabel'>비밀번호</Form.Label>
                        <Form.Control className='passwordInput' type="password" value={decryptedData} disabled/>  
                    </Form.Group>
                    <Form.Group className='modifyNewPasswordForm' controlId="formBasicPassword">
                        <Form.Control className='passwordInput_1' type="password" placeholder="새 비밀번호" minlength="8" maxlength="16" onChange={changePasswd} onBlur={checkPassword}/>            
                    </Form.Group>  
                    <Form.Text className='modifyText'>
                            {isPassword===false ? (<p className='errorcode'>패스워드를 다시입력해주세요 (영문 대소문자, 숫자, 특수문자 포함 8자리 이상 16자리 이하)</p>)  :
                        (<p className='okcode'>사용가능한 형식입니다</p>)}
                        </Form.Text>               
                    <Form.Group className='modifyCheckPasswordForm' controlId="formBasicPassword">
                        <Form.Control className='passwordInput_2' type="password" placeholder="새 비밀번호 확인" minlength="8" maxlength="16" onChange={(e)=>setm_passwdchecked(e.target.value)} onBlur={checkPassword2}/>
                    </Form.Group>
                    <Form.Text className='modifyText'>
                    {isPasswordcheck===false ? (<p className='errorcode'>패스워드가 올바르지않습니다</p>)  :
                        (<p className='okcode'>일치합니다</p>)}
                        </Form.Text>
                    </div>
                </Form>
                <div id='buttonGroup'>
                        <Button type="submit" className='withdraw' onClick={()=>Delete(m_name)}>
                            회원 탈퇴
                        </Button>
                        <Button type="submit" className='completion' onClick={()=>submit()}>
                            수정 완료
                        </Button>
                 </div>
            </div>
        </div>
    );
};

export default MyPageInformationModify;