const skills = [
  { name: "React Native / Expo", level: 90 },
  { name: "Android (Java)", level: 85 },
  { name: "REST API Integration", level: 88 },
  { name: "Full-Stack Development", level: 75 },
  { name: "Git Version Control", level: 85 },
  { name: "Database Management", level: 80 },
];

const softSkills = [
  "Leadership",
  "Team Collaboration",
  "Problem-Solving",
  "Effective Communication",
  "Adaptability",
  "Time Management",
];

const Skills = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border-4 border-primary/20 rounded-full" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/10 rounded-2xl rotate-12" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">My Skills</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Technical Expertise
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div className="bg-background rounded-3xl p-8 shadow-card">
            <h3 className="text-xl font-bold text-foreground mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-primary font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="gradient-primary h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-background rounded-3xl p-8 shadow-card">
            <h3 className="text-xl font-bold text-foreground mb-6">Soft Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-muted rounded-2xl p-4 text-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 group-hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                    <span className="text-2xl">{["👑", "🤝", "🧩", "💬", "🔄", "⏰"][index]}</span>
                  </div>
                  <span className="font-medium text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Icons */}
        <div className="mt-16">
          <h3 className="text-center text-lg font-semibold text-muted-foreground mb-8">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {["React Native", "Java", "TypeScript", "Node.js", "Git", "REST API", "XML/JSON", "Expo"].map((tech, index) => (
              <div
                key={index}
                className="bg-background px-6 py-3 rounded-full shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <span className="font-medium text-foreground">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
