'use client';

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          style={{ width: '100%', height: '100%' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
