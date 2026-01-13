
import React from "react"
import { Link } from "react-router-dom"
import { Rocket, Users, MessageSquare, TrendingUp, Star, Sparkles, ArrowRight } from "lucide-react"
import HomePageMentor from "./Mentor/HomePageMentor"
import { userDataContext } from "../context/userContext"
import { SiTicktick } from "react-icons/si"
import { useContext } from "react"
import "../App.css"
const Button = React.forwardRef(({ children, size, variant, className, asChild = false, ...props }, ref) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-2 focus:ring-offset-[#070914] transition-all duration-300 relative overflow-hidden group"
  const sizeClasses = {
    lg: "px-8 py-4 text-base",
    md: "px-6 py-3 text-sm",
  }
  const variantClasses = {
    default: "bg-teal-500 text-white hover:bg-teal-600 hover:scale-105 hover:shadow-xl hover:shadow-teal-500/30",
    outline:
      "border-2 border-teal-400/60 text-teal-400 hover:bg-teal-400/10 backdrop-blur-sm hover:border-teal-400 hover:shadow-lg hover:shadow-teal-400/20",
    gradientPrimary:
      "bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:shadow-2xl hover:shadow-teal-500/40 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-teal-300 before:to-blue-400 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
    gradientSecondary:
      "bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105",
  }

  const classes = `${baseClasses} ${sizeClasses[size] || ""} ${className || ""} ${variant === "gradient-primary"
      ? variantClasses.gradientPrimary
      : variant === "gradient-secondary"
        ? variantClasses.gradientSecondary
        : variant === "outline"
          ? variantClasses.outline
          : variantClasses.default
    }`

  if (asChild) {
    return React.cloneElement(children, {
      className: `${classes} ${children.props.className || ""}`,
      ref,
      ...props,
    })
  }

  return (
    <button ref={ref} className={classes} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  )
})

const Card = ({ children, className }) => (
  <div
    className={`rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-teal-500/20 ${className}`}
  >
    {children}
  </div>
)

const CardContent = ({ children, className }) => <div className={`p-8 ${className}`}>{children}</div>

