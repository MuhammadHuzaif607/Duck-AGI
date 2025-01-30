import { Col, Row } from '@douyinfe/semi-ui';
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import Download from '../../../public/download.png';
import Filter from '../../../public/filter.png';
import { FaChevronDown } from 'react-icons/fa';
import TasksTable from './_components/Tasktable';

const Task = () => (
  <>
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
      </Col>
      <Col>
        <div className='search-actions'>
          <button type='button' className='filter-btn'>
            <img src={Filter} alt='' />
            Filter
          </button>
          <button type='button' className='download-btn'>
            <img src={Download} alt='' />
          </button>
          <button type='button' className='filter-btn bulk-actions'>
            Bulk Actions
            <FaChevronDown />
          </button>
        </div>
      </Col>
    </Row>
    <TasksTable />
  </>
);

export default Task;
