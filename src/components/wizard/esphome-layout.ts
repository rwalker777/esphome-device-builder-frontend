import { consume } from "@lit/context";
import { mdiArrowCollapseRight, mdiWeatherNight, mdiWeatherSunny } from "@mdi/js";
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { darkModeContext, localizeContext } from "../../context/index.js";
import type { LocalizeFunc } from "../../common/localize.js";
import { espHomeStyles } from "../../styles/shared.js";
import { registerMdiIcons } from "../../util/register-icons.js";

import "@home-assistant/webawesome/dist/components/button/button.js";
import "@home-assistant/webawesome/dist/components/icon/icon.js";

registerMdiIcons({
  "arrow-collapse-right": mdiArrowCollapseRight,
  "weather-sunny": mdiWeatherSunny,
  "weather-night": mdiWeatherNight,
});

@customElement("esphome-layout")
export class ESPHomeLayout extends LitElement {
  @consume({ context: localizeContext, subscribe: true })
  @state()
  private _localize: LocalizeFunc = (key) => key;

  @consume({ context: darkModeContext, subscribe: true })
  @state()
  private _darkMode = false;

  static styles = [
    espHomeStyles,
    css`
      :host {
        display: block;
        min-height: 100%;
      }

      /* ─── Header ─── */

      .app-header {
        display: flex;
        align-items: center;
        gap: var(--wa-space-m);
        padding: 0 var(--wa-space-s);
        background: var(--esphome-primary);
        height: var(--esphome-header-height);
        box-sizing: border-box;
        overflow: hidden;
      }

      .header-logos {
        display: flex;
        align-items: center;
        gap: var(--wa-space-m);
      }

      .ha-btn::part(base) {
        padding: 6px 6px;
        gap: 6px;
      }

      .ha-btn::part(label) {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .header-separator {
        width: 1px;
        align-self: stretch;
        background: var(--esphome-primary-light);
        flex-shrink: 0;
      }

      .header-logo {
        width: 44px;
        height: 44px;
        border-radius: var(--wa-border-radius-l);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        text-decoration: none;
      }

      .header-text h1 {
        margin: 0;
        font-size: var(--wa-font-size-m);
        font-weight: var(--wa-font-weight-bold);
        color: var(--esphome-on-primary);
      }

      .header-text p {
        margin: 0;
        font-size: var(--wa-font-size-xs);
        color: var(--esphome-on-primary);
        opacity: 0.75;
      }

      .header-spacer {
        flex: 1;
      }

      .dark-mode-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
        color: var(--esphome-on-primary);
        cursor: pointer;
        padding: var(--wa-space-xs);
        border-radius: var(--wa-border-radius-m);
        opacity: 0.85;
        font-size: 22px;
      }

      .dark-mode-toggle:hover {
        opacity: 1;
        background: color-mix(in srgb, var(--esphome-on-primary), transparent 85%);
      }
    `,
  ];

  protected render() {
    return html`
      <div class="app-header">
        <div class="header-logos">
          <wa-button class="ha-btn" variant="light" size="small" title="Home Assistant">
            <wa-icon library="mdi" name="arrow-collapse-right"></wa-icon>
            <img src="/assets/logo/ha.svg" alt="Home Assistant" />
          </wa-button>
          <div class="header-separator"></div>
          <a class="header-logo" href="/">
            <img src="/assets/logo/esphome.svg" alt="ESPHome" />
          </a>
        </div>
        <div class="header-text">
          <h1>${this._localize("dashboard.title")}</h1>
          <p>${this._localize("dashboard.subtitle")}</p>
        </div>
        <div class="header-spacer"></div>
        <button
          class="dark-mode-toggle"
          @click=${this._toggleDarkMode}
          title=${this._darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <wa-icon library="mdi" name=${this._darkMode ? "weather-sunny" : "weather-night"}></wa-icon>
        </button>
      </div>
      <slot></slot>
    `;
  }

  private _toggleDarkMode() {
    this.dispatchEvent(
      new CustomEvent("toggle-dark-mode", { bubbles: true, composed: true })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "esphome-layout": ESPHomeLayout;
  }
}
