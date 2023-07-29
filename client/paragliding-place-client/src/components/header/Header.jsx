import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import { Search } from '../search/Search';

import { LoginModal } from '../login/LoginModal';
import { RegisterModal } from '../register/RegisterModal';

import { CreateNewPlace } from '../createPlace/CreateNewPlace';

import styles from './Header.module.css'

export const Header = () => {
   const { isAuthenticated, userId, userEmail, userName, userAuth, userAge, userFirstName } = useContext(AuthContext);
   return (
      <>
         <header className={styles.header}>
            <div className={styles.container}>


               <h1 className={styles.mainHeader}><Link className={styles.headerText} to="/">SpotFly</Link>
                  <Link className={styles.route} to="/"><img src="../../../../images/routes.png" alt="logo" /></Link>
               </h1>
            </div>
            <nav className={styles.navBar}>
               <div className={styles.navContainer}>
                  <ul>
                     <li><Link className={styles.navLink} to="/">Home</Link></li>
                     <li><Link className={styles.navLink} to="/about">About</Link></li>
                     {/* <li><Link className={styles.navLink} to="/loginRegister">LoginRegister</Link></li> */}
                     {!isAuthenticated && (
                        <>
                           <li className={styles.navItem}>
                              {/* <Link className={styles.navLink} to="/login">Login</Link> */}
                           </li>


                           <li className={styles.navItem}>
                              {/* <Link className={styles.navLink} to="/login">Login</Link> */}
                              <LoginModal />
                           </li>
                           <li className={styles.navItem}>
                              {/* <Link className={styles.navLink} to="/register">Register</Link> */}
                              <RegisterModal />
                           </li>
                           <li className={styles.navItem}>
                              {/* <Link className={styles.navLink} to="/search">Search</Link> */}
                           </li>

                        </>
                     )}

                     {isAuthenticated && (
                        <>
                           <li className={styles.navItem}>
                              <Link className={styles.navLink} to="/createNewPlace">Add Place</Link>
                           </li>

                           <li className={styles.navItem}>
                              <Link className={styles.navLink} to="/logout">Logout</Link>
                           </li>

                           <li >Hello
                              <Link className={styles.navItemUsername} to={`/profile/${userId}`}>{userName}</Link>
                              {/* {userName} */}
                           </li>
                        </>
                     )}
                  </ul>

               </div>

               {/* <div className={styles.search}><Search /></div> */}

            </nav>

         </header>
      </>
   );
}