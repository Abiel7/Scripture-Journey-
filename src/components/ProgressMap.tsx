import { motion } from 'framer-motion';
import { bibleBooks } from '../data/readingPlan';
import { useStore } from '../stores/useStore';

// Calculate which books have been read based on completed readings
function getCompletedBooks(completedReadings: Record<string, string[]>): Set<string> {
  const completedBooks = new Set<string>();

  Object.values(completedReadings).flat().forEach(readingId => {
    // Extract book name from reading ID (e.g., "matthew-1-1-17" -> "Matthew")
    const parts = readingId.split('-');
    if (parts.length >= 2) {
      const bookName = parts[0]
        .split(/(?=[0-9])/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      completedBooks.add(bookName);
    }
  });

  return completedBooks;
}

export function ProgressMap() {
  const { completedReadings, getCompletedCount } = useStore();
  const completedBooks = getCompletedBooks(completedReadings);
  const totalReadings = getCompletedCount();

  // Calculate overall progress
  const totalPossibleReadings = 12 * 25 * 4; // 12 months, 25 days, 4 readings
  const overallProgress = (totalReadings / totalPossibleReadings) * 100;

  return (
    <div className="page-enter">
      {/* Overall progress header */}
      <div className="card p-6 mb-6">
        <h2 className="font-display text-xl font-semibold text-[var(--charcoal)] mb-2 text-center">
          Your Journey Through Scripture
        </h2>
        <div className="text-center mb-4">
          <span className="font-display text-4xl font-bold text-[var(--gold)]">
            {totalReadings}
          </span>
          <span className="text-[var(--stone)]"> / {totalPossibleReadings}</span>
          <p className="text-sm text-[var(--stone)] mt-1">passages completed</p>
        </div>

        {/* Progress bar */}
        <div className="h-4 bg-[var(--parchment)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--navy)] via-[var(--gold)] to-[var(--sage)]"
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-center text-sm text-[var(--stone)] mt-2">
          {overallProgress.toFixed(1)}% complete
        </p>
      </div>

      {/* New Testament section */}
      <div className="mb-8">
        <div className="ornament-divider mb-4">
          <span className="flex items-center gap-2 font-display font-semibold text-[var(--navy)]">
            📜 New Testament
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {bibleBooks.newTestament.map((book, index) => {
            const isCompleted = completedBooks.has(book);
            const isStarted = [...completedBooks].some(b =>
              b.toLowerCase().includes(book.toLowerCase().split(' ')[0])
            );

            return (
              <motion.div
                key={book}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className={`
                  relative p-2 rounded-lg text-center text-xs
                  ${isCompleted
                    ? 'bg-[var(--navy)] text-white'
                    : isStarted
                      ? 'bg-[var(--navy)]/20 text-[var(--navy)]'
                      : 'bg-[var(--parchment)] text-[var(--stone)]'
                  }
                `}
                title={book}
              >
                <span className="truncate block">
                  {book.length > 8 ? book.substring(0, 6) + '..' : book}
                </span>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--gold)] rounded-full flex items-center justify-center text-[10px]"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Old Testament section */}
      <div>
        <div className="ornament-divider mb-4">
          <span className="flex items-center gap-2 font-display font-semibold text-[var(--sage)]">
            📖 Old Testament
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {bibleBooks.oldTestament.map((book, index) => {
            const isCompleted = completedBooks.has(book);
            const isStarted = [...completedBooks].some(b =>
              b.toLowerCase().includes(book.toLowerCase().split(' ')[0])
            );

            return (
              <motion.div
                key={book}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className={`
                  relative p-2 rounded-lg text-center text-xs
                  ${isCompleted
                    ? 'bg-[var(--sage)] text-white'
                    : isStarted
                      ? 'bg-[var(--sage)]/20 text-[var(--sage)]'
                      : 'bg-[var(--parchment)] text-[var(--stone)]'
                  }
                `}
                title={book}
              >
                <span className="truncate block">
                  {book.length > 8 ? book.substring(0, 6) + '..' : book}
                </span>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--gold)] rounded-full flex items-center justify-center text-[10px]"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats footer */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        <div className="card p-3 text-center">
          <span className="font-display text-2xl font-bold text-[var(--navy)]">
            {completedBooks.size}
          </span>
          <p className="text-xs text-[var(--stone)]">Books Started</p>
        </div>
        <div className="card p-3 text-center">
          <span className="font-display text-2xl font-bold text-[var(--gold)]">
            {Math.floor(totalReadings / 25)}
          </span>
          <p className="text-xs text-[var(--stone)]">Full Days</p>
        </div>
        <div className="card p-3 text-center">
          <span className="font-display text-2xl font-bold text-[var(--sage)]">
            {Math.floor(totalReadings / 100)}
          </span>
          <p className="text-xs text-[var(--stone)]">Milestones</p>
        </div>
      </div>
    </div>
  );
}
