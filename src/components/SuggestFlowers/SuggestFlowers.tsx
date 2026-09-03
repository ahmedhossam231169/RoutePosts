import type { FlowerI } from "../../types/flower"

type SuggestFlowersProps = {
  flower: FlowerI
}

export default function SuggestFlowers({ flower }: SuggestFlowersProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-line last:border-b-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <img
          src={flower.photo}
          alt={flower.name}
          className="w-9 h-9 rounded-xs object-cover shrink-0"
        />
        <div className="min-w-0">
          <p className="text-sm cursor-pointer font-medium text-ink leading-tight truncate">
            {flower.name}
          </p>
          <p className="font-mono text-[11px] cursor-pointer text-ink-faint leading-tight truncate">
            {flower.username} · {flower.followersCount} followers
          </p>
        </div>
      </div>

      <button className="kicker cursor-pointer text-ink-soft hover:text-ink border border-line hover:border-ink px-2.5 py-1 rounded-xs whitespace-nowrap transition-colors">
        Follow
      </button>
    </div>
  )
}
