import { create } from "zustand";
import { persist } from "zustand/middleware";
const getXPForLevel = (level) => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};
const calculateLevel = (totalXP) => {
  let level = 1;
  let xpNeeded = 0;
  while (xpNeeded + getXPForLevel(level) <= totalXP) {
    xpNeeded += getXPForLevel(level);
    level++;
  }
  return level;
};
const levelTitles = {
  1: "Seeker",
  5: "Disciple",
  10: "Scholar",
  15: "Devoted",
  20: "Faithful",
  25: "Sage",
  30: "Elder",
  35: "Prophet",
  40: "Apostle",
  45: "Saint",
  50: "Illuminated"
};
const getLevelTitle = (level) => {
  const titles = Object.entries(levelTitles).filter(([lvl]) => parseInt(lvl) <= level).sort(([a], [b]) => parseInt(b) - parseInt(a));
  return titles[0]?.[1] || "Seeker";
};
const defaultAchievements = [
  // Streak achievements
  { id: "streak-7", name: "Week Warrior", description: "Maintain a 7-day reading streak", icon: "🔥", unlocked: false, unlockedDate: null, requirement: 7, type: "streak" },
  { id: "streak-30", name: "Monthly Devotion", description: "Maintain a 30-day reading streak", icon: "⚡", unlocked: false, unlockedDate: null, requirement: 30, type: "streak" },
  { id: "streak-100", name: "Century Mark", description: "Maintain a 100-day reading streak", icon: "💎", unlocked: false, unlockedDate: null, requirement: 100, type: "streak" },
  { id: "streak-365", name: "Year of Faith", description: "Maintain a 365-day reading streak", icon: "👑", unlocked: false, unlockedDate: null, requirement: 365, type: "streak" },
  // Reading achievements
  { id: "readings-1", name: "First Light", description: "Complete your first reading", icon: "🌅", unlocked: false, unlockedDate: null, requirement: 1, type: "readings" },
  { id: "readings-100", name: "Centurion", description: "Complete 100 readings", icon: "📖", unlocked: false, unlockedDate: null, requirement: 100, type: "readings" },
  { id: "readings-500", name: "Bibliophile", description: "Complete 500 readings", icon: "📚", unlocked: false, unlockedDate: null, requirement: 500, type: "readings" },
  { id: "readings-1000", name: "Scripture Master", description: "Complete 1000 readings", icon: "🏆", unlocked: false, unlockedDate: null, requirement: 1e3, type: "readings" },
  // Level achievements
  { id: "level-5", name: "Disciple", description: "Reach level 5", icon: "⭐", unlocked: false, unlockedDate: null, requirement: 5, type: "level" },
  { id: "level-10", name: "Scholar", description: "Reach level 10", icon: "🌟", unlocked: false, unlockedDate: null, requirement: 10, type: "level" },
  { id: "level-25", name: "Sage", description: "Reach level 25", icon: "✨", unlocked: false, unlockedDate: null, requirement: 25, type: "level" },
  { id: "level-50", name: "Illuminated", description: "Reach level 50", icon: "🌠", unlocked: false, unlockedDate: null, requirement: 50, type: "level" },
  // Special achievements
  { id: "perfect-day", name: "Perfect Day", description: "Complete all 4 readings in a single day", icon: "🎯", unlocked: false, unlockedDate: null, requirement: 4, type: "special" },
  { id: "month-complete", name: "Chapter Closed", description: "Complete an entire month of readings", icon: "📅", unlocked: false, unlockedDate: null, requirement: 25, type: "special" }
];
const getToday = () => {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
};
const GRACE_PERIOD_DAYS = 3;
const calculateCurrentReadingDay = () => {
  const now = /* @__PURE__ */ new Date();
  const month = now.getMonth() + 1;
  const dayOfMonth = now.getDate();
  if (dayOfMonth <= 25) {
    return { month, day: dayOfMonth, isCatchUpDay: false };
  } else {
    return { month, day: 25, isCatchUpDay: true };
  }
};
const getReadingDayForOffset = (daysOffset) => {
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() + daysOffset);
  const month = date.getMonth() + 1;
  const dayOfMonth = Math.min(date.getDate(), 25);
  return { month, day: dayOfMonth };
};
const isWithinGracePeriod = (dateKey) => {
  for (let i = 0; i < GRACE_PERIOD_DAYS; i++) {
    const { month, day } = getReadingDayForOffset(-i);
    if (dateKey === `${month}-${day}`) {
      return true;
    }
  }
  return false;
};
const getWeekStart = () => {
  const now = /* @__PURE__ */ new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  return new Date(now.setDate(diff)).toISOString().split("T")[0];
};
const getInitialSettings = () => {
  const { month, day, isCatchUpDay } = calculateCurrentReadingDay();
  return { currentMonth: month, currentDay: day, isCatchUpDay };
};
const initialState = {
  completedReadings: {},
  streak: {
    current: 0,
    longest: 0,
    lastReadDate: null,
    freezesRemaining: 0,
    // No freeze protection
    freezeUsedThisWeek: false,
    weekStartDate: getWeekStart()
  },
  xp: {
    total: 0,
    level: 1,
    todayEarned: 0,
    lastEarnedDate: null
  },
  achievements: defaultAchievements,
  settings: getInitialSettings()
};
const useStore = create()(
  persist(
    (set, get) => ({
      ...initialState,
      completeReading: (readingId, dateKey) => {
        const state = get();
        const { month, day } = calculateCurrentReadingDay();
        const todayDateKey = `${month}-${day}`;
        const targetDateKey = dateKey || todayDateKey;
        if (!isWithinGracePeriod(targetDateKey)) {
          console.warn("Cannot complete readings outside the 3-day grace period");
          return;
        }
        const dayReadings = state.completedReadings[targetDateKey] || [];
        if (dayReadings.includes(readingId)) return;
        const newCompletedReadings = {
          ...state.completedReadings,
          [targetDateKey]: [...dayReadings, readingId]
        };
        let xpGained = 10;
        const todayCount = newCompletedReadings[targetDateKey].length;
        if (todayCount === 4) {
          xpGained += 50;
        }
        if (state.streak.current > 0) {
          xpGained += Math.min(state.streak.current * 5, 100);
        }
        const newTotalXP = state.xp.total + xpGained;
        const newLevel = calculateLevel(newTotalXP);
        let newStreak = { ...state.streak };
        const today = getToday();
        if (state.streak.lastReadDate === null) {
          newStreak.current = 1;
          newStreak.lastReadDate = today;
        } else if (state.streak.lastReadDate === today) ;
        else {
          const lastRead = new Date(state.streak.lastReadDate);
          const now = new Date(today);
          const daysDiff = Math.floor((now.getTime() - lastRead.getTime()) / (1e3 * 60 * 60 * 24));
          if (daysDiff <= GRACE_PERIOD_DAYS) {
            newStreak.current = state.streak.current + 1;
            newStreak.lastReadDate = today;
          } else {
            newStreak.current = 1;
            newStreak.lastReadDate = today;
          }
        }
        newStreak.longest = Math.max(newStreak.longest, newStreak.current);
        const totalReadings = Object.values(newCompletedReadings).flat().length;
        const newAchievements = state.achievements.map((achievement) => {
          if (achievement.unlocked) return achievement;
          let shouldUnlock = false;
          switch (achievement.type) {
            case "streak":
              shouldUnlock = newStreak.current >= achievement.requirement;
              break;
            case "readings":
              shouldUnlock = totalReadings >= achievement.requirement;
              break;
            case "level":
              shouldUnlock = newLevel >= achievement.requirement;
              break;
            case "special":
              if (achievement.id === "perfect-day") {
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
            todayEarned: state.xp.lastEarnedDate === today ? state.xp.todayEarned + xpGained : xpGained,
            lastEarnedDate: today
          },
          achievements: newAchievements
        });
      },
      uncompleteReading: (readingId, dateKey) => {
        const { month, day } = calculateCurrentReadingDay();
        const todayDateKey = `${month}-${day}`;
        const targetDateKey = dateKey || todayDateKey;
        if (!isWithinGracePeriod(targetDateKey)) {
          return;
        }
        const state = get();
        const dayReadings = state.completedReadings[targetDateKey] || [];
        const newDayReadings = dayReadings.filter((id) => id !== readingId);
        set({
          completedReadings: {
            ...state.completedReadings,
            [targetDateKey]: newDayReadings
          }
        });
      },
      useStreakFreeze: () => {
        return false;
      },
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }));
      },
      navigateDay: (direction) => {
        const state = get();
        const { month: todayMonth, day: todayDay } = calculateCurrentReadingDay();
        let { currentMonth, currentDay } = state.settings;
        if (direction === "next") {
          const wouldBeNextDay = currentDay < 25 ? currentDay + 1 : 1;
          const wouldBeNextMonth = currentDay < 25 ? currentMonth : currentMonth === 12 ? 1 : currentMonth + 1;
          if (wouldBeNextMonth > todayMonth || wouldBeNextMonth === todayMonth && wouldBeNextDay > todayDay) {
            return;
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
          settings: { ...state.settings, currentMonth, currentDay, isCatchUpDay: false }
        });
      },
      resetProgress: () => {
        set({
          ...initialState,
          settings: getInitialSettings()
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
      canCompleteReading: (readingIndex, dateKey) => {
        if (!isWithinGracePeriod(dateKey)) {
          return false;
        }
        const state = get();
        const dayReadings = state.completedReadings[dateKey] || [];
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
        set((state) => ({
          settings: { ...state.settings, currentMonth: month, currentDay: day, isCatchUpDay }
        }));
      }
    }),
    {
      name: "bible-tracker-storage"
    }
  )
);
const getXPProgress = (totalXP, level) => {
  let xpSpent = 0;
  for (let i = 1; i < level; i++) {
    xpSpent += getXPForLevel(i);
  }
  const current = totalXP - xpSpent;
  const required = getXPForLevel(level);
  return {
    current,
    required,
    percentage: current / required * 100
  };
};
export {
  getXPProgress as a,
  getLevelTitle as g,
  useStore as u
};
