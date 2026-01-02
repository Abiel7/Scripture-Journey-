import { motion, AnimatePresence } from 'framer-motion';
import { useStore, getXPProgress, getLevelTitle } from '../stores/useStore';
import { useState, useEffect } from 'react';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';

export function XPBar() {
  const { xp } = useStore();
  const progress = getXPProgress(xp.total, xp.level);
  const levelTitle = getLevelTitle(xp.level);

  const [showXPGain, setShowXPGain] = useState(false);
  const [lastXP, setLastXP] = useState(xp.todayEarned);

  useEffect(() => {
    if (xp.todayEarned > lastXP) {
      setShowXPGain(true);
      const timer = setTimeout(() => setShowXPGain(false), 1500);
      setLastXP(xp.todayEarned);
      return () => clearTimeout(timer);
    }
  }, [xp.todayEarned, lastXP]);

  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        {/* Level badge and title */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-display text-lg font-bold text-primary-foreground">
                {xp.level}
              </span>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold">
                {levelTitle}
              </span>
              <span className="text-xs text-muted-foreground">
                Level {xp.level}
              </span>
            </div>
          </div>

          {/* XP count */}
          <div className="text-right relative">
            <span className="font-display text-lg font-semibold text-primary">
              {progress.current}
            </span>
            <span className="text-muted-foreground text-sm"> / {progress.required} XP</span>

            {/* Floating XP gain indicator */}
            <AnimatePresence>
              {showXPGain && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: -20 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="absolute right-0 bottom-full text-primary font-display font-bold xp-float"
                >
                  +XP
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress bar with shimmer */}
        <div className="relative h-3 rounded-full overflow-hidden bg-secondary">
          <motion.div
            className="absolute inset-0 h-full rounded-full xp-shimmer"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress.percentage, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Today's XP earned */}
        {xp.todayEarned > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-xs text-center text-[var(--sage)]"
          >
            +{xp.todayEarned} XP earned today ✦
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
}
