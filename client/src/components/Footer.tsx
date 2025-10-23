import { Link } from "wouter";
import { Sparkles, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4 fade-in-up">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400 float" />
              <span className="text-xl font-bold text-white">SkillMarket</span>
            </div>
            <p className="text-sm text-gray-400">
              The modern marketplace for buying and selling real skills.
            </p>
          </div>

          <div className="fade-in-delay-1">
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm hover:text-purple-400 smooth-all underline-animate" data-testid="link-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm hover:text-purple-400 smooth-all underline-animate" data-testid="link-how-it-works">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-purple-400 smooth-all underline-animate" data-testid="link-faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="fade-in-delay-2">
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              <li className="text-sm hover:text-purple-400 smooth-all cursor-pointer">Design</li>
              <li className="text-sm hover:text-purple-400 smooth-all cursor-pointer">Programming</li>
              <li className="text-sm hover:text-purple-400 smooth-all cursor-pointer">Writing</li>
              <li className="text-sm hover:text-purple-400 smooth-all cursor-pointer">Marketing</li>
            </ul>
          </div>

          <div className="fade-in-delay-3">
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-md smooth-all scale-hover" aria-label="Twitter" data-testid="link-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-md smooth-all scale-hover" aria-label="GitHub" data-testid="link-github">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-md smooth-all scale-hover" aria-label="LinkedIn" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p className="fade-in-delay-3">&copy; {new Date().getFullYear()} SkillMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
