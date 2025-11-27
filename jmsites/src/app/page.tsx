"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Moon, Sun, ArrowRight, Calendar, CheckCircle2, Zap, Sparkles, Star } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:to-black">
        {/* Dark mode toggle */}
        <div className="fixed top-6 right-6 z-50">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 transition-all"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
        </div>

        {/* HERO */}
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-6" variant="secondary">Premium Web Design Studio</Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Websites That Turn Visitors<br />Into Paying Customers
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Fast • SEO-Optimized • Conversion-Focused<br />
              Hand-crafted in 10 days or less — starting at $3,000
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="text-lg px-10 py-7 shadow-2xl">
                <a href="https://calendly.com/https://calendly.com/jess-manning-dev/new-meeting" target="_blank">
                  <Calendar className="mr-2" /> Book Free Discovery Call
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-7">
                See Live Projects <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* RECENT WINS */}
        <section className="py-20 px-6 bg-white/50 dark:bg-black/30">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16">Recent Client Wins</h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { name: "Ibiza Cleaning Co.", result: "3× bookings in first month", badge: "+240% leads", color: "from-purple-500 to-pink-500" },
                { name: "Family Smiles Dental", result: "47 new patients in 30 days", badge: "+400% ROI", color: "from-blue-500 to-cyan-500" },
                { name: "Elite Coaching Brand", result: "$10k+ programs sold via site", badge: "100 Lighthouse", color: "from-emerald-500 to-teal-500" },
              ].map((project) => (
                <Card key={project.name} className="p-8 hover:shadow-2xl transition-all">
                  <div className={`bg-gradient-to-r ${project.color} rounded-xl h-48 mb-6`} />
                  <h3 className="text-2xl font-bold">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-3">{project.result}</p>
                  <Badge className="mt-6" variant="default">{project.badge}</Badge>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING TIERS */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Simple, Transparent Pricing</h2>
            <div className="grid md:grid-cols-3 gap-10 mt-20">
              {[
                { name: "Starter", price: "$3,000", popular: false, features: ["5-page site", "Mobile responsive", "Basic SEO", "1 round revisions"] },
                { name: "Growth ← Most Popular", price: "$8,000", popular: true, features: ["10+ pages", "Advanced SEO", "Lead capture forms", "Google Analytics", "2 rounds revisions"] },
                { name: "Elite", price: "$15,000+", popular: false, features: ["Custom design", "E-commerce / booking", "Full SEO + speed optimization", "Ongoing support", "Unlimited revisions"] },
              ].map((tier) => (
                <Card key={tier.name} className={`p-10 relative ${tier.popular ? "ring-4 ring-purple-600 shadow-2xl scale-105" : ""}`}>
                  {tier.popular && <Badge className="absolute -top-4 left-1/2 -translate-x-1/2">MOST POPULAR</Badge>}
                  <h3 className="text-3xl font-bold">{tier.name}</h3>
                  <p className="text-5xl font-bold mt-6">{tier.price}</p>
                  <ul className="mt-10 space-y-4 text-left">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className="mt-10 w-full">
                    <a href="https://calendly.com/https://calendly.com/jess-manning-dev/new-meeting" target="_blank">
                      Get Started
                    </a>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 px-6 text-center bg-gradient-to-t from-purple-600/10">
          <div className="max-w-4xl mx-auto">
            <Sparkles className="w-20 h-20 mx-auto mb-8 text-purple-600" />
            <h2 className="text-5xl md:text-7xl font-bold">Ready to 10× Your Business?</h2>
            <p className="mt-8 text-2xl text-gray-600 dark:text-gray-300">
              Only 3 spots left this month
            </p>
            <Button asChild size="lg" className="mt-12 text-2xl px-16 py-8 shadow-2xl">
              <a href="https://calendly.com/https://calendly.com/jess-manning-dev/new-meeting" target="_blank">
                <Zap className="mr-4" /> Claim Your Free 15-min Call Now
              </a>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}