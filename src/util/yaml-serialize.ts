/**
 * Minimal YAML helpers for ConfigEntry form values.
 *
 * `serializeYamlValues` is used by the section editor (to write a
 * section back into the device YAML) and by the add-component dialog
 * (to render a live preview). It handles scalars, arrays of scalars,
 * and nested objects; empty/null/undefined values are skipped.
 *
 * `parseTopLevelComponents` walks the YAML to find every top-level
 * key (e.g. `wifi:`, `mqtt:`, `output:`). Both forms use it to
 * evaluate `depends_on_component` predicates and component-level
 * dependency checks against the user's current configuration.
 */

/**
 * Serialize a values dict as YAML lines at the given indent.
 * Returns an array of lines (not a joined string) so callers can
 * splice them into existing YAML when needed.
 */
export function serializeYamlValues(
  values: Record<string, unknown>,
  indent: string,
): string[] {
  const lines: string[] = [];
  for (const [key, val] of Object.entries(values)) {
    if (val === undefined || val === null || val === "") continue;
    if (Array.isArray(val)) {
      if (val.length === 0) continue;
      lines.push(`${indent}${key}:`);
      for (const item of val) {
        lines.push(`${indent}  - ${formatYamlScalar(item)}`);
      }
      continue;
    }
    if (typeof val === "object") {
      const sub = serializeYamlValues(
        val as Record<string, unknown>,
        `${indent}  `,
      );
      if (sub.length === 0) continue;
      lines.push(`${indent}${key}:`);
      lines.push(...sub);
      continue;
    }
    lines.push(`${indent}${key}: ${formatYamlScalar(val)}`);
  }
  return lines;
}

/**
 * Extract the set of top-level component keys configured in the YAML
 * (e.g. `["wifi", "api", "mqtt", "switch"]`). Used to evaluate
 * `depends_on_component` predicates on config entries and the
 * component-level `dependencies` list on the catalog entry.
 */
export function parseTopLevelComponents(yaml: string): Set<string> {
  const present = new Set<string>();
  for (const line of yaml.split("\n")) {
    const match = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (match) present.add(match[1]);
  }
  return present;
}

/** Format a single scalar value, quoting when needed. */
export function formatYamlScalar(v: unknown): string {
  if (typeof v === "boolean") return String(v);
  if (typeof v === "number") return String(v);
  const s = String(v);
  if (/[:#]/.test(s) || /^[-\s'"]/.test(s) || /\s$/.test(s)) {
    return `"${s.replace(/"/g, '\\"')}"`;
  }
  return s;
}
