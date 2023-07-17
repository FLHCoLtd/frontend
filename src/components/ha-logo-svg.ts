import { css, CSSResultGroup, LitElement, svg, SVGTemplateResult } from "lit";
import { customElement } from "lit/decorators";

@customElement("ha-logo-svg")
export class HaLogoSvg extends LitElement {
  protected render(): SVGTemplateResult {
    return svg`
      <svg id="圖層_1" data-name="圖層 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.12 33.12"><defs><style>.cls-1{fill:#716a76;}.cls-2{fill:#67cfee;}</style></defs><title>FLH_logo</title><polygon class="cls-1" points="0 16.56 0 24.84 8.28 24.84 8.28 33.12 16.56 33.12 16.56 24.84 16.56 16.56 8.28 16.56 0 16.56"/><polygon class="cls-2" points="8.28 0 8.28 8.28 16.56 8.28 16.56 16.56 24.84 16.56 24.84 8.28 24.84 0 16.56 0 8.28 0"/><rect class="cls-1" x="24.84" y="8.28" width="8.28" height="16.56"/></svg>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: var(--ha-icon-display, inline-flex);
        align-items: center;
        justify-content: center;
        position: relative;
        vertical-align: middle;
        fill: currentcolor;
        width: var(--mdc-icon-size, 24px);
        height: var(--mdc-icon-size, 24px);
      }
      svg {
        width: 100%;
        height: 100%;
        pointer-events: none;
        display: block;
      }
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ha-logo-svg": HaLogoSvg;
  }
}
