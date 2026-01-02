/**
 * Footer Component
 * Minimal footer with copyright and social links
 */

import { cn } from '../../utils/cn'

export default function Footer({ className }) {
    const currentYear = new Date().getFullYear()

    return (
        <footer
            className={cn(
                "container-padding py-12",
                "border-t border-accent/20",
                className
            )}
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="meta-wide text-dimGray">
                    © {currentYear} Faruk. All rights reserved.
                </p>

                <div className="flex items-center gap-6">
                    <a
                        href="#"
                        className="meta-wide text-dimGray hover:text-offWhite transition-colors"
                    >
                        Instagram
                    </a>
                    <a
                        href="#"
                        className="meta-wide text-dimGray hover:text-offWhite transition-colors"
                    >
                        Behance
                    </a>
                    <a
                        href="#"
                        className="meta-wide text-dimGray hover:text-offWhite transition-colors"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    )
}
