/**
 * Localization helpers.
 *
 * - Provides a synchronous `defaultLocalize` built from English so the UI
 *   never shows raw keys on first paint.
 * - `loadLocalize()` detects the browser language, loads the matching JSON,
 *   and overlays it on top of the English base (per-key English fallback).
 *
 * Translation files use nested objects; keys are accessed with dot-notation,
 * e.g. `localize("dashboard.title")`.
 */
import enMessages from "../translations/en.json";

export type LocalizeFunc = (
  key: string,
  values?: Record<string, string | number>
) => string;

const SUPPORTED_LOCALES = ["en", "fr", "nl"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function detectLocale(): SupportedLocale {
  const lang = navigator.language.split("-")[0];
  return (SUPPORTED_LOCALES as readonly string[]).includes(lang)
    ? (lang as SupportedLocale)
    : "en";
}

async function loadLocaleMessages(
  locale: Exclude<SupportedLocale, "en">
): Promise<Record<string, unknown>> {
  switch (locale) {
    case "fr":
      return (await import("../translations/fr.json")).default as Record<string, unknown>;
    case "nl":
      return (await import("../translations/nl.json")).default as Record<string, unknown>;
  }
}

/** Traverse a nested object using a dot-notation key. */
function resolve(obj: Record<string, unknown>, key: string): string | undefined {
  const parts = key.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

function interpolate(
  template: string,
  values?: Record<string, string | number>
): string {
  if (!values) return template;
  return template.replace(
    /\{(\w+)\}/g,
    (_, key) => String(values[key] ?? `{${key}}`)
  );
}

/** Deep-merge `override` onto `base`, preserving unoverridden nested keys. */
function deepMerge(
  base: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const baseVal = base[key];
    const overrideVal = override[key];
    if (
      typeof baseVal === "object" && baseVal !== null &&
      typeof overrideVal === "object" && overrideVal !== null
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>
      );
    } else {
      result[key] = overrideVal;
    }
  }
  return result;
}

function buildLocalize(messages: Record<string, unknown>): LocalizeFunc {
  return (key, values) => interpolate(resolve(messages, key) ?? key, values);
}

/** Synchronous English fallback — safe to use as an initial context value. */
export const defaultLocalize: LocalizeFunc = buildLocalize(
  enMessages as Record<string, unknown>
);

/**
 * Loads the browser locale (with per-key English fallback) asynchronously.
 * Replace the context value with the result once resolved.
 */
export async function loadLocalize(): Promise<LocalizeFunc> {
  const locale = detectLocale();
  if (locale === "en") return defaultLocalize;

  const localeMessages = await loadLocaleMessages(locale);
  return buildLocalize(
    deepMerge(enMessages as Record<string, unknown>, localeMessages)
  );
}
