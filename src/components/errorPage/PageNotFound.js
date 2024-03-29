import styles from "$Styles/errorPage.module.scss";
import homepageStyles from "$Styles/homepage/homepage.module.scss";
import logo from "$Public/logo/logo.png";

import { Link } from "react-router-dom";
import Image from "@chan_alston/image";

export default function PageNotFound() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={homepageStyles.brand}>
          <div style={{ width: "200px" }}>
            <Image src={logo} alt="TaskTrackee Logo" w="512px" h="512px" />
          </div>
        </div>
        <h1 className={homepageStyles.brandName} style={{ color: "#e4f0ff" }}>
          TaskTrackee
        </h1>

        <p className={styles.errorMessage}>Whoops! This page does not exists</p>
        <Link className={styles.errorLink} to="/">
          Back To Homepage
        </Link>
      </div>
    </div>
  );
}
