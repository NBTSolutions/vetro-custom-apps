import React, { useState } from 'react';
import {
  Layout,
  Breadcrumb,
  Table,
  Input,
  Button,
  Form,
  Modal,
  Space,
  Row,
  Col,
  Tag,
  Select,
  message,
  DatePicker,
  Typography,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

interface CustomAppProps {
  context: {
    user: any;
  };
}

interface AppProps {}

type Props = AppProps & CustomAppProps;

const { Header, Content, Footer } = Layout;
const { Option } = Select;

// Initial data for the table
const initialData = Array.from({ length: 20 }, (_, index) => ({
  key: index,
  id: `BSS00${index}`,
  name: `Customer ${index}`,
  status: index % 2 === 0 ? 'Active' : 'Inactive',
  service: index % 3 === 0 ? 'Internet' : 'Telephony',
  contact: `contact${index}@example.com`,
  provisioned: false,
}));

const Dashboard = ({ context: { user } }: Props) => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isProvisionModalVisible, setIsProvisionModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [provisioningRecord, setProvisioningRecord] = useState<any>(null);
  const [form] = Form.useForm();
  const [provisionForm] = Form.useForm();

  // Table columns definition with sorting, filters, and actions
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: any, b: any) => a.id.localeCompare(b.id),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: any) => (
        <Tag color={status === 'Active' ? 'green' : 'volcano'}>{status}</Tag>
      ),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      filters: [
        { text: 'Internet', value: 'Internet' },
        { text: 'Telephony', value: 'Telephony' },
      ],
      onFilter: (value: any, record: any) => record.service === value,
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Provisioned',
      dataIndex: 'provisioned',
      key: 'provisioned',
      render: (provisioned: any) =>
        provisioned ? <Tag color="blue">Provisioned</Tag> : <Tag color="red">Not Provisioned</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
          {!record.provisioned && (
            <Button icon={<CheckCircleOutlined />} onClick={() => handleProvision(record)}>
              Provision
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // Handle search
  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchText(value);
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.id.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  // Handle record addition
  const handleAddNewRecord = (values: any) => {
    const newRecord = {
      key: data.length,
      id: `BSS00${data.length}`,
      ...values,
      provisioned: false,
    };
    setData([...data, newRecord]);
    setFilteredData([...data, newRecord]);
    setIsAddModalVisible(false);
    form.resetFields();
    message.success('Record added successfully');
  };

  // Handle record edit
  const handleEdit = (record: any) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const handleUpdateRecord = (values: any) => {
    const updatedData = data.map((item) =>
      item.id === editingRecord.id ? { ...editingRecord, ...values } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
    setIsEditModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
    message.success('Record updated successfully');
  };

  // Handle record deletion
  const handleDelete = (record: any) => {
    const filtered = data.filter((item) => item.id !== record.id);
    setData(filtered);
    setFilteredData(filtered);
    message.success('Record deleted successfully');
  };

  // Handle provisioning initiation
  const handleProvision = (record: any) => {
    setProvisioningRecord(record);
    provisionForm.resetFields();
    setIsProvisionModalVisible(true);
  };

  // Handle provisioning submission
  const handleProvisioning = (values: any) => {
    const updatedData = data.map((item) =>
      item.id === provisioningRecord.id ? { ...item, provisioned: true, ...values } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
    setIsProvisionModalVisible(false);
    setProvisioningRecord(null);
    message.success('Customer provisioned successfully');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '10px', paddingTop: 16 }}>
        Welcome <Typography.Text strong>{user.email}</Typography.Text>! This is the Dashboard page.
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={12}>
              <Input
                placeholder="Search by ID or Name"
                value={searchText}
                onChange={handleSearch}
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsAddModalVisible(true)}
              >
                Add New Record
              </Button>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 10 }}
            rowKey="id"
          />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>BSS / OSS System ©2024</Footer>

      {/* Add New Record Modal */}
      <Modal
        title="Add New Record"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddNewRecord}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="service"
            label="Service"
            rules={[{ required: true, message: 'Please select the service!' }]}
          >
            <Select placeholder="Select service">
              <Option value="Internet">Internet</Option>
              <Option value="Telephony">Telephony</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contact"
            rules={[{ required: true, message: 'Please input the contact!' }]}
          >
            <Input placeholder="Enter contact email" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'end' }}>
              <Button onClick={() => setIsAddModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Record Modal */}
      <Modal
        title="Edit Record"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateRecord}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="service"
            label="Service"
            rules={[{ required: true, message: 'Please select the service!' }]}
          >
            <Select placeholder="Select service">
              <Option value="Internet">Internet</Option>
              <Option value="Telephony">Telephony</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contact"
            rules={[{ required: true, message: 'Please input the contact!' }]}
          >
            <Input placeholder="Enter contact email" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'end' }}>
              <Button onClick={() => setIsEditModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Provision Customer Modal */}
      <Modal
        title="Provision Customer"
        visible={isProvisionModalVisible}
        onCancel={() => setIsProvisionModalVisible(false)}
        footer={null}
      >
        <Form form={provisionForm} layout="vertical" onFinish={handleProvisioning}>
          <Form.Item
            name="plan"
            label="Service Plan"
            rules={[{ required: true, message: 'Please select the service plan!' }]}
          >
            <Select placeholder="Select service plan">
              <Option value="Basic">Basic</Option>
              <Option value="Standard">Standard</Option>
              <Option value="Premium">Premium</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="activationDate"
            label="Activation Date"
            rules={[{ required: true, message: 'Please select the activation date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'end' }}>
              <Button onClick={() => setIsProvisionModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Provision
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default {
  component: Dashboard,
};
