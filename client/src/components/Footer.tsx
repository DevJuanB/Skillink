import { Link } from "wouter";
import { Sparkles, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold text-white">SkillMarket</span>
            </div>
            <p className="text-sm text-gray-400">
              The modern marketplace for buying and selling real skills.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm hover:text-purple-400 transition-colors" data-testid="link-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm hover:text-purple-400 transition-colors" data-testid="link-how-it-works">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-purple-400 transition-colors" data-testid="link-faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              <li className="text-sm">Design</li>
              <li className="text-sm">Programming</li>
              <li className="text-sm">Writing</li>
              <li className="text-sm">Marketing</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-md" aria-label="Twitter" data-testid="link-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-md" aria-label="GitHub" data-testid="link-github">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-md" aria-label="LinkedIn" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} SkillMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
