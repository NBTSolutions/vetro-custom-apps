import { mount, unmount } from "svelte";
import App from "./App.svelte";
import type { FeaturePanelProps } from "./types";

type SvelteRoot = ReturnType<typeof mount>;

export default {
  type: "custom",
  render(container: HTMLElement, props: FeaturePanelProps, root?: SvelteRoot) {
    console.log("Feature Panel Props:", props);

    if (root) {
      unmount(root);
    }

    return mount(App, {
      target: container,
      props: {
        feature: props?.feature,
        context: props?.context,
      },
    });
  },
  unmount(root: SvelteRoot) {
    unmount(root);
  },
};
