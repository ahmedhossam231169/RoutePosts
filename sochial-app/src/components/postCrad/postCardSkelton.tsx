export default function PostCardSkelton() {
  return (
    <div className="bg-surface border border-line rounded-card p-5 animate-pulse">

      {/* header */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xs bg-line" />
        <div className="flex flex-col gap-2">
          <div className="w-32 h-3 rounded-xs bg-line" />
          <div className="w-24 h-2.5 rounded-xs bg-line" />
        </div>
      </div>

      {/* post text */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="w-full h-3 rounded-xs bg-line" />
        <div className="w-2/3 h-3 rounded-xs bg-line" />
      </div>

      {/* post image */}
      <div className="mt-4 w-full h-64 rounded-xs bg-line" />

      {/* stats row */}
      <div className="flex items-center justify-between mt-4">
        <div className="w-40 h-2.5 rounded-xs bg-line" />
        <div className="w-10 h-2.5 rounded-xs bg-line" />
      </div>

      {/* actions */}
      <div className="border-t border-line mt-4 pt-3 flex items-center gap-6">
        <div className="w-16 h-4 rounded-xs bg-line" />
        <div className="w-16 h-4 rounded-xs bg-line" />
        <div className="w-16 h-4 rounded-xs bg-line" />
      </div>
    </div>
  )
}
