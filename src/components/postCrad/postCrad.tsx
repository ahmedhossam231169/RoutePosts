import { Globe, ArrowUpRight, ThumbsUp, MessageCircle, Share2 } from "lucide-react"
import type { PostCardI } from "../../types/postCard"
import { Link } from "react-router"
import CreateComment from "./CreateComment"
import { PostOptionsDropDown } from "../dropdown/PostOptionsDropDown"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../context/userContext"
import EditPostCard from "../editPostCard/EditPostCard"
import DeletePostCard from "../deletePostCard/DeletePostCard"
import toast from "react-hot-toast"
import { DeletePost } from "../../services/posts.service"
import { Like } from "../../services/Like.service"

export default function PostCard({ post ,refeatchposts}: {post : PostCardI ,refeatchposts:()=>void }) {
  const {
    user,
    body,
    image,
    createdAt,
    sharesCount,
    commentsCount,
    isShare,
    sharedPost,
    topComment,
  } = post
    const { userData } = useContext(userContext)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    // like state (kept local so the button feels instant)
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(post.likesCount)

    // figure out if the current user already liked this post
    useEffect(() => {
      setLiked((post.likes ?? []).includes(userData?._id ?? ""))
      setLikeCount(post.likesCount)
    }, [post.likes, post.likesCount, userData])

  async function handleLike() {
    const nextLiked = !liked

    // update the ui first, then call the api
    setLiked(nextLiked)
    setLikeCount((count) => count + (nextLiked ? 1 : -1))

    try {
      // the same endpoint adds the like if it's not there and removes it if it is
      await Like(post.id)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.")
      // put it back the way it was
      setLiked(!nextLiked)
      setLikeCount((count) => count + (nextLiked ? -1 : 1))
    }
  }

  async function handleDelete() {
    setIsDeleting(true)
    try {
      await DeletePost(post.id)
      toast.success("Post deleted!")
      setShowDelete(false)
      refeatchposts()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <article className="bg-surface border border-line rounded-card p-4 sm:p-5 rise">

      {showEdit && (
        <EditPostCard
          post={post}
          onClose={() => setShowEdit(false)}
          refeatchposts={refeatchposts}
        />
      )}

      {showDelete && (
        <DeletePostCard
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      {/* header */}
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src={user.photo} alt={user.name} className="w-11 h-11 rounded-xs object-cover" />
          <div className="leading-tight">
            <p className="font-medium text-ink">{user.name}</p>
            <p className="font-mono text-[11px] text-ink-faint flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mt-0.5">
              <span>@{user.username}</span>
              <span aria-hidden>·</span>
              <span>{new Date(createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</span>
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
      {body && <p className="mt-4 text-[15px] leading-relaxed text-ink">{body}</p>}

      {/* post image */}
      {image && (
        <img src={image} alt="post" className="mt-4 w-full max-h-[460px] object-cover rounded-xs border border-line" />
      )}

      {/* shared / original post — set as an editorial pull-quote */}
      {isShare && sharedPost && (
        <div className="mt-4 border-l-2 border-line-strong pl-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <img
                src={sharedPost.user.photo}
                alt={sharedPost.user.name}
                className="w-8 h-8 rounded-xs object-cover"
              />
              <div className="leading-tight">
                <p className="text-sm font-medium text-ink">{sharedPost.user.name}</p>
                <p className="font-mono text-[11px] text-ink-faint">@{sharedPost.user.username}</p>
              </div>
            </div>
            <button className="kicker text-ink-soft hover:text-ink flex items-center gap-1 whitespace-nowrap transition-colors">
              Original <ArrowUpRight size={12} />
            </button>
          </div>
          {sharedPost.body && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{sharedPost.body}</p>}
          {sharedPost.image && (
            <img
              src={sharedPost.image}
              alt="shared post"
              className="mt-2 w-full max-h-72 object-cover rounded-xs border border-line"
            />
          )}
        </div>
      )}

      {/* stats line */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mt-4 font-mono text-[11px] text-ink-faint">
        <span>
          {likeCount} likes <span className="mx-1">·</span> {sharesCount} shares <span className="mx-1">·</span> {commentsCount} comments
        </span>
        <Link to={`/postDetails/${post.id}`} className="text-ink-soft hover:text-ink underline underline-offset-2 decoration-line-strong transition-colors">
          Read
        </Link>
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

      {/* top comment */}
      {topComment && (
        <div className="mt-4 border-t border-line pt-4">
          <p className="kicker text-ink-faint mb-2.5">Top comment</p>
          <div className="flex items-start gap-2.5">
            <img
              src={topComment.commentCreator.photo}
              alt={topComment.commentCreator.name}
              className="w-7 h-7 rounded-xs object-cover"
            />
            <div>
              <p className="text-xs font-medium text-ink">{topComment.commentCreator.name}</p>
              {topComment.content && (
                <p className="text-sm text-ink-soft leading-relaxed">{topComment.content}</p>
              )}
              {topComment.image && (
                <img
                  src={topComment.image}
                  alt="comment attachment"
                  className="mt-2 max-h-32 rounded-xs border border-line object-cover"
                />
              )}
            </div>
          </div>
          <Link to={`/postDetails/${post.id}`} className="inline-block mt-2 font-mono text-[11px] text-ink-soft hover:text-ink underline underline-offset-2 decoration-line-strong transition-colors">
            more comments
          </Link>
        </div>
      )}

      <div className="mt-2">
        <CreateComment postId={post.id} refeatchposts={refeatchposts} />
      </div>
    </article>
  )
}
