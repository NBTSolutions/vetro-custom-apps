import ReactDOMClient from "react-dom/client";
import Dashboard from "./App";
import { AppProps } from "./types";

export default {
  type: "custom",
  render(container: HTMLElement, props: AppProps, root?: ReactDOMClient.Root) {
    const r = root ?? ReactDOMClient.createRoot(container);
    r.render(<Dashboard {...props} />);
    return r;
  },
  unmount(root: ReactDOMClient.Root) {
    root.unmount();
  },
};
