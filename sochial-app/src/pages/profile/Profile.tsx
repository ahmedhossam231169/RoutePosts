import { useContext, useEffect, useState } from "react"
import {
  Bookmark,
  FileText,
  Globe,
  Mail,
  MessageCircle,
  Share2,
  ThumbsUp,
} from "lucide-react"
import  { userContext } from "../../components/context/userContext"
import { getAllPosts } from "../../services/allPosts.service"
import type { PostCardI } from "../../types/postCard"
import { Link } from "react-router"



export default function Profile() {
  const { userData } = useContext(userContext)
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts")
  const [myPosts, setMyPosts] = useState<PostCardI[]>([])

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const { data } = await getAllPosts(userData?._id!)
        const feedPosts: PostCardI[] = data.data.posts
        setMyPosts(feedPosts)
        console.log(myPosts)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllPosts()
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-5 py-6 sm:py-8">

      {/* masthead */}
      <div className="border border-line rounded-card bg-surface overflow-hidden">
        <div className="h-28 sm:h-40 w-full bg-paper border-b border-line">
          <img
            src={userData?.cover}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-4 sm:px-6 pb-6">
          <div className="flex flex-col md:flex-row md:flex-wrap md:items-end md:justify-between gap-5">
            <div className="flex items-end gap-4 -mt-10">
              <img
                src={userData?.photo}
                alt={userData?.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xs object-cover border-4 border-surface bg-surface shrink-0"
              />
              <div className="pb-1">
                <h1 className="font-display text-2xl sm:text-3xl text-ink leading-none">{userData?.name}</h1>
                <p className="font-mono text-[11px] text-ink-faint mt-1.5 break-all">@{userData?.email}</p>
                <span className="mt-2.5 inline-flex items-center gap-1.5 kicker text-ink-soft border border-line rounded-full px-2.5 py-1">
                  Route Posts member
                </span>
              </div>
            </div>

            {/* stat ledger */}
            <div className="flex items-stretch divide-x divide-line border border-line rounded-xs self-start md:self-auto">
              {[
                { label: "Followers", value: userData?.followersCount },
                { label: "Following", value: userData?.followingCount },
                { label: "Bookmarks", value: userData?.bookmarksCount },
              ].map((s) => (
                <div key={s.label} className="px-3.5 sm:px-5 py-3 text-center flex-1">
                  <p className="font-mono text-lg sm:text-xl text-ink leading-none">{s.value}</p>
                  <p className="kicker text-ink-faint mt-1.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* about + summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-line rounded-xs p-4">
              <p className="kicker text-ink-faint mb-2.5">About</p>
              <p className="flex items-center gap-2 text-sm text-ink-soft">
                <Mail size={14} /> {userData?.email}
              </p>
              <p className="flex items-center gap-2 text-sm text-ink-soft mt-1.5">
                <Globe size={14} /> Active on Route Posts
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-line rounded-xs p-4">
                <p className="kicker text-ink-faint">My posts</p>
                <p className="font-mono text-xl text-ink mt-1.5">5</p>
              </div>
              <div className="border border-line rounded-xs p-4">
                <p className="kicker text-ink-faint">Saved posts</p>
                <p className="font-mono text-xl text-ink mt-1.5">{userData?.bookmarksCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-6 flex items-center justify-between border-b border-line">
        <div className="flex items-center gap-6 text-sm">
          <button
            onClick={() => setActiveTab("posts")}
            className={
              "cursor-pointer flex items-center gap-2 py-3 border-b-2 -mb-px transition-colors " +
              (activeTab === "posts"
                ? "border-ink text-ink font-medium"
                : "border-transparent text-ink-soft hover:text-ink")
            }
          >
            <FileText size={15} /> My Posts
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={
              "cursor-pointer flex items-center gap-2 py-3 border-b-2 -mb-px transition-colors " +
              (activeTab === "saved"
                ? "border-ink text-ink font-medium"
                : "border-transparent text-ink-soft hover:text-ink")
            }
          >
            <Bookmark size={15} /> Saved
          </button>
        </div>
        <span className="font-mono text-[11px] text-ink-faint">
          {activeTab === "posts" ? myPosts.length : 0}
        </span>
      </div>

      {/* posts list */}
      {activeTab === "posts" ? (
        <div className="flex flex-col divide-y divide-line">
          {myPosts.map((post) => (
            <article key={post.id} className="py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/150?img=68"
                    alt="Ahmed Hossam"
                    className="w-9 h-9 rounded-xs object-cover"
                  />
                  <div className="leading-tight">
                    <p className="text-sm font-medium text-ink">Ahmed Hossam</p>
                    <p className="font-mono text-[11px] text-ink-faint">@ahmed23333</p>
                  </div>
                </div>
                <Link to={`/postDetails/${post.id}`} className="kicker text-ink-soft hover:text-ink transition-colors">
                  View
                </Link>
              </div>

              {post.body && <p className="mt-3 text-[15px] leading-relaxed text-ink">{post.body}</p>}

              {post.image && (
                <div className="mt-3 border border-line rounded-xs bg-paper flex items-center justify-center overflow-hidden">
                  <img
                    src={post.image}
                    alt="post"
                    className="max-h-[420px] w-full object-contain"
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-line font-mono text-[11px] text-ink-faint">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <ThumbsUp size={13} /> {post.likesCount}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Share2 size={13} /> {post.sharesCount}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle size={13} /> {post.commentsCount}
                  </span>
                </div>
                <span className="flex items-center gap-1.5">
                  {new Date(post.createdAt).toLocaleString("en-US",{dateStyle:"short",timeStyle:"short"})} · <Globe size={11} /> {post.privacy}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center font-mono text-xs text-ink-faint">
          No saved posts yet.
        </div>
      )}
    </div>
  )
}
