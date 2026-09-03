import {  useEffect, useRef, useState } from "react"
import {  RefreshCw } from "lucide-react"
import { NavLink } from "react-router"
import PostCard from "../../components/postCrad/postCrad"
import PostCardSkelton from "../../components/postCrad/postCardSkelton"
import { getNewsFeed } from "../../services/posts.service"
import type { PostCardI } from "../../types/postCard"
import type { FlowerI } from "../../types/flower"
import SuggestFlowers from "../../components/SuggestFlowers/SuggestFlowers"
import SuggestFlowersSkelton from "../../components/SuggestFlowers/SuggestFlowersSkelton"
import { getSuggestions } from "../../services/suggestions.service"
import CreatePostCard from "../../components/createPostCard/CreatePostCard"


const sideLinks: { label: string; to: string | null }[] = [
  { label: "Feed", to: "/feed" },
  { label: "My Posts", to: "/myPosts" },
  { label: "Community", to: "/Community" },
  { label: "Saved", to: null },
]

// how far (in px) the user has to pull down before we trigger a refresh
const PULL_THRESHOLD = 80
// cap how far the indicator can stretch, so it doesn't grow forever
const MAX_PULL_DISTANCE = 120

export default function Feed() {
  const [posts, setPosts] = useState<PostCardI[]>([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [suggestion, setSuggestion] = useState<FlowerI[]>([])
  const [suggestionLoading, setSuggestionLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(4)

  // pull-to-refresh state
  const [pullDistance, setPullDistance] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const touchStartY = useRef(0)
  const isPulling = useRef(false)

  async function fetchPosts() {
    try {
      const { data } = await getNewsFeed()
      const feedPosts: PostCardI[] = data.data.posts
      setPosts(feedPosts)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getSuggestionsFlowers() {
      try {
        const { data } = await getSuggestions()
        const suggestionFlowers = data.data.suggestions
        setSuggestion(suggestionFlowers)

        console.log(suggestionFlowers);

      } catch (error) {
        console.log(error);

      } finally {
        setSuggestionLoading(false)
      }
    }

    fetchPosts().finally(() => setPostsLoading(false))
    getSuggestionsFlowers()
  }, [])

  // only start tracking the pull if the user is already at the top of the page
  function handleTouchStart(e: React.TouchEvent) {
    if (window.scrollY === 0) {
      touchStartY.current = e.touches[0].clientY
      isPulling.current = true
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isPulling.current) return

    const distance = e.touches[0].clientY - touchStartY.current
    if (distance > 0) {
      setPullDistance(Math.min(distance, MAX_PULL_DISTANCE))
    }
  }

  async function handleTouchEnd() {
    if (!isPulling.current) return
    isPulling.current = false

    if (pullDistance > PULL_THRESHOLD) {
      setRefreshing(true)
      await fetchPosts()
      setRefreshing(false)
    }
    setPullDistance(0)
  }

  return (
    <main
      className="max-w-6xl mx-auto px-4 sm:px-5 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 lg:gap-8"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      {/* pull to refresh indicator */}
      {(pullDistance > 0 || refreshing) && (
        <div
          className="col-span-1 md:col-span-12 flex items-center justify-center overflow-hidden transition-[height]"
          style={{ height: refreshing ? 50 : pullDistance }}
        >
          <RefreshCw
            size={20}
            className={refreshing ? "text-ink animate-spin" : "text-ink-faint"}
          />
        </div>
      )}

      {/* left rail */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-24">
          <p className="kicker text-ink-faint mb-3">Sections</p>
          <nav className="flex flex-col">
            {sideLinks.map((link) =>
              link.to ? (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    "text-left text-sm py-2 pl-3 border-l-2 transition-colors " +
                    (isActive
                      ? "border-ink text-ink font-medium"
                      : "border-line text-ink-soft hover:text-ink hover:border-line-strong")
                  }
                >
                  {link.label}
                </NavLink>
              ) : (
                <button
                  key={link.label}
                  className="text-left text-sm py-2 pl-3 border-l-2 border-line text-ink-soft hover:text-ink hover:border-line-strong transition-colors"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>
        </div>
      </aside>

      {/* feed */}
      <section className="md:col-span-8 lg:col-span-6 flex flex-col gap-5 sm:gap-6">
        <CreatePostCard refeatchposts={fetchPosts} />

        {postsLoading
          ? Array.from({ length: 3 }).map((_, i) => <PostCardSkelton key={i} />)
          : posts.map((post) => <PostCard key={post._id} post={post} refeatchposts={fetchPosts} />)}
      </section>

      {/* suggestions */}
      <aside className="hidden md:block md:col-span-4 lg:col-span-3">
        <div className="lg:sticky lg:top-24 border border-line rounded-card bg-surface p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="kicker text-ink-faint">Suggested</p>
            <span className="font-mono text-[11px] text-ink-faint">{suggestion.length}</span>
          </div>

          <input
            type="text"
            placeholder="Search people…"
            className="w-full bg-transparent border-b border-line focus:border-ink py-1.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none transition-colors mb-1"
          />

          <div className="flex flex-col">
            {suggestionLoading
              ? Array.from({ length: 4 }).map((_, i) => <SuggestFlowersSkelton key={i} />)
              : suggestion.slice(0, visibleCount).map((flower) => (
                  <SuggestFlowers key={flower._id} flower={flower} />
                ))}
          </div>

          {!suggestionLoading && visibleCount < suggestion.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="w-full mt-3 kicker cursor-pointer text-ink-soft hover:text-ink border border-line hover:border-ink rounded-xs py-2 transition-colors"
            >
              View more
            </button>
          )}
        </div>
      </aside>

    </main>
  )
}
