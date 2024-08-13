import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import userAvatar from './images/user_avatar.jpg';
import home from './images/home.svg';
import leaderboard from './images/leaderboard.svg';
import quests from './images/quests.svg';
import friends from './images/friends.svg';
import StartPage from "./pages/StartPage/StartPage";
import HomePage from "./pages/HomePage/HomePage";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Quests from "./pages/Quests/Quests";
import QuestsTg from "./pages/Quests/QuestsTg";
import QuestsX from "./pages/Quests/QuestsX";
import QuestsMinstart from "./pages/Quests/QuestsMinstart";
import QuestsFriends from "./pages/Quests/QuestsFriends";
import QuestsMintWeekly from "./pages/Quests/QuestsMintWeekly";
import QuestsDone from "./pages/Quests/QuestsDone";
import NoFriends from "./pages/NoFriends/NoFriends";
import Friends from "./pages/Friends/Friends";

function App() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
      <div className='appWrapper'>
        <header className='headerWrapper'>
            <p className='userName'>John</p>
            <div className='userAvatarWrapper'>
                <img className='userAvatarImg' src={userAvatar} alt="userAvatar"/>
            </div>
        </header>
          <div className='centeredBlock'>
              <Routes>
                  <Route path="/start" element={<StartPage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/quests" element={<Quests />} />
                  <Route path="/queststg" element={<QuestsTg />} />
                  <Route path="/questsx" element={<QuestsX />} />
                  <Route path="/questsminstart" element={<QuestsMinstart />} />
                  <Route path="/questsfriends" element={<QuestsFriends />} />
                  <Route path="/questsmintweekly" element={<QuestsMintWeekly />} />
                  <Route path="/questsdone" element={<QuestsDone />} />
                  <Route path="/nofriends" element={<NoFriends />} />
                  <Route path="/friends" element={<Friends />} />
              </Routes>
          </div>

        <footer className='footer'>
            <ul className='footerItems'>
                <li className='footerItem' onClick={() => handleNavigation('/home')}>
                    <div className='footerItemImgWrapper'>
                        <img src={home} alt="home" className='footerItemImg'/>
                    </div>
                    <p className='footerItemLabel'>Home</p>
                </li>
                <li className='footerItem' onClick={() => handleNavigation('/leaderboard')}>
                    <div className='footerItemImgWrapper'>
                        <img src={leaderboard} alt="leaderboard" className='footerItemImg'/>
                    </div>
                    <p className='footerItemLabel'>Leaderboard</p>
                </li>
                <li className='footerItem' onClick={() => handleNavigation('/quests')}>
                    <div className='footerItemImgWrapper'>
                        <img src={quests} alt="quests" className='footerItemImg'/>
                    </div>
                    <p className='footerItemLabel'>Quests</p>
                </li>
                <li className='footerItem' onClick={() => handleNavigation('/friends')}>
                    <div className='footerItemImgWrapper'>
                        <img src={friends} alt="friends" className='footerItemImg'/>
                    </div>
                    <p className='footerItemLabel'>Friends</p>
                </li>
            </ul>
        </footer>
      </div>
  );
}


export default App;
