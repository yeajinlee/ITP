import React, { useState } from 'react';
import '../components/Register/Register.scss';
import { Link, } from "react-router-dom";
import axios from 'axios';
import CryptoJS from 'crypto-js';
 
function Register() {
   
    //추가
    const [m_name,setm_name]=useState("");
    const [m_email,setm_email]=useState("");
    const [m_passwd,setm_passwd]=useState("");
    const[m_passwdcheck,setm_passwdcheck]=useState("");
    const[checked,setchecked]=useState(false);
    const m_role=1;
    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordcheck, setIsPasswordcheck] = useState(false);
    const [ischeckboxchecked,setIscheckboxchecked]=useState(false);
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    
    const m_date= year + '-' + month  + '-' + day;


    const checkname=(e)=>{
        const nameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{2,15}$/; 

        if(m_name===null||''){
             setIsName(false);
            }
        else if(!nameRegex.test(e.target.value)){
           setIsName(false);
        }else setIsName(true);
        
    }
    const checkemail=(e)=>{
       // const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const emailRegex=/^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        if(m_email===''){
             setIsEmail(false);
            }
        else if(!emailRegex.test(e.target.value)){
           setIsEmail(false);
        }else setIsEmail(true);
        
    }
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
    const checkpassword2=()=>{
        if(m_passwdcheck===''){
             setIsPasswordcheck(false);  
            }
        else if(!(m_passwd===m_passwdcheck)){
             setIsPasswordcheck(false); 
            }
        else setIsPasswordcheck(true); 
        
    }

    const checkboxchecked= (e) =>{
        if(checked==='false'){

            setIscheckboxchecked(false);
        }else  setIscheckboxchecked(true);
       
    }

    const handlechange = (e) => {
        setchecked(!checked);
      };
    // 데이터 폼 유효성 검사를 처리하는 함수를 받는다. 데이터 값 형식의 객체를 인수로 받아들이고 정의 된 규칙에 따라 객체의 각 속성의 유효성을 검사
   
    //닉네임 중복체크
   function m_namecheck(m_name){
     
    axios.get(`http://localhost:3000/member/dupliname?m_name=${m_name}`)
    .then(response => {    
        console.log(response.data);
        if(response.data.length>0)  {setIsName(false); alert('중복입니다.'); }
        else { setIsName(true); alert('중복이 아닙니다.');}
     })
     .catch(error => {
        console.log(error);
     });
        
    }

    //이메일 중복체크
    function m_emailcheck(m_email){
      
        axios.get(`http://localhost:3000/member/dupliemail?m_email=${m_email}`)
        .then(response => {    
            console.log(response.data);
            if(response.data.length>0) {setIsEmail(false); alert('중복입니다.'); }
            else {setIsEmail(true); alert('중복이 아닙니다.');} 
            console.log({m_namecheck})
         })
         .catch(error => {
            console.log(error);
         });
            
        }

    // submitForm : 폼 데이터의 제출을 처리한다
    const submitForm = () => {
        if(isName===false||isEmail===false||isPassword===false||isPasswordcheck===false||ischeckboxchecked===false||ischeckboxchecked===false){
            alert('입력이 올바르지 않은 항목이 있습니다. 확인해주세요')
        console.log(m_name);
        console.log(m_role);
        console.log(m_date);
        console.log(m_passwd);
        console.log(m_passwdcheck);
        console.log(checked);}
     else if(isName===true&&isEmail===true&&isPassword===true&&isPasswordcheck===true&&ischeckboxchecked===true&&ischeckboxchecked===true){
        const m_passwdcrypto = CryptoJS.AES.encrypt(m_passwd, 'itp123').toString();
        alert('저희 ITP 회원이 되어주셔서 감사합니다!')
        axios.post(`http://localhost:3000/addMember`,null,{
            params:{
              'm_name':m_name,
              'm_email':m_email,
              'm_passwd':m_passwdcrypto,
              'm_date':m_date,
              'm_role':m_role 
             
            }
          })
          .then(res=>{
            console.log(res)
            window.location='/login';//성공시 로그인으로 돌아가기
          })
          .catch()
        }
      
    };

    return (
            <div id="registerAll">
                {/* form */}
                <form  action="#" id="registerForm">
                    <div id='registerInput'>
                        <p className="title">회원가입</p>
                        {/* 닉네임 입력 */}
                        <input type="text" name="m_name" autocomplete="off" value={m_name} onChange={(e)=>setm_name(e.target.value)} onBlur={checkname}
                        placeholder="닉네임 (한글, 영문, 숫자 포함 15자 이하)" />
                        <input type="button" name="m_namecheck" id="m_namecheck" className='duplicateCheck' value="중복확인" onClick={()=>m_namecheck(m_name)}/>
                        {isName===false ? (<p className='errorcode'>닉네임을 다시입력해주세요</p>)  :
                        (<p className='okcode'>사용가능한 형식입니다 중복확인을 진행해주세요</p>)}
                        {/* 이메일 입력 */}
                        <input type="text" name="m_email" value={m_email} onChange={(e)=>setm_email(e.target.value)} onBlur={checkemail}
                        placeholder="이메일" />
                       <input type="button" name="m_emailcheck" id="m_emailcheck" className='duplicateCheck' value="중복확인" onClick={()=>m_emailcheck(m_email)}/>
                        {isEmail===false ? (<p className='errorcode'>이메일을 다시입력해주세요</p>)  :
                        (<p className='okcode'>사용가능한 형식입니다 중복확인을 진행해주세요</p>)}
                        {/* 비밀번호 입력 */}
                        <input type="password" name="m_passwd" value={m_passwd} onChange={(e)=>setm_passwd(e.target.value)} onBlur={checkPassword}
                        placeholder="비밀번호 (영문 대소문자, 숫자, 특수문자 포함 8자 이상)" minlength="8" maxlength="16" />
                             
                        {isPassword===false ? (<p className='errorcode'>패스워드를 다시입력해주세요</p>)  :
                        (<p className='okcode'>사용가능한 형식입니다</p>)}
                        {/* 비밀번호 확인 */}
                        <input type="password" name="m_passwdcheck" value={m_passwdcheck} onChange={(e)=>setm_passwdcheck(e.target.value)} onBlur={checkpassword2}
                        placeholder="비밀번호확인" minlength="8" maxlength="16" />
                        {isPasswordcheck===false ? (<p className='errorcode'>패스워드가 올바르지않습니다</p>)  :
                        (<p className='okcode'>일치합니다</p>)}
                    </div>
                    <div id='registerCheck'>
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"   checked={checked} onChange={handlechange} onBlur={checkboxchecked} />
                        <label class="form-check-label" for="exampleCheck1">회원 가입에 동의 하시나요?</label>
                    </div> 
                    <input type="submit" value="회원가입" className='signUpButton' onClick={submitForm}/>
                </form>
            </div>
        );
    }        
   

export default Register;