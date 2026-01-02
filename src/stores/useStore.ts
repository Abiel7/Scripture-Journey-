import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface CompletedReadings {
  [date: string]: string[]; // date -> array of reading IDs
}

export interface StreakData {
  current: number;
  longest: number;
  lastReadDate: string | null;
  freezesRemaining: number;
  freezeUsedThisWeek: boolean;
  weekStartDate: string;
}

export interface XPData {
  total: number;
  level: number;
  todayEarned: number;
  lastEarnedDate: string | null;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate: string | null;
  requirement: number;
  type: 'streak' | 'readings' | 'level' | 'special';
}

export interface Settings {
  currentMonth: number;
  currentDay: number;
  isCatchUpDay: boolean;
}

interface BibleTrackerState {
  // Reading progress
  completedReadings: CompletedReadings;

  // Streak
  streak: StreakData;

  // XP & Leveling
  xp: XPData;

  // Achievements
  achievements: Achievement[];

  // Settings
  settings: Settings;

  // Actions
  completeReading: (readingId: string, date?: string) => void;
  uncompleteReading: (readingId: string, date?: string) => void;
  useStreakFreeze: () => boolean;
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetProgress: () => void;
  navigateDay: (direction: 'prev' | 'next') => void;

  // Computed
  getTodayReadings: () => string[];
  getCompletedCount: () => number;
  getCurrentDayKey: () => string;
  canCompleteReading: (readingIndex: number, dateKey: string) => boolean;
  isViewingToday: () => boolean;
  isViewingWithinGracePeriod: () => boolean;
  syncToToday: () => void;
}

// XP required for each level (exponential curve)
const getXPForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

// Calculate level from total XP
const calculateLevel = (totalXP: number): number => {
  let level = 1;
  let xpNeeded = 0;
  while (xpNeeded + getXPForLevel(level) <= totalXP) {
    xpNeeded += getXPForLevel(level);
    level++;
  }
  return level;
};

// Level titles
export const levelTitles: { [key: number]: string } = {
  1: 'Seeker',
  5: 'Disciple',
  10: 'Scholar',
  15: 'Devoted',
  20: 'Faithful',
  25: 'Sage',
  30: 'Elder',
  35: 'Prophet',
  40: 'Apostle',
  45: 'Saint',
  50: 'Illuminated',
};

export const getLevelTitle = (level: number): string => {
  const titles = Object.entries(levelTitles)
    .filter(([lvl]) => parseInt(lvl) <= level)
    .sort(([a], [b]) => parseInt(b) - parseInt(a));
  return titles[0]?.[1] || 'Seeker';
};

// Default achievements
const defaultAchievements: Achievement[] = [
  // Streak achievements
  { id: 'streak-7', name: 'Week Warrior', description: 'Maintain a 7-day reading streak', icon: '🔥', unlocked: false, unlockedDate: null, requirement: 7, type: 'streak' },
  { id: 'streak-30', name: 'Monthly Devotion', description: 'Maintain a 30-day reading streak', icon: '⚡', unlocked: false, unlockedDate: null, requirement: 30, type: 'streak' },
  { id: 'streak-100', name: 'Century Mark', description: 'Maintain a 100-day reading streak', icon: '💎', unlocked: false, unlockedDate: null, requirement: 100, type: 'streak' },
  { id: 'streak-365', name: 'Year of Faith', description: 'Maintain a 365-day reading streak', icon: '👑', unlocked: false, unlockedDate: null, requirement: 365, type: 'streak' },

  // Reading achievements
  { id: 'readings-1', name: 'First Light', description: 'Complete your first reading', icon: '🌅', unlocked: false, unlockedDate: null, requirement: 1, type: 'readings' },
  { id: 'readings-100', name: 'Centurion', description: 'Complete 100 readings', icon: '📖', unlocked: false, unlockedDate: null, requirement: 100, type: 'readings' },
  { id: 'readings-500', name: 'Bibliophile', description: 'Complete 500 readings', icon: '📚', unlocked: false, unlockedDate: null, requirement: 500, type: 'readings' },
  { id: 'readings-1000', name: 'Scripture Master', description: 'Complete 1000 readings', icon: '🏆', unlocked: false, unlockedDate: null, requirement: 1000, type: 'readings' },

  // Level achievements
  { id: 'level-5', name: 'Disciple', description: 'Reach level 5', icon: '⭐', unlocked: false, unlockedDate: null, requirement: 5, type: 'level' },
  { id: 'level-10', name: 'Scholar', description: 'Reach level 10', icon: '🌟', unlocked: false, unlockedDate: null, requirement: 10, type: 'level' },
  { id: 'level-25', name: 'Sage', description: 'Reach level 25', icon: '✨', unlocked: false, unlockedDate: null, requirement: 25, type: 'level' },
  { id: 'level-50', name: 'Illuminated', description: 'Reach level 50', icon: '🌠', unlocked: false, unlockedDate: null, requirement: 50, type: 'level' },

  // Special achievements
  { id: 'perfect-day', name: 'Perfect Day', description: 'Complete all 4 readings in a single day', icon: '🎯', unlocked: false, unlockedDate: null, requirement: 4, type: 'special' },
  { id: 'month-complete', name: 'Chapter Closed', description: 'Complete an entire month of readings', icon: '📅', unlocked: false, unlockedDate: null, requirement: 25, type: 'special' },
];

