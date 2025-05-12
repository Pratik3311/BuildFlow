import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export default function BuildFlowLanding() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 ">
     
      
      
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <a href="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="M7 21h10" />
                <path d="M12 3v18" />
                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
              </svg>
              <span className="inline-block font-bold">BuildFlow</span>
            </a>
            <nav className="hidden gap-6 md:flex">
            
              <a
                href="#templates"
                className="flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
              >
                Templates
              </a>
              <a
                href="#how-it-works"
                className="flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
              >
                How It Works
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              
              <Link
                to="/builder"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-20 pt-6 md:pb-32 md:pt-10 lg:pb-40 lg:pt-32">
          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10">
            {/* Animated grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 0, 255, 0.15) 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            ></div>

            {/* Animated floating shapes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [0.8, 1.1, 0.8],
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1.2, 0.8],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-pink-400/20 to-blue-400/20 blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [0.8, 1.3, 0.8],
                x: [0, 50, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-purple-400/20 to-cyan-400/20 blur-3xl"
            />

            {/* Animated particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-blue-600/40"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    scale: Math.random() * 0.5 + 0.5,
                  }}
                  animate={{
                    y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: Math.random() * 20 + 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Animated wave */}
            <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
                style={{
                  maskImage:
                    "url(\"data:image/svg+xml,%3Csvg width='1200' height='120' viewBox='0 0 1200 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L50 20C100 40 200 80 300 80C400 80 500 40 600 20C700 0 800 0 900 20C1000 40 1100 80 1150 100L1200 120V120H0V0Z' fill='black'/%3E%3C/svg%3E%0A\")",
                  maskSize: "100% 100%",
                  WebkitMaskImage:
                    "url(\"data:image/svg+xml,%3Csvg width='1200' height='120' viewBox='0 0 1200 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L50 20C100 40 200 80 300 80C400 80 500 40 600 20C700 0 800 0 900 20C1000 40 1100 80 1150 100L1200 120V120H0V0Z' fill='black'/%3E%3C/svg%3E%0A\")",
                  WebkitMaskSize: "100% 100%",
                }}
                animate={{
                  x: [0, -1000, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-pink-500/10 via-blue-500/10 to-purple-500/10"
                style={{
                  maskImage:
                    "url(\"data:image/svg+xml,%3Csvg width='1200' height='120' viewBox='0 0 1200 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 120L50 100C100 80 200 40 300 40C400 40 500 80 600 100C700 120 800 120 900 100C1000 80 1100 40 1150 20L1200 0V120H0V120Z' fill='black'/%3E%3C/svg%3E%0A\")",
                  maskSize: "100% 100%",
                  WebkitMaskImage:
                    "url(\"data:image/svg+xml,%3Csvg width='1200' height='120' viewBox='0 0 1200 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 120L50 100C100 80 200 40 300 40C400 40 500 80 600 100C700 120 800 120 900 100C1000 80 1100 40 1150 20L1200 0V120H0V120Z' fill='black'/%3E%3C/svg%3E%0A\")",
                  WebkitMaskSize: "100% 100%",
                }}
                animate={{
                  x: [0, 1000, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </div>

          <div className="container mx-auto px-4 relative flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-blue-600/10 px-4 py-1.5 text-sm font-medium text-blue-600"
            >
              Introducing BuildFlow 1.0
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Build websites with{" "}
              <motion.span
                className="text-blue-600 relative inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.span
                  className="absolute -inset-1 rounded-lg bg-blue-600/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                ></motion.span>
                <motion.span className="relative">drag & drop</motion.span>
              </motion.span>{" "}
              simplicity
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[42rem] leading-normal text-gray-500 sm:text-xl sm:leading-8"
            >
              Create stunning, responsive websites in minutes without writing a single line of code. Our intuitive
              drag-and-drop builder makes web design accessible to everyone.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-x-4"
            >
              <Link
                to="/builder"
                className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
              >
                Start Building Free
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
              >
                View Templates
              </a>
            </motion.div>

            {/* Animated cursor with element */}
            <motion.div
              className="relative mt-16 w-full max-w-3xl h-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.div
                className="absolute h-6 w-6 rounded-full bg-blue-600/80 shadow-lg shadow-blue-600/20"
                initial={{ x: "10%", y: "0%" }}
                animate={{
                  x: ["10%", "60%", "30%", "80%", "10%"],
                  y: ["0%", "50%", "100%", "50%", "0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-white"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>

              <motion.div
                className="absolute rounded-md border border-dashed border-blue-600/40 bg-blue-600/5 px-3 py-2 text-sm font-medium"
                initial={{ x: "15%", y: "0%", opacity: 0 }}
                animate={{
                  x: ["15%", "65%", "35%", "85%", "15%"],
                  y: ["0%", "50%", "100%", "50%", "0%"],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  opacity: {
                    duration: 8,
                    times: [0, 0.1, 0.8, 0.9, 1],
                    repeat: Infinity,
                  },
                }}
              >
                Drag elements anywhere
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Start with beautiful templates
              </h2>
              <p className="max-w-[85%] leading-normal text-gray-500 sm:text-lg sm:leading-7">
                Choose from hundreds of professionally designed templates and customize them to fit your brand.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template, index) => (
                <motion.div
                  key={template.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <div className="h-full w-full bg-gray-200"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{template.title}</h3>
                    <p className="text-sm text-gray-500">{template.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-500">{template.category}</div>
                      <a
                        href="#"
                        className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-blue-600"
                      >
                        Preview
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-1 h-4 w-4"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
              >
                Browse All Templates
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-gray-50 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid gap-6 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm">How It Works</div>
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
                  Build your website in three simple steps
                </h2>
                <ul className="grid gap-6">
                  {steps.map((step, index) => (
                    <motion.li
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold">{step.title}</h3>
                        <p className="text-gray-500">{step.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mx-auto aspect-video w-full overflow-hidden rounded-xl bg-gray-200 object-cover sm:w-full lg:order-last"
              >
                <div className="h-full w-full bg-gray-300"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Share Your Design Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 via-white to-blue-600/5 py-16 md:py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
          />
          <div className="container mx-auto px-4 relative">
            <div className="mx-auto grid gap-8 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
              >
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Share your design</h3>
                </div>
                <div className="space-y-4">
                  <div className="rounded-md border border-gray-200 bg-gray-100/30 p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                      <div className="flex-1">
                        <div className="h-2.5 w-24 rounded-full bg-gray-200" />
                        <div className="mt-1 h-2 w-32 rounded-full bg-gray-200" />
                      </div>
                    </div>
                    <div className="mt-3 h-24 rounded bg-gray-200" />
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-gray-200 p-2">
                    <div className="flex-1 truncate text-sm text-gray-500">
                      https://buildflow.app/share/project-123456
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 text-sm text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-green-500"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>Link copied to clipboard!</span>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="inline-block rounded-lg bg-blue-600/10 px-3 py-1 text-sm text-blue-600">
                  Collaboration Made Easy
                </div>
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
                  Share your designs with a single link
                </h2>
                <p className="text-gray-500">
                  Generate shareable links to your projects and collaborate with team members, clients, or stakeholders.
                  No account needed for viewers.
                </p>
                <ul className="space-y-2">
                  {[
                    "Generate unique shareable links in one click",
                    "Control access with password protection",
                    "Collect feedback directly on your designs",
                    "Track who viewed your shared projects",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-blue-600"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href="#"
                    className="mt-2 inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
                  >
                    Try Sharing Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-4 w-4"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mx-auto max-w-[58rem] rounded-2xl bg-blue-600 p-8 text-center text-white md:p-12 lg:p-16"
            >
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
                Ready to start building?
              </h2>
              <p className="mt-4 text-lg text-white/80 sm:text-xl">
                Join thousands of creators and businesses building with BuildFlow today.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  to="/builder"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-blue-600 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                >
                  Start Building Free
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                >
                  Schedule a Demo
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Template data
const templates = [
  {
    title: "Business Pro",
    description: "Perfect for small businesses and startups",
    category: "Business",
  },
  {
    title: "E-commerce Plus",
    description: "Complete online store with product pages",
    category: "E-commerce",
  },
  {
    title: "Portfolio Minimal",
    description: "Showcase your work with elegant simplicity",
    category: "Portfolio",
  },
  {
    title: "Blog Standard",
    description: "Beautiful layouts for content creators",
    category: "Blog",
  },
  {
    title: "Landing Page Pro",
    description: "High-converting landing page template",
    category: "Marketing",
  },
  {
    title: "Restaurant Special",
    description: "Showcase menus and reservation systems",
    category: "Food & Beverage",
  },
];

// Steps data
const steps = [
  {
    title: "Choose a template",
    description: "Start with one of our professionally designed templates or begin from scratch.",
  },
  {
    title: "Customize with drag & drop",
    description: "Add your content, change colors, fonts, and layout with our visual editor.",
  },
  {
    title: "Publish your website",
    description: "Preview your site and publish it to your custom domain with one click.",
  },
];