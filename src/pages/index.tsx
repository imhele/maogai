import RunMaoGaiScript, { debugOutput, DebugType } from '@/utils/maogai';
import { Col, Input, Row, Table, Typography } from 'antd';
import { BaseType as TextType } from 'antd/es/typography/Base';
import { Moment } from 'moment';
import React, { ReactNode, FC, useState } from 'react';
import useMedia from 'react-media-hook2';
import styles from './index.less';

const { TextArea } = Input;
const { Column } = Table;
const { Paragraph, Text, Title } = Typography;

interface TableItem {
  key: string;
  keyword: string;
  function: string;
  example: string;
}

const TableData: TableItem[] = [
  {
    key: '0',
    keyword: '在 xxx 上写 [：]',
    function: '声明变量并赋值，变量取值采取就近原则',
    example: '毛主席在纸上写：沁园春·雪',
  },
  {
    key: '1',
    keyword: '[拿起 ...] 说/读',
    function: '标准输出',
    example: '毛主席说雄关漫道真如铁',
  },
  {
    key: '2',
    keyword: '提出/确立 [了] ... 思想/主义/方针',
    function: '声明类，包含方法，允许继承',
    example: '1951 年，毛主席提出了双百方针',
  },
  {
    key: '3',
    keyword: '基于 ... 的',
    function: '继承类',
    example: '七大确立了基于马克思主义的毛泽东思想为党的指导思想',
  },
  {
    key: '4',
    keyword: '包含 ... 方法',
    function: '声明类的方法',
    example: '马克思主义包含辩证分析方法',
  },
  {
    key: '5',
    keyword: '... 思想/主义/方针 [的] 方法有哪些',
    function: '声明类的方法',
    example: '毛泽东思想的方法有哪些？',
  },
];

const DebugTextType: Map<DebugType, TextType> = new Map([
  [DebugType.ERROR, 'danger' as TextType],
  [DebugType.WARN, 'warning' as TextType],
  [DebugType.INFO, void 0],
]);

const renderDebugOutput = (item: [Moment, DebugType, string]): ReactNode => {
  const timestamp = item[0].format('YYYY/MM/DD HH:mm:ss:SSS');
  return (
    <div key={timestamp}>
      <Text type="secondary">{timestamp}</Text>
      <Text strong type={DebugTextType.get(item[1])}>{` [${item[1]}] `}</Text>
      <Paragraph copyable className={styles.description} ellipsis={{ rows: 2, expandable: true }}>
        {item[2]}
      </Paragraph>
    </div>
  );
};

const Index: FC = () => {
  const [code, setCode] = useState('');
  const isMobile = useMedia({ query: { maxWidth: 768 } })[0];
  return (
    <div className={styles.container}>
      <Table
        className={styles.table}
        dataSource={TableData}
        pagination={false}
        scroll={{ x: 768 }}
        size={isMobile ? 'small' : 'middle'}
      >
        <Column title="关键词" dataIndex="keyword" key="keyword" />
        <Column title="作用" dataIndex="function" key="function" />
        <Column title="示例" dataIndex="example" key="example" />
      </Table>
      <Row gutter={24}>
        <Col md={12} xs={24}>
          <Title level={3}>Code</Title>
          <TextArea
            autosize={{ minRows: 16 }}
            onPressEnter={({ currentTarget: t }) => setCode(t.value)}
          />
        </Col>
        <Col md={12} xs={24}>
          <Title level={3}>Output</Title>
          <TextArea autosize={{ minRows: 16 }} value={RunMaoGaiScript(code).join('\n')} />
        </Col>
      </Row>
      <Title level={3}>Debug Info</Title>
      <div className={styles.debugOutput}>{debugOutput.map(renderDebugOutput)}</div>
    </div>
  );
};

export default Index;
