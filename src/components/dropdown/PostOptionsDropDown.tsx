import { Bookmark, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function PostOptionsDropDown({
  isOwner,
  onEdit,
  onDelete,
  onSave,
}: {
  isOwner: boolean;
  onEdit: () => void;
  onDelete?: () => void;
  onSave?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-ink-faint cursor-pointer hover:text-ink hover:bg-line/60 rounded-xs p-1 transition-colors"
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-raise rounded-card border border-line shadow-pop py-1 z-50 rise">
          <button
            onClick={() => {
              setOpen(false);
              onSave?.();
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-ink-soft hover:text-ink hover:bg-paper cursor-pointer transition-colors"
          >
            <Bookmark size={15} />
            Save post
          </button>

          {isOwner && (
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  onEdit();
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-ink-soft hover:text-ink hover:bg-paper cursor-pointer transition-colors"
              >
                <Pencil size={15} />
                Edit post
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  onDelete?.();
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-accent hover:bg-accent-soft cursor-pointer transition-colors"
              >
                <Trash2 size={15} />
                Delete post
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
