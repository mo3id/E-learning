import { Button } from "antd";
import styles from "./SocialMediaButtons.module.css";
import { url } from "../../../Services/api";

function SocialMediaButtons({ formType }: { formType: string }) {
  return (
    <>
      <div>
        <p className={`${styles.or} m`}>or</p>
      </div>
      <div className={`d-flex align-items-center flex-column gap-2 p-b-1`}>
        <Button
          className={styles.google}
          href={`${url}/api/${formType}/google`}
          icon={
            <img
              src="./images/googleicon.png"
              alt=""
              className={styles.w15}
            />
          }
        >
          Continue with Google
        </Button>

        <Button
          className={styles.google}
          href={`${url}/api/${formType}/facebook`}
          icon={
            <img
              src="./images/facebookicon.png"
              alt=""
              className={styles.w15}
            />
          }
        >
          Continue with Facebook
        </Button>
      </div>
    </>
  );
}

export default SocialMediaButtons;
