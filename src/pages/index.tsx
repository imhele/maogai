import React, { FC } from 'react';
import { Input, Table } from 'antd';

const { TextArea } = Input;
const { Column } = Table;

interface TableItem {
  key: string;
  keyword: string;
  function: string;
  example: string;
}

const TableData: TableItem[] = [
  {
    key: '0',
    keyword: '纸',
    function: '声明变量，使用变量时采用就近原则',
    example: '毛主席拿来一张白纸',
  },
  {
    key: '1',
    keyword: '称...为...',
    function: '变量赋值，将左值赋给右值，对全局变量进行此操作时，相当于创建了一个别名',
    example: '我们亲切的称毛泽东为毛主席',
  },
  {
    key: '2',
    keyword: '说/读',
    function: '标准输出',
    example: '毛主席说雄关漫道真如铁',
  },
  {
    key: '3',
    keyword: '在...上写',
    function: '变量赋值，将右值赋给左值',
    example: '毛主席在白纸上写沁园春·雪',
  },
];

const Index: FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Table dataSource={TableData}>
        <Column title="关键词" dataIndex="keyword" key="keyword" />
        <Column title="作用" dataIndex="function" key="function" />
        <Column title="示例" dataIndex="example" key="example" />
      </Table>
      <TextArea autosize={{ minRows: 16 }} />
    </div>
  );
};

export default Index;
