import { consume } from "@lit/context";
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LocalizeFunc } from "../../common/localize.js";
import { localizeContext } from "../../context/index.js";
import { espHomeStyles } from "../../styles/shared.js";

@customElement("esphome-wizard-step-setup")
export class ESPHomeWizardStepSetup extends LitElement {
  @consume({ context: localizeContext, subscribe: true })
  @state()
  private _localize: LocalizeFunc = (key) => key;

  static styles = [
    espHomeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  protected render() {
    return html`<p>${this._localize("wizard.title_setup")}</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "esphome-wizard-step-setup": ESPHomeWizardStepSetup;
  }
}
