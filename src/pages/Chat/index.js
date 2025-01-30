import { useTokenKeys } from '../../components/fetchTokenKeys';
import {  Layout } from '@douyinfe/semi-ui';
import { useParams } from 'react-router-dom';
import Image from './public/Image.png';
import Send from './public/send.png';
import Key from './public/keys.png';
import Edit from './public/Edit.png';
import Delete from './public/Delete.png';
import Chat_gpt from './public/chat_gpt.png';
import {useState} from 'react';


const ChatPage = () => {
  const { id } = useParams();
  const { keys, serverAddress, isLoading } = useTokenKeys(id);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const comLink = (key) => {
    // console.log('chatLink:', chatLink);
    if (!serverAddress || !key) return '';
    let link = localStorage.getItem('chat_link');
    if (link) {
      link = `${link}/#/?settings={"key":"sk-${key}","url":"${encodeURIComponent(serverAddress)}"}`;
    } else if (id) {
      let chats = localStorage.getItem('chats');
      if (chats) {
        chats = JSON.parse(chats);
        if (Array.isArray(chats) && chats.length > 0) {
          for (let k in chats[id]) {
            link = chats[id][k];
            link = link.replaceAll(
              '{address}',
              encodeURIComponent(serverAddress),
            );
            link = link.replaceAll('{key}', 'sk-' + key);
          }
        }
      }
    }
    return link;
  };

  const iframeSrc = keys.length > 0 ? comLink(keys[0]) : '';

  return (
    <Layout>
      <div className='chat-container'>
        <div className='chat-area'>
          <div className='chat-head'>
            <span>
              <img src={Chat_gpt} alt='' />
            </span>
            <h1>
              ChatGPT <span>Next Web</span>
            </h1>
          </div>
          <p>
            Hello <span>Samuele</span>,Let me know how I can be of your help
          </p>
          <div className='chat-field'>
            <input type='text' placeholder='Your message' />
            <button className='add-image' type='button'>
              <img src={Image} alt='image' />
            </button>
            <button className='send-message'>
              <img src={Send} alt='send' />
            </button>
          </div>
        </div>
        <div className='chat-sidebar'>
          <div className='chat-head'>
            <span>
              <img src={Chat_gpt} alt='' />
            </span>
            <h1>
              ChatGPT <span>Next Web</span>
            </h1>
          </div>
          <div className='api-keys'>
            <div className='api-key-head'>
              <h1>
                <img src={Key} alt='' />
                API
              </h1>
              <div className='api-actions'>
                <ul>
                  <li>
                    <img src={Edit} alt='' />
                  </li>
                  <li>
                    <img src={Delete} alt='' />
                  </li>
                </ul>
              </div>
            </div>
            <p>
              <span>API Key</span> 13628736
            </p>
            <p>
              <span>API Key</span> 13628736
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
