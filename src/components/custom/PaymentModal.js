import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { FaChevronRight } from 'react-icons/fa';
import Alipay from '../../../public/alipay.png';
import Wechat from '../../../public/wechat.png';
import Binance from '../../../public/binance.png';
import Gift from '../../../public/gift.png';
import './modal.css';
import Wallet from '../../../public/wallet-add.png';
import { RxCross2 } from 'react-icons/rx';
import { useTranslation } from 'react-i18next';

export default function PaymentModal() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen} id='recharge-btn'>
        {' '}
        <img src={Wallet} alt='' />
        {t('充值')}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-header'>
              <h3>{t('在线充值')}</h3>
              <h6>{t('充值详情')}</h6>
            </div>
            <div className='modal-content'>
              <div className='recharge-details'>
                <label>{t('实际支付金额：0CNY')}</label>
                <input type='text' value='$100.00' readOnly />
              </div>
              <div className='payment-options'>
                <div className='payment-option'>
                  <div className='desc'>
                    {t('支付')}
                    <span> $100.00 </span>
                    <span>
                      <img src={Alipay} alt='' />
                    </span>
                  </div>
                  <div className='arrow'>
                    <FaChevronRight />
                  </div>
                </div>
                <div className='payment-option'>
                  <div className='desc'>
                    {t('支付')}
                    <span> $100.00 </span>
                    <span>
                      <img src={Wechat} alt='' />
                    </span>
                  </div>
                  <div className='arrow'>
                    <FaChevronRight />
                  </div>
                </div>
                <div className='payment-option'>
                  <div className='desc'>
                    {t('支付')}
                    <span> $100.00 </span>
                    <strong>{t('借记/信用卡')}</strong>
                  </div>
                  <div className='arrow'>
                    <FaChevronRight />
                  </div>
                </div>
                <div className='payment-option'>
                  <div className='desc'>
                    {t('支付')}
                    <span> $100.00 </span>
                    <strong>{t('钱包')}</strong>
                    <span>
                      <img src={Binance} alt='' />
                    </span>
                  </div>
                  <div className='arrow'>
                    <FaChevronRight />
                  </div>
                </div>
              </div>
              <div className='redeem-code'>
                <h5>{t('兑换码')}</h5>
                <div className='get-redeem'>
                  <span>
                    <img src={Gift} alt='' />
                  </span>
                  {t('获取兑换码')}
                </div>
                <div className='redeem-input-container'>
                  <input
                    type='text'
                    placeholder={t('请输入兑换码')}
                    className='redeem-input'
                  />
                </div>
              </div>
            </div>
            <DialogActions className='action-btns'>
              <Button onClick={handleClose} className='cancel-button'>
                {t('取消')}
              </Button>
              <Button onClick={handleClose} autoFocus className='redeem-button'>
                {t('兑换')}
              </Button>
            </DialogActions>
            <DialogActions>
              <div className='close' onClick={handleClose}>
                <RxCross2 />
              </div>
            </DialogActions>
          </div>
        </div>
      </Dialog>
    </>
  );
}
