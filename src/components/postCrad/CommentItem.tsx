import { useContext, useState } from "react"
import { Heart, Pencil, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { userContext } from "../context/userContext"
import { deleteComment, updateComment } from "../../services/comments.service"
import type { TopCommentI } from "../../types/postCard"
import DeleteCommentCard from "../deleteCommentCard/DeleteCommentCard"

export default function CommentItem({
  comment,
  postId,
  refetchComments,
}: {
  comment: TopCommentI
  postId: string
  refetchComments: () => void
}) {
  const { userData } = useContext(userContext)
  const isOwner = userData?._id === comment.commentCreator._id

  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(comment.content || "")
  const [isSaving, setIsSaving] = useState(false)

  const [showDelete, setShowDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSaveEdit() {
    const trimmed = editText.trim()
    if (!trimmed) return

    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append("content", trimmed)

      await updateComment(postId, comment._id, formData)

      toast.success("Comment updated!")
      setIsEditing(false)
      refetchComments()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    setIsDeleting(true)
    try {
      await deleteComment(postId, comment._id)

      toast.success("Comment deleted!")
      setShowDelete(false)
      refetchComments()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex items-start gap-3">

      {showDelete && (
        <DeleteCommentCard
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      <img
        src={comment.commentCreator.photo}
        alt={comment.commentCreator.name}
        className="w-8 h-8 rounded-xs object-cover mt-0.5"
      />

      <div className="flex-1 min-w-0">
        <div className="border-l-2 border-line pl-3">
          <p className="text-sm font-medium text-ink">
            {comment.commentCreator.name}
          </p>

          {isEditing ? (
            <div className="mt-1.5 flex flex-col gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-transparent border-b border-line focus:border-ink py-1 text-sm text-ink focus:outline-none transition-colors"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveEdit}
                  disabled={isSaving || !editText.trim()}
                  className="bg-ink cursor-pointer hover:bg-ink/90 disabled:opacity-40 disabled:cursor-not-allowed text-paper text-xs font-medium px-3 py-1.5 rounded-xs transition-colors"
                >
                  {isSaving ? "Saving…" : "Save"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setEditText(comment.content || "")
                  }}
                  className="cursor-pointer text-xs font-medium text-ink-soft hover:text-ink px-3 py-1.5 rounded-xs border border-line transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {comment.content && (
                <p className="text-sm text-ink-soft leading-relaxed mt-0.5">{comment.content}</p>
              )}
              {comment.image && (
                <img
                  src={comment.image}
                  alt="comment attachment"
                  className="mt-2 max-h-48 rounded-xs border border-line object-cover"
                />
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-4 mt-1.5 pl-3 font-mono text-[11px] text-ink-faint">
          <span>
            {new Date(comment.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
          <button className="cursor-pointer hover:text-ink flex items-center gap-1 transition-colors">
            <Heart size={12} /> {comment.likes.length}
          </button>
          <button className="cursor-pointer hover:text-ink transition-colors">Reply</button>

          {isOwner && !isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="cursor-pointer hover:text-ink flex items-center gap-1 transition-colors"
              >
                <Pencil size={12} /> Edit
              </button>
              <button
                onClick={() => setShowDelete(true)}
                className="cursor-pointer text-accent/70 hover:text-accent flex items-center gap-1 transition-colors"
              >
                <Trash2 size={12} /> Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
