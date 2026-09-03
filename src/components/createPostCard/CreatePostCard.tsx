import { useContext, useRef, useState } from 'react'
import { ImagePlus, Smile, X } from 'lucide-react'
import { CreatePost } from '../../services/posts.service'
import { userContext } from '../context/userContext'


export default function CreatePostCard({ refeatchposts }: { refeatchposts: () => void }) {
  const [postText, setPostText] = useState("")
  const [postImageFile, setPostImageFile] = useState<File | null>(null)
  const [postImage, setPostImage] = useState<string | null>(null)
  const [isPosting, setIsPosting] = useState(false)
const {userData} = useContext(userContext)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setPostImageFile(file)
    setPostImage(URL.createObjectURL(file))
  }

  function handleRemoveImage() {
    setPostImageFile(null)
    setPostImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handlePost() {
    const trimmedText = postText.trim()
    if (!trimmedText && !postImageFile) return

    setIsPosting(true)
    try {
      const formData = new FormData()
      formData.append("body", trimmedText)
      if (postImageFile) formData.append("image", postImageFile)

      await CreatePost(formData)

      setPostText("")
      handleRemoveImage()
      refeatchposts()
    } catch (error) {
      console.log(error)
    } finally {
      setIsPosting(false)
    }
  }


  return (
    <div className="bg-surface border border-line rounded-card p-4 sm:p-5">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={userData?.photo}
          alt="user avatar"
          className="w-10 h-10 rounded-xs object-cover"
        />
        <div className="leading-tight">
          <p className="font-medium text-ink">{userData?.name}</p>
          <button className="mt-1 kicker text-ink-faint border border-line rounded-full px-2 py-0.5">
            Public
          </button>
        </div>
      </div>

      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="Start writing…"
        rows={3}
        className="w-full resize-none bg-transparent border-b border-line py-2 text-[15px] leading-relaxed text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition-colors"
      />

      {postImage && (
        <div className="relative w-fit mt-3">
          <img
            src={postImage}
            alt="post attachment"
            className="max-h-44 rounded-xs border border-line object-contain"
          />
          <button
            onClick={handleRemoveImage}
            className="cursor-pointer absolute -top-2 -right-2 bg-ink text-paper rounded-full w-5 h-5 flex items-center justify-center hover:opacity-90"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1 text-sm text-ink-soft">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer items-center gap-1.5 px-2.5 py-1.5 rounded-xs hover:text-ink hover:bg-paper transition-colors"
          >
            <ImagePlus size={17} />
            <span>Photo</span>
          </button>
          <button className="flex cursor-pointer items-center gap-1.5 px-2.5 py-1.5 rounded-xs hover:text-ink hover:bg-paper transition-colors">
            <Smile size={17} />
            <span>Feeling</span>
          </button>
        </div>

        <button
          onClick={handlePost}
          disabled={isPosting || (!postText.trim() && !postImageFile)}
          className="bg-ink cursor-pointer hover:bg-ink/90 disabled:opacity-40 disabled:cursor-not-allowed text-paper text-sm font-medium px-5 py-2 rounded-xs transition-colors"
        >
          {isPosting ? "Publishing…" : "Publish"}
        </button>
      </div>
    </div>
  )
}
