import SectionWrapper from "@/components/SectionWrapper";

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <h2 className="mb-8 text-center text-primary">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="glass p-8 rounded-2xl">
          <p className="text-center font-medium">Frontend</p>
        </div>
        <div className="glass p-8 rounded-2xl">
          <p className="text-center font-medium">Backend</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
