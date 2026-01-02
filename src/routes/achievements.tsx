import { createFileRoute } from '@tanstack/react-router';
import { AchievementGrid } from '../components/AchievementBadge';
import { useStore } from '../stores/useStore';

export const Route = createFileRoute('/achievements')({ component: Achievements });

function Achievements() {
  const { achievements } = useStore();

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="text-center">
        <h1 className="font-display text-2xl font-semibold text-[var(--charcoal)]">
          Achievements
        </h1>
        <p className="text-[var(--stone)] text-sm mt-1">
          Badges earned on your journey
        </p>
      </header>

      {/* Progress summary */}
      <div className="card p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-3xl">🏆</span>
          <span className="font-display text-3xl font-bold text-[var(--gold)]">
            {unlockedCount}
          </span>
          <span className="text-[var(--stone)] text-xl">/ {totalCount}</span>
        </div>
        <p className="text-sm text-[var(--stone)]">badges unlocked</p>

        {/* Progress bar */}
        <div className="mt-3 h-2 bg-[var(--parchment)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)]"
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Achievement grid */}
      <AchievementGrid achievements={achievements} />
    </div>
  );
}
