import Step from '@/components/explanation/Step';

const Explanation = () => {
  return (
    <section id='collarOne' className="relative isolate">
    
      <div className="container flex flex-col gap-16 py-20">
        <Step
          titleImage={true}
          variant="first"
          title="Advanced Neck Collar for Cow Monitoring"
          subtitle="Benefits include:"
          stepImage="/images/landingPage/collarOneFirst.svg"
          benefits={[
            'Accurate heat detection.',
            'Accurate rumination and eating time data.',
            'Individual cow health alerts.',
            'Group digestion alerts.',
            '24/7 wireless detection and management.',
          ]}
          ctaText="Contact Us"
          ctaHref="/contact"
        />

        <Step
          variant="first"
          title="Accurate Heat Detection, 24/7"
          subtitle="Identify cows for timely insemination."
          stepImage="/images/landingPage/collarOneSecond.svg"
          description="AfiCollar provides accurate and time-sensitive heat detection data for improving your herd’s pregnancy rate. Use AfiCollar to identify which cows to inseminate and the best time for insemination. AfiCollar heat detection is also ideal for grazing cows."
        />
        <Step
          variant="first"
          title="Accurate Health Monitoring"
          stepImage="/images/landingPage/collarOneThird.svg"
          description="Accurate rumination and eating patterns are used as indications of each cow’s health. Receive health alerts when cows stray from their patterns. The alerts detail the changes and possible causes."
        />
        <Step
          variant="first"
          title="Animal Behavior Monitoring"
          stepImage="/images/landingPage/collarOneFourth.svg"
          description="AfiCollar monitors animal behavior (rumination, eating, and motion). This information is translated by AfiFarm to provide updated, round-the-clock monitoring and warnings for groups, and individual cows."
          ctaText="Contact Us"
          ctaHref="/contact"
        />
        <Step
          variant="first"
          title="Group Digestion Monitoring"
          stepImage="/images/landingPage/collarOneFifth.svg"
          description="Using the data provided by AfiCollars, AfiFarm’s smart technology learns the rumination and eating patterns of the herd. Group digestion alerts are provided when changes to these patterns occur at a group level."
        />
        <Step
          variant="first"
          title="Milk Sensors Integration"
          stepImage="/images/landingPage/collarOneSixth.svg"
          description="AfiCollar works together with Afimilk’s MPC Milk Meters and AfiLab to provide accurate data on the quality of each cow’s milk, and their individual health. This data is used to provide early detection and alerts of health issues, such as ketosis."
          ctaText="Contact Us"
          ctaHref="/contact"
        />
        <Step
          variant="first"
          title="Afi2Go Prime"
          subtitle="Afi2Go Prime mobile app benefits:"
          stepImage="/images/landingPage/collarOneSeventh.svg"
          benefits={[
            'Retrieve animal status, events and more',
            'Search for an animal by typing her number or swiping your mobile phone over the AfiCollar sensor.',
            'Assign tags or codes out in the fields or sheds.',
            'Manage cows for inseminations and treatments.',
            'Sort cows.',
          ]}
          ctaText="Request Demo"
          ctaHref="/contact"
        />
      </div>
    </section>
  );
};

export default Explanation;
