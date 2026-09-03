import {
  ArrowLeft,
  Globe,
  ThumbsUp,
  MessageCircle,
  Share2,
} from "lucide-react"
import { PostOptionsDropDown } from "../../components/dropdown/PostOptionsDropDown"
import { useCallback, useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { getSinglePost } from "../../services/singlePost.service"
import type { PostCardI, TopCommentI } from "../../types/postCard"
import { getComments } from "../../services/comments.service"
import CreateComment from "../../components/postCrad/CreateComment"
import CommentItem from "../../components/postCrad/CommentItem"
import { userContext } from "../../components/context/userContext"
import EditPostCard from "../../components/editPostCard/EditPostCard"
import DeletePostCard from "../../components/deletePostCard/DeletePostCard"
import toast from "react-hot-toast"
import { DeletePost } from "../../services/posts.service"
import { Like } from "../../services/Like.service"

export default function PostDetails() {
  const { postId } = useParams()
  const [post, setPost] = useState<PostCardI | null>(null)
  const [comments, setComments] = useState<TopCommentI[]>([])
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { userData } = useContext(userContext)
  const navigate = useNavigate()

  // like state (local so the button reacts right away)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    if (!post) return
    setLiked((post.likes ?? []).includes(userData?._id ?? ""))
    setLikeCount(post.likesCount)
  }, [post, userData])

  async function handleLike() {
    if (!post) return

    const nextLiked = !liked


    setLiked(nextLiked)
    setLikeCount((count) => count + (nextLiked ? 1 : -1))

    try {
      await Like(post.id)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.")

      setLiked(!nextLiked)
      setLikeCount((count) => count + (nextLiked ? -1 : 1))
    }
  }

  async function handleDelete() {
    if (!post) return

    setIsDeleting(true)
    try {
      await DeletePost(post.id)
      toast.success("Post deleted!")
      navigate("/feed")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.")
      setIsDeleting(false)
    }
  }

  const getPost = useCallback(async (postId: string) => {
    try {
      const { data } = await getSinglePost(postId)

      const singlePost: PostCardI = data.data.post
      setPost(singlePost)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const allComments = useCallback(async (postId: string) => {
    try {
      const { data } = await getComments(postId)

      const finalComments: TopCommentI[] = data.data.comments
      setComments(finalComments)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    if (postId) getPost(postId)
    if (postId) allComments(postId)
  }, [postId, getPost, allComments])

  if (!post) {
    return (
      <main className="min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-5">
          <p className="text-center font-mono text-xs text-ink-faint">Loading…</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-6 sm:py-8">

      {showEdit && (
        <EditPostCard
          post={post}
          onClose={() => setShowEdit(false)}
          refeatchposts={() => getPost(post.id)}
        />
      )}

      {showDelete && (
        <DeletePostCard
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      <div className="max-w-2xl mx-auto px-4 sm:px-5 flex flex-col gap-5 sm:gap-6">

        {/* back link */}
        <Link
          to="/feed"
          className="flex items-center gap-1.5 kicker text-ink-soft hover:text-ink w-fit transition-colors"
        >
          <ArrowLeft size={13} />
          Back to feed
        </Link>

        {/* post */}
        <article className="bg-surface border border-line rounded-card p-4 sm:p-6">

          {/* header */}
          <header className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={post.user.photo}
                alt={post.user.name}
                className="w-12 h-12 rounded-xs object-cover"
              />
              <div className="leading-tight">
                <p className="font-medium text-ink">{post.user.name}</p>
                <p className="font-mono text-[11px] text-ink-faint flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mt-0.5">
                  <span>@{post.user.username}</span>
                  <span aria-hidden>·</span>
                  <span>
                    {new Date(post.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1"><Globe size={11} /> {post.privacy}</span>
                </p>
              </div>
            </div>
            <PostOptionsDropDown
              isOwner={userData?._id === post.user._id}
              onEdit={() => setShowEdit(true)}
              onDelete={() => setShowDelete(true)}
            />
          </header>

          {/* post text */}
          {post.body && (
            <p className="mt-5 text-base leading-relaxed text-ink">{post.body}</p>
          )}

          {/* post image */}
          {post.image && (
            <img
              src={post.image}
              alt="post"
              className="mt-4 w-full max-h-[460px] object-cover rounded-xs border border-line"
            />
          )}

          {/* stats line */}
          <div className="flex flex-wrap items-center gap-2 mt-5 font-mono text-[11px] text-ink-faint">
            <ThumbsUp size={12} />
            <span>
              {likeCount} likes <span className="mx-1">·</span> {post.sharesCount} shares{" "}
              <span className="mx-1">·</span> {post.commentsCount} comments
            </span>
          </div>

          {/* actions */}
          <div className="border-t border-line mt-4 pt-2.5 flex items-center gap-0.5 sm:gap-1 text-sm">
            <button
              onClick={handleLike}
              className={
                "flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-xs hover:bg-paper transition-colors " +
                (liked ? "text-accent font-medium" : "text-ink-soft hover:text-ink")
              }
            >
              <ThumbsUp size={15} fill={liked ? "currentColor" : "none"} /> {liked ? "Liked" : "Like"}
            </button>
            <button className="flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-xs text-ink-soft hover:text-ink hover:bg-paper transition-colors">
              <MessageCircle size={15} /> Comment
            </button>
            <button className="flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-xs text-ink-soft hover:text-ink hover:bg-paper transition-colors">
              <Share2 size={15} /> Share
            </button>
          </div>
        </article>

        {/* comments */}
        <section className="bg-surface border border-line rounded-card p-4 sm:p-6">
          <h2 className="text-lg text-ink">
            Comments <span className="font-mono text-xs text-ink-faint">({post.commentsCount})</span>
          </h2>

          {/* add comment */}
          <CreateComment postId={post.id} refeatchposts={() => allComments(post.id)} />

          {/* comments list */}
          <div className="flex flex-col gap-5 mt-6">
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post.id}
                refetchComments={() => allComments(post.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
