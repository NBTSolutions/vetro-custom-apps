import ReactDOMClient from "react-dom/client";
import { CustomerProvisionCard } from "./App";

interface CustomAppProps {
  context: {
    user: any;
  };
}

interface FeaturePanelProps {
  feature: any;
}

type Props = FeaturePanelProps & CustomAppProps;

export default {
  type: "custom",
  render(container: HTMLElement, props: Props) {
    console.log("Feature Panel Props:", props);
    const root = ReactDOMClient.createRoot(container);
    root.render(<CustomerProvisionCard />);
    return root;
  },
  unmount(root: ReactDOMClient.Root) {
    root.unmount();
  },
};
