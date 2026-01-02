import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { ReadingCard } from './ReadingCard';
import { readingPlan } from '../data/readingPlan';
import { useStore } from '../stores/useStore';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

export function DailyReadings() {
  const { settings, navigateDay, completedReadings, isViewingToday, isViewingWithinGracePeriod, syncToToday } = useStore();
  const { currentMonth, currentDay, isCatchUpDay } = settings;

  // Sync to today's date on mount
  useEffect(() => {
    syncToToday();
  }, [syncToToday]);

  const viewingToday = isViewingToday();
  const withinGracePeriod = isViewingWithinGracePeriod();

  const month = readingPlan[currentMonth - 1];
  const dayData = month?.days[currentDay - 1];

  if (!month || !dayData) {
    return <div>Loading...</div>;
  }

  const dateKey = `${currentMonth}-${currentDay}`;
  const dayReadings = completedReadings[dateKey] || [];
  const completedCount = dayReadings.length;
  const totalReadings = 4;
  const progressPercent = (completedCount / totalReadings) * 100;

  return (
    <div className="page-enter space-y-5">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateDay('prev')}
          className="rounded-full h-10 w-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="text-center">
          <h2 className="font-display text-2xl font-semibold">
            {month.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            Day {currentDay} of 25
            {isCatchUpDay && viewingToday && (
              <span className="ml-1 text-primary">(Catch-up)</span>
            )}
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateDay('next')}
          disabled={viewingToday}
          className="rounded-full h-10 w-10"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Return to Today button when viewing past */}
      {!viewingToday && (
        <Button
          variant="outline"
          onClick={syncToToday}
          className="w-full gap-2"
        >
          <Calendar className="h-4 w-4" />
          Return to Today
        </Button>
      )}

      {/* Grace period indicator */}
      {!viewingToday && withinGracePeriod && (
        <Card className="bg-[var(--sage)]/10 border-[var(--sage)]/30">
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-sm text-[var(--sage)] font-medium">
              Within 3-Day Grace Period
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              You can still complete these readings
            </p>
          </CardContent>
        </Card>
      )}

      {/* Outside grace period indicator */}
      {!withinGracePeriod && (
        <Card className="bg-muted/50 border-muted">
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-sm text-muted-foreground font-medium">
              Outside 3-Day Window
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              These readings can no longer be completed
            </p>
          </CardContent>
        </Card>
      )}

      {/* Catch-up Day message */}
      {isCatchUpDay && viewingToday && (
        <Card className="bg-primary/5 border-primary/30">
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-sm text-primary font-medium">
              Catch-up Day — No new readings today
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Use this time to complete any missed readings from Day 25
            </p>
          </CardContent>
        </Card>
      )}

      {/* Progress indicator */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {viewingToday ? "Today's Progress" : "Day Progress"}
            </span>
            <span className="font-display font-semibold text-primary">
              {completedCount}/{totalReadings}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </CardContent>
      </Card>

      {/* Track labels */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="ornament-divider text-xs mb-1">
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
              New Testament
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {month.tracks.nt1} • {month.tracks.nt2}
          </p>
        </div>
        <div className="text-center">
          <div className="ornament-divider text-xs mb-1">
            <Badge variant="outline" className="bg-[var(--sage)]/10 text-[var(--sage)] border-[var(--sage)]/30">
              Old Testament
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {month.tracks.ot1} • {month.tracks.ot2}
          </p>
        </div>
      </div>

      {/* Reading cards */}
      <div className="space-y-3">
        {dayData.readings.map((reading, index) => (
          <ReadingCard
            key={reading.id}
            reading={reading}
            index={index}
            dateKey={dateKey}
          />
        ))}
      </div>

      {/* Completion celebration */}
      {completedCount === totalReadings && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Card className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-primary/30">
            <span className="text-lg">✨</span>
            <span className="font-display text-primary font-semibold">
              Perfect Day Complete!
            </span>
            <span className="text-lg">✨</span>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
