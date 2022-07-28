import { Routes, Route } from "react-router-dom";
import './App.scss';
// 메인
import MainTopNavberLogin from "./components/main/MainTopNavber";
import Main from "./page/Main";
import MainBottomNevber from "./components/main/MainBottomNavber.js";
// 로그인 및 회원가입
import Login from "./page/Login";
import Register from "./page/Register";
import MainOnLogin from "./page/MainOnLogin"; 
// 공지사항 및 자주 묻는 질문
import Notice from "./page/bottomNavber/Notice/Notice";
import NoticeDetail from "./page/bottomNavber/Notice/NoticeDetail";
import AddNotice from "./page/bottomNavber/Notice/AddNotice";
import ChangeNotice from "./page/bottomNavber/Notice/ChangeNotice";
import Faq from "./page/bottomNavber/FAQ/FAQ";
// IT 기술
import ItTechnologyMain from './page/itTechnology/ItTechnologyAll.js'; 
import ItTechnologyForum from "./page/itTechnology/itTechnologyForum/ItTechnologyForum";
// IT 트렌드
import ItTrendMain from'./page/itTrend/ItTrendMain.js';
import ItTrendDetail from "./page/itTrend/ItTrendDetail.js";
// My Page
import MyPageMain from "./page/myPage/MyPageMain";
import MyPageComment from "./page/myPage/myPageBoard/MyPageComment";
import MyPageInformationModify from "./page/myPage/myPageBoard/MyPageInformationModify";
// 이용약관 및 개인정보처리방침
import Infolaw from "./page/bottomNavber/Infolaw";
import Useterm from "./page/bottomNavber/Useterm";
// 모임찾기
import GroupMain from "./page/communityGroup/GroupMain";
import GroupWriting from "./page/communityGroup/writing/GroupWritingMain";
// 소통공간
import CommunicationMain from "./page/communityCommunication/CommunicationMain";
import CommunicationWriting from "./page/communityCommunication/writing/CommunicationWritingMain"
import GroupBoardDetail from "./page/communityGroup/GroupBoardDetail";
import GroupBoardChange from "./page/communityGroup/writing/GroupBoardChange";
import CommunityDetail from "./page/communityCommunication/CommunityDetail"
import CommunityChange from "./page/communityCommunication/writing/CommunityChange"
import GroupApplylist from "./page/myPage/myPageBoard/GroupApplylist";
import GroupApply from "./page/communityGroup/GroupApply";
import GroupApplycheck from "./page/myPage/myPageBoard/GroupApplycheck";


const App = () => {
  

  return (

// if문으로 참, 거짓 판단 후 출력하는 것도 고민해볼 것.
      <div id="all">
        <MainTopNavberLogin />
    <Routes>
      {/* 메인 */}
      <Route index element={<Main />} />
      {/* 로그인 */}
      <Route path="/login" element={<Login />} />
      <Route path="/mainOnLogin" element={<MainOnLogin />} />
      {/* 회원가입 */}
      <Route path="/Register" element={<Register />} />
      {/* 공지사항 */}
      <Route path="/notice" element={<Notice />}/>
      <Route path="/notice/:no" element={<NoticeDetail/>}/>
      <Route path="/addNotice" element={<AddNotice/>}/>
      <Route path="/changeNotice/:no" element={<ChangeNotice/>}/>
      {/* 이용약관 및 개인정보처리방침 */}
      <Route path="/Useterm" element={<Useterm />} />
      <Route path="/Infolaw" element={<Infolaw/>} />
      {/* IT 기술 */}
      <Route path="/itTech" element={<ItTechnologyMain/>} />
      <Route path="/itTech/forum" element={<ItTechnologyForum/>} exact={true} />
      <Route path="/itTech/forum/:tag" element={<ItTechnologyForum/>} />
      {/* IT 트렌드 */}
      <Route path="/itTrend" element={<ItTrendMain/>} />
      <Route path="/itTrend/:title" element={<ItTrendDetail/>} />
      {/* My Page */}
      <Route path="/myPageBoard/:m_name" element={<MyPageMain />} />
      <Route path="/myPageComment/:m_name" element={<MyPageComment />} />
      <Route path="/myPageInformationModify/:m_name" element={<MyPageInformationModify />} />
      <Route path="/applylist/:g_no" element={<GroupApplycheck/>} />
      <Route path="/applymylist/:m_name" element={<GroupApplylist/>} />
      {/* 모임찾기 */}
      <Route path="/communityGroup" element={<GroupMain />} />
      <Route path="/groupWriting" element={<GroupWriting />} />
      <Route path="/communityGroup/:no" element={<GroupBoardDetail />} />
      <Route path="/changeGroup/:no" element={<GroupBoardChange/>} />
      <Route path="/applygroup/:no" element={<GroupApply/>} />
      {/* 소통공간 */}
      <Route path="/communication" element={<CommunicationMain/>} />
      <Route path="/CommunicationWriting" element={<CommunicationWriting />} />
      <Route path="/Communication/:no" element={<CommunityDetail />} />
      <Route path="/ChangeCom/:no" element={<CommunityChange />} />
      {/* 자주 묻는 질문 */}
      <Route path="/faq" element={<Faq />} />
    </Routes>
    <MainBottomNevber />
    </div>
  );
};
export default App;
