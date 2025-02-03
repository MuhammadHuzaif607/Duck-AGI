import { Col, Row } from '@douyinfe/semi-ui';
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import Download from '../../../public/download.png';
import Filter from '../../../public/filter.png';
import { FaChevronDown } from 'react-icons/fa';
import TasksTable from './_components/Tasktable';
import { useTranslation } from 'react-i18next';

const Task = () => {
  const { t } = useTranslation(); // Move this inside the component

  return (
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
            <input type='text' placeholder={t('搜索代币名称/键')} />
          </form>
        </Col>
        <Col>
          <div className='search-actions'>
            <button type='button' className='filter-btn'>
              <img src={Filter} alt='' />
              {t('筛选')}
            </button>
            <button type='button' className='download-btn'>
              <img src={Download} alt='' />
              {t('下载')}
            </button>
            <button type='button' className='filter-btn bulk-actions'>
              {t('批量操作')}
              <FaChevronDown />
            </button>
          </div>
        </Col>
      </Row>
      <TasksTable />
    </>
  );
};

export default Task;
