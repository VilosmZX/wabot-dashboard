import { Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import GroupLayout from './Layout/GroupLayout';
import AutoReplyPage from './pages/AutoReply/AutoReplyPage';
import GroupPage from './pages/Group/GroupPage';
import GroupsPage from './pages/Groups/GroupsPage';
import Home from './pages/Home/HomePage';
import SendPage from './pages/SendPage/SendPage';

function App() {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/groups' element={<GroupLayout />}>
          <Route index element={<GroupsPage />}/>
          <Route path=':jid' element={<GroupPage />} />
        </Route>
        <Route path='send' element={<SendPage />}/>
        <Route path='autoreply' element={<AutoReplyPage />}/>
      </Routes>
    </>
  );
}

export default App;
