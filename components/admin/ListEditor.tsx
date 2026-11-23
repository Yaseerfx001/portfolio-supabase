"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { ObjectEditor, FieldDef } from "./fields";

// Edits a list of things (projects, blog posts, certifications...).
// Each item shows as a row; click it to open the form, and use the buttons to
// move it up/down or delete it.
export default function ListEditor({
  items,
  fields,
  titleKey,
  idPrefix,
  blankItem,
  addLabel,
  onChange,
}: {
  items: Record<string, any>[];
  fields: FieldDef[];
  titleKey: string; // which field to show as the row title
  idPrefix: string; // used to make new ids like "project-1700000000"
  blankItem: Record<string, any>; // starting values for a new item
  addLabel: string;
  onChange: (next: Record<string, any>[]) => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function updateItem(index: number, next: Record<string, any>) {
    onChange(items.map((item, i) => (i === index ? next : item)));
  }

  function removeItem(index: number) {
    if (!window.confirm("Delete this item? You can't undo this after saving.")) return;
    onChange(items.filter((_, i) => i !== index));
    setOpenIndex(null);
  }

  function moveItem(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const copy = [...items];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
    setOpenIndex(target);
  }

  function addItem() {
    onChange([...items, { ...blankItem, id: `${idPrefix}-${Date.now()}` }]);
    setOpenIndex(items.length); // open the new item straight away
  }

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-sm text-ink-light/50 dark:text-ink-dark/50">
          Nothing here yet. Click the button below to add the first one.
        </p>
      )}

      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            // index in the key keeps the form state tidy when items are re-ordered
            key={`${item.id ?? "item"}-${index}`}
            className="rounded-md border border-ink-light/15 dark:border-ink-dark/20"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <span className="text-sm font-medium truncate">
                {item[titleKey] || "(untitled)"}
              </span>
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-4 border-t border-ink-light/10 dark:border-ink-dark/10 pt-4">
                <ObjectEditor
                  value={item}
                  fields={fields}
                  onChange={(next) => updateItem(index, next)}
                />

                <div className="flex gap-2 pt-2">
                  <SmallButton onClick={() => moveItem(index, -1)} disabled={index === 0}>
                    <ArrowUp size={14} /> Up
                  </SmallButton>
                  <SmallButton onClick={() => moveItem(index, 1)} disabled={index === items.length - 1}>
                    <ArrowDown size={14} /> Down
                  </SmallButton>
                  <SmallButton onClick={() => removeItem(index)} danger>
                    <Trash2 size={14} /> Delete
                  </SmallButton>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-dashed border-ink-light/30 dark:border-ink-dark/30 text-sm hover:border-accent hover:text-accent transition-colors"
      >
        <Plus size={16} /> {addLabel}
      </button>
    </div>
  );
}

function SmallButton({
  children,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md border text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        danger
          ? "border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
          : "border-ink-light/15 dark:border-ink-dark/20 hover:border-accent"
      }`}
    >
      {children}
    </button>
  );
}
