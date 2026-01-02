import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import type { Reading } from '../data/readingPlan';
import { useStore } from '../stores/useStore';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { cn } from '../lib/utils';

interface ReadingCardProps {
  reading: Reading;
  index: number;
  dateKey: string;
}

export function ReadingCard({ reading, index, dateKey }: ReadingCardProps) {
  const { completedReadings, completeReading, uncompleteReading, canCompleteReading, isViewingWithinGracePeriod } = useStore();

  const dayReadings = completedReadings[dateKey] || [];
  const isCompleted = dayReadings.includes(reading.id);
  const isOldTestament = index >= 2;

  // Check if this reading can be completed (within 3-day grace period)
  const withinGracePeriod = isViewingWithinGracePeriod();
  const canComplete = canCompleteReading(index, dateKey);
  const isLocked = !isCompleted && (!withinGracePeriod || !canComplete);
  const isNextUp = withinGracePeriod && canComplete && !isCompleted;

  const handleToggle = () => {
    if (isLocked) return;

    if (isCompleted) {
      uncompleteReading(reading.id, dateKey);
    } else {
      completeReading(reading.id, dateKey);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
    >
      <Card
        onClick={handleToggle}
        className={cn(
          "p-4 transition-all duration-200",
          isLocked && "opacity-60 cursor-not-allowed",
          !isLocked && "cursor-pointer hover:shadow-md",
          isCompleted && "bg-primary/5 border-primary/30",
          isNextUp && "ring-2 ring-primary/30 shadow-sm"
        )}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox or Lock */}
          {isLocked ? (
            <div className="mt-1 h-6 w-6 rounded-full border-2 border-muted flex items-center justify-center">
              <Lock className="h-3 w-3 text-muted-foreground" />
            </div>
          ) : (
            <Checkbox
              checked={isCompleted}
              onCheckedChange={handleToggle}
              disabled={isLocked}
              className={cn(
                "mt-1 h-6 w-6 rounded-full border-2",
                isCompleted && "bg-primary border-primary data-[state=checked]:bg-primary"
              )}
            />
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant={isOldTestament ? "secondary" : "default"}
                className={cn(
                  "text-xs font-medium",
                  isOldTestament
                    ? "bg-[var(--sage)] hover:bg-[var(--sage)] text-white"
                    : "bg-accent hover:bg-accent text-accent-foreground"
                )}
              >
                {isOldTestament ? 'OT' : 'NT'}
              </Badge>
              <span className={cn(
                "font-display text-lg font-semibold truncate",
                isLocked && "text-muted-foreground"
              )}>
                {reading.book}
              </span>
              {isNextUp && (
                <Badge variant="outline" className="text-xs text-primary border-primary/30">
                  Next
                </Badge>
              )}
            </div>
            <p className={cn(
              "text-base",
              isCompleted || isLocked ? "text-muted-foreground" : "text-foreground"
            )}>
              {reading.passage}
            </p>
            {isLocked && !withinGracePeriod && (
              <p className="text-xs text-muted-foreground mt-1 italic">
                Outside 3-day window (view only)
              </p>
            )}
            {isLocked && withinGracePeriod && !canComplete && (
              <p className="text-xs text-muted-foreground mt-1 italic">
                Complete previous reading first
              </p>
            )}
          </div>

          {/* Completion indicator */}
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-primary text-lg"
            >
              ✦
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
