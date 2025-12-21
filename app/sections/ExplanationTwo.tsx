import Step from '@/components/explanation/Step';

const ExplanationTwo = () => {
  return (
    <section id="collarTwo">
      <div className="container flex flex-col gap-16 py-20">
        <Step
          titleImage={true}
          variant="second"
          title="The Leading Cow Leg Sensor"
          subtitle="PROVIDES FIVE SOLUTIONS IN A SINGLE PACKAGE:
 Animal Identification, Calving Alert,
Rest,  Well Being."
          description="farmIqAct II increases your herd’s pregnancy rate by providing accurate and time-sensitive . It identifies cows for insemination, and the ideal time to inseminate them."
          stepImage="/images/landingPage/collarOneSecond.svg"
          ctaText="Contact Us"
          ctaHref="/contact"
        />

        <Step
          variant="second"
          title="Superior Animal ID"
          stepImage="/images/landingPage/collarTwoSecond.svg"
          description="farmIqmilk utilizes sophisticated antenna technology that allows the same tag to function as an effective, accurate tool for cow identification in the milking parlor and at the sorting gate."
        />
        <Step
          variant="second"
          title="Calving Alerts"
          stepImage="/images/landingPage/collarTwoThird.svg"
          description="Receive alerts at the start of calving, and when prolonged calving occurs. Use these to provide timely interventions that prevent complications and calf mortality."
          ctaText="Contact Us"
          ctaHref="/contact"
        />
        <Step
          variant="second"
          title="Monitor Rest, Health,
and Group Wellbeing"
          stepImage="/images/landingPage/collarTwoFourth.svg"
          description="Identify health problems and group well-being issues such as overcrowding, poor bedding, excess group activity, or any other factors that disturb the animals’ comfort and can impact their production."
          ctaText="Contact Us"
          ctaHref="/contact"
        />
      </div>
    </section>
  );
};

export default ExplanationTwo;
