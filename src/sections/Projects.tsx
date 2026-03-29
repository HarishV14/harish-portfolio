import SectionWrapper from "@/components/SectionWrapper";

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <h2 className="mb-8 text-center text-primary">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="glass p-8 rounded-2xl h-64 flex items-center justify-center">
          <p>Project 1</p>
        </div>
        <div className="glass p-8 rounded-2xl h-64 flex items-center justify-center">
          <p>Project 2</p>
        </div>
        <div className="glass p-8 rounded-2xl h-64 flex items-center justify-center">
          <p>Project 3</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
