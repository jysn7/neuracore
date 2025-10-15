// src/components/submitIdea/SlashMenu.tsx
import { Editor } from "@tiptap/react";
import Suggestion, {
  SuggestionOptions,
  SuggestionProps,
} from "@tiptap/suggestion";
import { Extension } from "@tiptap/core";

interface SlashItem {
  label: string;
  type: "continue" | "shorten" | "rewrite";
}

export const SlashMenu = Extension.create({
  name: "slashMenu",
  addOptions() {
    return {
      char: "/",
      startOfLine: true,
      items: ({
        query,
        editor,
      }: {
        query: string;
        editor: Editor;
      }): SlashItem[] => [
        { label: "Continue text", type: "continue" },
        { label: "Shorten text", type: "shorten" },
        { label: "Rewrite text", type: "rewrite" },
      ],
      render: () => {
        let popup: HTMLDivElement | null = null;
        let currentIndex = 0;

        function updatePosition(rect: DOMRect) {
          if (!popup) return;
          popup.style.top = `${rect.bottom + window.scrollY}px`;
          popup.style.left = `${rect.left + window.scrollX}px`;
        }

        return {
          onStart: (props: SuggestionProps<SlashItem>) => {
            popup = document.createElement("div");
            popup.className =
              "absolute bg-white border rounded-md shadow-lg z-50";
            popup.style.padding = "0.5rem";

            const rect = props.clientRect?.();
            if (rect) updatePosition(rect);

            props.items.forEach((item, idx) => {
              const el = document.createElement("div");
              el.textContent = item.label;
              el.className = idx === currentIndex ? "bg-gray-200" : "";
              el.style.padding = "0.25rem 0.5rem";
              el.addEventListener("click", () => {
                props.command(item);
              });
              popup?.appendChild(el);
            });

            document.body.appendChild(popup);
          },

          onUpdate: (props: SuggestionProps<SlashItem>) => {
            const rect = props.clientRect?.();
            if (rect) updatePosition(rect);

            if (!popup) return;

            Array.from(popup.children).forEach((child, idx) => {
              (child as HTMLElement).className =
                idx === currentIndex ? "bg-gray-200" : "";
            });
          },

          onExit: () => {
            if (popup) {
              popup.remove();
              popup = null;
            }
          },
        };
      },
    };
  },
});
