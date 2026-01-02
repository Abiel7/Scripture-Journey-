import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useStore, getLevelTitle } from '../stores/useStore';
import { readingPlan } from '../data/readingPlan';
import { useState } from 'react';

export const Route = createFileRoute('/settings')({ component: Settings });

function Settings() {
  const { settings, updateSettings, resetProgress, streak, xp, getCompletedCount } = useStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const completedReadings = getCompletedCount();

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="text-center">
        <h1 className="font-display text-2xl font-semibold text-[var(--charcoal)]">
          Settings
        </h1>
        <p className="text-[var(--stone)] text-sm mt-1">
          Customize your journey
        </p>
      </header>

      {/* Stats summary card */}
      <div className="card p-5">
        <h2 className="font-display text-lg font-semibold text-[var(--charcoal)] mb-4">
          Your Progress
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-[var(--parchment)] rounded-lg">
            <span className="block font-display text-2xl font-bold text-[var(--gold)]">
              {xp.level}
            </span>
            <span className="text-xs text-[var(--stone)]">{getLevelTitle(xp.level)}</span>
          </div>
          <div className="text-center p-3 bg-[var(--parchment)] rounded-lg">
            <span className="block font-display text-2xl font-bold text-[var(--navy)]">
              {xp.total}
            </span>
            <span className="text-xs text-[var(--stone)]">Total XP</span>
          </div>
          <div className="text-center p-3 bg-[var(--parchment)] rounded-lg">
            <span className="block font-display text-2xl font-bold text-[var(--rose)]">
              {streak.longest}
            </span>
            <span className="text-xs text-[var(--stone)]">Best Streak</span>
          </div>
          <div className="text-center p-3 bg-[var(--parchment)] rounded-lg">
            <span className="block font-display text-2xl font-bold text-[var(--sage)]">
              {completedReadings}
            </span>
            <span className="text-xs text-[var(--stone)]">Readings Done</span>
          </div>
        </div>
      </div>

      {/* Reading Plan Settings */}
      <div className="card p-5">
        <h2 className="font-display text-lg font-semibold text-[var(--charcoal)] mb-4">
          Reading Plan
        </h2>

        {/* Start Month Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--charcoal)] mb-2">
            Starting Month
          </label>
          <select
            value={settings.startMonth}
            onChange={(e) => updateSettings({ startMonth: parseInt(e.target.value) })}
            className="w-full p-3 bg-[var(--parchment)] border border-[var(--gold)]/20 rounded-lg font-body text-[var(--charcoal)] focus:outline-none focus:border-[var(--gold)]"
          >
            {readingPlan.map((month) => (
              <option key={month.month} value={month.month}>
                {month.name} (Month {month.month})
              </option>
            ))}
          </select>
        </div>

        {/* Current Position */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--charcoal)] mb-2">
            Jump to Day
          </label>
          <div className="flex gap-2">
            <select
              value={settings.currentMonth}
              onChange={(e) => updateSettings({ currentMonth: parseInt(e.target.value) })}
              className="flex-1 p-3 bg-[var(--parchment)] border border-[var(--gold)]/20 rounded-lg font-body text-[var(--charcoal)] focus:outline-none focus:border-[var(--gold)]"
            >
              {readingPlan.map((month) => (
                <option key={month.month} value={month.month}>
                  {month.name}
                </option>
              ))}
            </select>
            <select
              value={settings.currentDay}
              onChange={(e) => updateSettings({ currentDay: parseInt(e.target.value) })}
              className="w-24 p-3 bg-[var(--parchment)] border border-[var(--gold)]/20 rounded-lg font-body text-[var(--charcoal)] focus:outline-none focus:border-[var(--gold)]"
            >
              {[...Array(25)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Day {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="card p-5">
        <h2 className="font-display text-lg font-semibold text-[var(--charcoal)] mb-3">
          About
        </h2>
        <p className="text-sm text-[var(--stone)] mb-3">
          Scripture Journey uses the <strong>Navigators Bible Reading Plan</strong> — a 12-month plan with 25 daily readings across 4 scripture tracks.
        </p>
        <p className="text-sm text-[var(--stone)]">
          Read 4 passages daily from both Old and New Testament to experience the unity and variety of Scripture.
        </p>
      </div>

      {/* Danger Zone */}
      <div className="card p-5 border-[var(--rose)]/30">
        <h2 className="font-display text-lg font-semibold text-[var(--rose)] mb-3">
          Reset Data
        </h2>
        <p className="text-sm text-[var(--stone)] mb-4">
          This will permanently delete all your progress, including streaks, XP, and achievements.
        </p>

        {!showResetConfirm ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-3 bg-[var(--parchment)] text-[var(--rose)] font-medium rounded-lg border border-[var(--rose)]/30 hover:bg-[var(--rose)]/10 transition-colors"
          >
            Reset All Progress
          </motion.button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-center text-[var(--rose)] font-medium">
              Are you sure? This cannot be undone.
            </p>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 bg-[var(--parchment)] text-[var(--stone)] font-medium rounded-lg"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-3 bg-[var(--rose)] text-white font-medium rounded-lg"
              >
                Yes, Reset
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-[var(--stone)] pb-4">
        <p>Scripture Journey v1.0</p>
        <p className="mt-1">Based on The Navigators Bible Reading Plan</p>
      </div>
    </div>
  );
}
