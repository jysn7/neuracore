import React from "react";
import {
  Lightbulb,
  ClipboardList,
  Scale,
  UploadCloud,
  CheckCircle2,
  Rocket,
  Code,
  Users,
} from "lucide-react";

interface ChallengeContentProps {
  activeTab: string;
}

const ChallengeContent: React.FC<ChallengeContentProps> = ({ activeTab }) => {
  // ───────────────────────────────────────────────
  // Content data (can be fetched or passed as props)
  // ───────────────────────────────────────────────
  const overview = `
  Design an AI solution to improve patient care and reduce hospital wait times.
  We're looking for innovative approaches that leverage machine learning and
  natural language processing to create a seamless patient experience.
  `;

  const requirements = [
    {
      title: "Prototype Submission",
      desc: "Submit a working prototype showcasing your AI-powered healthcare solution. It should demonstrate real data flow, even if simulated.",
      icon: <Code size={16} />,
    },
    {
      title: "Documentation",
      desc: "Provide a concise technical document explaining your architecture, algorithms used, and deployment strategy.",
      icon: <ClipboardList size={16} />,
    },
    {
      title: "Presentation Video",
      desc: "Include a short (max 5-minute) video explaining your concept, workflow, and value proposition.",
      icon: <Users size={16} />,
    },
  ];

  const judgingCriteria = [
    {
      title: "Innovation & Creativity",
      desc: "How unique and groundbreaking is the approach? Does it push the boundaries of AI in healthcare?",
      icon: <Lightbulb size={16} />,
    },
    {
      title: "Technical Complexity",
      desc: "Depth of the solution — model accuracy, optimization, and engineering excellence are key factors.",
      icon: <Scale size={16} />,
    },
    {
      title: "User Experience & Design",
      desc: "Is the interface intuitive? Does it make the healthcare workflow easier and more human-centered?",
      icon: <CheckCircle2 size={16} />,
    },
    {
      title: "Scalability & Impact",
      desc: "Can this solution handle real-world medical data and scale to multiple facilities effectively?",
      icon: <Rocket size={16} />,
    },
  ];

  const submissions = [
    {
      title: "Deadline",
      desc: "Submit your project before **15 Nov 2025, 23:59 SAST**. Late submissions will not be accepted.",
      icon: <UploadCloud size={16} />,
    },
    {
      title: "Required Materials",
      desc: "Each submission must include a source code link (GitHub/GitLab), a demo video, and a PDF documentation file.",
      icon: <ClipboardList size={16} />,
    },
    {
      title: "Submission Portal",
      desc: "All entries must be uploaded through the official HealthTech Challenge Portal.",
      icon: <UploadCloud size={16} />,
    },
  ];

  // ───────────────────────────────────────────────
  // Render based on tab
  // ───────────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="space-y-4">
            <p className="text-sm text-text-secondary tracking-wider leading-relaxed">
              {overview}
            </p>

            <h3 className="text-sm font-semibold text-text-primary mt-6 mb-2">
              Objectives
            </h3>
            <ul className="pl-4 list-disc text-text-secondary text-sm space-y-1">
              <li>
                Implement ML models for patient triage and care prioritization.
              </li>
              <li>
                Integrate NLP for virtual symptom assessment and patient
                interaction.
              </li>
              <li>
                Enhance hospital workflow efficiency using predictive analytics.
              </li>
              <li>
                Ensure compliance with data security and patient privacy
                standards.
              </li>
            </ul>
          </div>
        );

      case "Requirements":
        return (
          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            {requirements.map((item, i) => (
              <div
                key={i}
                className="border border-border-secondary bg-bg-light/10 rounded-lg p-4 flex gap-3 items-start hover:border-border-primary transition"
              >
                <div className="text-text-primary mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-text-primary text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      case "Judging Criteria":
        return (
          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            {judgingCriteria.map((criterion, i) => (
              <div
                key={i}
                className="border border-border-secondary bg-bg-light/10 rounded-lg p-4 flex gap-3 items-start hover:border-border-primary transition"
              >
                <div className="text-text-primary mt-1">{criterion.icon}</div>
                <div>
                  <h4 className="font-semibold text-text-primary text-sm">
                    {criterion.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    {criterion.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      case "Submissions":
        return (
          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            {submissions.map((step, i) => (
              <div
                key={i}
                className="border border-border-secondary bg-bg-light/10 rounded-lg p-4 flex gap-3 items-start hover:border-border-primary transition"
              >
                <div className="text-text-primary mt-1">{step.icon}</div>
                <div>
                  <h4 className="font-semibold text-text-primary text-sm">
                    {step.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-bg-dark border my-6 rounded-lg p-6 border-border-secondary transition-all duration-300">
      <h1 className="text-text-primary font-bold mb-6 tracking-wide text-lg border-b border-border-secondary pb-2">
        {activeTab}
      </h1>
      {renderContent()}
    </div>
  );
};

export default ChallengeContent;
