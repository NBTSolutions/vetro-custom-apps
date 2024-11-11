import { Card, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface CabinetProps {
  cabinetId: number;
}

interface StatsCardProps {
  title: string;
  loading?: boolean;
  children?: React.ReactNode;
}

function randomSeries(min: number, max: number, length: number): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1) + min));
}

export default function CabinetSensorCard({ title, loading, children }: StatsCardProps) {
  return (
    <Card
      title={title}
      loading={loading}
      size="small"
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      {children}
    </Card>
  );
}

export function CabinetTemperature({ cabinetId }: CabinetProps) {
  const [temperature, setTemperature] = useState<{ x: Date; y: number }[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setTemperature(
        randomSeries(60, 80, 100).map((y, i) => ({ x: new Date(Date.now() - (10 - i) * 1000), y }))
      );
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <CabinetSensorCard title="Temperature" loading={!temperature}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={temperature}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <Line type="monotone" dataKey="y" stroke="#8884d8" animationDuration={0} />
          <XAxis dataKey="x" scale={'time'} />
          <YAxis mirror unit={'°F'} />
        </LineChart>
      </ResponsiveContainer>
    </CabinetSensorCard>
  );
}

export function CabinetHumidity({ cabinetId }: CabinetProps) {
  const [humidity, setHumidity] = useState<{ x: Date; y: number }[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setHumidity(
        randomSeries(30, 80, 100).map((y, i) => ({ x: new Date(Date.now() - (10 - i) * 1000), y }))
      );
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <CabinetSensorCard title="Humidity" loading={!humidity}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={humidity}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <Line type="monotone" dataKey="y" stroke="#8884d8" animationDuration={0} />
          <XAxis dataKey="x" scale={'time'} />
          <YAxis mirror unit={'%'} />
        </LineChart>
      </ResponsiveContainer>
    </CabinetSensorCard>
  );
}

export function CabinetBattery({ cabinetId }: CabinetProps) {
  const [battery, setBattery] = useState<{ x: Date; y: number }[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setBattery(
        randomSeries(20, 100, 100).map((y, i) => ({ x: new Date(Date.now() - (10 - i) * 1000), y }))
      );
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <CabinetSensorCard title="Battery" loading={!battery}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={battery}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <Line type="monotone" dataKey="y" stroke="#8884d8" animationDuration={0} />
          <XAxis dataKey="x" scale={'time'} />
          <YAxis mirror unit={'%'} />
        </LineChart>
      </ResponsiveContainer>
    </CabinetSensorCard>
  );
}
