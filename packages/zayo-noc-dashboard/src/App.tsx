import NocDashboard from './NocDashboard';

interface CustomAppProps {
  context: {
    user: any;
  };
}

interface AppProps {}

type Props = AppProps & CustomAppProps;

function App({ context }: Props) {
  return <NocDashboard />;
}

export default {
  component: App,
};
