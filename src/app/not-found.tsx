import FuzzyText from "./components/FuzzyText";

export default function NotFoundPage() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden justify-center items-center gap-y-[15px]">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover={true}
        fontSize="clamp(1.5rem, 8vw, 8rem)"
      >
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover={true}
        fontSize="clamp(1rem, 3vw, 3rem)"
      >
        Không tìm thấy
      </FuzzyText>
    </div>
  );
}
