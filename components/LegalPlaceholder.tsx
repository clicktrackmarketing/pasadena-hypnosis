type Props = {
  title: string;
  intro: string;
  sections: string[];
};

/**
 * Placeholder legal pages. Final legal text for all three documents must
 * come from the practice's own counsel before launch — inventing binding
 * policy language here would be exactly the "plausible wrong answer" this
 * pipeline's invariants exist to prevent.
 * Owner: Jason's legal counsel. Due: before launch.
 */
export const LegalPlaceholder = ({ title, intro, sections }: Props) => {
  return (
    <div className="bg-white">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h1 className="font-heading text-3xl sm:text-4xl text-[#2E2F3D] mb-5">{title}</h1>
        <p className="text-base text-[#4B5468] leading-relaxed mb-8">{intro}</p>

        <div className="border border-dashed border-[#4B5468]/50 rounded-[12px] p-6 bg-[#E6EFFF] mb-10">
          <p className="text-sm text-[#2E2F3D] font-medium mb-1">Placeholder — not final legal text.</p>
          <p className="text-sm text-[#4B5468] leading-relaxed">
            Owner: Jason&apos;s legal counsel. Due: before launch. This section will be populated with reviewed,
            binding language rather than drafted here.
          </p>
        </div>

        <ol className="flex flex-col gap-3 mb-10 list-decimal list-inside text-[#2E2F3D]">
          {sections.map((s) => (
            <li key={s} className="font-medium">
              {s}
            </li>
          ))}
        </ol>

        <div className="border-t border-[#D7DEEA] pt-6">
          <p className="text-xs text-[#4B5468] leading-relaxed">
            Pasadena Hypnosis is a complementary hypnotherapy practice, not a substitute for medical or psychiatric
            care. Jason Meissner is a certified hypnotherapist, not a licensed medical or mental-health clinician.
          </p>
        </div>
      </div>
    </div>
  );
};
