import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Plus from '../../../../public/plus.png';
import { useTranslation } from 'react-i18next';

// import './modal.css';
import { RxCross2 } from 'react-icons/rx';
import { Switch } from '@mui/material';
import { t } from 'i18next';

// Add this custom Switch styling
const blackSwitch = {
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#000',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#000',
  },
};

export default function URLModal() {
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
        <img src={Plus} alt='' />
        {t('创建新网址')}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '800px',
              margin: '16px',
            },
          },
          '& .MuiDialog-paper': {
            margin: 0,
            borderRadius: '8px',
          },
        }}
        maxWidth={false}
      >
        <div className='modal-overlay token-modal'>
          <div className='modal'>
            <div className='modal-header'>
              <h3>{t('创建新令牌')}</h3> {/* "Create New Token" */}
            </div>
            <div className='modal-content'>
              <form action=''>
                <div className='new-token'>
                  <div className='w-1/2 form-fields'>
                    <div className='form-field'>
                      <label htmlFor=''>{t('令牌名称')}</label>{' '}
                      {/* "Token Name" */}
                      <input type='text' placeholder={t('为此令牌命名')} />{' '}
                      {/* "Give This Token a Name" */}
                    </div>
                    <div className='info'>
                      <div className='icon'></div>
                      <p>
                        {t(
                          '令牌的配额设置了最大使用限制，但实际使用量取决于账户的剩余配额。',
                        )}
                        <span>{t('我明白')}</span>{' '}
                        {/* "The token's quota sets its maximum usage limit, but actual usage depends on the account's remaining quota." */}
                      </p>
                    </div>
                    <div className='form-field'>
                      <label htmlFor=''>{t('配额|等值金额：$1.00')}</label>{' '}
                      {/* "Quota|Equivalent Amount: $1.00" */}
                      <input type='number' placeholder='$0.00' />
                      <FormControlLabel
                        control={<Switch defaultChecked sx={blackSwitch} />}
                        label={t('标签')}
                      />
                      <p>{t('设置此令牌的配额为无限制')}</p>{' '}
                      {/* "Set this token quota to unlimited" */}
                    </div>
                    <div className='form-field'>
                      <label htmlFor=''>{t('新数量')}</label>{' '}
                      {/* "New Quantity" */}
                      <input type='number' placeholder='1' />
                    </div>
                    <div className='ip-list'>
                      <p>{t('IP 白名单（不要过度信任此功能）')}</p>{' '}
                      {/* "IP whitelist (do not overly trust this function)" */}
                      <div className='ip-list-item'>
                        <span> 192.93.03.1 X</span>
                        <span> 192.93.03.1 X</span>
                      </div>
                    </div>
                  </div>
                  <div className='w-1/2 form-fields'>
                    <div className='config'>
                      <h4>{t('令牌配置')}</h4> {/* "Token Configuration" */}
                      <div className='switch'>
                        <FormControlLabel
                          control={<Switch defaultChecked sx={blackSwitch} />}
                          label={t('设置过期时间')}
                        />
                        <p>{t('为此令牌添加过期时间')}</p>{' '}
                        {/* "Add an expiration to this token" */}
                      </div>
                      <div className='switch'>
                        <FormControlLabel
                          control={<Switch defaultChecked sx={blackSwitch} />}
                          label={t('自动选择组')}
                        />
                        <p>{t('组将被自动选择')}</p>{' '}
                        {/* "Group will be selected automatically" */}
                      </div>
                    </div>
                    <div className='form-field'>
                      <label htmlFor=''>{t('令牌名称')}</label>{' '}
                      {/* "Token Name" */}
                      <input type='number ' placeholder='1' />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <DialogActions className='action-btns'>
              <Button onClick={handleClose} className='cancel-button'>
                {t('取消')} {/* "Cancel" */}
              </Button>
              <Button onClick={handleClose} autoFocus className='redeem-button'>
                {t('兑换')} {/* "Redeem" */}
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
