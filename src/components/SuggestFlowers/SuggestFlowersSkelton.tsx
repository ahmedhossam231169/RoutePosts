export default function SuggestFlowersSkelton() {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-line last:border-b-0 animate-pulse">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xs bg-line" />
        <div className="flex flex-col gap-2">
          <div className="w-24 h-3 rounded-xs bg-line" />
          <div className="w-16 h-2.5 rounded-xs bg-line" />
        </div>
      </div>

      <div className="w-14 h-6 rounded-xs bg-line" />
    </div>
  )
}
