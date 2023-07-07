import { Logo, Next, GitHub } from "./Icons"
import Link from "next/link"
export default function Footer() {
    return (
        <footer className="flex footer">
            <div className="mx-auto max-w-7xl px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12">
                    <div className="col-span-1 lg:col-span-2">
                        <Link href="/" className="flex justify-center items-center gap-2">
                            <span>
                                <Logo />
                            </span>
                            <span>
                                Sneakers
                            </span>
                        </Link>
                    </div>
                    <div className="col-span-1 lg:col-span-7">
                        <div className="grid md:grid-rows-4 md:grid-columns-3 md:grid-flow-col">
                            <span className="py-3 md:py-0 md:pb-4"><Link href="/">Home</Link></span>
                            <span className="py-3 md:py-0 md:pb-4"><Link href="/about">About</Link></span>
                            <span className="py-3 md:py-0 md:pb-4"><Link href="/terms-of-use">Terms of use</Link></span>
                            <span className="py-3 md:py-0 md:pb-4"><Link href="/shipping">Shipping</Link></span>
                            <span className="py-3 md:py-0 md:pb-4"><Link href="/privacy-policy">Privacy Policy</Link></span>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-3">
                        <span>
                            <Link href="https://github.com/fedemerino/" target="_blank">
                                <GitHub />
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center text-accent-6 text-sm border-t border-zinc-400">
                    <div>
                        <span>
                            © 2023 Sneakers, Inc. All rights reserved.
                        </span>
                    </div>
                    <div className="flex items-center text-primary text-sm mt-0 justify-center">
                        <span className="mr-2">
                            Built with
                        </span>
                        <Next />
                    </div>
                </div>
            </div>
        </footer>
    )
}