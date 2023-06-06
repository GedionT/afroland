import { feedback } from "../constants";
import styles from "../style";
import FeedbackCard from "./FeedBackCard";

const Personas = () => (
  <section
    id="personas"
    className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}
  >
    <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative ">
      <h2 className={styles.heading2}>
        Multiple persona to conversate with
        <br className="sm:block hidden" /> some of which are
      </h2>
      <div className="w-full md:mt-0 mt-6">
        <p className={`${styles.paragraph} text-left max-w-[450px]`}>
          Doctors, Lawyers, Business Consultants, Freelancers, Students, and
          more.
        </p>
      </div>
    </div>

    <div className="flex flex-wrap sm:justify-center mx-auto justify-center w-full feedback-container relative ">
      {feedback.map((card) => (
        <FeedbackCard key={card.id} {...card} />
      ))}
    </div>
  </section>
);

export default Personas;
