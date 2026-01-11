import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaBehance, FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
    const { t } = useTranslation()

    const socialLinks = [
        { icon: FaBehance, href: 'https://behance.net', label: 'Behance' },
        { icon: FaLinkedinIn, href: 'https://linkedin.com/in/omerfarukbozkurt', label: 'LinkedIn' },
        { icon: FaInstagram, href: 'https://instagram.com/ofbozkurt1', label: 'Instagram' },
        { icon: FaWhatsapp, href: 'https://wa.me/905xxxxxxxxx', label: 'WhatsApp' }
    ]

    return (
        <footer className="relative w-full py-12 md:py-20 overflow-hidden flex flex-col items-center justify-center text-center">

            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center translate-y-20">
                <div className="w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">

                {/* Main Headline - Single Line */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#F2F2F2] mb-3 tracking-tight leading-tight whitespace-nowrap">
                    {t('contact.title', 'HAYDİ BİRLİKTE TASARLAYALIM')}
                </h2>

                {/* Subtitle */}
                <p className="text-white/40 text-lg md:text-xl font-medium mb-8">
                    {t('contact.subtitle', 'Aklında bir proje mi var?')}
                </p>

                {/* Email Button - Hero Style */}
                <a
                    href={`mailto:${t('contact.email', 'hello@ofarukbozkurt.com')}`}
                    className="download-btn mb-8"
                >
                    <div className="btn-wrapper">
                        <div className="btn-text normal-case tracking-normal text-sm md:text-base">
                            {t('contact.email', 'hello@ofarukbozkurt.com')}
                        </div>
                        <span className="btn-icon">
                            {/* Mail Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </span>
                    </div>
                </a>

                {/* Social Icons */}
                <div className="flex items-center gap-6 mb-12">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 text-white/50 hover:text-white group"
                            aria-label={social.label}
                        >
                            <social.icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <p className="text-white/20 text-xs md:text-sm font-medium tracking-wide">
                    {t('contact.copyright', '© 2026 Ömer Faruk Bozkurt. Tüm hakları saklıdır.')}
                </p>
            </div>

            {/* Styles from Hero.jsx adapted for Footer */}
            <style>{`
                .download-btn {
                    --width: 280px;
                    --height: 54px;
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
                    cursor: pointer;
                }

                .btn-wrapper, .btn-text, .btn-icon {
                    overflow: hidden;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    color: #F2F2F2;
                }

                .btn-text {
                    top: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-weight: 500;
                }

                .btn-text, .btn-icon {
                    transition: top 0.4s ease;
                }

                .btn-icon {
                    color: #050505;
                    top: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .download-btn::before {
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

                .download-btn:hover {
                    border-color: #F2F2F2;
                }

                .download-btn:hover::before {
                    width: 350px;
                    height: 350px;
                }

                .download-btn:hover .btn-text {
                    top: -100%;
                }

                .download-btn:hover .btn-icon {
                    top: 0;
                }
                
                .download-btn:active {
                    transform: scale(0.98);
                }
            `}</style>
        </footer>
    )
}
