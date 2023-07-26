import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import { AuthProvider } from './contexts/AuthContext';
import { PlaceProvider } from './contexts/PlaceContext';
import { CommentProvider } from './contexts/CommentContext';

import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Section } from './components/section/Section';
// import { Login } from './components/login/Login';
import { Logout } from './components/logout/Logout';
// import { Register } from './components/register/Register';
import { About } from './components/about/About';

import { LoginModal } from './components/login/LoginModal';
import { RegisterModal } from './components/register/RegisterModal';
import { CreateNewPlace } from './components/createPlace/CreateNewPlace';

import { Profile } from './components/profile/Profile';
import { EditProfile } from './components/profile/EditProfile';
import { ChangePassword } from './components/profile/passwordManagement/ChangePassword';
import { ResetPasswordEnterMail } from './components/profile/passwordManagement/ResetPasswordEnterMail';
import { ResetPasswordEnterToken } from './components/profile/passwordManagement/ResetPasswordEnterToken';
import { FeedbackEnterMail } from './components/profile/passwordManagement/FeedbackEnterMail';
import { FeedbackEnterToken } from './components/profile/passwordManagement/FeedbackEnterToken';

import { PlaceDetails } from './components/placeDetails/PlaceDetails';
import { EditPlace } from './components/editPlace/EditPlace';

import { Search } from './components/search/Search';

import { NoUserRouteGuard } from './components/routeGuard/NoUserRouteGuard';
import { UserRouteGuard } from './components/routeGuard/UserRouteGuard';
import { OwnerGuardProfile } from './components/routeGuard/OwnerGuardProfile';
import { OwnerGuardPlace } from './components/routeGuard/OwnerGuardPlace';


function App() {

    return (
        <Fragment>
            <AuthProvider>
                <PlaceProvider>
                    <CommentProvider>
                        <Header />
                        <Routes>
                            <Route path='/' element={<Section />} />

                            <Route path='/search' element={<Search />} />
                            <Route path='/place-details/:placeId/*' element={<PlaceDetails />} />
                            <Route path='/profile/:userId' element={<Profile />} />
                            <Route path='/about' element={<About />} />

                            <Route element={<NoUserRouteGuard />} >
                                <Route path='/createNewPlace' element={<CreateNewPlace />} />
                                <Route path='/logout' element={<Logout />} />
                            </Route>

                            <Route element={<UserRouteGuard />}>
                                <Route path='/login' element={<LoginModal />} />
                                <Route path='/register' element={<RegisterModal />} />
                                <Route path='/reset-password' element={<ResetPasswordEnterMail />} />
                                <Route path='/reset-password/confirm/*' element={<ResetPasswordEnterToken />} />
                                <Route path='/feedback-enter-mail' element={<FeedbackEnterMail />} />
                                <Route path='/feedback-enter-token' element={<FeedbackEnterToken />} />
                            </Route>

                            <Route element={<OwnerGuardProfile />}>
                                <Route path='/profile/edit/:userId' element={<EditProfile />} />
                                <Route path='/profile/edit/change-password/:userId' element={<ChangePassword />} />
                            </Route>

                            <Route element={<OwnerGuardPlace />} >
                                <Route path='/place/edit/:placeId' element={<EditPlace />} />
                            </Route>

                        </Routes>
                        <Footer />
                    </CommentProvider>
                </PlaceProvider>
            </AuthProvider>
        </Fragment>
    );
};

export default App;
