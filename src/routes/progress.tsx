import { createFileRoute } from '@tanstack/react-router';
import { ProgressMap } from '../components/ProgressMap';

export const Route = createFileRoute('/progress')({ component: Progress });

function Progress() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="text-center">
        <h1 className="font-display text-2xl font-semibold text-[var(--charcoal)]">
          Your Journey
        </h1>
        <p className="text-[var(--stone)] text-sm mt-1">
          Track your path through Scripture
        </p>
      </header>

      {/* Progress map */}
      <ProgressMap />
    </div>
  );
}
