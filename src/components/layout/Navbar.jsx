/**
 * Navbar Component
 * Minimal fixed header with mix-blend-mode for visibility over images
 */

import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function Navbar({ className }) {
    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50",
                "container-padding py-6",
                "flex items-center justify-between",
                "mix-blend-difference",
                className
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1.2,
                delay: 0.5
            }}
        >
            <a
                href="/"
                className="text-offWhite font-medium text-lg heading-tight"
            >
                Faruk
            </a>

            <a
                href="mailto:contact@faruk.com"
                className="meta-wide text-offWhite hover:opacity-60 transition-opacity"
            >
                Contact
            </a>
        </motion.header>
    )
}
