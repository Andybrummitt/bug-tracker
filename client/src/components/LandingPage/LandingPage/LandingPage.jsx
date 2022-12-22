import React, { useState } from "react";
import waveSVG from "../../../images/wave-bg.svg";
import PublicNavbar from "../../Navbars/PublicNavbar/PublicNavbar";
import VideoModal from "../VideoModal/VideoModal";
import styles from "./landingPage.module.scss";

const LandingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <PublicNavbar />
      {modalOpen ? <div className="overlay" onClick={() => setModalOpen(false)}/> : null}
      <main className={styles.main}>
        {modalOpen ? <VideoModal /> : null}
        <section>
          <div className={styles.heroWrapper}>
            <article>
              <h2>Organise development.</h2>
              <p>
                Allowing developers to track bugs and organise feature requests
                seamlessly in a fully JWT authenticated application.
              </p>
              <button className={styles.cta} onClick={() => setModalOpen(true)}>
                  Watch Short Demo
              </button>
            </article>
            <img src="hero.png" alt="hero-image" />
          </div>
        </section>
        <div className={styles.wave}>
          <img src={waveSVG} alt="wave-graphic" />
        </div>
        <p className={styles.imageRights}>
          <a href="https://www.freepik.com/free-vector/isometric-time-management-concept-illustrated_12281499.htm#query=organized&position=24&from_view=search&track=sph">
            Image by pikisuperstar
          </a>{" "}
          on Freepik
        </p>
      </main>
    </div>
  );
};

export default LandingPage;
