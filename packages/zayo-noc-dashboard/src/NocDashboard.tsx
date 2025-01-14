import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  Table,
  Tag,
  Typography,
  Divider,
  Button,
  Select,
  Modal,
  Space,
  message,
} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Area } from '@ant-design/charts';
import type { TableColumnsType } from 'antd';

const { Title } = Typography;
const { Option } = Select;

/**
 * Generates random integer data for demonstration.
 */
function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates mock KPI data.
 */
function generateKpiData() {
  return {
    activeCircuits: getRandomInteger(80, 150),
    outages: getRandomInteger(0, 10),
    slaCompliance: parseFloat((95 + Math.random() * 5).toFixed(1)),
    openTickets: getRandomInteger(5, 30),
  };
}

/**
 * Generates random bandwidth data for the last 8 hours.
 */
function generateBandwidthData() {
  const hours = Array.from({ length: 8 }, (_, i) => i);
  return hours.map((hour) => ({
    time: `${hour}:00`,
    bandwidth: getRandomInteger(100, 600),
  }));
}

/**
 * Sample alert data.
 */
const initialAlertData = [
  {
    key: '1',
    description: 'Fiber cut detected at Region A',
    severity: 'Critical',
    date: '2025-01-10 06:45',
    details: 'Loss of signal on trunk fiber. Dispatching field engineer.',
  },
  {
    key: '2',
    description: 'High latency on backhaul link B2',
    severity: 'Warning',
    date: '2025-01-10 07:10',
    details: 'Latency threshold exceeded (120ms). Investigating possible congestion.',
  },
  {
    key: '3',
    description: 'Device offline in Node C',
    severity: 'Critical',
    date: '2025-01-10 07:20',
    details: 'Major hardware failure suspected. Technicians en route.',
  },
  {
    key: '4',
    description: 'Power outage in Data Center D',
    severity: 'Major',
    date: '2025-01-10 07:30',
    details: 'Backup generator operational. Monitoring battery levels.',
  },
];

/**
 * NocDashboard Component
 */
const NocDashboard = () => {
  // STATES
  const [kpiData, setKpiData] = useState(generateKpiData());
  const [bandwidthData, setBandwidthData] = useState(generateBandwidthData());
  const [alertData, setAlertData] = useState(initialAlertData);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);

  /**
   * Chart config for bandwidth usage using @ant-design/charts.
   */
  const areaConfig = {
    data: bandwidthData,
    xField: 'time',
    yField: 'bandwidth',
    smooth: true,
    height: 200,
    areaStyle: {
      fill: 'l(270) 0:#1890ff 1:#f0f5ff',
    },
    tooltip: {
      showCrosshairs: true,
      shared: true,
    },
  };

  /**
   * Alert Table Columns
   */
  const alertColumns: TableColumnsType<any> = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => {
        let color = 'blue';
        if (severity === 'Critical') color = 'red';
        else if (severity === 'Major') color = 'volcano';
        else if (severity === 'Warning') color = 'orange';
        return <Tag color={color}>{severity}</Tag>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      key: 'action',
      responsive: ['md'],
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleViewDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  /**
   * Filter the alert data based on severity.
   */
  const filteredAlertData = alertData.filter((alert) => {
    if (severityFilter === 'All') return true;
    return alert.severity === severityFilter;
  });

  /**
   * Handler to open alert details modal.
   */
  const handleViewDetails = (alertRecord: any) => {
    setSelectedAlert(alertRecord);
    setIsAlertModalVisible(true);
  };

  /**
   * Handler to close alert modal.
   */
  const handleCloseAlertModal = () => {
    setIsAlertModalVisible(false);
    setSelectedAlert(null);
  };

  /**
   * Simulate refreshing of data (KPI and bandwidth).
   */
  const handleRefreshData = () => {
    setKpiData(generateKpiData());
    setBandwidthData(generateBandwidthData());
    message.success('Data refreshed!');
  };

  return (
    <div style={{ padding: 16 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        NOC Dashboard
      </Title>

      {/* TOP ROW - KPI CARDS */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Circuits"
              value={kpiData.activeCircuits}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Outages"
              value={kpiData.outages}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="SLA Compliance (%)"
              value={kpiData.slaCompliance}
              precision={1}
              suffix="%"
            />
            <Progress
              percent={kpiData.slaCompliance}
              size="small"
              strokeColor="#52c41a"
              style={{ marginTop: 16 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Open Tickets" value={kpiData.openTickets} />
          </Card>
        </Col>
      </Row>

      {/* REFRESH BUTTON */}
      <Row style={{ marginTop: 16 }}>
        <Col>
          <Button type="primary" onClick={handleRefreshData}>
            Refresh Data
          </Button>
        </Col>
      </Row>

      <Divider />

      {/* SECOND ROW - BANDWIDTH USAGE CHART */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Bandwidth Usage (Past 8 Hours)">
            <Area {...areaConfig} />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* THIRD ROW - ALERTS TABLE WITH SEVERITY FILTER */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space style={{ marginBottom: 16 }}>
            <span>Filter by Severity:</span>
            <Select
              value={severityFilter}
              onChange={(val) => setSeverityFilter(val)}
              style={{ width: 150 }}
            >
              <Option value="All">All</Option>
              <Option value="Critical">Critical</Option>
              <Option value="Major">Major</Option>
              <Option value="Warning">Warning</Option>
            </Select>
          </Space>
          <Card title="Active Alerts">
            <Table
              columns={alertColumns}
              dataSource={filteredAlertData}
              pagination={false}
              expandable={{
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>
                    <strong>Details:</strong> {record.details}
                  </p>
                ),
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Alert Details Modal */}
      <Modal
        title="Alert Details"
        visible={isAlertModalVisible}
        onCancel={handleCloseAlertModal}
        footer={[
          <Button key="close" onClick={handleCloseAlertModal}>
            Close
          </Button>,
        ]}
      >
        {selectedAlert && (
          <>
            <p>
              <strong>Description:</strong> {selectedAlert.description}
            </p>
            <p>
              <strong>Severity:</strong> {selectedAlert.severity}
            </p>
            <p>
              <strong>Date:</strong> {selectedAlert.date}
            </p>
            <p>
              <strong>Details:</strong> {selectedAlert.details}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default NocDashboard;
