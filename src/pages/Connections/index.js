import { Card, Col, Layout, Row, Spin } from '@douyinfe/semi-ui';
import Code from '../../../public/code.png';
import Trending from '../../../public/trend.png';
import Ticket from '../../../public/ticket.png';
import { IoSearch } from 'react-icons/io5';
import Download from '../../../public/download.png';
import Filter from '../../../public/filter.png';
import { useContext } from 'react';
import { StyleContext } from '../../context/Style';
import URLModal from './_components/URLModal';
import URLTable from './_components/URLtable';

const Connections = (props) => {
  const [styleState, styleDispatch] = useContext(StyleContext);
  return (
    <Layout>
      <Layout.Content>
        <Row
          gutter={{ xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 }}
          style={{ marginTop: 20 }}
          type='flex'
        >
          <Col span={styleState.isMobile ? 24 : 12}>
            <Card className='panel-desc-card '>
              <div className='title'>
                <div className='icon'>
                  <img src={Code} alt='Code' />
                </div>
              </div>

              <div className='stats'>
                <div className='stat w-1/2'>
                  <h4>URL Connections</h4>
                  <p> 20</p>
                </div>
                <div className='stat w-1/2'>
                  <h4>Active</h4>
                  <div className='detail-stat'>
                    <p> 12</p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={styleState.isMobile ? 24 : 12}>
            <Card className='panel-desc-card '>
              <div className='title'>
                <div className='icon'>
                  <img src={Code} alt='Code' />
                </div>
              </div>

              <div className='stats'>
                <div className='stat w-1/2'>
                  <h4>Total ROI</h4>
                  <p>12,405,00</p>
                </div>
                <div className='stat w-1/2'>
                  <h4>Visits</h4>
                  <div className='detail-stat'>
                    <p> 83K</p>
                    <span>+0.00%</span>
                  </div>
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
            <form action='' className='search-bar'>
              <IoSearch width={30} height={30} />
              <input type='text' placeholder='Search Token Name/Key' />
            </form>
            <button type='button' className='filter-btn'>
              <img src={Filter} alt='' />
              Filter
            </button>
            {/* <FilterModal /> */}
            <button type='button' className='download-btn'>
              <img src={Download} alt='' />
            </button>
          </Col>
          <Col>
            <URLModal />
          </Col>
        </Row>
        <URLTable />
      </Layout.Content>
    </Layout>
  );
};

export default Connections;
