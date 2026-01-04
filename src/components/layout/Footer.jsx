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

                {/* Email Button */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
                    <a href="mailto:hello@ofarukbozkurt.com" className="email-btn-styled">
                        <div className="btn-wrapper">
                            <div className="btn-text">hello@ofarukbozkurt.com</div>
                            <span className="btn-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </span>
                        </div>
                    </a>
                </div>

                <style>{`
                    .email-btn-styled {
                        --width: 280px;
                        --height: 52px;
                        width: var(--width);
                        height: var(--height);
                        background: transparent;
                        border: 1px solid rgba(255,255,255,0.25);
                        position: relative;
                        text-align: center;
                        border-radius: 50px;
                        transition: all 0.4s ease;
                        display: block;
                        text-decoration: none;
                        overflow: hidden;
                    }

                    .email-btn-styled .btn-wrapper, 
                    .email-btn-styled .btn-text, 
                    .email-btn-styled .btn-icon {
                        overflow: hidden;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        color: #F2F2F2;
                    }

                    .email-btn-styled .btn-text {
                        top: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        font-size: 14px;
                        font-weight: 500;
                        letter-spacing: 0.05em;
                        text-transform: lowercase;
                    }

                    .email-btn-styled .btn-text, 
                    .email-btn-styled .btn-icon {
                        transition: top 0.4s ease;
                    }

                    .email-btn-styled .btn-icon {
                        color: #050505;
                        top: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .email-btn-styled::before {
                        content: "";
                        position: absolute;
                        width: 0;
                        height: 0;
                        background-color: #F2F2F2;
                        border-radius: 50%;
                        left: 50%;
                        bottom: 0;
                        transform: translate(-50%, 50%);
                        transition: all 0.4s ease;
                        z-index: -1;
                    }

                    .email-btn-styled:hover {
                        border-color: #F2F2F2;
                    }

                    .email-btn-styled:hover::before {
                        width: 400px;
                        height: 400px;
                    }

                    .email-btn-styled:hover .btn-text {
                        top: -100%;
                    }

                    .email-btn-styled:hover .btn-icon {
                        top: 0;
                    }
                    
                    .email-btn-styled:active {
                        transform: scale(0.98);
                    }
                `}</style>

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
