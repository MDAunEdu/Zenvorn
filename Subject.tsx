import { FileText, Download } from "lucide-react";

interface Paper {
  title: string;
  year: string;
  downloadUrl?: string;
}

interface SubjectCardProps {
  name: string;
  icon: string;
  color: string;
  papers: Paper[];
}

const SubjectCard = ({ name, icon, color, papers }: SubjectCardProps) => {
  return (
    <div className="card-hover rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-5 flex items-center gap-3"
        style={{ borderBottom: `3px solid ${color}` }}
      >
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold tracking-tight text-card-foreground">
          {name}
        </h3>
        <span
          className="ml-auto text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ backgroundColor: `${color}18`, color }}
        >
          {papers.length} papers
        </span>
      </div>

      {/* Paper List */}
      <div className="divide-y divide-border">
        {papers.length === 0 ? (
          <div className="px-6 py-8 text-center text-muted-foreground text-sm">
            Papers coming soon...
          </div>
        ) : (
          papers.map((paper, idx) => (
            <div
              key={idx}
              className="px-4 sm:px-6 py-3.5 flex items-center gap-3 hover:bg-muted/50 active:bg-muted/70 transition-colors group"
            >
              <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">
                  {paper.title}
                </p>
                <p className="text-xs text-muted-foreground">{paper.year}</p>
              </div>
              {paper.downloadUrl && (
                <a
                  href={paper.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-secondary"
                  style={{ color }}
                >
                  <Download className="w-4 h-4" />
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubjectCard;
