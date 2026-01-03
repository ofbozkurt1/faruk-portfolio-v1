/**
 * Footer Component
 * Professional closing with CTA, contact, and social links
 */

import { motion } from 'framer-motion'
import { FaBehance, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

const socialLinks = [
    { icon: FaBehance, href: 'https://behance.net/', label: 'Behance' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com/', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://instagram.com/', label: 'Instagram' }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
}

export default function Footer() {
    return (
        <footer
            id="contact"
            style={{
                padding: '120px 5vw 60px',
                borderTop: '1px solid rgba(255,255,255,0.05)'
            }}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}
            >
                {/* Main Headline */}
                <motion.h2
                    variants={itemVariants}
                    style={{
                        fontSize: 'clamp(36px, 6vw, 64px)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: '#F2F2F2',
                        marginBottom: 24
                    }}
                >
                    LET'S CREATE TOGETHER
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    style={{
                        fontSize: 16,
                        color: '#888',
                        marginBottom: 32,
                        maxWidth: 500,
                        margin: '0 auto 32px'
                    }}
                >
                    Have a project in mind? Let's bring your vision to life with motion and design.
                </motion.p>

                {/* Email */}
                <motion.a
                    variants={itemVariants}
                    href="mailto:hello@ofarukbozkurt.com"
                    style={{
                        display: 'inline-block',
                        fontSize: 20,
                        fontWeight: 500,
                        color: '#F2F2F2',
                        textDecoration: 'none',
                        padding: '12px 32px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 50,
                        marginBottom: 48,
                        transition: 'all 0.3s ease'
                    }}
                    whileHover={{
                        scale: 1.05,
                        borderColor: 'rgba(136,136,136,0.5)'
                    }}
                >
                    hello@ofarukbozkurt.com
                </motion.a>

                {/* Social Links */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 20,
                        marginBottom: 60
                    }}
                >
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                        <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            style={{
                                width: 48,
                                height: 48,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                color: '#888',
                                transition: 'all 0.3s ease'
                            }}
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                color: '#F2F2F2'
                            }}
                        >
                            <Icon size={20} />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Copyright */}
                <motion.p
                    variants={itemVariants}
                    style={{
                        fontSize: 12,
                        color: '#555',
                        letterSpacing: '0.05em'
                    }}
                >
                    © 2026 Ömer Faruk Bozkurt. Crafted with motion.
                </motion.p>
            </motion.div>
        </footer>
    )
}
