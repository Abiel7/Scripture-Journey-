import { createFileRoute } from '@tanstack/react-router';
import { DailyReadings } from '../components/DailyReadings';
import { StreakDisplay } from '../components/StreakDisplay';
import { XPBar } from '../components/XPBar';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return (
    <div className="space-y-5">
      {/* Header with logo */}
      <header className="text-center">
        <h1 className="font-display text-3xl font-semibold">
          <span className="illuminated-letter">S</span>
          <span className="tracking-wide">cripture</span>
        </h1>
        <p className="text-muted-foreground text-sm italic">
          Journey through the Word
        </p>
      </header>

      {/* Stats row - Streak */}
      <StreakDisplay />

      {/* XP Bar */}
      <XPBar />

      {/* Divider */}
      <div className="ornament-divider text-sm text-muted-foreground">
        <span>Today's Readings</span>
      </div>

      {/* Daily readings */}
      <DailyReadings />
    </div>
  );
}
