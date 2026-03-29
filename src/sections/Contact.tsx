import SectionWrapper from "@/components/SectionWrapper";

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="pb-32">
      <h2 className="mb-8 text-center text-primary">Contact</h2>
      <div className="glass p-8 rounded-2xl max-w-2xl mx-auto text-center">
        <p className="text-xl mb-6">Let&apos;s build something great together.</p>
        <button className="px-8 py-3.5 text-base font-semibold text-white bg-primary hover:bg-primary-hover active:bg-primary-active rounded-md transition-all shadow-sm">
          Say Hello
        </button>
      </div>
    </SectionWrapper>
  );
}
