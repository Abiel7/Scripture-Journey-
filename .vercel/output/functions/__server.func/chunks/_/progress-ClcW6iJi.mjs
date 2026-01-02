import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { b as bibleBooks } from "./readingPlan-D2jIqtgV.mjs";
import { u as useStore } from "./useStore-Z2mlBqQM.mjs";
import "zustand";
import "zustand/middleware";
function getCompletedBooks(completedReadings) {
  const completedBooks = /* @__PURE__ */ new Set();
  Object.values(completedReadings).flat().forEach((readingId) => {
    const parts = readingId.split("-");
    if (parts.length >= 2) {
      const bookName = parts[0].split(/(?=[0-9])/).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      completedBooks.add(bookName);
    }
  });
  return completedBooks;
}
function ProgressMap() {
  const { completedReadings, getCompletedCount } = useStore();
  const completedBooks = getCompletedBooks(completedReadings);
  const totalReadings = getCompletedCount();
  const totalPossibleReadings = 12 * 25 * 4;
  const overallProgress = totalReadings / totalPossibleReadings * 100;
  return /* @__PURE__ */ jsxs("div", { className: "page-enter", children: [
    /* @__PURE__ */ jsxs("div", { className: "card p-6 mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-xl font-semibold text-[var(--charcoal)] mb-2 text-center", children: "Your Journey Through Scripture" }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-4", children: [
        /* @__PURE__ */ jsx("span", { className: "font-display text-4xl font-bold text-[var(--gold)]", children: totalReadings }),
        /* @__PURE__ */ jsxs("span", { className: "text-[var(--stone)]", children: [
          " / ",
          totalPossibleReadings
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-[var(--stone)] mt-1", children: "passages completed" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-[var(--parchment)] rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "h-full bg-gradient-to-r from-[var(--navy)] via-[var(--gold)] to-[var(--sage)]",
          initial: { width: 0 },
          animate: { width: `${overallProgress}%` },
          transition: { duration: 1, ease: "easeOut" }
        }
      ) }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-[var(--stone)] mt-2", children: [
        overallProgress.toFixed(1),
        "% complete"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "ornament-divider mb-4", children: /* @__PURE__ */ jsx("span", { className: "flex items-center gap-2 font-display font-semibold text-[var(--navy)]", children: "📜 New Testament" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: bibleBooks.newTestament.map((book, index) => {
        const isCompleted = completedBooks.has(book);
        const isStarted = [...completedBooks].some(
          (b) => b.toLowerCase().includes(book.toLowerCase().split(" ")[0])
        );
        return /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: index * 0.02 },
            className: `
                  relative p-2 rounded-lg text-center text-xs
                  ${isCompleted ? "bg-[var(--navy)] text-white" : isStarted ? "bg-[var(--navy)]/20 text-[var(--navy)]" : "bg-[var(--parchment)] text-[var(--stone)]"}
                `,
            title: book,
            children: [
              /* @__PURE__ */ jsx("span", { className: "truncate block", children: book.length > 8 ? book.substring(0, 6) + ".." : book }),
              isCompleted && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  className: "absolute -top-1 -right-1 w-4 h-4 bg-[var(--gold)] rounded-full flex items-center justify-center text-[10px]",
                  children: "✓"
                }
              )
            ]
          },
          book
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "ornament-divider mb-4", children: /* @__PURE__ */ jsx("span", { className: "flex items-center gap-2 font-display font-semibold text-[var(--sage)]", children: "📖 Old Testament" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: bibleBooks.oldTestament.map((book, index) => {
        const isCompleted = completedBooks.has(book);
        const isStarted = [...completedBooks].some(
          (b) => b.toLowerCase().includes(book.toLowerCase().split(" ")[0])
        );
        return /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: index * 0.02 },
            className: `
                  relative p-2 rounded-lg text-center text-xs
                  ${isCompleted ? "bg-[var(--sage)] text-white" : isStarted ? "bg-[var(--sage)]/20 text-[var(--sage)]" : "bg-[var(--parchment)] text-[var(--stone)]"}
                `,
            title: book,
            children: [
              /* @__PURE__ */ jsx("span", { className: "truncate block", children: book.length > 8 ? book.substring(0, 6) + ".." : book }),
              isCompleted && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  className: "absolute -top-1 -right-1 w-4 h-4 bg-[var(--gold)] rounded-full flex items-center justify-center text-[10px]",
                  children: "✓"
                }
              )
            ]
          },
          book
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "card p-3 text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "font-display text-2xl font-bold text-[var(--navy)]", children: completedBooks.size }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[var(--stone)]", children: "Books Started" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "card p-3 text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "font-display text-2xl font-bold text-[var(--gold)]", children: Math.floor(totalReadings / 25) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[var(--stone)]", children: "Full Days" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "card p-3 text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "font-display text-2xl font-bold text-[var(--sage)]", children: Math.floor(totalReadings / 100) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[var(--stone)]", children: "Milestones" })
      ] })
    ] })
  ] });
}
function Progress() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl font-semibold text-[var(--charcoal)]", children: "Your Journey" }),
      /* @__PURE__ */ jsx("p", { className: "text-[var(--stone)] text-sm mt-1", children: "Track your path through Scripture" })
    ] }),
    /* @__PURE__ */ jsx(ProgressMap, {})
  ] });
}
export {
  Progress as component
};
