interface CustomAppProps {
  context: {
    user: any;
  };
}

interface AppProps {}

type Props = AppProps & CustomAppProps;

function App(props: Props) {
  return <p>This is a full UI!</p>;
}

export default {
  component: App,
};
