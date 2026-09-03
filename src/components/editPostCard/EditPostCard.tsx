import { useRef, useState } from "react"
import { ImagePlus, X } from "lucide-react"
import toast from "react-hot-toast"
import { UpdatePost } from "../../services/posts.service"
import type { PostCardI } from "../../types/postCard"

export default function EditPostCard({
  post,
  onClose,
  refeatchposts,
}: {
  post: PostCardI
  onClose: () => void
  refeatchposts: () => void
}) {
  const [postText, setPostText] = useState(post.body || "")
  // the image that is already saved on the post (a url) , null if the user removed it
  const [oldImage, setOldImage] = useState<string | null>(post.image || null)
  const [postImageFile, setPostImageFile] = useState<File | null>(null)
  const [postImage, setPostImage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setPostImageFile(file)
    setPostImage(URL.createObjectURL(file))
    setOldImage(null)
  }

  function handleRemoveImage() {
    setPostImageFile(null)
    setPostImage(null)
    setOldImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleSave() {
    const trimmedText = postText.trim()
    if (!trimmedText && !postImageFile && !oldImage) return

    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append("body", trimmedText)
      if (postImageFile) formData.append("image", postImageFile)

      await UpdatePost(post.id, formData)

      toast.success("Post updated!")
      refeatchposts()
      onClose()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4">
      <div className="bg-raise border border-line rounded-card shadow-pop w-full max-w-lg p-4 sm:p-5 rise">

        {/* header */}
        <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
          <h2 className="text-lg text-ink">Edit post</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-ink-faint hover:text-ink p-1 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
          className="w-full resize-none bg-transparent border-b border-line py-2 text-[15px] leading-relaxed text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition-colors"
        />

        {/* image preview ( new one or the old one ) */}
        {(postImage || oldImage) && (
          <div className="relative w-fit mt-3">
            <img
              src={postImage || oldImage || ""}
              alt="post attachment"
              className="max-h-40 rounded-xs border border-line object-contain"
            />
            <button
              onClick={handleRemoveImage}
              className="cursor-pointer absolute -top-2 -right-2 bg-ink text-paper rounded-full w-5 h-5 flex items-center justify-center hover:opacity-90"
            >
              <X size={12} />
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line mt-4 pt-4">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer items-center gap-1.5 text-sm text-ink-soft hover:text-ink px-2.5 py-1.5 rounded-xs hover:bg-paper transition-colors"
          >
            <ImagePlus size={17} />
            <span>Photo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="cursor-pointer text-sm font-medium text-ink-soft hover:text-ink px-4 py-2 rounded-xs border border-line transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || (!postText.trim() && !postImageFile && !oldImage)}
              className="bg-ink cursor-pointer hover:bg-ink/90 disabled:opacity-40 disabled:cursor-not-allowed text-paper text-sm font-medium px-4 py-2 rounded-xs transition-colors"
            >
              {isSaving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