const getToday = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Grace period: 3 days to complete readings and maintain streak
const GRACE_PERIOD_DAYS = 3;

// Calculate current reading day from calendar date (fixed start: Jan 1, 2026)
const calculateCurrentReadingDay = (): { month: number; day: number; isCatchUpDay: boolean } => {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const dayOfMonth = now.getDate(); // 1-31

  // Reading plan has 25 days per month
  // Days 1-25 are reading days, 26+ are catch-up days
  if (dayOfMonth <= 25) {
    return { month, day: dayOfMonth, isCatchUpDay: false };
  } else {
    return { month, day: 25, isCatchUpDay: true };
  }
};

// Calculate reading day for a specific date offset (negative = past days)
const getReadingDayForOffset = (daysOffset: number): { month: number; day: number } => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  const month = date.getMonth() + 1;
  const dayOfMonth = Math.min(date.getDate(), 25); // Cap at 25
  return { month, day: dayOfMonth };
};

// Check if a dateKey is within the grace period (today and past 2 days = 3 days total)
const isWithinGracePeriod = (dateKey: string): boolean => {
  for (let i = 0; i < GRACE_PERIOD_DAYS; i++) {
    const { month, day } = getReadingDayForOffset(-i);
    if (dateKey === `${month}-${day}`) {
      return true;
    }
  }
  return false;
};

const getWeekStart = (): string => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  return new Date(now.setDate(diff)).toISOString().split('T')[0];
};

const getInitialSettings = (): Settings => {
  const { month, day, isCatchUpDay } = calculateCurrentReadingDay();
  return { currentMonth: month, currentDay: day, isCatchUpDay };
};

const initialState = {
  completedReadings: {},
  streak: {
    current: 0,
    longest: 0,
    lastReadDate: null,
    freezesRemaining: 0, // No freeze protection
    freezeUsedThisWeek: false,
    weekStartDate: getWeekStart(),
  },
  xp: {
    total: 0,
    level: 1,
    todayEarned: 0,
    lastEarnedDate: null,
  },
  achievements: defaultAchievements,
  settings: getInitialSettings(),
};

