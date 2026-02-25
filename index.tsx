import { useState } from "react";
import { BookOpen, GraduationCap, FileText, StickyNote, ClipboardList, ChevronRight, ArrowLeft } from "lucide-react";
import SubjectCard from "@/components/SubjectCard";

const subjects = [
  { name: "English", icon: "📖", color: "hsl(340, 65%, 50%)" },
  { name: "Hindi", icon: "📝", color: "hsl(25, 90%, 55%)" },
  { name: "Science (NCERT CBSE)", icon: "🔬", color: "hsl(160, 60%, 42%)" },
  { name: "Mathematics", icon: "📐", color: "hsl(230, 70%, 55%)" },
  { name: "Social Science", icon: "🌍", color: "hsl(270, 55%, 50%)" },
];

type Category = "pyqs" | "sample-papers" | "notes";

const categories: { id: Category; label: string; icon: React.ElementType; description: string }[] = [
  { id: "pyqs", label: "Previous Year Questions", icon: ClipboardList, description: "Solve PYQs to understand exam patterns" },
  { id: "sample-papers", label: "Sample Papers", icon: FileText, description: "Practice with model question papers" },
  { id: "notes", label: "Notes", icon: StickyNote, description: "Chapter-wise revision notes" },
];

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const activeSubject = subjects.find((s) => s.name === selectedSubject);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 max-w-6xl">
          <button
            onClick={() => { setSelectedSubject(null); setSelectedCategory(null); }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <GraduationCap className="w-7 h-7 text-accent" />
            <span className="text-xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ZENVORN
            </span>
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-medium text-xs">
              Class 9 Finals
            </span>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      {selectedSubject && (
        <div className="container mx-auto px-4 max-w-6xl pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button onClick={() => { setSelectedSubject(null); setSelectedCategory(null); }} className="hover:text-foreground transition-colors">
              Subjects
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button
              onClick={() => setSelectedCategory(null)}
              className="hover:text-foreground transition-colors"
              style={{ color: activeSubject?.color }}
            >
              {selectedSubject}
            </button>
            {selectedCategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-foreground font-medium">
                  {categories.find((c) => c.id === selectedCategory)?.label}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20 max-w-6xl flex-1">
        {/* --- VIEW 1: Subject Selection --- */}
        {!selectedSubject && (
          <>
            <section className="pt-16 pb-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent-foreground text-xs font-medium mb-6 border border-accent/20">
                <BookOpen className="w-3.5 h-3.5" />
                Finals 2025 — Study Material
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
                Choose Your <span className="text-gradient">Subject</span>
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto text-base">
                Select a subject to access PYQs, sample papers, and notes.
              </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {subjects.map((subject, idx) => (
                <button
                  key={subject.name}
                  onClick={() => setSelectedSubject(subject.name)}
                  className="opacity-0 animate-fade-in card-hover group text-left rounded-xl border border-border bg-card p-4 sm:p-6 flex items-center gap-3 sm:gap-4 transition-all active:scale-[0.98]"
                  style={{ animationDelay: `${idx * 70}ms` }}
                >
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${subject.color}15` }}
                  >
                    {subject.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-card-foreground truncate">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      PYQs · Sample Papers · Notes
                    </p>
                  </div>
                  <ChevronRight
                    className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0"
                    style={{ color: subject.color }}
                  />
                </button>
              ))}
            </div>
          </>
        )}

        {/* --- VIEW 2: Category Selection --- */}
        {selectedSubject && !selectedCategory && activeSubject && (
          <section className="pt-10">
            <button
              onClick={() => setSelectedSubject(null)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to subjects
            </button>

            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                style={{ backgroundColor: `${activeSubject.color}15` }}
              >
                {activeSubject.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{activeSubject.name}</h2>
                <p className="text-sm text-muted-foreground">Select a category</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="opacity-0 animate-fade-in card-hover group text-left rounded-xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-transparent active:scale-[0.98]"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${activeSubject.color}12` }}
                  >
                    <cat.icon className="w-5 h-5" style={{ color: activeSubject.color }} />
                  </div>
                  <h3 className="text-base font-semibold text-card-foreground mb-1">{cat.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cat.description}</p>
                  <div
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all"
                    style={{ color: activeSubject.color }}
                  >
                    Browse <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* --- VIEW 3: Papers / Notes listing --- */}
        {selectedSubject && selectedCategory && activeSubject && (
          <section className="pt-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {activeSubject.name}
            </button>

            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${activeSubject.color}12` }}
              >
                {(() => {
                  const Icon = categories.find((c) => c.id === selectedCategory)!.icon;
                  return <Icon className="w-5 h-5" style={{ color: activeSubject.color }} />;
                })()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {activeSubject.name} — {categories.find((c) => c.id === selectedCategory)?.label}
                </h2>
                <p className="text-xs text-muted-foreground">Add files to populate this section</p>
              </div>
            </div>

            <SubjectCard
              name={activeSubject.name}
              icon={activeSubject.icon}
              color={activeSubject.color}
              papers={[]}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground space-y-1">
        <p>Website made by Zenvorn</p>
        <p>© 2025 ZENVORN. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
