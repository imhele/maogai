import RunMaoGaiScript, { debugOutput, DebugType } from '@/utils/maogai';
import { Col, Icon, Input, Layout, message, Row, Table, Typography } from 'antd';
import { BaseType as TextType } from 'antd/es/typography/Base';
import { Moment } from 'moment';
import React, { ReactNode, FC, useState, useRef, useEffect } from 'react';
import useMedia from 'react-media-hook2';
import styles from './index.less';

const { TextArea } = Input;
const { Content, Footer } = Layout;
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
    function: '输出类的方法',
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
      <Text strong type={DebugTextType.get(item[1])}>{`[${item[1]}] `}</Text>
      <Text type="secondary">{timestamp}</Text>
      <Paragraph copyable className={styles.description} ellipsis={{ rows: 2, expandable: true }}>
        {item[2]}
      </Paragraph>
    </div>
  );
};

const useUpdate: () => [string, React.Dispatch<React.SetStateAction<void>>] = () => {
  const [str, setStr] = useState('');
  return [str, () => setStr(str ? '' : ' ')];
};

const initCode = `毛主席在纸上写
沁园春·雪
北国风光，千里冰封，万里雪飘
望长城内外，惟余莽莽
大河上下，顿失滔滔
山舞银蛇，原驰蜡象，欲与天公试比高
须晴日，看红装素裹，分外妖娆。
我拿起纸开始读。
马克思与恩格斯提出了马克思主义。
马克思主义包含辩证分析方法。
七大确立了基于马克思主义的毛泽东思想为党的指导思想。
毛泽东思想包含实事求是方法。
毛泽东思想的方法有哪些？`;

const Index: FC = () => {
  const [plainStr, forceUpdate] = useUpdate();
  const [code, setCode] = useState(initCode);
  const isMobile = useMedia({ query: { maxWidth: 768 } })[0];
  const clearDebug = () => {
    debugOutput.splice(0, debugOutput.length);
    message.success('Clear debug info successfully');
    forceUpdate();
  };
  return (
    <Layout className={styles.container}>
      <Content>
        <Title className={styles.headerTitle}>
          MaoGaiScript - Online Editor {plainStr}
          <img src="//travis-ci.com/imhele/maogai.svg?token=ZYib2HA5UQBMhbDz2esD&branch=master" />
          <img src="//api.netlify.com/api/v1/badges/7f078f48-b8d6-405c-bc01-1823768f167a/deploy-status" />
        </Title>
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
              defaultValue={initCode}
              onPressEnter={({ currentTarget: t }) => setCode(t.value)}
            />
          </Col>
          <Col md={12} xs={24}>
            <Title level={3}>Output</Title>
            <TextArea autosize={{ minRows: 16 }} value={RunMaoGaiScript(code).join('\n')} />
          </Col>
        </Row>
        <Title level={3}>
          Debug Info
          <a className={styles.clearBtn} onClick={clearDebug}>
            <Icon type="delete" />
            <span> Clear</span>
          </a>
        </Title>
        <div className={styles.debugOutput}>{debugOutput.map(renderDebugOutput)}</div>
      </Content>
      <Footer className={styles.footer}>
        <div>
          Powered by <a href="//umijs.org">UmiJS</a>
        </div>
        <div>
          <a href="//github.com/imhele/maogai">
            <Icon type="github" /> imhele/maogai
          </a>
          <span> - MIT License</span>
        </div>
      </Footer>
    </Layout>
  );
};

export default Index;
