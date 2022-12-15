import React from "react";
import styles from "./landingPage.module.scss";
import PublicNavbar from "../Navbars/PublicNavbar/PublicNavbar";

const LandingPage = () => {
  return (
    <div>
      <PublicNavbar />
      <main className={styles.main}>
        <section>
          <div className={styles.heroWrapper}>
            <article>
              <h2>Organise development.</h2>
              <p>Allowing developers to track bugs and organise feature requests seamlessly in a fully JWT authenticated application.</p>
            </article>
            <img src="hero.png" alt="hero-image"/>
          </div>
          <button className={styles.cta}><a href="#">How it works</a></button>
        </section>
      </main>
      <footer>
        <p><a href="https://www.freepik.com/free-vector/isometric-time-management-concept-illustrated_12281499.htm#query=organized&position=24&from_view=search&track=sph">Image by pikisuperstar</a> on Freepik</p>
      </footer>
    </div>
  );
};

export default LandingPage;
