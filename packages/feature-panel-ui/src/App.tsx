import { Card } from 'antd';

interface CustomAppProps {
  context: {
    user: any;
  };
}

interface FeaturePanelProps {
  feature: any;
}

type Props = FeaturePanelProps & CustomAppProps;

function App({ feature }: Props) {
  return (
    <Card size="small" title={`Feature Data`} style={{ width: '100%' }}>
      {feature.attributes.ID}
    </Card>
  );
}

export default {
  component: App,
};
