import { consume } from "@lit/context";
import { yaml } from "@codemirror/lang-yaml";
import { oneDark } from "@codemirror/theme-one-dark";
import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { darkModeContext } from "../context/index.js";

@customElement("esphome-yaml-editor")
export class ESPHomeYamlEditor extends LitElement {
  @consume({ context: darkModeContext, subscribe: true })
  @state()
  private _darkMode = false;

  @property() value = "";

  @query(".cm-wrap") private _container!: HTMLDivElement;

  private _view: EditorView | null = null;

  static styles = css`
    :host {
      display: block;
      position: relative;
      flex: 1;
      min-height: 0;
    }

    .cm-wrap {
      position: absolute;
      inset: 0;
    }
  `;

  protected render() {
    return html`<div class="cm-wrap"></div>`;
  }

  protected firstUpdated() {
    this._mountEditor();
  }

  private _mountEditor() {
    this._view = new EditorView({
      state: EditorState.create({
        doc: this.value,
        extensions: [
          basicSetup,
          yaml(),
          EditorView.theme({
            "&": { height: "100%" },
            ".cm-scroller": {
              overflow: "auto",
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              fontSize: "13px",
            },
          }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              this.dispatchEvent(
                new CustomEvent("yaml-change", {
                  detail: { value: update.state.doc.toString() },
                  bubbles: true,
                  composed: true,
                })
              );
            }
          }),
          ...(this._darkMode ? [oneDark] : []),
        ],
      }),
      parent: this._container,
    });
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("_darkMode") && this._view) {
      const doc = this._view.state.doc.toString();
      this._view.destroy();
      this._container.innerHTML = "";
      this.value = doc;
      this._mountEditor();
    }

    if (changed.has("value") && this._view) {
      const current = this._view.state.doc.toString();
      if (current !== this.value) {
        this._view.dispatch({
          changes: { from: 0, to: current.length, insert: this.value },
        });
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._view?.destroy();
    this._view = null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "esphome-yaml-editor": ESPHomeYamlEditor;
  }
}
