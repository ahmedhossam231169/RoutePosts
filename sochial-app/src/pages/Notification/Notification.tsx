import { useEffect, useState } from "react"
import { CheckCheck, Check } from "lucide-react"
import { getNotification } from "../../services/notifucation.service"
import type { Inotification } from "../../types/notificatin"

const actionText: Record<string, string> = {
  like: "liked your post",
  comment: "commented on your post",
  reply: "replied to your comment",
  follow: "started following you",
  share: "shared your post",
}

function timeAgo(iso: string) {
  const t = new Date(iso).getTime()
  if (Number.isNaN(t)) return ""
  const s = Math.floor((Date.now() - t) / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h`
  return `${Math.floor(h / 24)}d`
}

export default function Notification() {
  const [notifications, setNotifications] = useState<Inotification[]>([])
  const [filter, setFilter] = useState<"all" | "unread">("all")

  function markAsRead(id: string) {
    setNotifications(
      notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    )
  }

  function markAllAsRead() {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const shownNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications

  useEffect(() => {
    async function getAllNotification() {
      const data = await getNotification()
      const finalData: Inotification[] = data.data.notifications
      setNotifications(finalData)
    }
    getAllNotification()
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-ink">Notifications</h1>
          <p className="font-mono text-[11px] text-ink-faint mt-1.5">
            Updates for likes, comments, shares and follows
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className="cursor-pointer flex items-center gap-2 text-sm text-ink-soft hover:text-ink border border-line hover:border-ink rounded-xs px-3.5 py-2 transition-colors"
        >
          <CheckCheck size={15} /> Mark all read
        </button>
      </div>

      {/* filter tabs */}
      <div className="flex items-center gap-6 mt-5 border-b border-line text-sm">
        <button
          onClick={() => setFilter("all")}
          className={
            "cursor-pointer py-3 border-b-2 -mb-px transition-colors " +
            (filter === "all"
              ? "border-ink text-ink font-medium"
              : "border-transparent text-ink-soft hover:text-ink")
          }
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={
            "cursor-pointer py-3 border-b-2 -mb-px transition-colors " +
            (filter === "unread"
              ? "border-ink text-ink font-medium"
              : "border-transparent text-ink-soft hover:text-ink")
          }
        >
          Unread
        </button>
      </div>

      {/* list */}
      <div className="flex flex-col divide-y divide-line">
        {shownNotifications.length === 0 ? (
          <p className="text-center font-mono text-xs text-ink-faint py-16">
            No notifications to show.
          </p>
        ) : (
          shownNotifications.map((n) => (
            <div
              key={n._id}
              className="flex items-start justify-between gap-4 py-4"
            >
              <div className="flex items-start gap-3">
                {/* unread marker */}
                <span
                  className={
                    "mt-2 w-1.5 h-1.5 rounded-full shrink-0 " +
                    (n.isRead ? "bg-transparent" : "bg-accent")
                  }
                />
                <img
                  src={n.actor.photo}
                  alt={n.actor.name}
                  className="w-10 h-10 rounded-xs object-cover shrink-0"
                />
                <div>
                  <p className="text-sm text-ink-soft">
                    <span className="font-medium text-ink">
                      {n.actor.name}
                    </span>{" "}
                    {actionText[n.type] ?? n.type}
                  </p>
                  {n.entity?.body && (
                    <p className="text-sm text-ink-faint mt-0.5 line-clamp-2">
                      {n.entity?.body}
                    </p>
                  )}

                  {n.isRead ? (
                    <span className="mt-2 inline-flex items-center gap-1.5 kicker text-ink-faint">
                      <Check size={13} /> Read
                    </span>
                  ) : (
                    <button
                      onClick={() => markAsRead(n._id)}
                      className="cursor-pointer mt-2 inline-flex items-center gap-1.5 kicker text-ink-soft hover:text-ink transition-colors"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>

              <span className="font-mono text-[11px] text-ink-faint shrink-0">
                {timeAgo(n.createdAt)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
