import React, { useContext, useEffect, useRef, useState } from 'react';
import { initVChartSemiTheme } from '@visactor/vchart-semi-theme';
import './style.css';
import { Card, Col, Layout, Row, Spin } from '@douyinfe/semi-ui';
import { VChart } from '@visactor/react-vchart';
import {
  API,
  isAdmin,
  showError,
  timestamp2string,
  timestamp2string1,
} from '../../helpers';
import {
  getQuotaWithUnit,
  modelColorMap,
  renderNumber,
  renderQuota,
  modelToColor,
} from '../../helpers/render';
import { UserContext } from '../../context/User/index.js';
import { StyleContext } from '../../context/Style/index.js';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown } from 'react-icons/io';
import line from '../../../public/line.svg';

const Detail = (props) => {
  const { t } = useTranslation();
  const formRef = useRef();
  let now = new Date();
  const [userState, userDispatch] = useContext(UserContext);
  const [styleState, styleDispatch] = useContext(StyleContext);
  const [inputs, setInputs] = useState({
    username: '',
    token_name: '',
    model_name: '',
    start_timestamp:
      localStorage.getItem('data_export_default_time') === 'hour'
        ? timestamp2string(now.getTime() / 1000 - 86400)
        : localStorage.getItem('data_export_default_time') === 'week'
          ? timestamp2string(now.getTime() / 1000 - 86400 * 30)
          : timestamp2string(now.getTime() / 1000 - 86400 * 7),
    end_timestamp: timestamp2string(now.getTime() / 1000 + 3600),
    channel: '',
    data_export_default_time: '',
  });
  const { username, model_name, start_timestamp, end_timestamp, channel } =
    inputs;
  const isAdminUser = isAdmin();
  const initialized = useRef(false);
  const [loading, setLoading] = useState(false);
  const [quotaData, setQuotaData] = useState([]);
  const [consumeQuota, setConsumeQuota] = useState(0);
  const [consumeTokens, setConsumeTokens] = useState(0);
  const [times, setTimes] = useState(0);
  const [dataExportDefaultTime, setDataExportDefaultTime] = useState(
    localStorage.getItem('data_export_default_time') || 'hour',
  );
  const [pieData, setPieData] = useState([{ type: 'null', value: '0' }]);
  const [lineData, setLineData] = useState([]);
  const [spec_pie, setSpecPie] = useState({
    type: 'pie',
    data: [
      {
        id: 'id0',
        values: pieData,
      },
    ],
    outerRadius: 0.8,
    innerRadius: 0.5,
    padAngle: 0.6,
    valueField: 'value',
    categoryField: 'type',
    pie: {
      style: {
        cornerRadius: 10,
      },
      state: {
        hover: {
          outerRadius: 0.85,
          stroke: '#000',
          lineWidth: 1,
        },
        selected: {
          outerRadius: 0.85,
          stroke: '#000',
          lineWidth: 1,
        },
      },
    },
    title: {
      visible: true,
      text: t('模型调用次数占比'),
      subtext: `${t('总计')}：${renderNumber(times)}`,
    },
    legends: {
      visible: true,
      orient: 'left',
    },
    label: {
      visible: true,
    },
    tooltip: {
      mark: {
        content: [
          {
            key: (datum) => datum['type'],
            value: (datum) => renderNumber(datum['value']),
          },
        ],
      },
    },
    color: {
      specified: modelColorMap,
    },
  });
  const [spec_line, setSpecLine] = useState({
    type: 'bar',
    data: [
      {
        id: 'barData',
        values: lineData,
      },
    ],
    xField: 'Time',
    yField: 'Usage',
    seriesField: 'Model',
    stack: true,
    legends: {
      visible: true,
      selectMode: 'single',
    },
    title: {
      visible: true,
      text: t('模型消耗分布'),
      subtext: `${t('总计')}：${renderQuota(consumeQuota, 2)}`,
    },
    bar: {
      state: {
        hover: {
          stroke: '#000',
          lineWidth: 1,
        },
      },
    },
    tooltip: {
      mark: {
        content: [
          {
            key: (datum) => datum['Model'],
            value: (datum) => renderQuota(datum['rawQuota'] || 0, 4),
          },
        ],
      },
      dimension: {
        content: [
          {
            key: (datum) => datum['Model'],
            value: (datum) => datum['rawQuota'] || 0,
          },
        ],
        updateContent: (array) => {
          array.sort((a, b) => b.value - a.value);
          let sum = 0;
          for (let i = 0; i < array.length; i++) {
            if (array[i].key == '其他') {
              continue;
            }
            let value = parseFloat(array[i].value);
            if (isNaN(value)) {
              value = 0;
            }
            if (array[i].datum && array[i].datum.TimeSum) {
              sum = array[i].datum.TimeSum;
            }
            array[i].value = renderQuota(value, 4);
          }
          array.unshift({
            key: t('总计'),
            value: renderQuota(sum, 4),
          });
          return array;
        },
      },
    },
    color: {
      specified: modelColorMap,
    },
  });

  // 添加一个新的状态来存储模型-颜色映射
  const [modelColors, setModelColors] = useState({});

  const handleInputChange = (value, name) => {
    if (name === 'data_export_default_time') {
      setDataExportDefaultTime(value);
      return;
    }
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const loadQuotaData = async () => {
    setLoading(true);
    try {
      let url = '';
      let localStartTimestamp = Date.parse(start_timestamp) / 1000;
      let localEndTimestamp = Date.parse(end_timestamp) / 1000;
      if (isAdminUser) {
        url = `/api/data/?username=${username}&start_timestamp=${localStartTimestamp}&end_timestamp=${localEndTimestamp}&default_time=${dataExportDefaultTime}`;
      } else {
        url = `/api/data/self/?start_timestamp=${localStartTimestamp}&end_timestamp=${localEndTimestamp}&default_time=${dataExportDefaultTime}`;
      }
      const res = await API.get(url);
      const { success, message, data } = res.data;
      if (success) {
        setQuotaData(data);
        if (data.length === 0) {
          data.push({
            count: 0,
            model_name: '无数据',
            quota: 0,
            created_at: now.getTime() / 1000,
          });
        }
        // sort created_at
        data.sort((a, b) => a.created_at - b.created_at);
        updateChartData(data);
      } else {
        showError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    await loadQuotaData();
  };

  const initChart = async () => {
    await loadQuotaData();
  };

  const updateChartData = (data) => {
    let newPieData = [];
    let newLineData = [];
    let totalQuota = 0;
    let totalTimes = 0;
    let uniqueModels = new Set();
    let totalTokens = 0;

    // 收集所有唯一的模型名称
    data.forEach((item) => {
      uniqueModels.add(item.model_name);
      totalTokens += item.token_used;
      totalQuota += item.quota;
      totalTimes += item.count;
    });

    // 处理颜色映射
    const newModelColors = {};
    Array.from(uniqueModels).forEach((modelName) => {
      newModelColors[modelName] =
        modelColorMap[modelName] ||
        modelColors[modelName] ||
        modelToColor(modelName);
    });
    setModelColors(newModelColors);

    // 按时间和模型聚合数据
    let aggregatedData = new Map();
    data.forEach((item) => {
      const timeKey = timestamp2string1(item.created_at, dataExportDefaultTime);
      const modelKey = item.model_name;
      const key = `${timeKey}-${modelKey}`;

      if (!aggregatedData.has(key)) {
        aggregatedData.set(key, {
          time: timeKey,
          model: modelKey,
          quota: 0,
          count: 0,
        });
      }

      const existing = aggregatedData.get(key);
      existing.quota += item.quota;
      existing.count += item.count;
    });

    // 处理饼图数据
    let modelTotals = new Map();
    for (let [_, value] of aggregatedData) {
      if (!modelTotals.has(value.model)) {
        modelTotals.set(value.model, 0);
      }
      modelTotals.set(value.model, modelTotals.get(value.model) + value.count);
    }

    newPieData = Array.from(modelTotals).map(([model, count]) => ({
      type: model,
      value: count,
    }));

    // 生成时间点序列
    let timePoints = Array.from(
      new Set([...aggregatedData.values()].map((d) => d.time)),
    );
    if (timePoints.length < 7) {
      const lastTime = Math.max(...data.map((item) => item.created_at));
      const interval =
        dataExportDefaultTime === 'hour'
          ? 3600
          : dataExportDefaultTime === 'day'
            ? 86400
            : 604800;

      timePoints = Array.from({ length: 7 }, (_, i) =>
        timestamp2string1(lastTime - (6 - i) * interval, dataExportDefaultTime),
      );
    }

    // 生成柱状图数据
    timePoints.forEach((time) => {
      // 为每个时间点收集所有模型的数据
      let timeData = Array.from(uniqueModels).map((model) => {
        const key = `${time}-${model}`;
        const aggregated = aggregatedData.get(key);
        return {
          Time: time,
          Model: model,
          rawQuota: aggregated?.quota || 0,
          Usage: aggregated?.quota ? getQuotaWithUnit(aggregated.quota, 4) : 0,
        };
      });

      // 计算该时间点的总计
      const timeSum = timeData.reduce((sum, item) => sum + item.rawQuota, 0);

      // 按照 rawQuota 从大到小排序
      timeData.sort((a, b) => b.rawQuota - a.rawQuota);

      // 为每个数据点添加该时间的总计
      timeData = timeData.map((item) => ({
        ...item,
        TimeSum: timeSum,
      }));

      // 将排序后的数据添加到 newLineData
      newLineData.push(...timeData);
    });

    // 排序
    newPieData.sort((a, b) => b.value - a.value);
    newLineData.sort((a, b) => a.Time.localeCompare(b.Time));

    // 更新图表配置和数据
    setSpecPie((prev) => ({
      ...prev,
      data: [{ id: 'id0', values: newPieData }],
      title: {
        ...prev.title,
        subtext: `${t('总计')}：${renderNumber(totalTimes)}`,
      },
      color: {
        specified: newModelColors,
      },
    }));

    setSpecLine((prev) => ({
      ...prev,
      data: [{ id: 'barData', values: newLineData }],
      title: {
        ...prev.title,
        subtext: `${t('总计')}：${renderQuota(totalQuota, 2)}`,
      },
      color: {
        specified: newModelColors,
      },
    }));

    setPieData(newPieData);
    setLineData(newLineData);
    setConsumeQuota(totalQuota);
    setTimes(totalTimes);
    setConsumeTokens(totalTokens);
  };

  const getUserData = async () => {
    let res = await API.get(`/api/user/self`);
    const { success, message, data } = res.data;
    if (success) {
      userDispatch({ type: 'login', payload: data });
    } else {
      showError(message);
    }
  };

  useEffect(() => {
    getUserData();
    if (!initialized.current) {
      initVChartSemiTheme({
        isWatchingThemeSwitch: true,
      });
      initialized.current = true;
      initChart();
    }
  }, []);

  return (
    <>
      <Layout>
        {/* <Layout.Header>
          <h3>{t('数据看板')}</h3>
        </Layout.Header> */}
        <Layout.Content>
          {/* <Form ref={formRef} layout='horizontal' style={{ marginTop: 10 }}>
            <>
              <Form.DatePicker
                field='start_timestamp'
                label={t('起始时间')}
                style={{ width: 272 }}
                initValue={start_timestamp}
                value={start_timestamp}
                type='dateTime'
                name='start_timestamp'
                onChange={(value) =>
                  handleInputChange(value, 'start_timestamp')
                }
              />
              <Form.DatePicker
                field='end_timestamp'
                fluid
                label={t('结束时间')}
                style={{ width: 272 }}
                initValue={end_timestamp}
                value={end_timestamp}
                type='dateTime'
                name='end_timestamp'
                onChange={(value) => handleInputChange(value, 'end_timestamp')}
              />
              <Form.Select
                field='data_export_default_time'
                label={t('时间粒度')}
                style={{ width: 176 }}
                initValue={dataExportDefaultTime}
                placeholder={t('时间粒度')}
                name='data_export_default_time'
                optionList={[
                  { label: t('小时'), value: 'hour' },
                  { label: t('天'), value: 'day' },
                  { label: t('周'), value: 'week' },
                ]}
                onChange={(value) =>
                  handleInputChange(value, 'data_export_default_time')
                }
              ></Form.Select>
              {isAdminUser && (
                <>
                  <Form.Input
                    field='username'
                    label={t('用户名称')}
                    style={{ width: 176 }}
                    value={username}
                    placeholder={t('可选值')}
                    name='username'
                    onChange={(value) => handleInputChange(value, 'username')}
                  />
                </>
              )}
              <Button
                label={t('查询')}
                type='primary'
                htmlType='submit'
                className='btn-margin-right'
                onClick={refresh}
                loading={loading}
                style={{ marginTop: 24 }}
              >
                {t('查询')}
              </Button>
              <Form.Section></Form.Section>
            </>
          </Form> */}
          <Spin spinning={loading}>
            <Row
              gutter={{ xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 }}
              style={{ marginTop: 20 }}
              type='flex'
            >
              <Col span={styleState.isMobile ? 24 : 9}>
                <Card className='panel-desc-card balance'>
                  <div className='title'>
                    <h3>{t('余额摘要')}</h3>
                  </div>
                  <div className='stats'>
                    <div className='stat'>
                      <h4>{t('当前余额')}</h4>
                      <p> {renderQuota(userState?.user?.quota)}</p>
                    </div>
                    <div className='stat'>
                      <h4>{t('已用余额')}</h4>
                      <p> {renderQuota(userState?.user?.used_quota)}</p>
                    </div>
                    <div className='stat'>
                      <h4>{t('请求次数')}</h4>
                      <p> {userState.user?.request_count}</p>
                    </div>
                  </div>
                  <div className='line'>
                    <img src={line} alt='' />
                  </div>
                </Card>
              </Col>
              <Col span={styleState.isMobile ? 24 : 8}>
                <Card className='panel-desc-card '>
                  <div className='title'>
                    <h3>{t('统计摘要')}</h3>
                  </div>
                  <div className='stats'>
                    <div className='stat'>
                      <h4>{t('配额')}</h4>
                      <p> {renderQuota(consumeQuota)}</p>
                    </div>
                    <div className='stat'>
                      <h4>{t('代币')}</h4>
                      <p> {consumeTokens}</p>
                    </div>
                    <div className='stat'>
                      <h4>{t('次数')}</h4>
                      <p> {times}</p>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={styleState.isMobile ? 24 : 6} style={{ width: '29%' }}>
                <Card className='panel-desc-card rpm'>
                  <div className='title'>
                    <div className='heading'>
                      <h3>{t('平均RPM')}</h3>
                      <span>0</span>
                    </div>
                    <div className='arrow'>
                      <p>{t('本周')}</p>
                      <IoIosArrowDown className='ml-2' />
                    </div>
                  </div>
                  <div className='title'>
                    <div className='heading'>
                      <h3>{t('平均RPM')}</h3>
                      <span>0</span>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Card style={{ marginTop: 20 }}>
              {/* <Tabs type='line' defaultActiveKey='1'>
    <Tabs.TabPane tab={t('消耗分布')} itemKey='1'>
      <div style={{ height: 500 }}>
        <VChart
          spec={spec_line}
          option={{ mode: 'desktop-browser' }}
        />
      </div>
    </Tabs.TabPane>
    <Tabs.TabPane tab={t('调用次数分布')} itemKey='2'>
      <div style={{ height: 500 }}>
        <VChart
          spec={spec_pie}
          option={{ mode: 'desktop-browser' }}
        />
      </div>
    </Tabs.TabPane>
  </Tabs> */}
              <div className='chart-head'>
                <h3>{t('模型消耗分布')}</h3>
                <ul>
                  <li>
                    {t('所有代币')} <IoIosArrowDown />{' '}
                  </li>
                  <li>
                    {t('2024年11月10日 - 2024年12月16日')} <IoIosArrowDown />{' '}
                  </li>
                </ul>
              </div>
              <VChart spec={spec_line} option={{ mode: 'desktop-browser' }} />
            </Card>
            <Row
              gutter={{ xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 }}
              style={{ marginTop: 20 }}
              type='flex'
            >
              <Col span={styleState.isMobile ? 24 : 16}>
                <Card>
                  <h4>{t('模型调用分布')}</h4>
                  <div className='main-card'>
                    <img
                      src='https://img.icons8.com/ios-filled/50/000000/pie-chart.png'
                      alt='Chart Icon'
                    />
                    <h2>{t('没有数据')}</h2>
                    <p>{t('添加代币以开始跟踪调用分布指标。')}</p>
                    <button>
                      <img
                        src='https://img.icons8.com/ios-filled/50/ffffff/plus.png'
                        alt='Plus Icon'
                      />
                      {t('新增代币')}
                    </button>
                  </div>
                </Card>
              </Col>
              <Col span={styleState.isMobile ? 24 : 8}>
                <div className='summary-cards'>
                  <div className='summary-card shadow'>
                    <h4>{t('代币摘要')}</h4>
                    <div className='value'>0</div>
                    <div className='sub-value'>{t('代币')}</div>
                    <div className='sub-value'>{t('请求次数')}</div>
                  </div>

                  <div className='summary-card shadow'>
                    <h4>{t('调用摘要')}</h4>
                    <div className='value'>0</div>
                    <div className='sub-value'>{t('调用次数')}</div>
                    <div className='sub-value'>{t('成功')}</div>
                    <div className='sub-value'>{t('失败')}</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Spin>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default Detail;