const HomePage = () => {
  const { userData } = useContext(userDataContext)
  const role = userData?.role

  if (role === "mentor") {
    return <HomePageMentor />
  }

  const features =  [
  {
    icon: Users,
    title: "Find Mentor",
    description: "Connect with experienced entrepreneurs and industry leaders tailored to your startup stage.",
  },
  {
    icon: MessageSquare,
    title: "Chat Live",
    description: "Have 1-on-1 conversations with mentors and founders to get real-time guidance.",
  },
  {
    icon: Users,
    title: "Founder Network",
    description: "Connect and exchange ideas with other startup, CEO, and CIO founders like you.",
  },
  {
    icon: TrendingUp,
    title: "Match Analysis",
    description: "Get smart mentor recommendations based on your goals, challenges, and startup needs.",
  },
]
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#070914] via-[#0a0f1e] to-[#070914] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
      ></div>

      {/* Page Content */}
      <div className="relative z-10">
        {/* Hero Section - Completely Redesigned */}
        <div className="pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Floating Badge with Animation */}
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500/10 to-blue-500/10 backdrop-blur-xl rounded-full border border-teal-400/30 shadow-lg hover:shadow-teal-400/40 transition-all duration-300 hover:scale-105 group">
                <Sparkles className="h-4 w-4 text-teal-400 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
                  Join the Hub for Innovative Minds
                </span>
                <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
            </div>

            {/* Hero Content - New Layout */}
            <div className="text-center max-w-5xl mx-auto">
              {/* Main Headline with Staggered Animation */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 animate-fade-in-up">
                <span className="block text-white/90 font-bold tracking-tight mb-2">Your Startup Journey</span>
                <span className="block bg-gradient-to-r from-teal-400 via-blue-400 to-teal-500 bg-clip-text text-transparent font-black animate-gradient bg-[length:200%_auto]">
                  Starts Here
                </span>
              </h1>

              {/* Subheadline with Better Typography */}
              <p className="text-xl md:text-2xl text-gray-300/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light animate-fade-in-up delay-100">
                Your complete platform to <span className="text-teal-400 font-semibold">launch</span>,{" "}
                <span className="text-blue-400 font-semibold">grow</span>, and{" "}
                <span className="text-teal-400 font-semibold">scale</span> your startup with expert guidance.
              </p>

              {/* CTA Buttons - Enhanced Design */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20 animate-fade-in-up delay-200">
                <Button
                  size="lg"
                  variant="gradient-primary"
                  asChild
                  className="font-semibold text-base shadow-2xl min-w-[220px]"
                >
                  <Link to="/dashboardProfile" className="flex items-center gap-2">
                    <Rocket className="h-5 w-5" />
                    Start Your Journey
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 hover:font-black transition-transform" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="font-semibold text-base min-w-[220px] bg-transparent"
                >
                  <Link to="/mentorsDashboard" className="flex items-center gap-2">
                    Explore Mentors
                    <Users className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </Link>
                </Button>
              </div>

              {/* Glassmorphic Feature Pills - Redesigned */}
              <div className="mt-24 animate-fade-in-up delay-300">
                <p className="text-gray-400 text-lg md:text-xl font-light mb-10 tracking-wide">
                  Working on your first startup?
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto">
                  {[
                    {
                      text: "Validate your idea",
                      color: "from-teal-500/20 to-blue-500/20",
                      borderColor: "border-teal-400/30",
                      iconColor: "text-teal-400",
                    },
                    {
                      text: "Find the right mentor",
                      color: "from-blue-500/20 to-purple-500/20",
                      borderColor: "border-blue-400/30",
                      iconColor: "text-blue-400",
                    },
                    {
                      text: "Avoid early mistakes",
                      color: "from-purple-500/20 to-pink-500/20",
                      borderColor: "border-purple-400/30",
                      iconColor: "text-purple-400",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`group px-6 py-4 backdrop-blur-xl rounded-2xl border ${item.borderColor} bg-gradient-to-r ${item.color} 
                        shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-opacity-60 
                        flex items-center gap-3 animate-fade-in-up cursor-default`}
                      style={{ animationDelay: `${400 + idx * 100}ms` }}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center border ${item.borderColor} 
                        group-hover:scale-110 transition-transform duration-300`}
                      >
                        <SiTicktick className={`text-sm ${item.iconColor}`} />
                      </div>
                      <span className="text-white/90 text-base font-medium tracking-wide">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-10 relative">
          {/* Section Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="absolute -top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl h-32bg-gradient-to-r from-transparent via-teal-400/25 to-transparent blur-3xl opacity-60 pointer-events-none">
                </span>


                <span className="relative block text-white/70 font-extrabold tracking-wide mb-2">
                  Everything You Need to
                </span>

                <span className="relative block bg-gradient-to-r from-teal-400 via-blue-400 to-teal-500 bg-clip-text text-transparent">
                  Succeed
                </span>
              </h2>

              <p className="text-xl text-gray-400/90 max-w-2xl mx-auto font-light leading-relaxed">
                From idea to IPO, we provide the tools, connections, and knowledge to help your startup thrive.
              </p>
            </div>

            {/* Feature Cards Grid - Completely Redesigned */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {features.map(({ icon: Icon, title, description }, idx) => (
                <Card
                  key={idx}
                  className="group relative overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Gradient Overlay on Hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-blue-500/0 to-teal-500/0 
                    group-hover:from-teal-500/10 group-hover:via-blue-500/10 group-hover:to-teal-500/10 
                    transition-all duration-700 rounded-3xl"
                  ></div>

                  <CardContent className="relative z-10 flex flex-col items-center text-center h-full">
                    {/* Icon Container with Glassmorphism */}
                    <div className="relative mb-6 group-hover:scale-110 transition-transform duration-500">
                      <div
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-blue-500/20 backdrop-blur-xl 
                        border border-white/10 flex items-center justify-center
                        group-hover:border-teal-400/50 group-hover:shadow-lg group-hover:shadow-teal-400/30 
                        transition-all duration-500 group-hover:rotate-3"
                      >
                        <Icon className="h-7 w-7 text-teal-400 group-hover:text-teal-300 transition-colors duration-300" />
                      </div>
                      {/* Glow Effect */}
                      <div
                        className="absolute inset-0 bg-teal-400/20 blur-xl rounded-full opacity-0 
                        group-hover:opacity-100 transition-opacity duration-500 -z-10"
                      ></div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-teal-300 transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Final CTA - Elevated Design */}
            <div className="text-center relative">
              <div className="inline-block relative group">
                {/* Glow effect behind button */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-teal-500/30 blur-2xl 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"
                ></div>

                <Button
                  size="lg"
                  variant="gradient-secondary"
                  asChild
                  className="font-semibold text-lg shadow-2xl relative z-10"
                >
                  <Link to="/foundersDashboard" className="flex items-center gap-2">
                    Get Started Today
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage