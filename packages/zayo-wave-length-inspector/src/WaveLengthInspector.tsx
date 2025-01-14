import React, { useState } from 'react';
import { Table, Tag, Input, Button, Modal, Form, Space, Row, Col, message } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';

interface WaveLengthInspectorProps {
  data: any[];
}

const WaveLengthInspector = ({ data: initialData }: WaveLengthInspectorProps) => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState('');

  // Modal states
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // Record for viewing/editing
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  /**
   * Handle searching/filtering.
   * Filters data by waveLength, company, or status.
   */
  const filteredData = data.filter((item) => {
    const searchLower = searchText.toLowerCase();
    return (
      item.company.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower) ||
      item.waveLength.toString().includes(searchText)
    );
  });

  /**
   * Table column definitions.
   */
  const columns = [
    {
      title: 'Wave Length (nm)',
      dataIndex: 'waveLength',
      key: 'waveLength',
      render: (val: number) => <Tag color="blue">{val} nm</Tag>,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'active' ? 'green' : 'volcano';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        </Space>
      ),
    },
  ];

  /**
   * Handlers for viewing and editing.
   */
  const handleView = (record: any) => {
    setSelectedRecord(record);
    setIsViewModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setIsEditModalVisible(true);
  };

  /**
   * Close modals
   */
  const handleViewModalCancel = () => {
    setIsViewModalVisible(false);
    setSelectedRecord(null);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setSelectedRecord(null);
  };

  /**
   * When the user saves the edited record.
   */
  const handleEditSave = (values: any) => {
    // Update data
    const updatedData = data.map((item) =>
      item.id === selectedRecord.id ? { ...item, ...values } : item
    );
    setData(updatedData);

    message.success('Record updated successfully!');
    setIsEditModalVisible(false);
    setSelectedRecord(null);
  };

  return (
    <Col>
      <h2>Wave Length Inspector</h2>

      {/* Search / Filter Bar */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col>
          <Input
            placeholder="Search by Wavelength, Company, or Status"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
      </Row>

      {/* Table of Wave Lengths */}
      <Table
        rowKey="id"
        size={'small'}
        columns={columns}
        dataSource={filteredData}
        pagination={false}
      />

      {/* View Details Modal */}
      <Modal
        title="View Wave Length Details"
        open={isViewModalVisible}
        onCancel={handleViewModalCancel}
        footer={[
          <Button key="close" onClick={handleViewModalCancel}>
            Close
          </Button>,
        ]}
      >
        {selectedRecord && (
          <div>
            <p>
              <strong>Wave Length (nm):</strong> {selectedRecord.waveLength}
            </p>
            <p>
              <strong>Company:</strong> {selectedRecord.company}
            </p>
            <p>
              <strong>Status:</strong> {selectedRecord.status}
            </p>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Wave Length Record"
        open={isEditModalVisible}
        onCancel={handleEditModalCancel}
        footer={null}
      >
        {selectedRecord && (
          <Form
            initialValues={{
              waveLength: selectedRecord.waveLength,
              company: selectedRecord.company,
              status: selectedRecord.status,
            }}
            layout="vertical"
            onFinish={handleEditSave}
          >
            <Form.Item
              label="Wave Length (nm)"
              name="waveLength"
              rules={[{ required: true, message: 'Please enter a wave length!' }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Company"
              name="company"
              rules={[{ required: true, message: 'Please enter a company name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Please enter a status!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button onClick={handleEditModalCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Col>
  );
};

export default WaveLengthInspector;
