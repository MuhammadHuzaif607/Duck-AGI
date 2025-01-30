import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { StatusContext } from '../context/Status';
import { useTranslation } from 'react-i18next';
import './sidebar.css';

import {
  API,
  getLogo,
  getSystemName,
  isAdmin,
  isMobile,
  showError,
} from '../helpers';
import '../index.css';

import { IconGift, IconLayers, IconUser } from '@douyinfe/semi-icons';
import { Avatar, Dropdown, Layout, Nav, Switch } from '@douyinfe/semi-ui';
import { setStatusData } from '../helpers/data.js';
import { stringToColor } from '../helpers/render.js';
import { useSetTheme, useTheme } from '../context/Theme/index.js';
import { StyleContext } from '../context/Style/index.js';
import { FaChevronLeft } from 'react-icons/fa';
import Globe from '../../public/globe.png';
import Task from '../../public/task.png';
import Drawing from '../../public/Image.png';
import Clock from '../../public/clock.png';
import Wallet from '../../public/Wallet.png';
import Code from '../../public/code.png';
import Chat from '../../public/Chat.png';
import BarChart from '../../public/bar-chart.png';
import Setting from '../../public/setting.png';
import PlayGround from '../../public/playground.png';
import Duck from '../../public/duck.png';

const SiderBar = () => {
  const { t } = useTranslation();
  const [styleState, styleDispatch] = useContext(StyleContext);
  const [statusState, statusDispatch] = useContext(StatusContext);
  const defaultIsCollapsed =
    localStorage.getItem('default_collapse_sidebar') === 'true';

  const [selectedKeys, setSelectedKeys] = useState(['home']);
  const [isCollapsed, setIsCollapsed] = useState(defaultIsCollapsed);
  const [chatItems, setChatItems] = useState([]);
  const theme = useTheme();
  const setTheme = useSetTheme();

  const routerMap = {
    home: '/',
    channel: '/channel',
    token: '/token',
    redemption: '/redemption',
    topup: '/topup',
    user: '/user',
    log: '/log',
    midjourney: '/midjourney',
    setting: '/setting',
    about: '/about',
    chat: '/chat',
    detail: '/detail',
    pricing: '/pricing',
    task: '/task',
    playground: '/playground',
    connections: '/connections', // Ensure this matches the route
  };

  const headerButtons = useMemo(
    () => [
      {
        text: 'Playground',
        itemKey: 'playground',
        to: '/playground',
        icon: (
          <img
            src={PlayGround}
            alt='Playground'
            style={{ width: 20, height: 20 }}
          />
        ),
      },
      {
        text: t('渠道'),
        itemKey: 'channel',
        to: '/channel',
        icon: <IconLayers />,
        className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
      },
      {
        text: t('聊天'),
        itemKey: 'chat',
        items: chatItems,
        icon: <img src={Chat} alt='Chat' style={{ width: 20, height: 20 }} />,
      },
      {
        text: t('Token '), // Added new menu item
        itemKey: 'token',
        to: '/token',
        icon: (
          <img
            src={Code}
            alt='token-example'
            style={{ width: 20, height: 20 }}
          />
        ),
      },
      {
        text: t('数据看板'),
        itemKey: 'detail',
        to: '/detail',
        icon: (
          <img
            src={BarChart}
            alt='Dashboard'
            style={{ width: 20, height: 20 }}
          />
        ),
        className:
          localStorage.getItem('enable_data_export') === 'true'
            ? 'semi-navigation-item-normal'
            : 'tableHiddle',
      },
      {
        text: t('兑换码'),
        itemKey: 'redemption',
        to: '/redemption',
        icon: <IconGift />,
        className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
      },
      {
        text: t('钱包'),
        itemKey: 'topup',
        to: '/topup',
        icon: (
          <img src={Wallet} alt='Dashboard' style={{ width: 20, height: 20 }} />
        ),
      },
      {
        text: t('用户管理'),
        itemKey: 'user',
        to: '/user',
        icon: <IconUser />,
        className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
      },
      {
        text: t('日志'),
        itemKey: 'log',
        to: '/log',
        icon: (
          <img src={Clock} alt='Dashboard' style={{ width: 20, height: 20 }} />
        ),
      },
      {
        text: t('绘图'),
        itemKey: 'midjourney',
        to: '/midjourney',
        icon: (
          <img
            src={Drawing}
            alt='Dashboard'
            style={{ width: 20, height: 20 }}
          />
        ),
        className:
          localStorage.getItem('enable_drawing') === 'true'
            ? 'semi-navigation-item-normal'
            : 'tableHiddle',
      },
      {
        text: t('异步任务'),
        itemKey: 'task',
        to: '/task',
        icon: <img src={Task} alt='Task' style={{ width: 20, height: 20 }} />,
        className:
          localStorage.getItem('enable_task') === 'true'
            ? 'semi-navigation-item-normal'
            : 'tableHiddle',
      },
      {
        text: t('URL connections'),
        itemKey: 'connections', // Change from 'URL connections' to 'connections'
        to: '/connections', // Matches the routerMap
        icon: (
          <img
            src={Globe}
            alt='Connections'
            style={{ width: 20, height: 20 }}
          />
        ),
      },
    ],
    [
      localStorage.getItem('enable_data_export'),
      localStorage.getItem('enable_drawing'),
      localStorage.getItem('enable_task'),
      localStorage.getItem('chat_link'),
      chatItems,
      isAdmin(),
      t,
    ],
  );

  useEffect(() => {
    let localKey = window.location.pathname.split('/')[1];
    if (localKey === '') {
      localKey = 'home';
    }
    setSelectedKeys([localKey]);

    let chatLink = localStorage.getItem('chat_link');
    if (!chatLink) {
      let chats = localStorage.getItem('chats');
      if (chats) {
        try {
          chats = JSON.parse(chats);
          if (Array.isArray(chats)) {
            let chatItems = [];
            for (let i = 0; i < chats.length; i++) {
              let chat = {};
              for (let key in chats[i]) {
                chat.text = key;
                chat.itemKey = 'chat' + i;
                chat.to = '/chat/' + i;
              }
              chatItems.push(chat);
            }
            setChatItems(chatItems);
          }
        } catch (e) {
          console.error(e);
          showError('聊天数据解析失败');
        }
      }
    }

    setIsCollapsed(localStorage.getItem('default_collapse_sidebar') === 'true');
  }, []);

  const sidebarCollapeseHandler = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className='sidebar'>
        <div className={`side-header  ${isCollapsed ? 'collapsed' : ''}`}>
          <div className='side-header-left'>
            <img src={Duck} alt='' />
            <p>
              <span>Duck</span>AGI
            </p>
          </div>
          <div onClick={sidebarCollapeseHandler} className='collapse-btn'>
            <FaChevronLeft />
          </div>
        </div>
        <Nav
          style={{ maxWidth: 220, height: '100%' }}
          defaultIsCollapsed={
            localStorage.getItem('default_collapse_sidebar') === 'true'
          }
          isCollapsed={isCollapsed}
          onCollapseChange={(collapsed) => {
            setIsCollapsed(collapsed);
          }}
          selectedKeys={selectedKeys}
          renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
            let chatLink = localStorage.getItem('chat_link');
            if (!chatLink) {
              let chats = localStorage.getItem('chats');
              if (chats) {
                chats = JSON.parse(chats);
                if (Array.isArray(chats) && chats.length > 0) {
                  for (let i = 0; i < chats.length; i++) {
                    routerMap['chat' + i] = '/chat/' + i;
                  }
                  if (chats.length > 1) {
                    if (routerMap['chat']) {
                      delete routerMap['chat'];
                    }
                  } else {
                    routerMap['chat'] = '/chat/0';
                  }
                }
              }
            }
            return (
              <Link
                style={{ textDecoration: 'none' }}
                to={routerMap[props.itemKey]}
              >
                {itemElement}
              </Link>
            );
          }}
          items={headerButtons}
          onSelect={(key) => {
            if (key.itemKey.toString().startsWith('chat')) {
              styleDispatch({ type: 'SET_INNER_PADDING', payload: false });
            } else {
              styleDispatch({ type: 'SET_INNER_PADDING', payload: true });
            }
            setSelectedKeys([key.itemKey]);
          }}
        >
          <Nav.Footer>
            <a href='/setting' style={{ textDecoration: 'none' }}>
              <li
                role='menuitem'
                tabindex='0'
                aria-disabled='false'
                class='semi-navigation-item-normal semi-navigation-item semi-navigation-item-selected semi-navigation-item-collapsed'
                aria-describedby='iyguix3'
                data-popupid='iyguix3'
              >
                <i
                  class='semi-navigation-item-icon semi-navigation-item-icon-info'
                  style={{ marginRight: '0px', opacity: 1 }}
                >
                  <img
                    src={Setting}
                    alt='Setting'
                    style={{ width: 20, height: 20 }}
                  />
                </i>
              </li>
            </a>
          </Nav.Footer>
        </Nav>
      </div>
    </>
  );
};

export default SiderBar;
