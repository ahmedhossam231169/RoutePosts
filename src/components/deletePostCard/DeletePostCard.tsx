import { Trash2, X } from "lucide-react"

export default function DeletePostCard({
  onClose,
  onConfirm,
  isDeleting,
}: {
  onClose: () => void
  onConfirm: () => void
  isDeleting?: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4">
      <div className="bg-raise border border-line rounded-card shadow-pop w-full max-w-sm p-4 sm:p-5 rise">

        {/* header */}
        <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
          <h2 className="text-lg text-ink">Delete post</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-ink-faint hover:text-ink p-1 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex items-start gap-3">
          <span className="bg-accent-soft text-accent rounded-xs w-9 h-9 flex items-center justify-center shrink-0">
            <Trash2 size={17} />
          </span>
          <p className="text-sm text-ink-soft leading-relaxed">
            Are you sure you want to delete this post? This action can't be undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="cursor-pointer text-sm font-medium text-ink-soft hover:text-ink px-4 py-2 rounded-xs border border-line transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-accent cursor-pointer hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed text-paper text-sm font-medium px-4 py-2 rounded-xs transition-colors"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
