import React, { useEffect, useState } from 'react';
import { API, isMobile, showError, showInfo, showSuccess } from '../../helpers';
import {
  renderNumber,
  renderQuota,
  renderQuotaWithAmount,
} from '../../helpers/render';
import { IoSearch } from 'react-icons/io5';
import {
  Col,
  Layout,
  Row,
  Typography,
  Card,
  Button,
  Form,
  Divider,
  Space,
  Modal,
  Toast,
} from '@douyinfe/semi-ui';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './style.css';
import Wallet from '../../../public/wallet-add.png';
import line from '../../../public/line.svg';
import { IoIosArrowDown } from 'react-icons/io';
import TocketExpire from '../../../public/ticket-expired.png';
import Download from '../../../public/download.png';
import Filter from '../../../public/filter.png';
import PaymentModal from '../../components/custom/PaymentModal';
import EnhancedTable from '../../components/custom/Table.js';

const TopUp = () => {
  const { t } = useTranslation();
  const [redemptionCode, setRedemptionCode] = useState('');
  const [topUpCode, setTopUpCode] = useState('');
  const [topUpCount, setTopUpCount] = useState(0);
  const [minTopupCount, setMinTopUpCount] = useState(1);
  const [amount, setAmount] = useState(0.0);
  const [minTopUp, setMinTopUp] = useState(1);
  const [topUpLink, setTopUpLink] = useState('');
  const [enableOnlineTopUp, setEnableOnlineTopUp] = useState(false);
  const [userQuota, setUserQuota] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [payWay, setPayWay] = useState('');

  const topUp = async () => {
    if (redemptionCode === '') {
      showInfo(t('请输入兑换码！'));
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await API.post('/api/user/topup', {
        key: redemptionCode,
      });
      const { success, message, data } = res.data;
      if (success) {
        showSuccess(t('兑换成功！'));
        Modal.success({
          title: t('兑换成功！'),
          content: t('成功兑换额度：') + renderQuota(data),
          centered: true,
        });
        setUserQuota((quota) => {
          return quota + data;
        });
        setRedemptionCode('');
      } else {
        showError(message);
      }
    } catch (err) {
      showError(t('请求失败'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const openTopUpLink = () => {
    if (!topUpLink) {
      showError(t('超级管理员未设置充值链接！'));
      return;
    }
    window.open(topUpLink, '_blank');
  };

  const preTopUp = async (payment) => {
    if (!enableOnlineTopUp) {
      showError(t('管理员未开启在线充值！'));
      return;
    }
    await getAmount();
    if (topUpCount < minTopUp) {
      showError(t('充值数量不能小于') + minTopUp);
      return;
    }
    setPayWay(payment);
    setOpen(true);
  };

  const onlineTopUp = async () => {
    if (amount === 0) {
      await getAmount();
    }
    if (topUpCount < minTopUp) {
      showError('充值数量不能小于' + minTopUp);
      return;
    }
    setOpen(false);
    try {
      const res = await API.post('/api/user/pay', {
        amount: parseInt(topUpCount),
        top_up_code: topUpCode,
        payment_method: payWay,
      });
      if (res !== undefined) {
        const { message, data } = res.data;
        // showInfo(message);
        if (message === 'success') {
          let params = data;
          let url = res.data.url;
          let form = document.createElement('form');
          form.action = url;
          form.method = 'POST';
          // 判断是否为safari浏览器
          let isSafari =
            navigator.userAgent.indexOf('Safari') > -1 &&
            navigator.userAgent.indexOf('Chrome') < 1;
          if (!isSafari) {
            form.target = '_blank';
          }
          for (let key in params) {
            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
          }
          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
        } else {
          showError(data);
          // setTopUpCount(parseInt(res.data.count));
          // setAmount(parseInt(data));
        }
      } else {
        showError(res);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const getUserQuota = async () => {
    let res = await API.get(`/api/user/self`);
    const { success, message, data } = res.data;
    if (success) {
      setUserQuota(data.quota);
    } else {
      showError(message);
    }
  };

  useEffect(() => {
    let status = localStorage.getItem('status');
    if (status) {
      status = JSON.parse(status);
      if (status.top_up_link) {
        setTopUpLink(status.top_up_link);
      }
      if (status.min_topup) {
        setMinTopUp(status.min_topup);
      }
      if (status.enable_online_topup) {
        setEnableOnlineTopUp(status.enable_online_topup);
      }
    }
    getUserQuota().then();
  }, []);

  const renderAmount = () => {
    // console.log(amount);
    return amount + ' ' + t('元');
  };

  const getAmount = async (value) => {
    if (value === undefined) {
      value = topUpCount;
    }
    try {
      const res = await API.post('/api/user/amount', {
        amount: parseFloat(value),
        top_up_code: topUpCode,
      });
      if (res !== undefined) {
        const { message, data } = res.data;
        // showInfo(message);
        if (message === 'success') {
          setAmount(parseFloat(data));
        } else {
          setAmount(0);
          Toast.error({ content: '错误：' + data, id: 'getAmount' });
          // setTopUpCount(parseInt(res.data.count));
          // setAmount(parseInt(data));
        }
      } else {
        showError(res);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div style={{ background: '#f5f6f8' }}>
      {/* <Layout>
        <Layout.Header>
          <h3>{t('我的钱包')}</h3>
        </Layout.Header>
        <Layout.Content>
          <Modal
            title={t('确定要充值吗')}
            visible={open}
            onOk={onlineTopUp}
            onCancel={handleCancel}
            maskClosable={false}
            size={'small'}
            centered={true}
          >
            <p>
              {t('充值数量')}：{topUpCount}
            </p>
            <p>
              {t('实付金额')}：{renderAmount()}
            </p>
            <p>{t('是否确认充值？')}</p>
          </Modal>
          <div
            style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}
          > */}
      {/* <Card style={{ width: '500px', padding: '20px' }}>
              <Title level={3} style={{ textAlign: 'center' }}>
                {t('余额')} {renderQuota(userQuota)}
              </Title>
              <div style={{ marginTop: 20 }}>
                <Divider>{t('兑换余额')}</Divider>
                <Form>
                  <Form.Input
                    field={'redemptionCode'}
                    label={t('兑换码')}
                    placeholder={t('兑换码')}
                    name='redemptionCode'
                    value={redemptionCode}
                    onChange={(value) => {
                      setRedemptionCode(value);
                    }}
                  />
                  <Space>
                    {topUpLink ? (
                      <Button
                        type={'primary'}
                        theme={'solid'}
                        onClick={openTopUpLink}
                      >
                        {t('获取兑换码')}
                      </Button>
                    ) : null}
                    <Button
                      type={'warning'}
                      theme={'solid'}
                      onClick={topUp}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('兑换中...') : t('兑换')}
                    </Button>
                  </Space>
                </Form>
              </div>
              <div style={{ marginTop: 20 }}>
                <Divider>{t('在线充值')}</Divider>
                <Form>
                  <Form.Input
                    disabled={!enableOnlineTopUp}
                    field={'redemptionCount'}
                    label={t('实付金额：') + ' ' + renderAmount()}
                    placeholder={
                      t('充值数量，最低 ') + renderQuotaWithAmount(minTopUp)
                    }
                    name='redemptionCount'
                    type={'number'}
                    value={topUpCount}
                    onChange={async (value) => {
                      if (value < 1) {
                        value = 1;
                      }
                      setTopUpCount(value);
                      await getAmount(value);
                    }}
                  />
                  <Space>
                    <Button
                      type={'primary'}
                      theme={'solid'}
                      onClick={async () => {
                        preTopUp('zfb');
                      }}
                    >
                      {t('支付宝')}
                    </Button>
                    <Button
                      style={{
                        backgroundColor: 'rgba(var(--semi-green-5), 1)',
                      }}
                      type={'primary'}
                      theme={'solid'}
                      onClick={async () => {
                        preTopUp('wx');
                      }}
                    >
                      {t('微信')}
                    </Button>
                  </Space>
                </Form>
              </div> */}
      {/*<div style={{ display: 'flex', justifyContent: 'right' }}>*/}
      {/*    <Text>*/}
      {/*        <Link onClick={*/}
      {/*            async () => {*/}
      {/*                window.location.href = '/topup/history'*/}
      {/*            }*/}
      {/*        }>充值记录</Link>*/}
      {/*    </Text>*/}
      {/*</div>*/}
      {/* </Card>
          </div>
        </Layout.Content>
      </Layout> */}
      <Row
        gutter={{ xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 }}
        style={{ marginTop: 20 }}
        type='flex'
      >
        <Col lg={12}>
          <Card className='panel-desc-card balance'>
            <div className='title'>
              <h3>Balance Summary</h3>
              <PaymentModal />
            </div>
            <div className='stats'>
              <div className='stat'>
                <h4>Current Bal</h4>
                <p>$0.00</p>
              </div>
              <div className='stat'>
                <h4>Spent</h4>
                <p>$0.00</p>
              </div>
            </div>
            <div className='line'>
              <img src={line} alt='' />
            </div>
          </Card>
        </Col>
        <Col lg={12}>
          <Card className='panel-desc-card '>
            <div className='title'>
              <h3>Recharge Summary</h3>
              <div className='arrow'>
                <p>This Week </p>
                <IoIosArrowDown className='ml-2' />
              </div>
            </div>
            <div className='stats'>
              <div className='stat'>
                <h4>Exhange Bal</h4>
                <p>$0.00</p>
              </div>
              <div className='stat'>
                <h4>Total Recharge</h4>
                <p>$0.00</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row
        gutter={{ xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 }}
        style={{ marginTop: 20 }}
        type='flex'
        justify='space-between'
        className='search-bar'
      >
        <Col className='search-actions'>
          {/* <Form.Input
            field='keyword'
            label={t('搜索关键字')}
            placeholder={t('令牌名称')}
            value={searchKeyword}
            loading={searching}
            onChange={handleKeywordChange}
          /> */}

          <form action='' className='search-bar'>
            <IoSearch width={30} height={30} />
            <input type='text' placeholder='Search Token Name/Key' />
          </form>
          <button type='button' className='filter-btn'>
            <img src={Filter} alt='' />
            Filter
          </button>
          <button type='button' className='download-btn'>
            <img src={Download} alt='' />
          </button>
        </Col>
        <Col>
          <PaymentModal />
        </Col>
      </Row>
      {/* When No Data */}
      {/*<Row
        gutter={{ xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 }}
        style={{ marginTop: 20 }}
        type='flex'
        justify='space-between'
      >
        <Col lg={24} className='b-0 br-lg'>
          <Card>
            <div class='main-card'>
              <img src={TocketExpire} alt='Tikcet Expire Icon' />
              <h2>No Data Yet?</h2>
              <p>
                Recharge your account to see your transactions history here.
              </p>
              <button>
              <img
                src='https://img.icons8.com/ios-filled/50/ffffff/plus.png'
                alt='Plus Icon'
              />
              New Token
            </button>
            </div>
          </Card>
        </Col>
      </Row>
       */}
      <EnhancedTable />
    </div>
  );
};

export default TopUp;
