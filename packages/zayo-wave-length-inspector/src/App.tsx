import WaveLengthInspector from './WaveLengthInspector';

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
  console.log('Feature Panel UI App:', feature);
  const waveLengthData = [
    { id: 1, waveLength: 1550, company: 'Fiber Corp', status: 'active' },
    { id: 2, waveLength: 1310, company: 'Optic Solutions', status: 'active' },
    { id: 3, waveLength: 1490, company: 'LightSpeed', status: 'inactive' },
    // Add more records as needed
  ];
  return <WaveLengthInspector data={waveLengthData} />;
}

export default {
  component: App,
};
