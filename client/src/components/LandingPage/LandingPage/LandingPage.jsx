import React, { useState } from "react";
import develop from "../../../images/develop.svg";
import organise from "../../../images/organise.svg";
import secure from "../../../images/secure.svg";
import PublicNavbar from "../../Navbars/PublicNavbar/PublicNavbar";
import VideoModal from "../VideoModal/VideoModal";
import styles from "./landingPage.module.scss";

const LandingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <PublicNavbar />
      {modalOpen ? (
        <div className="overlay" onClick={() => setModalOpen(false)} />
      ) : null}
      <main className={styles.main}>
        {modalOpen ? <VideoModal /> : null}

        <section>
          <div className={styles.heroWrapper}>
            <article>
              <div>
                <h2>Organise development.</h2>
                <p>Organise bugs and feature requests in one place.</p>
              </div>
              <img src={organise} alt="organisation illustration" />
            </article>
            <article>
              <img src={develop} alt="development illustration" />
              <div>
                <h2>Speed up workflow.</h2>
                <p>Focus on the most important fixes and features.</p>
              </div>
            </article>
            <article>
              <div>
                <h2>Work in a secure enviroment.</h2>
                <p>
                  Track tickets in a fully JWT authenticated application with
                  team <span>and</span> user authorized portals.
                </p>
              </div>
              <img src={secure} alt="security illustration" />
            </article>
          </div>
          <button className={styles.cta} onClick={() => setModalOpen(true)}>
            Watch Short Demo
          </button>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
