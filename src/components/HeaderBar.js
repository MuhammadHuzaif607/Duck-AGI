import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { useSetTheme, useTheme } from '../context/Theme';
import { useTranslation } from 'react-i18next';

import { API, getLogo, getSystemName, isMobile, showSuccess } from '../helpers';
import '../index.css';
import Britain from '../../public/britain.png';
import China from '../../public/china.png';
import Wallet from '../../public/wallet-blue.png';
import Notification from '../../public/notification.png';
import Duck from '../../public/duck.png';
import { IoMdClose } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';

// import fireworks from 'react-fireworks';

import {
  IconClose,
  IconHelpCircle,
  IconHome,
  IconHomeStroked,
  IconIndentLeft,
  IconComment,
  IconKey,
  IconMenu,
  IconNoteMoneyStroked,
  IconPriceTag,
  IconUser,
  IconLanguage,
} from '@douyinfe/semi-icons';
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Layout,
  Nav,
  Row,
  Switch,
} from '@douyinfe/semi-ui';
import { stringToColor } from '../helpers/render';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { StyleContext } from '../context/Style/index.js';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';

const HeaderBar = () => {
  const { t, i18n } = useTranslation();
  const [userState, userDispatch] = useContext(UserContext);
  const [styleState, styleDispatch] = useContext(StyleContext);
  let navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const systemName = getSystemName();
  const logo = getLogo();
  const currentDate = new Date();
  // enable fireworks on new year(1.1 and 2.9-2.24)
  const isNewYear = currentDate.getMonth() === 0 && currentDate.getDate() === 1;

  let buttons = [
    {
      text: t('首页'),
      itemKey: 'home',
      to: '/',
    },
    {
      text: t('控制台'),
      itemKey: 'detail',
      to: '/',
    },
    {
      text: t('定价'),
      itemKey: 'pricing',
      to: '/pricing',
    },
    {
      text: t('关于'),
      itemKey: 'about',
      to: '/about',
    },
  ];

  async function logout() {
    await API.get('/api/user/logout');
    showSuccess(t('注销成功!'));
    userDispatch({ type: 'logout' });
    localStorage.removeItem('user');
    navigate('/login');
  }

  const theme = useTheme();
  const setTheme = useSetTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.setAttribute('theme-mode', 'dark');
    } else {
      document.body.removeAttribute('theme-mode');
    }
    // 发送当前主题模式给子页面
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.contentWindow.postMessage({ themeMode: theme }, '*');
    }

    if (isNewYear) {
      console.log('Happy New Year!');
    }
  }, [theme]);

  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLang(lng);
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.contentWindow.postMessage({ lang: lng }, '*');
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const items = [
    {
      text: t('首页'),
      itemKey: 'home',
      to: '/',
    },
    {
      text: t('控制台'),
      itemKey: 'console',
      to: '/token',
    },
    {
      text: t('定价'),
      itemKey: 'pricing',
      to: '/pricing',
    },
    {
      text: t('关于'),
      itemKey: 'about',
      to: '/about',
    },
  ];

  const location = useLocation();
  const pathname = location.pathname;
  const isDashboard =
    pathname.includes('token') ||
    pathname.includes('playground') ||
    pathname.includes('detail') ||
    pathname.includes('chat') ||
    pathname === '/log' ||
    pathname.includes('topup') ||
    pathname.includes('midjourney') ||
    pathname.includes('task') ||
    pathname.includes('connections') ||
    pathname.includes('user') ||
    pathname.includes('setting') ||
    pathname.includes('redemption') ||
    pathname.includes('pricing');

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Grid container alignItems='center'>
        <Grid item xs={6} md={isDashboard ? 6 : 3}>
          {isDashboard ? (
            <>
              <div className='hamburger' onClick={() => setIsOpen(!isOpen)}>
                <RxHamburgerMenu />
                <div className='wallet'>
                  $0.00
                  <img src={Wallet} alt='' />
                </div>
              </div>
              <h1 className='head-title'>{`${pathname.substring(1)}`}</h1>
            </>
          ) : (
            <div class='semi-navigation-header'>
              <div className='hamburger' onClick={() => setIsOpen(!isOpen)}>
                <RxHamburgerMenu />
              </div>
              <i class='semi-navigation-header-logo'>
                <img src={Duck} alt='logo'></img>
              </i>
              <span class='semi-navigation-header-text smHidden'>DUCKAGI</span>
            </div>
          )}
        </Grid>
        {!isDashboard && (
          <Grid item xs={12} md={6} className='hidden-xs'>
            <div className='main-menu'>
              <ul>
                {items.map((item) => (
                  <li
                    key={item.itemKey}
                    onClick={(e) => {
                      if (item.itemKey === 'home' || item.itemKey === 'about') {
                        styleDispatch({
                          type: 'SET_INNER_PADDING',
                          payload: false,
                        });
                        styleDispatch({ type: 'SET_SIDER', payload: false });
                      } else {
                        styleDispatch({
                          type: 'SET_INNER_PADDING',
                          payload: true,
                        });
                        if (!styleState.isMobile) {
                          styleDispatch({ type: 'SET_SIDER', payload: true });
                        }
                      }
                    }}
                  >
                    <Link to={item.to}>{item.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
        )}
        <Grid item xs={6} md={isDashboard ? 6 : 3}>
          {isDashboard ? (
            <div className='dash-actions'>
              <div className='wallet'>
                $0.00
                <img src={Wallet} alt='' />
              </div>
              <Dropdown
                position='bottomRight'
                style={{ width: 'auto' }}
                render={
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleLanguageChange('zh')}
                      type={currentLang === 'zh' ? 'primary' : 'tertiary'}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <img
                          src={China}
                          alt='CN'
                          style={{
                            width: '20px',
                            height: '20px',
                            objectFit: 'cover',
                          }}
                        />
                        <span> 中文 CN</span>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleLanguageChange('en')}
                      type={currentLang === 'en' ? 'primary' : 'tertiary'}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <img
                          src={Britain}
                          alt='UK'
                          style={{
                            width: '20px',
                            height: '20px',
                            objectFit: 'cover',
                          }}
                        />
                        <span>Eng UK</span>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                }
              >
                <Nav.Item itemKey={'language'}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <img
                      src={currentLang === 'zh' ? China : Britain}
                      alt={currentLang === 'zh' ? 'CN' : 'UK'}
                      style={{
                        width: '20px',
                        height: '20px',
                        objectFit: 'cover',
                      }}
                    />
                    <span>{currentLang === 'zh' ? 'CN' : 'Eng UK'}</span>
                  </div>
                </Nav.Item>
              </Dropdown>
              {/* <Switch
                checkedText='🌞'
                size={styleState.isMobile ? 'default' : 'large'}
                checked={theme === 'dark'}
                uncheckedText='🌙'
                onChange={(checked) => {
                  setTheme(checked);
                }}
              /> */}
              <div className='notif'>
                <img src={Notification} alt='' />
              </div>
              {userState.user ? (
                <>
                  <Dropdown
                    position='bottomRight'
                    render={
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={logout}>
                          {t('退出')}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    }
                  >
                    <Avatar
                      size='small'
                      color={stringToColor(userState.user.username)}
                      style={{ margin: 4 }}
                    ></Avatar>
                    {styleState.isMobile ? null : (
                      <Text>{userState.user.username}</Text>
                    )}
                  </Dropdown>
                </>
              ) : (
                <>
                  <Nav.Item
                    itemKey={'login'}
                    text={!styleState.isMobile ? t('登录') : null}
                    icon={<IconUser />}
                  />
                  {!styleState.isMobile && (
                    <Nav.Item
                      itemKey={'register'}
                      text={t('注册')}
                      icon={<IconKey />}
                    />
                  )}
                </>
              )}
            </div>
          ) : (
            <div className='actions'>
              {!localStorage.getItem('user') ? (
                <>
                  <button
                    variant='outlined'
                    className='sec-button sec-button01 responsive-btn01'
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                  <button
                    variant='contained'
                    className='btn responsive-btn01'
                    onClick={() => navigate('/register')}
                  >
<span className="full-text">Create an account</span>
<span className="short-text">Signup</span>
                  </button>
                </>
              ) : (
                <button
                  variant='outlined'
                  className='sec-button'
                  onClick={logout}
                  style={{ textAlign: 'end' }}
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </Grid>
      </Grid>
      <div className='responsive-menu' style={{ left: isOpen ? '0' : '-100%' }}>
        <ul>
          <li>
            <a href='#'>Home</a>
          </li>
          <li>
            <a href='#'>Console</a>
          </li>
          <li>
            <a href='#'>Pricing</a>
          </li>
          <li>
            <a href='#'>Home</a>
          </li>
        </ul>
        <div className='close-icon'>
          <IoMdClose onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
