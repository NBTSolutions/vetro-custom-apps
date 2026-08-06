import { useState } from "react";
import {
  Card,
  Tag,
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  message,
  Space,
  Descriptions,
} from "antd";
import {
  EditOutlined,
  CheckCircleOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

// Sample customer data
const customerData = {
  id: "BSS001",
  name: "John Doe",
  status: "Active",
  service: "Internet",
  contact: "john.doe@example.com",
  provisioned: false,
  plan: "Basic",
  activationDate: null,
};

export const CustomerProvisionCard = ({ customer = customerData }) => {
  const [isProvisioned, setIsProvisioned] = useState(customer.provisioned);
  const [isProvisionModalVisible, setIsProvisionModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isLogsModalVisible, setIsLogsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Handle provisioning
  const handleProvision = (values: any) => {
    setIsProvisioned(true);
    setIsProvisionModalVisible(false);
    message.success(`Customer provisioned with ${values.plan} plan!`);
  };

  // Handle updating service
  const handleUpdateService = (values: any) => {
    setIsUpdateModalVisible(false);
    message.success(
      `Service updated to ${values.service} with ${values.plan} plan!`
    );
  };

  // Open logs modal
  const handleViewLogs = () => {
    setIsLogsModalVisible(true);
  };

  return (
    <Card
      size="small"
      title={`Customer: ${customer.name}`}
      extra={
        <Tag color={isProvisioned ? "blue" : "red"}>
          {isProvisioned ? "Provisioned" : "Not Provisioned"}
        </Tag>
      }
      style={{ width: "100%" }}
      actions={[
        <Button
          icon={<CheckCircleOutlined />}
          type="primary"
          onClick={() => setIsProvisionModalVisible(true)}
          disabled={isProvisioned}
        >
          Provision
        </Button>,
        <Button
          icon={<EditOutlined />}
          onClick={() => setIsUpdateModalVisible(true)}
        >
          Update Service
        </Button>,
        <Button icon={<HistoryOutlined />} onClick={handleViewLogs}>
          View Logs
        </Button>,
      ]}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Customer ID">{customer.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{customer.name}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={customer.status === "Active" ? "green" : "volcano"}>
            {customer.status}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Service">
          {customer.service}
        </Descriptions.Item>
        <Descriptions.Item label="Contact">
          {customer.contact}
        </Descriptions.Item>
        <Descriptions.Item label="Plan">{customer.plan}</Descriptions.Item>
        <Descriptions.Item label="Activation Date">
          {customer.activationDate
            ? dayjs(customer.activationDate).format("YYYY-MM-DD")
            : "Not Set"}
        </Descriptions.Item>
      </Descriptions>

      {/* Provisioning Modal */}
      <Modal
        title="Provision Customer"
        open={isProvisionModalVisible}
        onCancel={() => setIsProvisionModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleProvision}>
          <Form.Item
            name="plan"
            label="Select Plan"
            rules={[{ required: true, message: "Please select a plan!" }]}
          >
            <Select placeholder="Choose a plan">
              <Option value="Basic">Basic</Option>
              <Option value="Standard">Standard</Option>
              <Option value="Premium">Premium</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="activationDate"
            label="Activation Date"
            rules={[
              { required: true, message: "Please select an activation date!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "end" }}>
              <Button onClick={() => setIsProvisionModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Provision
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Update Service Modal */}
      <Modal
        title="Update Service"
        open={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateService}>
          <Form.Item
            name="service"
            label="Service"
            rules={[{ required: true, message: "Please select a service!" }]}
          >
            <Select placeholder="Select service">
              <Option value="Internet">Internet</Option>
              <Option value="Telephony">Telephony</Option>
              <Option value="Cable TV">Cable TV</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="plan"
            label="Plan"
            rules={[{ required: true, message: "Please select a plan!" }]}
          >
            <Select placeholder="Select plan">
              <Option value="Basic">Basic</Option>
              <Option value="Standard">Standard</Option>
              <Option value="Premium">Premium</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "end" }}>
              <Button onClick={() => setIsUpdateModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Logs Modal */}
      <Modal
        title="Provisioning Logs"
        open={isLogsModalVisible}
        onCancel={() => setIsLogsModalVisible(false)}
        footer={null}
      >
        <div>
          <p>
            <b>Log Entry 1:</b> Customer created on 2024-01-01
          </p>
          <p>
            <b>Log Entry 2:</b> Initial service set to Internet (Basic Plan)
          </p>
          <p>
            <b>Log Entry 3:</b> Activation date set to 2024-01-10
          </p>
          <p>
            <b>Log Entry 4:</b> Service upgraded to Premium on 2024-05-05
          </p>
        </div>
      </Modal>
    </Card>
  );
};
