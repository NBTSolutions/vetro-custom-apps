import ReactDOMClient from "react-dom/client";
import Dashboard from "./App";
import { AppProps } from "./types";

export default {
  type: "custom",
  render(container: HTMLElement, props: AppProps) {
    const root = ReactDOMClient.createRoot(container);
    root.render(<Dashboard {...props} />);
    return root;
  },
  unmount(root: ReactDOMClient.Root) {
    root.unmount();
  },
};
