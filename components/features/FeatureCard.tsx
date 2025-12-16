import Image from "next/image";

type featureTypes = {
  title: string;
  description: string;
  imageSrc: string;
};

const FeatureCard = ({ title, description, imageSrc }: featureTypes) => (
  <div className="flex flex-col rounded border border-black/15 bg-white p-6">
    <Image
      src={imageSrc}
      alt={title}
      width={300}
      height={200}
      className="mb-4 w-full rounded object-cover"
    />
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
);

export default FeatureCard
