import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Plus from '../../../../public/plus.png';
import Warning from '/warning.png';

// import './modal.css';
import { RxCross2 } from 'react-icons/rx';
import { Switch } from '@mui/material';

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

export default function TokenModal() {
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
        Create New Token
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
            <div className='modal-header' style={{ marginBottom: '20px'}}>
              <h3>Create New Token</h3>
            </div>
            <div className='modal-content'>
              <form action=''>
                <div className='new-token'>
                  <div className='w-1/2 form-fields'>
                    <div className='form-field'>
                      <label htmlFor='' style={{color: "gray", marginBottom: 5, paddingBottom: 0}}>Token Name</label>
                      <input type='text' placeholder='Give This Token a Name' style={{ border: "2px solid #808080", padding: "10px", fontSize: "14px", borderRadius: "10px" }} />
                    </div>
                    <div className='info'>
                      <div className='icon'>
                        <img src={Warning} alt='' />
                      </div>
                      <p style={{fontSize: '12px', color: 'gray'}}>
                        The token's quota sets its maximum usage limit, but
                        actual usage depends on the account's remaining quota.{' '}
                        <span style={{display: 'block', color: '#000', fontSize: '13px', marginTop: '10px'}}>I understand</span>
                      </p>
                    </div>
                    <div className='form-field'>
                      <label htmlFor='' style={{color: "gray", marginBottom: 5, paddingBottom: 0}}>Quota|Equivalent Amount: $1.00</label>
                      <input type='number' placeholder='$0.00' style={{ border: "2px solid #808080", padding: "10px", fontSize: "14px", borderRadius: "10px", marginBottom: '10px' }} />
                      <FormControlLabel
                        control={<Switch disabled sx={{
                          '& .MuiSwitch-thumb': {
                            backgroundColor: '#ecf1f8', // Change thumb color
                          },
                          '& .MuiSwitch-track': {
                            backgroundColor: '#c5ceda', // Change track color
                          },
                        }} color='#ecf1f8' />}
                        label='Set to unlimited quota'
                      />
                      <p style={{ color: 'gray', fontSize: '12px'}}>Set this token qouta to unlimited</p>
                    </div>
                    <div className='form-field'>
                      <label htmlFor='' style={{color: "gray", marginBottom: 5, paddingBottom: 0}}>New Quantity</label>
                      <input type='number' placeholder='1' style={{ border: "2px solid #808080", padding: "10px", fontSize: "14px", borderRadius: "10px" }}/>
                    </div>
                    <div className='ip-list'>
                      <p style={{color: "gray", marginBottom: 5, paddingBottom: 0}}>IP whitelist (do not overly trust this function)</p>
                      <div className='ip-list-item'>
                        <span> 192.93.03.1 X</span>
                        <span> 192.93.03.1 X</span>
                      </div>
                    </div>
                  </div>
                  <div className='w-1/2 form-fields'>
                    <div className='config'>
                      <h4 style={{ color: '#999ba3'}}>Token Configuration</h4>
                      <div className='switch' style={{ marginBottom: '10px'}}>
                        <FormControlLabel
                          control={<Switch disabled sx={{
                            '& .MuiSwitch-thumb': {
                              backgroundColor: '#ecf1f8', // Change thumb color
                            },
                            '& .MuiSwitch-track': {
                              backgroundColor: '#c5ceda', // Change track color
                            },
                          }} color='#ecf1f8' />}
                          label='Set expiration'
                        />
                        <p>Add an expiration to this token</p>
                      </div>
                      <div className='switch'>
                        <FormControlLabel
                          control={<Switch defaultChecked sx={{
                            '& .MuiSwitch-thumb': {
                              backgroundColor: '#ddddde', // Change thumb color
                            },
                            '& .MuiSwitch-track': {
                              backgroundColor: '#333', // Change track color
                            },
                          }} color='#ddddde' />}
                          label='Auto select group'
                        />
                        <p style={{ color: 'gray'}}>Group will be selected automatically</p>
                      </div>
                    </div>
                    <div className='form-field'>
                      <label htmlFor='' style={{color: "gray", marginBottom: 5, paddingBottom: 0}}>Token Name</label>
                      <input type='number ' placeholder='1' style={{ border: "2px solid #808080", padding: "10px", fontSize: "14px", borderRadius: "10px" }} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <DialogActions className='action-btns' style={{ marginTop: '20px'}}>
              <Button onClick={handleClose} className='cancel-button border-add'>
                Cancel
              </Button>
              <Button onClick={handleClose} autoFocus className='redeem-button'>
                Save
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
