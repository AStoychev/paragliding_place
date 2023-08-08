import { Link } from 'react-router-dom';

import styles from './Footer.module.css'

export const Footer = () => {
   return (
      <footer className={styles.footer}>
         {/* <div className={styles.footer}> */}
            <div className={styles.container}>
               <div className={styles.row}>
                  <div className={styles.infoPanel}>
                     <h3 className={styles.OurSite}>OUR Site</h3>
                     <p className="variat">This is paraglidin webapplication for place where you have to fly in Bulgaria.
                        At the moment application is in test period
                     </p>
                  </div>
               </div>
            </div>
         {/* </div> */}
      </footer>
   );
}