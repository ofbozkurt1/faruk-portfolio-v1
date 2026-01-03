/**
 * Header Component
 * Centered navigation with solid background
 */

import { motion } from 'framer-motion'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' }
]

export default function Header() {
    const handleClick = (e, href) => {
        e.preventDefault()
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '16px 5vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(5, 5, 5, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
        >
            <nav style={{ display: 'flex', gap: 50 }}>
                {navLinks.map((link) => (
                    <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href)}
                        style={{
                            color: '#888',
                            fontSize: 13,
                            fontWeight: 500,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            padding: '8px 0'
                        }}
                        whileHover={{ color: '#F2F2F2' }}
                    >
                        {link.label}
                    </motion.a>
                ))}
            </nav>
        </motion.header>
    )
}
