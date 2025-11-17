import ReactDOMClient from "react-dom/client";
import { CustomerProvisionCard } from "./App";
import { FeaturePanelProps } from "./types";

export default {
  type: "custom",
  render(container: HTMLElement, props: FeaturePanelProps) {
    console.log("Feature Panel Props:", props);
    const root = ReactDOMClient.createRoot(container);
    root.render(<CustomerProvisionCard />);
    return root;
  },
  unmount(root: ReactDOMClient.Root) {
    root.unmount();
  },
};
