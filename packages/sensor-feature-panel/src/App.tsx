import { Alert, Space } from 'antd';
import WeatherCard from './WeatherCard';
import {
  CabinetBattery,
  CabinetHumidity,
  CabinetTemperature,
} from './CabinetSensors';

interface CustomAppProps {
  context: {
    user: any;
  };
}

interface FeaturePanelProps {
  feature: any;
}

type Props = FeaturePanelProps & CustomAppProps;

function App({ feature, context: { user } }: Props) {
  const isPoint = feature.geometry.type === 'Point';
  const isImperial = user.settings.preferredUnit === 'imperial';
  const { ID } = feature.attributes;

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Alert message="Enviromental Details" description={`ID: ${ID}`} type="info" showIcon />
      {isPoint && (
        <WeatherCard
          latitude={feature.geometry.coordinates[1]}
          longitude={feature.geometry.coordinates[0]}
          isImperial={isImperial}
        />
      )}
      {isPoint && <CabinetTemperature cabinetId={ID} />}
      {isPoint && <CabinetHumidity cabinetId={ID} />}
      {isPoint && <CabinetBattery cabinetId={ID} />}
    </Space>
  );
}

export default {
  component: App,
};
