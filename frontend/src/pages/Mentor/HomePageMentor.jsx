import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Rocket, Users, BookOpen, MessageSquare, TrendingUp, Star, Sparkles, ArrowRight } from "lucide-react";
import "../../App.css"
const Button = forwardRef(({ children, size, variant, className, asChild = false, ...props }, ref) => {
  //only design part nothing else
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300";
  const sizeClasses = {
    lg: "px-8 py-4 text-lg",
    md: "px-6 py-3 text-base",
  };
  const variantClasses = {
    default: "bg-teal-500 text-white hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/25",
    outline: "border-2 border-teal-400/50 text-teal-400 hover:bg-teal-400/10 hover:border-teal-400 backdrop-blur-sm",
    gradientPrimary:
      "bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-white hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02]",
    gradientSecondary:
      "bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400 text-white hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02]",
  };

  const classes = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${className || ""} ${
    variant === "gradient-primary"
      ? variantClasses.gradientPrimary
      : variant === "gradient-secondary"
      ? variantClasses.gradientSecondary
      : variant === "outline"
      ? variantClasses.outline
      : variantClasses.default
  }`;

  if (asChild) {
    return React.cloneElement(children, {
      className: `${classes} ${children.props.className || ""}`,
      ref,
      ...props,
    });
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

// Card Components
const Card = ({ children, className }) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 hover:scale-[1.02] hover:border-white/20 ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className }) => <div className={`p-8 ${className}`}>{children}</div>;

// HomePageMentor Component
const HomePageMentor = () => {
  const features =  [
  {
    icon: Users,
    title: "Connect with Startups",
    description: "Find passionate founders and startups looking for guidance and mentorship.",
  },
  {
    icon: BookOpen,
    title: "Share Expertise",
    description: "Provide valuable insights, templates, and strategies to help startups grow.",
  },
  {
    icon: MessageSquare,
    title: "Engage in Conversations",
    description: "Have meaningful discussions with founders and fellow mentors in your network.",
  },
 {
  icon: TrendingUp,
  title: "Mentorship Impact",
  description: "Monitor how your guidance helps startups grow and achieve their goals.",
}
];


  const impacts = [
    { number: "5+", label: "Founders Unblocked" },
    { number: "10–15", label: "Jobs Impacted" },
    { number: "1", label: "Startup Progressed" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#070914] via-[#0a0f1e] to-[#0d1117] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Floating Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Page Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-20 pb-24 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-lg mb-10 hover:scale-105 transition-transform duration-300 group">
              <div className="w-2 h-2 bg-teal-400 rounded-full mr-3 animate-pulse" />
              <Star className="h-4 w-4 text-teal-400 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm font-semibold text-white/90">Turn Your Insights into Real-World Impact</span>
              <Sparkles className="h-4 w-4 text-cyan-400 ml-2 group-hover:-rotate-12 transition-transform duration-300" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="inline-block hover:scale-105 transition-transform duration-300">Empower the Next Generation</span>
              <br />
              <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent font-extrabold inline-block hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                With Your Expertise
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
              StartUp Saathi is your platform to connect with aspiring entrepreneurs. Share your experience, guide promising startups, and shape the future of innovation.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
              <Button size="lg" variant="gradient-primary" asChild className="font-semibold group">
                <Link to="/dashboardProfile" className="flex items-center">
                  <Rocket className="h-5 w-5 mr-2 group-hover:translate-x-[-4px] transition-transform duration-300" />
                  Become a Mentor
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild className="font-semibold bg-transparent">
                <Link to="/foundersDashboard">Explore Startups</Link>
              </Button>
            </div>

            {/* Impact Cards */}
            <div className="mt-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Your <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">1 Hour</span> of Mentorship
                <br className="hidden sm:block" /> Can Create Real Impact
              </h2>

              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {impacts.map((impact, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Card className="relative h-full">
                      <CardContent className="text-center py-10">
                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent mb-3 hover:scale-110 transition-transform duration-300">
                          {impact.number}
                        </div>
                        <p className="text-sm md:text-base text-white/60 font-medium">{impact.label}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              <p className="text-sm text-white/40 text-center mt-8 max-w-md mx-auto leading-relaxed">
                One honest conversation can change a startup's direction.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Help Startups{" "}
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent font-extrabold drop-shadow-[0_0_25px_rgba(6,182,212,0.25)]">
                Succeed
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12">
              Your experience is invaluable. Collaborate, mentor, and make a real impact in the startup ecosystem.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map(({ icon: Icon, title, description }, idx) => (
                <Card key={idx} className="group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-teal-500/10 group-hover:via-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
                  <CardContent className="text-center relative">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/25">
                      <Icon className="h-7 w-7 text-teal-400 group-hover:text-cyan-300 transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-teal-300 transition-colors duration-300">{title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center mt-16">
              <Button size="lg" variant="gradient-secondary" asChild className="font-semibold group">
                <Link to="/mentorsDashboard" className="flex items-center">
                  Start Mentoring
                  <TrendingUp className="h-5 w-5 ml-2 group-hover:translate-y-[-3px] transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageMentor;
