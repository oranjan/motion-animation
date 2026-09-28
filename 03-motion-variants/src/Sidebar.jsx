import {
  IconChartBar,
  IconChevronsLeft,
  IconFolder,
  IconLayoutDashboard,
  IconLogout,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react'
import { motion } from "framer-motion"

const links = [
  { label: 'Dashboard', icon: IconLayoutDashboard },
  { label: 'Analytics', icon: IconChartBar },
  { label: 'Projects', icon: IconFolder },
  { label: 'Team', icon: IconUsers },
  { label: 'Settings', icon: IconSettings },
]

export default function Sidebar({ open, onToggle, active, onSelect }) {
  const sidebarVariants = {
    open: {
      width: "16rem",
    },
    closed: {
      width: "4rem",
    },
  };

  const listVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.04 , staggerDirection: -1, },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: {
      opacity: 0,
      y: -10,
    },
  };

  const footerLabelVariants = {
    open: { ...itemVariants.open, transition: { delay: 0.2 } },
    closed: itemVariants.closed,
  };

  const chevronVariants = {
    open: { rotate: 0 },
    closed: { rotate: 180 },
  };

  return (
    <motion.aside
      initial={false}
      animate={open ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ duration: 0.5 }}
      className={`flex h-screen shrink-0 flex-col overflow-hidden border-r border-neutral-200 bg-white `}
    >
      <nav className="flex-1 px-3 py-2">
        <motion.ul variants={listVariants} className="flex flex-col gap-1">
          {links.map(({ label, icon: Icon }) => {
            const isActive = active === label;
            return (
              <li key={label}>
                <motion.button
                  onClick={() => onSelect(label)}
                  title={open ? undefined : label}
                  className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  <Icon size={20} className="shrink-0" />
                  <motion.span
                    variants={itemVariants}
                    className="whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                </motion.button>
              </li>
            );
          })}
        </motion.ul>
      </nav>

      <div className="flex flex-col gap-1 border-t border-neutral-200 px-3 py-3">
        <button
          title={open ? undefined : "Log out"}
          className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        >
          <IconLogout size={20} className="shrink-0" />
          <motion.span
            variants={footerLabelVariants}
            className="whitespace-nowrap"
          >
            Log out
          </motion.span>
        </button>
        <button
          onClick={onToggle}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        >
          <motion.span variants={chevronVariants} className="flex shrink-0">
            <IconChevronsLeft size={20} />
          </motion.span>
          <motion.span
            variants={footerLabelVariants}
            className="whitespace-nowrap"
          >
            Collapse
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
}
