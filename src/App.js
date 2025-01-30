import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import User from './pages/User';
import { PrivateRoute } from './components/PrivateRoute';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import NotFound from './pages/NotFound';
import Setting from './pages/Setting';
import EditUser from './pages/User/EditUser';
import PasswordResetForm from './components/PasswordResetForm';
import PasswordResetConfirm from './components/PasswordResetConfirm';
import Channel from './pages/Channel';
import Token from './pages/Token';
import EditChannel from './pages/Channel/EditChannel';
import Redemption from './pages/Redemption';
import TopUp from './pages/TopUp';
import Log from './pages/Log';
import Chat from './pages/Chat';
import Chat2Link from './pages/Chat2Link';
import Midjourney from './pages/Midjourney';
import Pricing from './pages/Pricing/index.js';
import Task from './pages/Task/index.js';
import Playground from './pages/Playground/Playground.js';
import OAuth2Callback from './components/OAuth2Callback.js';
import TokenExample from './pages/Token_example/index.js';
import Contact from './pages/Contact/index.js';
import Blog from './pages/Blog/index.js';
import Connections from './pages/Connections/index.js';
import SingleBlog from './pages/singleBlog/index.js';
// import { Layout } from '@douyinfe/semi-ui';
// import { UserContext } from './context/User';
// import { getLogo, getSystemName } from './helpers';
// import { useTranslation } from 'react-i18next';
// import { StatusContext } from './context/Status';
// import { setStatusData } from './helpers/data.js';
// import { API, showError } from './helpers';

const Home = lazy(() => import('./pages/Home'));
const Detail = lazy(() => import('./pages/Detail'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path='/blog'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path='/blog/:slug'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <SingleBlog />
            </Suspense>
          }
        />
        <Route
          path='/channel'
          element={
            <PrivateRoute>
              <Channel />
            </PrivateRoute>
          }
        />
        <Route
          path='/contact'
          element={
              <Suspense fallback={<Loading></Loading>}>
                <Contact />
              </Suspense>
          }
        />
        <Route
          path='/channel/edit/:id'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <EditChannel />
            </Suspense>
          }
        />
        <Route
          path='/channel/add'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <EditChannel />
            </Suspense>
          }
        />
        <Route
          path='/playground'
          element={
              <Playground />
          }
        />
        <Route
          path='/redemption'
          element={
           
              <Redemption />
          }
        />
        <Route
          path='/user'
          element={
              <User />
          }
        />
        <Route
          path='/user/edit/:id'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <EditUser />
            </Suspense>
          }
        />
        <Route
          path='/user/edit'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <EditUser />
            </Suspense>
          }
        />
        <Route
          path='/user/reset'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <PasswordResetConfirm />
            </Suspense>
          }
        />
        <Route
          path='/login'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <LoginForm />
            </Suspense>
          }
        />
        <Route
          path='/register'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <RegisterForm />
            </Suspense>
          }
        />
        <Route
          path='/reset'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <PasswordResetForm />
            </Suspense>
          }
        />
        <Route
          path='/oauth/github'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <OAuth2Callback type='github'></OAuth2Callback>
            </Suspense>
          }
        />
        <Route
          path='/oauth/linuxdo'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <OAuth2Callback type='linuxdo'></OAuth2Callback>
            </Suspense>
          }
        />
        <Route
          path='/setting'
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading></Loading>}>
                <Setting />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path='/topup'
          element={
              <Suspense fallback={<Loading></Loading>}>
                <TopUp />
              </Suspense>
          }
        />
        <Route
          path='/log'
          element={
              <Log />
          }
        />
        <Route
          path='/detail'
          element={
              <Suspense fallback={<Loading></Loading>}>
                <Detail />
              </Suspense>
          }
        />
        <Route
          path='/midjourney'
          element={
              <Suspense fallback={<Loading></Loading>}>
                <Midjourney />
              </Suspense>
          }
        />
        <Route
          path='/task'
          element={
              <Suspense fallback={<Loading></Loading>}>
                <Task />
              </Suspense>
          }
        />
        <Route
          path='/pricing'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <Pricing />
            </Suspense>
          }
        />
        <Route
          path='/about'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <About />
            </Suspense>
          }
        />
        <Route
          path='/chat/:id?'
          element={
            <Suspense fallback={<Loading></Loading>}>
              <Chat />
            </Suspense>
          }
        />
        {/* 方便使用chat2link直接跳转聊天... */}
        <Route
          path='/chat2link'
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading></Loading>}>
                <Chat2Link />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path='/token'
          element={
              <Suspense fallback={<Loading></Loading>}>
                <TokenExample />
              </Suspense>
          }
        />
        <Route
          path='/connections'
          element={
              <Suspense fallback={<Loading></Loading>}>
                <Connections />
              </Suspense>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
