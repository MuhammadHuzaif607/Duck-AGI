import { Col, Row, Layout } from '@douyinfe/semi-ui';
import Banner from '../../components/Banner';
import PricingTable from './_components/PricingTable.js';
import { IoSearch } from 'react-icons/io5';
import Download from '../../../public/download.png';
import Filter from '../../../public/filter.png';
import Plus from '../../../public/plus.png';
import { FaChevronDown } from 'react-icons/fa';
import FilterModal from '../Token_example/_components/FilterModal.js';

const Pricing = () => {
  return (
    <Layout>
      <Banner type='success' />
      <Banner type='info' />
      <Row
        gutter={{ xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 }}
        style={{ marginTop: 20 }}
        type='flex'
        justify='space-between'
        className='search-bar'
      >
        <Col className='search-actions'>
          <button type='button' className='filter-btn bulk-actions'>
            Bulk Actions
            <FaChevronDown />
          </button>
          <form action='' className='search-bar'>
            <IoSearch width={30} height={30} />
            <input type='text' placeholder='Search Token Name/Key' />
          </form>
          {/* <button type='button' className='filter-btn'>
            <img src={Filter} alt='' />
            Filter
          </button> */}
          <FilterModal />
          <button type='button' className='download-btn'>
            <img src={Download} alt='' />
          </button>
        </Col>
        <Col>
          <button type='button' className='create-token-btn'>
            <img src={Plus} alt='Plus' />
            Create New Token
          </button>
        </Col>
      </Row>
      <PricingTable />
    </Layout>
  );
};

export default Pricing;
