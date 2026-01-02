import { motion } from 'framer-motion';
import { useStore } from '../stores/useStore';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

export function StreakDisplay() {
  const { streak } = useStore();
  const hasStreak = streak.current > 0;

  return (
    <Card className="flex-1">
      <CardContent className="pt-4 pb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3"
        >
          {/* Fire icon */}
          <div className="relative">
            <motion.div
              className={cn(
                "text-3xl",
                hasStreak ? 'fire-icon' : 'opacity-30 grayscale'
              )}
              animate={hasStreak ? { scale: [1, 1.08, 1] } : {}}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              🔥
            </motion.div>

            {/* Ember particles when active */}
            {hasStreak && streak.current >= 7 && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-xs text-primary"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -15],
                      x: [0, (i - 1) * 6],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.25,
                      repeat: Infinity,
                    }}
                    style={{ bottom: '100%', left: '50%' }}
                  >
                    ✦
                  </motion.div>
                ))}
              </>
            )}
          </div>

          {/* Streak count */}
          <div className="flex flex-col">
            <motion.span
              className="font-display text-2xl font-bold"
              key={streak.current}
              initial={{ scale: 1.3, color: 'var(--gold)' }}
              animate={{ scale: 1, color: 'var(--foreground)' }}
              transition={{ duration: 0.3 }}
            >
              {streak.current}
            </motion.span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              day streak
            </span>
          </div>

          {/* Longest streak indicator */}
          {streak.longest > 0 && streak.longest > streak.current && (
            <Badge variant="outline" className="ml-auto gap-1 text-muted-foreground">
              <span>Best: {streak.longest}</span>
            </Badge>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}
