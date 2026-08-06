import {
  ensureFeaturePanelElement,
  FeaturePanelElement,
} from "./FeaturePanelElement";
import type { FeaturePanelProps } from "./types";

type PanelRoot = FeaturePanelElement;

export default {
  type: "custom",
  render(
    container: HTMLElement,
    props: FeaturePanelProps,
    root?: PanelRoot
  ) {
    console.log("Feature Panel Props:", props);

    const tag = ensureFeaturePanelElement();
    const element =
      root ??
      (document.createElement(tag) as FeaturePanelElement);

    element.props = {
      feature: props?.feature,
      context: props?.context,
    };

    if (!root) {
      container.replaceChildren(element);
    }

    return element;
  },
  unmount(root: PanelRoot) {
    root.remove();
  },
};
