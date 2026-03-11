import { consume } from "@lit/context";
import { mdiClose } from "@mdi/js";
import { css, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { LocalizeFunc } from "../../common/localize.js";
import { localizeContext } from "../../context/index.js";
import { espHomeStyles } from "../../styles/shared.js";
import { registerMdiIcons } from "../../util/register-icons.js";

import "@home-assistant/webawesome/dist/components/dialog/dialog.js";
import "@home-assistant/webawesome/dist/components/icon/icon.js";

registerMdiIcons({ close: mdiClose });

@customElement("esphome-add-config-dialog")
export class ESPHomeAddConfigDialog extends LitElement {
  @consume({ context: localizeContext, subscribe: true })
  @state()
  private _localize: LocalizeFunc = (key) => key;

  @property()
  boardName = "";

  @query("wa-dialog")
  private _dialog!: HTMLElement & { open: boolean };

  static styles = [
    espHomeStyles,
    css`
      wa-dialog {
        --width: 600px;
      }

      wa-dialog::part(header) {
        background: var(--esphome-primary);
        padding: 0 var(--wa-space-m);
        height: 40px;
        box-sizing: border-box;
      }

      wa-dialog::part(title) {
        color: var(--esphome-on-primary);
        font-size: var(--wa-font-size-s);
        font-weight: var(--wa-font-weight-bold);
      }

      wa-dialog::part(close-button__base) {
        background: transparent;
        border: none;
        box-shadow: none;
        padding: 0;
        min-width: unset;
        min-height: unset;
        color: var(--esphome-on-primary);
        cursor: pointer;
      }

      wa-dialog::part(body) {
        padding: var(--wa-space-l) var(--wa-space-xl);
      }

      wa-dialog::part(footer) {
        display: none;
      }
    `,
  ];

  public open() {
    this._dialog.open = true;
  }

  protected render() {
    return html`
      <wa-dialog
        light-dismiss
        label=${this._localize("device.add_config_dialog_title", { name: this.boardName })}
      >
      </wa-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "esphome-add-config-dialog": ESPHomeAddConfigDialog;
  }
}
