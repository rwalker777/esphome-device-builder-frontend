import { consume } from "@lit/context";
import {
  mdiChevronDown,
  mdiChevronUp,
  mdiDockLeft,
  mdiDockRight,
  mdiViewSplitHorizontal,
} from "@mdi/js";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { LocalizeFunc } from "../common/localize.js";
import { localizeContext } from "../context/index.js";
import { espHomeStyles } from "../styles/shared.js";
import { registerMdiIcons } from "../util/register-icons.js";

import "@home-assistant/webawesome/dist/components/icon/icon.js";
import "../components/yaml-editor.js";

registerMdiIcons({
  "layout-left": mdiDockLeft,
  "layout-right": mdiDockRight,
  "layout-split": mdiViewSplitHorizontal,
  "chevron-down": mdiChevronDown,
  "chevron-up": mdiChevronUp,
});

type DeviceLayoutMode = "both" | "left" | "right";

@customElement("esphome-page-device")
export class ESPHomePageDevice extends LitElement {
  @consume({ context: localizeContext, subscribe: true })
  @state()
  private _localize: LocalizeFunc = (key) => key;

  @property()
  id = "";

  @state()
  private _layout: DeviceLayoutMode = "both";

  @state()
  private _openSections = new Set<number>();

  @state()
  private _yaml = `esphome:
  name: living-room-sensor
  friendly_name: Living Room Sensor

esp32:
  board: esp32-c6-devkitc-1
  framework:
    type: esp-idf

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "Fallback Hotspot"
    password: "fallback123"

logger:

api:
  encryption:
    key: !secret api_key

ota:
  - platform: esphome
    password: !secret ota_password

sensor:
  - platform: dht
    pin: GPIO4
    model: DHT22
    temperature:
      name: "Room Temperature"
      unit_of_measurement: "°C"
      accuracy_decimals: 1
    humidity:
      name: "Room Humidity"
      unit_of_measurement: "%"
    update_interval: 30s

  - platform: adc
    pin: GPIO34
    name: "Battery Voltage"
    attenuation: 11db
    filters:
      - multiply: 2.0
    update_interval: 60s

binary_sensor:
  - platform: gpio
    pin:
      number: GPIO14
      mode: INPUT_PULLUP
    name: "Motion Detected"
    device_class: motion

  - platform: gpio
    pin: GPIO27
    name: "Door Contact"
    device_class: door

light:
  - platform: neopixelbus
    type: GRB
    variant: WS2812
    pin: GPIO16
    num_leds: 8
    name: "Status LEDs"
    effects:
      - pulse:
          name: "Slow Pulse"
          transition_length: 1s
          update_interval: 2s

switch:
  - platform: gpio
    pin: GPIO26
    name: "Relay"
    restore_mode: RESTORE_DEFAULT_OFF

time:
  - platform: homeassistant
    id: ha_time
`;

  static styles = [
    espHomeStyles,
    css`
      :host {
        display: block;
      }

      .page {
        box-sizing: border-box;
        padding: var(--wa-space-l);
        min-height: calc(100vh - var(--esphome-header-height));
      }

      .layout-grid {
        display: grid;
        grid-template-columns: minmax(220px, 1fr) minmax(0, 5fr);
        gap: var(--wa-space-l);
        height: calc(100vh - var(--esphome-header-height) - 2 * var(--wa-space-l));
      }

      .card {
        background: var(--wa-color-surface-default);
        border-radius: var(--wa-border-radius-l);
        border: var(--wa-border-width-s) solid var(--wa-color-surface-lowered);
        box-shadow: var(--wa-elevation-02);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--wa-space-s) var(--wa-space-m);
        background: var(--esphome-primary);
        color: var(--esphome-on-primary);
      }

      .card-title {
        margin: 0;
        font-size: var(--wa-font-size-s);
        font-weight: var(--wa-font-weight-bold);
      }

      .card-subtitle {
        margin: 0;
        font-size: var(--wa-font-size-xs);
        opacity: 0.85;
      }

      .card-header-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .card-body {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      /* ─── Left card ─── */

      /* ─── Right card ─── */

      .editor-header-main {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .editor-header-title {
        margin: 0;
        font-size: var(--wa-font-size-s);
        font-weight: var(--wa-font-weight-bold);
      }

      .editor-header-subtitle {
        margin: 0;
        font-size: var(--wa-font-size-xs);
        opacity: 0.9;
      }

      .layout-toggle {
        display: inline-flex;
        align-items: center;
        gap: 2px;
      }

      .layout-toggle button {
        border: none;
        background: transparent;
        color: var(--esphome-on-primary);
        padding: 2px 4px;
        border-radius: 4px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .layout-toggle button[aria-pressed="true"] {
        background: color-mix(in srgb, var(--esphome-on-primary), transparent 85%);
      }

      .layout-toggle wa-icon {
        font-size: 18px;
      }

      .editor-layout {
        flex: 1;
        min-height: 0;
        display: grid;
        gap: 0;
      }

      .editor-layout--both {
        grid-template-columns: 1fr 1px 1fr;
      }

      .editor-layout--left {
        grid-template-columns: 1fr;
      }

      .editor-layout--right {
        grid-template-columns: 1fr;
      }

      .editor-pane {
        padding: var(--wa-space-m);
        display: flex;
        flex-direction: column;
        gap: var(--wa-space-s);
        min-height: 0;
        overflow: hidden;
      }

      .editor-pane-title {
        margin: 0;
        font-size: var(--wa-font-size-s);
        font-weight: var(--wa-font-weight-bold);
      }

      .editor-pane-body {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .pane-divider {
        background: var(--wa-color-surface-lowered);
        width: 1px;
        align-self: stretch;
      }

      .editor-layout--left .editor-pane--right,
      .editor-layout--right .editor-pane--left {
        display: none;
      }

      .italic {
        font-style: italic;
        font-size: var(--wa-font-size-2xs);
        padding: 0 var(--wa-space-2xs);
      }

      .separator {
        height: 1px;
        background: var(--wa-color-surface-lowered);
        margin: var(--wa-space-2xs) 0;
      }

      .nav-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 var(--wa-space-m);
        cursor: pointer;
        user-select: none;
      }

      .nav-content:hover p {
        color: var(--esphome-primary);
      }

      .nav-content p {
        margin: var(--wa-space-xs) 0;
        font-size: var(--wa-font-size-s);
        font-weight: var(--wa-font-weight-bold);
      }

      .nav-content wa-icon {
        font-size: var(--wa-font-size-xl);
        cursor: pointer;
        color: var(--esphome-primary);
      }

      @media (max-width: 900px) {
        .layout-grid {
          grid-template-columns: 1fr;
          height: auto;
        }
      }
    `,
  ];

