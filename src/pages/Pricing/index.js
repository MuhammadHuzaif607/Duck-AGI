import { Col, Row, Layout } from '@douyinfe/semi-ui';
import Banner from '../../components/Banner';
import PricingTable from './_components/PricingTable.js';
import { IoSearch } from 'react-icons/io5';
import Download from '../../../public/download.png';
import Plus from '../../../public/plus.png';
import { FaChevronDown } from 'react-icons/fa';
import FilterModal from '../Token_example/_components/FilterModal.js';
// import {
//   API,
//   isAdmin,
//   showError,
//   timestamp2string,
// } from '../../helpers';
// import { useEffect, useState } from 'react';

const Pricing = () => {
//   const isAdminUser = isAdmin();
//   const now = new Date();
//   const [dataExportDefaultTime, setDataExportDefaultTime] = useState(
//     localStorage.getItem('data_export_default_time') || 'hour',
//   );
// const [inputs, setInputs] = useState({
//     username: '',
//     token_name: '',
//     start_timestamp:
//       localStorage.getItem('data_export_default_time') === 'hour'
//         ? timestamp2string(now.getTime() / 1000 - 86400)
//         : localStorage.getItem('data_export_default_time') === 'week'
//           ? timestamp2string(now.getTime() / 1000 - 86400 * 30)
//           : timestamp2string(now.getTime() / 1000 - 86400 * 7),
//     end_timestamp: timestamp2string(now.getTime() / 1000 + 3600),
//     channel: '',
//     data_export_default_time: '',
//   });
//   const { username, start_timestamp, end_timestamp } =
//     inputs;

//     useEffect(() => {
//       const loadQuotaData = async () => {
//         try {
//           let url = '';
//           let localStartTimestamp = Date.parse(start_timestamp) / 1000;
//           let localEndTimestamp = Date.parse(end_timestamp) / 1000;
//           if (isAdminUser) {
//             url = `/api/data/?username=${username}&start_timestamp=${localStartTimestamp}&end_timestamp=${localEndTimestamp}&default_time=${dataExportDefaultTime}`;
//           } else {
//             url = `/api/data/self/?start_timestamp=${localStartTimestamp}&end_timestamp=${localEndTimestamp}&default_time=${dataExportDefaultTime}`;
//           }
//           const res = await API.get(url);
//           const { success, message, data } = res.data;
//           if (success) {
//             return;
//           } else {
//             showError(message);
//           }
//         } finally {}
//       };
    
//       loadQuotaData();
//     }, [now])

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
