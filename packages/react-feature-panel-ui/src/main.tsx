import ReactDOMClient from "react-dom/client";
import { CustomerProvisionCard } from "./App";
import { FeaturePanelProps } from "./types";

export default {
  type: "custom",
  render(
    container: HTMLElement,
    props: FeaturePanelProps,
    root?: ReactDOMClient.Root
  ) {
    console.log("Feature Panel Props:", props);
    const r = root ?? ReactDOMClient.createRoot(container);
    r.render(<CustomerProvisionCard />);
    return r;
  },
  unmount(root: ReactDOMClient.Root) {
    root.unmount();
  },
};