  protected render() {
    const layoutClass =
      this._layout === "both"
        ? "editor-layout--both"
        : this._layout === "left"
          ? "editor-layout--left"
          : "editor-layout--right";

    const deviceTitle = this.id || this._localize("dashboard.create_device");

    return html`
      <div class="page">
        <div class="layout-grid">
          <!-- Left: Device navigator card -->
          <section class="card">
            <header class="card-header">
              <div class="card-header-text">
                <h2 class="card-title">${this._localize("device.navigator_title")}</h2>
              </div>
            </header>
            <div class="card-body">
              <p class="italic">
                ${this._localize("device.navigator_desc")}
              </p>
              ${[
                this._localize("device.section_core"),
                this._localize("device.section_components"),
                this._localize("device.section_automations"),
              ].map(
                (label, i) => {
                  const open = this._openSections.has(i);
                  return html`
                    <div class="separator"></div>
                    <div class="nav-content" @click=${() => this._toggleSection(i)}>
                      <p>${label}</p>
                      <wa-icon
                        library="mdi"
                        name=${open ? "chevron-up" : "chevron-down"}
                      ></wa-icon>
                    </div>
                    ${open
                      ? html`<div style="padding: var(--wa-space-l) var(--wa-space-m);">${this._localize("device.section_placeholder")}</div>`
                      : nothing}
                  `;
                }
              )}
              <div class="separator"></div>
            </div>
          </section>

          <!-- Right: Components / editor card -->
          <section class="card">
            <header class="card-header">
              <div class="editor-header-main">
                <h2 class="editor-header-title">
                  ${this._localize("device.editor_title", { name: deviceTitle })}
                </h2>
              </div>
              <div class="layout-toggle" aria-label="Editor layout">
                <button
                  type="button"
                  aria-pressed=${this._layout === "left"}
                  @click=${() => this._setLayout("left")}
                  title=${this._localize("device.layout_components_only")}
                >
                  <wa-icon library="mdi" name="layout-left"></wa-icon>
                </button>
                <button
                  type="button"
                  aria-pressed=${this._layout === "both"}
                  @click=${() => this._setLayout("both")}
                  title=${this._localize("device.layout_split")}
                >
                  <wa-icon library="mdi" name="layout-split"></wa-icon>
                </button>
                <button
                  type="button"
                  aria-pressed=${this._layout === "right"}
                  @click=${() => this._setLayout("right")}
                  title=${this._localize("device.layout_yaml_only")}
                >
                  <wa-icon library="mdi" name="layout-right"></wa-icon>
                </button>
              </div>
            </header>
            <div class="card-body">
              <div class=${`editor-layout ${layoutClass}`}>
                <div class="editor-pane editor-pane--left">
                  <h3 class="editor-pane-title">${deviceTitle}</h3>
                  <div class="editor-pane-body"></div>
                </div>
                ${this._layout === "both"
                  ? html`<div class="pane-divider"></div>`
                  : nothing}
                <div class="editor-pane editor-pane--right">
                  <h3 class="editor-pane-title">${this._localize("device.yaml_editor")}</h3>
                  <div class="editor-pane-body">
                    <esphome-yaml-editor
                      .value=${this._yaml}
                      @yaml-change=${(e: CustomEvent) => {
                        this._yaml = e.detail.value;
                      }}
                    ></esphome-yaml-editor>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  private _setLayout(layout: DeviceLayoutMode) {
    this._layout = layout;
  }

  private _toggleSection(index: number) {
    const next = new Set(this._openSections);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    this._openSections = next;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "esphome-page-device": ESPHomePageDevice;
  }
}