export const useStore = create<BibleTrackerState>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeReading: (readingId: string, dateKey?: string) => {
        const state = get();
        const { month, day } = calculateCurrentReadingDay();
        const todayDateKey = `${month}-${day}`;
        const targetDateKey = dateKey || todayDateKey;

        // RULE: Can only complete readings within grace period (3 days)
        if (!isWithinGracePeriod(targetDateKey)) {
          console.warn('Cannot complete readings outside the 3-day grace period');
          return;
        }

        // Check if already completed
        const dayReadings = state.completedReadings[targetDateKey] || [];
        if (dayReadings.includes(readingId)) return;

        // Add reading
        const newCompletedReadings = {
          ...state.completedReadings,
          [targetDateKey]: [...dayReadings, readingId],
        };

        // Calculate XP
        let xpGained = 10; // Base XP per reading
        const todayCount = newCompletedReadings[targetDateKey].length;

        // Bonus for completing all 4 readings
        if (todayCount === 4) {
          xpGained += 50;
        }

        // Streak bonus
        if (state.streak.current > 0) {
          xpGained += Math.min(state.streak.current * 5, 100); // Cap at 100 bonus
        }

        const newTotalXP = state.xp.total + xpGained;
        const newLevel = calculateLevel(newTotalXP);

        // Update streak - 3-day grace period
        let newStreak = { ...state.streak };
        const today = getToday();

        if (state.streak.lastReadDate === null) {
          // First reading ever
          newStreak.current = 1;
          newStreak.lastReadDate = today;
        } else if (state.streak.lastReadDate === today) {
          // Already read today, no change to streak
        } else {
          // Check if within grace period (3 days)
          const lastRead = new Date(state.streak.lastReadDate);
          const now = new Date(today);
          const daysDiff = Math.floor((now.getTime() - lastRead.getTime()) / (1000 * 60 * 60 * 24));

          if (daysDiff <= GRACE_PERIOD_DAYS) {
            // Within grace period - streak continues
            newStreak.current = state.streak.current + 1;
            newStreak.lastReadDate = today;
          } else {
            // Outside grace period - streak broken
            newStreak.current = 1;
            newStreak.lastReadDate = today;
          }
        }

        newStreak.longest = Math.max(newStreak.longest, newStreak.current);

        // Check achievements
        const totalReadings = Object.values(newCompletedReadings).flat().length;
        const newAchievements = state.achievements.map(achievement => {
          if (achievement.unlocked) return achievement;

          let shouldUnlock = false;

          switch (achievement.type) {
            case 'streak':
              shouldUnlock = newStreak.current >= achievement.requirement;
              break;
            case 'readings':
              shouldUnlock = totalReadings >= achievement.requirement;
              break;
            case 'level':
              shouldUnlock = newLevel >= achievement.requirement;
              break;
            case 'special':
              if (achievement.id === 'perfect-day') {
                shouldUnlock = todayCount >= 4;
              }
              break;
          }

          if (shouldUnlock) {
            return { ...achievement, unlocked: true, unlockedDate: today };
          }
          return achievement;
        });

        set({
          completedReadings: newCompletedReadings,
          streak: newStreak,
          xp: {
            total: newTotalXP,
            level: newLevel,
            todayEarned: state.xp.lastEarnedDate === today
              ? state.xp.todayEarned + xpGained
              : xpGained,
            lastEarnedDate: today,
          },
          achievements: newAchievements,
        });
      },

      uncompleteReading: (readingId: string, dateKey?: string) => {
        const { month, day } = calculateCurrentReadingDay();
        const todayDateKey = `${month}-${day}`;
        const targetDateKey = dateKey || todayDateKey;

        // RULE: Can only uncomplete readings within grace period
        if (!isWithinGracePeriod(targetDateKey)) {
          return;
        }

        const state = get();
        const dayReadings = state.completedReadings[targetDateKey] || [];
        const newDayReadings = dayReadings.filter(id => id !== readingId);

        set({
          completedReadings: {
            ...state.completedReadings,
            [targetDateKey]: newDayReadings,
          },
        });
      },

      useStreakFreeze: () => {
        // Freeze protection disabled - streaks reset immediately on miss
        return false;
      },

      updateSettings: (newSettings: Partial<Settings>) => {
        set(state => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      navigateDay: (direction: 'prev' | 'next') => {
        const state = get();
        const { month: todayMonth, day: todayDay } = calculateCurrentReadingDay();
        let { currentMonth, currentDay } = state.settings;

        if (direction === 'next') {
          // RULE: Cannot navigate to future days
          const wouldBeNextDay = currentDay < 25 ? currentDay + 1 : 1;
          const wouldBeNextMonth = currentDay < 25 ? currentMonth : (currentMonth === 12 ? 1 : currentMonth + 1);

          // Check if next day would be in the future
          if (wouldBeNextMonth > todayMonth || (wouldBeNextMonth === todayMonth && wouldBeNextDay > todayDay)) {
            return; // Don't navigate to future
          }

          currentDay = wouldBeNextDay;
          currentMonth = wouldBeNextMonth;
        } else {
          if (currentDay > 1) {
            currentDay--;
          } else {
            currentDay = 25;
            currentMonth = currentMonth === 1 ? 12 : currentMonth - 1;
          }
        }

        set({
          settings: { ...state.settings, currentMonth, currentDay, isCatchUpDay: false },
        });
      },

      resetProgress: () => {
        set({
          ...initialState,
          settings: getInitialSettings(),
        });
      },

      getTodayReadings: () => {
        const { month, day } = calculateCurrentReadingDay();
        const dateKey = `${month}-${day}`;
        const state = get();
        return state.completedReadings[dateKey] || [];
      },

      getCompletedCount: () => {
        const state = get();
        return Object.values(state.completedReadings).flat().length;
      },

      getCurrentDayKey: () => {
        const state = get();
        return `${state.settings.currentMonth}-${state.settings.currentDay}`;
      },

      canCompleteReading: (readingIndex: number, dateKey: string) => {
        // RULE: Can only complete readings within grace period (3 days)
        if (!isWithinGracePeriod(dateKey)) {
          return false;
        }

        // RULE: Must complete readings in order (0, 1, 2, 3)
        const state = get();
        const dayReadings = state.completedReadings[dateKey] || [];

        // Check if all previous readings are completed
        return dayReadings.length >= readingIndex;
      },

      isViewingToday: () => {
        const state = get();
        const { month, day } = calculateCurrentReadingDay();
        return state.settings.currentMonth === month && state.settings.currentDay === day;
      },

      isViewingWithinGracePeriod: () => {
        const state = get();
        const dateKey = `${state.settings.currentMonth}-${state.settings.currentDay}`;
        return isWithinGracePeriod(dateKey);
      },

      syncToToday: () => {
        const { month, day, isCatchUpDay } = calculateCurrentReadingDay();
        set(state => ({
          settings: { ...state.settings, currentMonth: month, currentDay: day, isCatchUpDay },
        }));
      },
    }),
    {
      name: 'bible-tracker-storage',
    }
  )
);

// Helper to get XP progress for current level
export const getXPProgress = (totalXP: number, level: number): { current: number; required: number; percentage: number } => {
  let xpSpent = 0;
  for (let i = 1; i < level; i++) {
    xpSpent += getXPForLevel(i);
  }
  const current = totalXP - xpSpent;
  const required = getXPForLevel(level);
  return {
    current,
    required,
    percentage: (current / required) * 100,
  };
};
