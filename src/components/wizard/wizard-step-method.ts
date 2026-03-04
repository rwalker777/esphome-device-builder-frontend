import { consume } from "@lit/context";
import { mdiChevronRight, mdiCog } from "@mdi/js";
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LocalizeFunc } from "../../common/localize.js";
import { localizeContext } from "../../context/index.js";
import { espHomeStyles } from "../../styles/shared.js";
import { registerMdiIcons } from "../../util/register-icons.js";

import "@home-assistant/webawesome/dist/components/icon/icon.js";

registerMdiIcons({
  cog: mdiCog,
  "chevron-right": mdiChevronRight,
});

@customElement("esphome-wizard-step-method")
export class ESPHomeWizardStepMethod extends LitElement {
  @consume({ context: localizeContext, subscribe: true })
  @state()
  private _localize: LocalizeFunc = (key) => key;

  static styles = [
    espHomeStyles,
    css`
      :host {
        display: block;
      }

      .step-heading {
        display: flex;
        align-items: center;
        gap: var(--wa-space-s);
        margin-bottom: var(--wa-space-l);
      }

      .step-heading wa-icon {
        font-size: 28px;
        color: var(--wa-color-text-quiet);
      }

      .step-heading h2 {
        margin: 0;
        font-size: var(--wa-font-size-l);
        font-weight: var(--wa-font-weight-bold);
        color: var(--wa-color-text-normal);
      }

      .option-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--wa-space-m) var(--wa-space-l);
        border: var(--wa-border-width-m) solid var(--esphome-primary-light);
        border-radius: var(--wa-border-radius-l);
        cursor: pointer;
        background: none;
        width: 100%;
        text-align: left;
        transition:
          border-color var(--wa-transition-normal) var(--wa-transition-easing),
          background var(--wa-transition-normal) var(--wa-transition-easing);
      }

      .option-card:hover {
        border-color: var(--esphome-primary);
        background: color-mix(in srgb, var(--esphome-primary), transparent 95%);
      }

      .option-card-text h3 {
        margin: 0 0 var(--wa-space-2xs);
        font-size: var(--wa-font-size-m);
        font-weight: var(--wa-font-weight-bold);
        color: var(--wa-color-text-normal);
      }

      .option-card-text p {
        margin: 0;
        font-size: var(--wa-font-size-s);
        color: var(--wa-color-text-quiet);
      }

      .option-card wa-icon {
        font-size: var(--wa-font-size-xl);
        color: var(--esphome-primary);
        flex-shrink: 0;
      }

      .advanced-link {
        display: inline-flex;
        align-items: center;
        gap: var(--wa-space-2xs);
        margin-top: var(--wa-space-l);
        color: var(--esphome-primary);
        font-size: var(--wa-font-size-s);
        font-weight: var(--wa-font-weight-bold);
        cursor: pointer;
        text-decoration: underline;
        background: none;
        border: none;
        padding: 0;
      }

      .advanced-link:hover {
        text-decoration: none;
      }

      .advanced-link wa-icon {
        font-size: var(--wa-font-size-s);
        color: var(--esphome-primary);
      }

      .drop-hint {
        margin-top: var(--wa-space-xl);
        text-align: center;
        font-size: var(--wa-font-size-s);
        color: var(--wa-color-text-quiet);
        font-style: italic;
      }
    `,
  ];

  protected render() {
    return html`
      <div class="step-heading">
        <wa-icon library="mdi" name="cog"></wa-icon>
        <h2>${this._localize("wizard.how_create")}</h2>
      </div>

      <button class="option-card" @click=${this._goToBoard}>
        <div class="option-card-text">
          <h3>${this._localize("wizard.create_new")}</h3>
          <p>${this._localize("wizard.create_new_desc")}</p>
        </div>
        <wa-icon library="mdi" name="chevron-right"></wa-icon>
      </button>

      <button class="advanced-link" @click=${this._goToBoard}>
        ${this._localize("wizard.advanced_options")}
        <wa-icon library="mdi" name="chevron-right"></wa-icon>
      </button>

      <p class="drop-hint">${this._localize("wizard.drop_yaml")}</p>
    `;
  }

  private _goToBoard() {
    this.dispatchEvent(
      new CustomEvent("next-step", { detail: "board", bubbles: true, composed: true })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "esphome-wizard-step-method": ESPHomeWizardStepMethod;
  }
}
