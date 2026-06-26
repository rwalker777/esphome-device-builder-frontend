import { consume } from "@lit/context";
import { html, LitElement, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { LocalizeFunc } from "../common/localize.js";
import { localizeContext } from "../context/index.js";
import { espHomeStyles } from "../styles/shared.js";

@customElement("esphome-confirm-queued-update-dialog")
export class ConfirmQueuedUpdateDialog extends LitElement {
  @property({ attribute: false }) configuration = "";
  @property({ type: Boolean }) open = false;

  @consume({ context: localizeContext, subscribe: true })
  @state()
  private _localize: LocalizeFunc = (key) => key;

  static styles = espHomeStyles;

  connectedCallback() {
    super.connectedCallback?.();
    this.addEventListener("click", this._onClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._onClick);
    super.disconnectedCallback?.();
  }

  private _onClick(e: MouseEvent) {
    if (e.target === this) {
      this.open = false;
    }
  }

  protected render(): TemplateResult {
    return html`
      <dialog class="confirm-queued-update-dialog" ?open=${this.open}>
        <div class="confirm-queued-update-dialog-content">
          <h2 class="confirm-queued-update-dialog-title">
            ${this._localize("queued_update_confirm_title")}
          </h2>
          <p class="confirm-queued-update-dialog-description">
            ${this._localize("queued_update_confirm_desc")}
          </p>
          <div class="confirm-queued-update-dialog-actions">
            <button
              class="confirm-queued-update-dialog-cancel"
              type="button"
              @click=${() => (this.open = false)}
            >
              ${this._localize("cancel")}
            </button>
            <button
              class="confirm-queued-update-dialog-confirm"
              type="button"
              @click=${() => this._onConfirm()}
            >
              ${this._localize("action_clear_queued")}
            </button>
          </div>
        </div>
      </dialog>
    `;
  }

  private _onConfirm() {
    const event = new CustomEvent("confirm", {
      bubbles: true,
      composed: true,
      detail: { configuration: this.configuration },
    });
    this.dispatchEvent(event);
    this.open = false;
  }
}
