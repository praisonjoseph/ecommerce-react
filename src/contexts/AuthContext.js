// import React, { useEffect, createContext, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { observeAuthState, authSelector } from '../redux/reducers/authReducer';
// import {  Container, Spinner } from 'react-bootstrap'

// export const AuthContext = createContext();

// export function useAuth() {
//     return useContext(AuthContext);
// }

// const AuthProvider = ({ children }) => {
//     const dispatch = useDispatch();
//     const { user, loading } = useSelector(authSelector);

//     // Effect to observe the authentication state
//     useEffect(() => {
//         dispatch(observeAuthState());
//     }, [dispatch]);

//     // if (loading) {
//     //     return (
//     //     <Container className="d-flex justify-content-center align-items-center min-vh-100">
//     //         <Spinner animation="border" role="status">
//     //             <span className="visually-hidden">Loading...</span>
//     //         </Spinner>
//     //     </Container>
//     //     )
//     // }

//     const value = {
//         user,
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//             {/* {!loading && children} */}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

