import { Link, useLocation } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { BookOpen, Map, Award, Settings } from 'lucide-react';

const navItems = [
  { path: '/', icon: BookOpen, label: 'Read' },
  { path: '/progress', icon: Map, label: 'Journey' },
  { path: '/achievements', icon: Award, label: 'Badges' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="nav-bottom fixed bottom-0 left-0 right-0 px-4 py-2 z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item flex flex-col items-center gap-1 px-4 py-2 rounded-lg ${
                isActive ? 'active' : 'text-[var(--stone)]'
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--gold)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
