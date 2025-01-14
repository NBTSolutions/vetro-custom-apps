interface CustomAppProps {
  context: {
    user: any;
  };
}

interface AppProps {}

type Props = AppProps & CustomAppProps;

const Dashboard = ({ context: { user } }: Props) => {
  return <h1>Welcome {user.username} Another version</h1>;
};

export default {
  component: Dashboard,
};
