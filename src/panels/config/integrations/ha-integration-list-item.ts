import {
  GraphicType,
  ListItemBase,
} from "@material/mwc-list/mwc-list-item-base";
import { styles } from "@material/mwc-list/mwc-list-item.css";
import { mdiCloudOutline, mdiOpenInNew, mdiPackageVariant } from "@mdi/js";
import { css, CSSResultGroup, html, nothing } from "lit";
import { customElement, property } from "lit/decorators";
import { classMap } from "lit/directives/class-map";
import { domainToName } from "../../../data/integration";
import { HomeAssistant } from "../../../types";
import { integrationsUrl } from "../../../util/brands-url";
import { IntegrationListItem } from "./dialog-add-integration";

@customElement("ha-integration-list-item")
export class HaIntegrationListItem extends ListItemBase {
  public hass!: HomeAssistant;

  @property({ attribute: false }) public integration?: IntegrationListItem;

  @property({ type: String, reflect: true }) graphic: GraphicType = "medium";

  @property({ type: Boolean }) hasMeta = true;

  @property({ type: Boolean }) brand = false;
  @property({ attribute: false }) private imageUrl?: string;
  async updated(changedProperties) {
  // Call super method first
  super.updated(changedProperties);

  // Check if the 'integration' property has changed. If so, fetch the new image URL.
  if (changedProperties.has('integration')) {
    if (this.integration) {
      this.imageUrl = await integrationsUrl({
        domain: this.integration.domain,
        type: "icon",
        useFallback: true,
        darkOptimized: this.hass.themes?.darkMode,
        brand: this.brand,
      });
    } else {
      this.imageUrl = undefined;
    }
  }
}

  // @ts-expect-error
  protected override renderSingleLine() {
    if (!this.integration) {
      return nothing;
    }
    return html`${this.integration.name ||
    domainToName(this.hass.localize, this.integration.domain)}
    ${this.integration.is_helper ? " (helper)" : ""}`;
  }

  // @ts-expect-error
  protected override renderGraphic() {
    if (!this.integration) {
      return nothing;
    }
    const graphicClasses = {
      multi: this.multipleGraphics,
    };

    return html` <span
      class="mdc-deprecated-list-item__graphic material-icons ${classMap(
        graphicClasses
      )}"
    >
      <img
        alt=""
        loading="lazy"
        .src=${this.imageUrl}
        referrerpolicy="no-referrer"
      />
    </span>`;
  }

  // @ts-expect-error
  protected override renderMeta() {
    if (!this.integration) {
      return nothing;
    }
    return html`<span class="mdc-deprecated-list-item__meta material-icons">
      ${this.integration.cloud
        ? html`<span
            ><ha-svg-icon .path=${mdiCloudOutline}></ha-svg-icon
            ><simple-tooltip animation-delay="0" position="left"
              >${this.hass.localize(
                "ui.panel.config.integrations.config_entry.depends_on_cloud"
              )}</simple-tooltip
            ></span
          >`
        : ""}
      ${!this.integration.is_built_in
        ? html`<span
            ><ha-svg-icon .path=${mdiPackageVariant}></ha-svg-icon
            ><simple-tooltip animation-delay="0" position="left"
              >${this.hass.localize(
                "ui.panel.config.integrations.config_entry.custom_integration"
              )}</simple-tooltip
            ></span
          >`
        : ""}
      ${!this.integration.config_flow &&
      !this.integration.integrations &&
      !this.integration.iot_standards
        ? html`<span
            ><simple-tooltip animation-delay="0" position="left"
              >${this.hass.localize(
                "ui.panel.config.integrations.config_entry.yaml_only"
              )}</simple-tooltip
            ><ha-svg-icon
              .path=${mdiOpenInNew}
              class="open-in-new"
            ></ha-svg-icon
          ></span>`
        : html`<ha-icon-next></ha-icon-next>`}
    </span>`;
  }

  static get styles(): CSSResultGroup {
    return [
      styles,
      css`
        :host {
          --mdc-list-side-padding: 24px;
          --mdc-list-item-graphic-size: 40px;
        }
        :host([graphic="avatar"]:not([twoLine])),
        :host([graphic="icon"]:not([twoLine])) {
          height: 48px;
        }
        span.material-icons:first-of-type {
          margin-inline-start: 0px !important;
          margin-inline-end: var(
            --mdc-list-item-graphic-margin,
            16px
          ) !important;
          direction: var(--direction);
        }
        span.material-icons:last-of-type {
          margin-inline-start: auto !important;
          margin-inline-end: 0px !important;
          direction: var(--direction);
        }
        img {
          width: 40px;
          height: 40px;
        }
        .mdc-deprecated-list-item__meta {
          width: auto;
          white-space: nowrap;
        }
        .mdc-deprecated-list-item__meta > * {
          margin-right: 8px;
        }
        .mdc-deprecated-list-item__meta > *:last-child {
          margin-right: 0px;
        }
        ha-icon-next {
          margin-right: 8px;
        }
        .open-in-new {
          --mdc-icon-size: 22px;
          padding: 1px;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-integration-list-item": HaIntegrationListItem;
  }
}
