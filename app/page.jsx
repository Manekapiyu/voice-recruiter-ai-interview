"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaChartLine,
  FaCalendarCheck,
  FaPlayCircle,
} from "react-icons/fa";
import { ArrowBigLeft, ArrowBigRight, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fbff] font-sans text-gray-800">

      <Navbar />

      <HeroSection />

      <FeaturesSection />

      <HowItWorks />

      <CTASection />

      <Footer />
    </div>
  );
}


function Navbar() {
  return (
    <nav className="bg-[#03173e] border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto mt-2 px-6 flex justify-between items-center h-16">
        <div className="flex items-center mb-2 ml-2">
                  <Image src="/logo.png" alt="logo" width={85} height={85} />
                  <h1 className="text-2xl font-semibold tracking-wide ">
                    <span className="text-indigo-300">Inter</span>
                    <span className="text-blue-400">Vox</span>
                  </h1>
                </div>

        <div className="hidden md:flex gap-6 items-center">
          <a href="#features" className=" text-white hover:text-[#2663eb]">
            Features
          </a>
          <a href="#how-it-works" className=" text-white hover:text-[#2663eb]">
            How It Works
          </a>
          <a
            href="/dashboard"
            className="bg-[#2663eb] text-white px-7 flex py-2 rounded-lg hover:bg-[#1e40af] transition"
          >
            Dashboard<ArrowBigRight/>
          </a>
        </div>
      </div>
    </nav>
  );
}


function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-[#2663eb]/10 to-[#8fd6ff]/20 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-gray-900">
            Welcome to <span className="text-[#03173e] ">AI-Powered </span><span className="text-[#2663eb]">Interview Assistant</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 pr-8 ">
            Manage your interviews, analyze insights, and let AI simplify 
            your hiring journey — all in one intuitive workspace.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#2663eb] hover:bg-[#1e40af] text-white py-3 px-6 rounded-md font-medium transition">
              Create New Interview
            </button>
            <button className="flex items-center gap-2 border border-gray-300 py-3 px-6 rounded-md hover:bg-gray-50 transition">
              <FaPlayCircle className="text-[#2663eb]" />
              Watch Demo
            </button>
          </div>
        </motion.div>

       <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="md:w-1/2 flex justify-center relative"
>
  <motion.img
    src="Interview.avif"
    alt="AI Interview Illustration"
    className="rounded-2xl border-blue-50  shadow-[#022a79] hover:shadow-[0_0_45px_oklch(0.21_0.034_264.665)/0.8] transition-shadow duration-500"
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</motion.div>

      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <FaRobot className="text-3xl text-[#2663eb]" />,
      title: "AI-Powered Interviews",
      desc: "Let AI conduct structured, bias-free interview sessions automatically.",
    },
    {
      icon: <FaChartLine className="text-3xl text-[#1e40af]" />,
      title: "Smart Analytics",
      desc: "Visualize performance and compare candidate insights easily.",
    },
    {
      icon: <FaCalendarCheck className="text-3xl text-[#2663eb]" />,
      title: "Quick Scheduling",
      desc: "Manage interviews and reminders efficiently from one dashboard.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4 text-gray-900"
        >
          Dashboard Highlights
        </motion.h2>
        <p className="text-lg text-gray-600 mb-12">
          Everything you need to stay in control — simple, powerful, and smart.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-gradient-to-br from-[#eff6ff] to-[#f8fbff] border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Create Interview",
      desc: "Set up AI interviews with job-specific questions.",
    },
    {
      step: "2",
      title: "Invite Candidates",
      desc: "Share personalized links to start automated interviews.",
    },
    {
      step: "3",
      title: "Analyze Results",
      desc: "Review AI-based performance and feedback instantly.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#f8fbff]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          A simple three-step process to streamline your interview workflow.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 relative"
            >
              <div className="absolute -top-5 left-6 bg-[#2663eb] text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold shadow-md">
                {s.step}
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#2663eb] to-[#1e40af] text-white text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold mb-6">
          Empower Your Hiring with AI
        </h2>
        <p className="text-lg mb-8 text-blue-100">
          Take control of your interview process — smarter, faster, and
          effortless.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-[#1e40af] py-3 px-8 rounded-md font-medium hover:bg-gray-100 transition">
            Get Started
          </button>
          <button className="border border-white py-3 px-8 rounded-md font-medium hover:bg-[#1e40af]/70 transition">
            Learn More
          </button>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0f1b3d] text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">InterVox</h3>
          <p className="text-sm mt-2">
            © 2025 InterVox. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white text-sm">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white text-sm">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
