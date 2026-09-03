import { useContext, useEffect, useRef, useState } from "react"
import { Image as ImageIcon, Send, Smile, X } from "lucide-react"
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react"
import { cereateComment } from "../../services/comments.service"
import { userContext } from "../context/userContext"



export default function CreateComment({ postId, refeatchposts }:{postId:string , refeatchposts:()=>void}) {
  const [commentText, setCommentText] = useState("")
  const [commentImageFile, setCommentImageFile] = useState<File | null>(null)
  const [commentImage, setCommentImage] = useState<string | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false)
      }
    }

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showEmojiPicker])

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setCommentImageFile(file)
    setCommentImage(URL.createObjectURL(file))
  }

  function handleRemoveImage() {
    setCommentImageFile(null)
    setCommentImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function handleEmojiClick(emojiData: EmojiClickData) {
    setCommentText((prev) => prev + emojiData.emoji)
  }

  async function handleSendComment() {
    const trimmedText = commentText.trim()
    if (!trimmedText && !commentImageFile) return

    setIsSending(true)
    try {
      const formData = new FormData()
      formData.append("content", trimmedText)
      if (commentImageFile) formData.append("image", commentImageFile)

      await cereateComment(postId, formData)

      setCommentText("")
      handleRemoveImage()
      refeatchposts()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSending(false)
    }
  }
    const { userData } = useContext(userContext)
  return (
    <div className="flex items-start gap-2.5 pt-4">
      <img
        src={userData?.photo}
        alt="your avatar"
        className="w-8 h-8 rounded-xs object-cover"
      />
      <div className="flex-1 flex flex-col gap-2">
        {commentImage && (
          <div className="relative w-fit">
            <img
              src={commentImage}
              alt="comment attachment"
              className="max-h-32 rounded-xs border border-line object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="cursor-pointer absolute -top-2 -right-2 bg-ink text-paper rounded-full w-5 h-5 flex items-center justify-center hover:opacity-90"
            >
              <X size={12} />
            </button>
          </div>
        )}

        <div className="relative flex items-center gap-1.5 border-b border-line focus-within:border-ink transition-colors pb-1.5">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageSelect}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer text-ink-faint hover:text-ink p-1 shrink-0 transition-colors"
          >
            <ImageIcon size={17} />
          </button>

          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="cursor-pointer text-ink-faint hover:text-ink p-1 shrink-0 transition-colors"
          >
            <Smile size={17} />
          </button>

          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendComment()
            }}
            placeholder="Write a comment…"
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none py-1"
          />

          <button
            onClick={handleSendComment}
            disabled={isSending || (!commentText.trim() && !commentImageFile)}
            className="cursor-pointer text-paper bg-ink hover:bg-ink/90 disabled:opacity-40 disabled:cursor-not-allowed rounded-xs w-8 h-8 flex items-center justify-center shrink-0 transition-colors"
          >
            <Send size={14} />
          </button>

          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className="absolute bottom-12 left-0 z-10 w-[320px] max-w-[calc(100vw-2.5rem)]"
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
