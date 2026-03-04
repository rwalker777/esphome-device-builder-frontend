import { consume } from "@lit/context";
import { mdiClose } from "@mdi/js";
import { LitElement, css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { LocalizeFunc } from "../../common/localize.js";
import { localizeContext } from "../../context/index.js";
import { espHomeStyles } from "../../styles/shared.js";
import { registerMdiIcons } from "../../util/register-icons.js";

import "@home-assistant/webawesome/dist/components/dialog/dialog.js";
import "@home-assistant/webawesome/dist/components/icon/icon.js";
import "./wizard-step-board.js";
import "./wizard-step-method.js";
import "./wizard-step-setup.js";

registerMdiIcons({ close: mdiClose });

type WizardStep = "method" | "board" | "setup";

@customElement("esphome-create-config-dialog")
export class ESPHomeCreateConfigDialog extends LitElement {
  @consume({ context: localizeContext, subscribe: true })
  @state()
  private _localize: LocalizeFunc = (key) => key;

  @state()
  private _step: WizardStep = "method";

  @query("wa-dialog")
  private _dialog!: HTMLElement & { open: boolean };

  static styles = [
    espHomeStyles,
    css`
      wa-dialog {
        --width: 520px;
      }

      /* ─── Header ─── */

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

      /* Strip button chrome — render as plain icon */
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
    this._step = "method";
    this._dialog.open = true;
  }

  public close() {
    this._dialog.open = false;
  }

  private get _title(): string {
    switch (this._step) {
      case "method":
        return this._localize("wizard.title_create");
      case "board":
        return this._localize("wizard.title_board");
      case "setup":
        return this._localize("wizard.title_setup");
    }
  }

  protected render() {
    return html`
      <wa-dialog .label=${this._title} light-dismiss @next-step=${this._onNextStep}>
        ${this._renderStep()}
      </wa-dialog>
    `;
  }

  private _renderStep() {
    switch (this._step) {
      case "method":
        return html`<esphome-wizard-step-method></esphome-wizard-step-method>`;
      case "board":
        return html`<esphome-wizard-step-board></esphome-wizard-step-board>`;
      case "setup":
        return html`<esphome-wizard-step-setup></esphome-wizard-step-setup>`;
    }
  }

  private _onNextStep(e: CustomEvent<WizardStep>) {
    this._step = e.detail;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "esphome-create-config-dialog": ESPHomeCreateConfigDialog;
  }
}
