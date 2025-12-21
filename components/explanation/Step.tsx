import Benefit from '@/components/explanation/Benefit';
import Image from 'next/image';
import Link from 'next/link';

type StepVariant = 'first' | 'second';

interface StepProps {
  titleImage?: boolean;
  title: string;
  subtitle?: string;
  variant: StepVariant;
  benefits?: string[];
  description?: string;
  stepImage: string;
  ctaText?: string;
  ctaHref?: string;
}

const variantImageMap: Record<StepVariant, string> = {
  first: '/images/logo.svg',
  second: '/images/logo.svg',
};

const Step: React.FC<StepProps> = ({
  titleImage,
  title,
  subtitle,
  variant,
  benefits,
  description,
  stepImage,
  ctaText,
  ctaHref,
}) => {
  return (
    <article className="step flex flex-wrap items-center justify-center gap-16">
      {/* TEXT COLUMN */}
      <div className="sm:flex-2 flex min-w-[300px] flex-[1_1_300px] flex-col gap-1">
        {titleImage && (
          <Image
            src={variantImageMap[variant]}
            alt="Product image"
            width={240}
            height={240}
            className="h-15 w-full max-w-[200px]"
            loading="lazy"
            decoding="async"
          />
        )}

        <h2 className="text-(--secondary_color) text-3xl font-semibold">
          {title}
        </h2>

        {subtitle && <h6 className="text-lg">{subtitle}</h6>}

        <ul className="flex flex-col gap-4">
          {benefits?.map((benefit, index) => (
            <li key={index}>
              <Benefit text={benefit} />
            </li>
          ))}
        </ul>

        {description && <p className="text-sm">{description}</p>}

        {ctaHref && (
          <Link
            href={ctaHref}
            className="buttonStyles border-3 border-(--secondary_color)! hover:text-(--secondary_color)! mt-4"
          >
            {ctaText}
          </Link>
        )}
      </div>

      {/* IMAGE COLUMN */}
      <Image
        src={stepImage}
        alt="Collar preview"
        width={240}
        height={240}
        className="max-w-150 max-h-100 h-full w-full flex-[1_1_200px] object-contain sm:flex-1"
        loading="lazy"
        decoding="async"
      />
    </article>
  );
};

export default Step;
