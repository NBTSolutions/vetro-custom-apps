import { useEffect, useState } from "react";
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
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { AppProps } from "./types";

const { Content, Footer } = Layout;
const { Option } = Select;

// Initial data for the table
const initialData = Array.from({ length: 20 }, (_, index) => ({
  key: index,
  id: `BSS00${index}`,
  name: `Customer ${index}`,
  status: index % 2 === 0 ? "Active" : "Inactive",
  service: index % 3 === 0 ? "Internet" : "Telephony",
  contact: `contact${index}@example.com`,
  provisioned: false,
}));

const Dashboard = ({ context: { user, fetchFibermapAPI } }: AppProps) => {
  const [data, setData] = useState(initialData);
  const [totalPlans, setTotalPlans] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isProvisionModalVisible, setIsProvisionModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [provisioningRecord, setProvisioningRecord] = useState<any>(null);
  const [form] = Form.useForm();
  const [provisionForm] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFibermapAPI("/v2/plans");
        const data = await response.json();
        setTotalPlans(data.result.plans.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Table columns definition with sorting, filters, and actions
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: any) => (
        <Tag color={status === "Active" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      filters: [
        { text: "Internet", value: "Internet" },
        { text: "Telephony", value: "Telephony" },
      ],
      onFilter: (value: any, record: any) => record.service === value,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Provisioned",
      dataIndex: "provisioned",
      key: "provisioned",
      render: (provisioned: any) =>
        provisioned ? (
          <Tag color="blue">Provisioned</Tag>
        ) : (
          <Tag color="red">Not Provisioned</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
          {!record.provisioned && (
            <Button
              icon={<CheckCircleOutlined />}
              onClick={() => handleProvision(record)}
            >
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
    message.success("Record added successfully");
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
    message.success("Record updated successfully");
  };

  // Handle record deletion
  const handleDelete = (record: any) => {
    const filtered = data.filter((item) => item.id !== record.id);
    setData(filtered);
    setFilteredData(filtered);
    message.success("Record deleted successfully");
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
      item.id === provisioningRecord.id
        ? { ...item, provisioned: true, ...values }
        : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
    setIsProvisionModalVisible(false);
    setProvisioningRecord(null);
    message.success("Customer provisioned successfully");
  };

  return (
    <p>Test</p>
  );
};

export default Dashboard;
