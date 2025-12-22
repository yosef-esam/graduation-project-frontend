import CardSwap, { Card } from '@/components/ui/CardSwap';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa';

const Articles = () => {
  return (
    <section
      id="articles"
      className="relative isolate flex min-h-180 xs:min-h-190 md:min-h-210 xl:min-h-175  flex-col items-center justify-center"
    >
      <div className="absolute isolate flex h-full  w-full grow flex-col items-center justify-center">
        <article className="container flex flex-col text-balance py-20">
          <Image
            src="/images/logo.svg"
            alt="Farm AI Logo"
            width={200}
            height={100}
            className="max-w-50 h-auto w-full brightness-0"
          />
          <h2 className="text-(--secondary_color)  lg:max-w-1/2  xl:max-w-full  text-4xl font-semibold">
            Smart Farming Insights & Articles
          </h2>

          <p className="my-4 md:max-w-2xl md:max-2xl:max-w-1/2">
            Explore expert articles from <strong>Farm IQ</strong> covering
            precision agriculture, data-driven decision making, and modern
            farming techniques. Learn how technology is transforming crop
            management, irrigation, and productivity across farms of all sizes.
          </p>

          <Link
            href="#"
            className="buttonStyles border-3 border-(--secondary_color)! hover:text-(--secondary_color)! w-fit"
          >
            Explore All Articles
          </Link>
        </article>
        <figure className="relative min-h-40 xs:min-h-50 xl:min-h-0 mb-70 xs:mb-20 ml-auto mr-40  text-white">
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={4000}
            pauseOnHover={true}
          >
            {/* Card 1 */}
            <Card overlayImage="/images/landingPage/overlay.png">
              <div className="flex h-full flex-1 flex-col gap-2">
                <h3 className="text-xl">Precision Agriculture Explained</h3>
                <p className="opacity-80">
                  Learn how sensors, satellite data, and analytics help farmers
                  optimize crop yield while reducing water and fertilizer waste.
                </p>
                <span className="hover:scale-120 bg-(--secondary_color) absolute inset-0 m-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full p-2 text-3xl text-white duration-200">
                  <FaPlay />
                </span>
              </div>
            </Card>

            {/* Card 2 */}
            <Card overlayImage="/images/landingPage/hero.jpg">
              <div className="flex h-full flex-1 flex-col gap-2">
                <h3 className="text-xl">Using Data to Improve Crop Health</h3>
                <p className="opacity-80">
                  Discover how Farm IQ analyzes soil, weather, and growth
                  patterns to detect issues early and boost farm efficiency.
                </p>
                <span className="hover:scale-120 bg-(--secondary_color) absolute inset-0 m-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full p-2 text-3xl text-white duration-200">
                  <FaPlay />
                </span>
              </div>
            </Card>

            {/* Card 3 */}
            <Card overlayImage="/images/landingPage/hero.jpeg">
              <div className="flex h-full flex-1 flex-col gap-2">
                <h3 className="text-xl">Smarter Irrigation Strategies</h3>
                <p className="opacity-80">
                  Understand how data-driven irrigation schedules can save
                  water, lower costs, and improve overall crop sustainability.
                </p>
                <span className="hover:scale-120 bg-(--secondary_color) absolute inset-0 m-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full p-2 text-3xl text-white duration-200">
                  <FaPlay />
                </span>
              </div>
            </Card>

            {/* Card 4 */}
            <Card overlayImage="/images/landingPage/wireless.jpg">
              <div className="flex h-full flex-1 flex-col gap-2">
                <h3 className="text-xl">Farm Analytics for Better Decisions</h3>
                <p className="opacity-80">
                  See how real-time dashboards and insights empower farmers to
                  make informed decisions throughout the growing season.
                </p>
                <span className="hover:scale-120 bg-(--secondary_color) absolute inset-0 m-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full p-2 text-3xl text-white duration-200">
                  <FaPlay />
                </span>
              </div>
            </Card>

            {/* Card 5 */}
            <Card overlayImage="/images/landingPage/contact.png">
              <div className="flex h-full flex-1 flex-col gap-2">
                <h3 className="text-xl">
                  Weather Intelligence & Risk Management
                </h3>
                <p className="opacity-80">
                  Learn how predictive weather models help farms reduce risk and
                  prepare for changing climate conditions.
                </p>
                <span className="hover:scale-120 bg-(--secondary_color) absolute inset-0 m-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full p-2 text-3xl text-white duration-200">
                  <FaPlay />
                </span>
              </div>
            </Card>
          </CardSwap>
        </figure>
      </div>
    </section>
  );
};

export default Articles;
