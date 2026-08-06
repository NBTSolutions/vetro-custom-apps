<script lang="ts">
  import type { AppContext } from "./types";

  interface Props {
    feature?: Record<string, unknown>;
    context?: AppContext;
  }

  let { feature, context }: Props = $props();

  let note = $state("");
  let savedNotes = $state<string[]>([]);

  function saveNote() {
    const trimmed = note.trim();
    if (!trimmed) return;
    savedNotes = [...savedNotes, trimmed];
    note = "";
  }

  const featureId = $derived(
    feature && typeof feature === "object"
      ? String((feature as { id?: string }).id ?? "—")
      : "—"
  );
  const featureName = $derived(
    feature && typeof feature === "object"
      ? String(
          (feature as { name?: string; tag?: string }).name ??
            (feature as { tag?: string }).tag ??
            "Selected feature"
        )
      : "Selected feature"
  );
</script>

<section class="panel">
  <header class="header">
    <div>
      <p class="eyebrow">Svelte Feature Panel</p>
      <h2>{featureName}</h2>
    </div>
    <span class="badge">Feature</span>
  </header>

  <dl class="meta">
    <div>
      <dt>Feature ID</dt>
      <dd>{featureId}</dd>
    </div>
    <div>
      <dt>User</dt>
      <dd>{context?.user?.email ?? "—"}</dd>
    </div>
    <div>
      <dt>Role</dt>
      <dd>{context?.user?.role ?? "—"}</dd>
    </div>
  </dl>

  <div class="notes">
    <label for="note">Notes</label>
    <div class="row">
      <input
        id="note"
        bind:value={note}
        placeholder="Add a note about this feature"
        onkeydown={(e) => e.key === "Enter" && saveNote()}
      />
      <button type="button" onclick={saveNote}>Save</button>
    </div>
    {#if savedNotes.length}
      <ul>
        {#each savedNotes as item (item)}
          <li>{item}</li>
        {/each}
      </ul>
    {:else}
      <p class="empty">No notes yet.</p>
    {/if}
  </div>
</section>

<style>
  .panel {
    font-family:
      "IBM Plex Sans",
      "Segoe UI",
      sans-serif;
    color: #1c2430;
    background: linear-gradient(180deg, #f7fafc 0%, #eef3f7 100%);
    border: 1px solid #d5dee7;
    border-radius: 10px;
    padding: 16px;
    width: 100%;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 14px;
  }

  .eyebrow {
    margin: 0 0 4px;
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #5b6b7c;
  }

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }

  .badge {
    background: #dceaf8;
    color: #1f4e79;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 600;
  }

  .meta {
    display: grid;
    gap: 8px;
    margin: 0 0 16px;
  }

  .meta div {
    display: grid;
    grid-template-columns: 96px 1fr;
    gap: 8px;
    font-size: 13px;
  }

  dt {
    color: #5b6b7c;
  }

  dd {
    margin: 0;
    font-weight: 500;
  }

  .notes label {
    display: block;
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 600;
  }

  .row {
    display: flex;
    gap: 8px;
  }

  input {
    flex: 1;
    border: 1px solid #c5d0db;
    border-radius: 6px;
    padding: 8px 10px;
    font: inherit;
  }

  button {
    border: none;
    border-radius: 6px;
    background: #1f4e79;
    color: white;
    padding: 8px 12px;
    font: inherit;
    cursor: pointer;
  }

  button:hover {
    background: #173b5c;
  }

  ul {
    margin: 10px 0 0;
    padding-left: 18px;
    font-size: 13px;
  }

  .empty {
    margin: 10px 0 0;
    font-size: 13px;
    color: #5b6b7c;
  }
</style>
