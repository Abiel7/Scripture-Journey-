import { motion } from 'framer-motion';
import type { Achievement } from '../stores/useStore';

interface AchievementBadgeProps {
  achievement: Achievement;
  index?: number;
}

export function AchievementBadge({ achievement, index = 0 }: AchievementBadgeProps) {
  const { unlocked, name, description, icon, unlockedDate } = achievement;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`card p-4 text-center ${!unlocked ? 'achievement-locked' : ''}`}
    >
      {/* Badge icon */}
      <motion.div
        className="text-4xl mb-2"
        whileHover={unlocked ? { scale: 1.2, rotate: [0, -10, 10, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>

      {/* Name */}
      <h3 className="font-display text-base font-semibold text-(--charcoal) mb-1">
        {name}
      </h3>

      {/* Description */}
      <p className="text-xs text-(--stone) mb-2">
        {description}
      </p>

      {/* Unlock status */}
      {unlocked ? (
        <div className="text-xs text-(--gold) font-medium">
          ✦ Unlocked {unlockedDate ? new Date(unlockedDate).toLocaleDateString() : ''}
        </div>
      ) : (
        <div className="text-xs text-(--stone)">
          🔒 Locked
        </div>
      )}
    </motion.div>
  );
}

// Badge grid component for achievements page
export function AchievementGrid({ achievements }: { achievements: Achievement[] }) {
  // Group by type
  const grouped = {
    streak: achievements.filter(a => a.type === 'streak'),
    readings: achievements.filter(a => a.type === 'readings'),
    level: achievements.filter(a => a.type === 'level'),
    special: achievements.filter(a => a.type === 'special'),
  };

  const sections = [
    { title: 'Streak Milestones', key: 'streak' as const, icon: '🔥' },
    { title: 'Reading Goals', key: 'readings' as const, icon: '📖' },
    { title: 'Level Achievements', key: 'level' as const, icon: '⭐' },
    { title: 'Special Badges', key: 'special' as const, icon: '✨' },
  ];

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.key}>
          <div className="ornament-divider mb-4">
            <span className="flex items-center gap-2 text-sm font-display font-semibold text-[var(--charcoal)]">
              <span>{section.icon}</span>
              {section.title}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {grouped[section.key].map((achievement, index) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                index={index}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
