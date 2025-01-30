import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaChevronRight } from 'react-icons/fa';
import Alipay from '../../../public/alipay.png';
import Wechat from '../../../public/wechat.png';
import Binance from '../../../public/binance.png';
import Gift from '../../../public/gift.png';
import './modal.css';
import Wallet from '../../../public/wallet-add.png';
import { RxCross2 } from 'react-icons/rx';

export default function PaymentModal() {
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
        Recharge
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
              <h3>Recharge Online</h3>
              <h6>Recharge details</h6>
            </div>
            <div className='modal-content'>
              <div className='recharge-details'>
                <label>Actual payment amount: 0CNY</label>
                <input type='text' value='$100.00' readOnly />
              </div>
              <div className='payment-options'>
                <div className='payment-option'>
                  <div className='desc'>
                    Pay
                    <span> $100.00 </span>
                    <span>
                      {' '}
                      <img src={Alipay} alt='' />
                    </span>
                  </div>
                  <div className='arrow'>
                    <FaChevronRight />
                  </div>
                </div>
                <div className='payment-option'>
                  <div className='desc'>
                    Pay
                    <span> $100.00 </span>
                    <span>
                      {' '}
                      <img src={Wechat} alt='' />
                    </span>
                  </div>
                  <div className='arrow'>
                    <FaChevronRight />
                  </div>
                </div>
                <div className='payment-option'>
                  <div className='desc'>
                    Pay
                    <span> $100.00 </span>
                    <strong>Debit/Credit Card</strong>
                  </div>
                  <div className='arrow'>
                    <FaChevronRight />
                  </div>
                </div>
                <div className='payment-option'>
                  <div className='desc'>
                    Pay
                    <span> $100.00 </span>
                    <strong>Wallet</strong>
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
                <h5>Redeem Code</h5>
                <div className='get-redeem'>
                  <span>
                    <img src={Gift} alt='' />
                  </span>
                  Get Redeem Code
                </div>
                <div className='redeem-input-container'>
                  <input
                    type='text'
                    placeholder='Enter Redeem Code'
                    className='redeem-input'
                  />
                </div>
              </div>
            </div>
            <DialogActions className='action-btns'>
              <Button onClick={handleClose} className='cancel-button'>
                Cancel
              </Button>
              <Button onClick={handleClose} autoFocus className='redeem-button'>
                Redeem
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
