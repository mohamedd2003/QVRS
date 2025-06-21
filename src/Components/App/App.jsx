import React, { Suspense } from 'react';
import Layout from '../Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CorrectReading from '../CorrectReading/CorrectReading';
import Home from '../Home/Home';
import Register from '../Register/Register';
import SurahDetails from '../SurahDetails/SurahDetails';
import Notfound from '../Notfound/Notfound';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Lazyloading from '../Lazyloading/Loader'; // استيراد مباشر
import UserProfile from '../UserProfile/UserProfile';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Chatbot from '../Chatbot/Chatbot';

import { LanguageProvider } from '../../context/LanguageContext';
import FAQ from '../FAQ/FAQ';

export default function App() {
  const query = new QueryClient();

  // تعريف الراوتر
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "CorrectReading", element:  <CorrectReading /> },
        { path: "register", element: <Register /> },
        { path: "surahDetails/:id", element: <SurahDetails /> },
        { path: "userProfile", element: <UserProfile />  },
        { path: "login", element: <Login /> },
        { path: "tfaser", element: <Chatbot/> },
        { path: "FAQ", element: <FAQ/> },
       
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <LanguageProvider>
      {/* <GoogleOAuthProvider clientId="1094813269297-r8flrf3g3l8d866h1fp335456b1s0k4a.apps.googleusercontent.com"> */}
      <Suspense fallback={<Lazyloading />}>
        <QueryClientProvider client={query}>
          <ReactQueryDevtools />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Suspense>
      {/* </GoogleOAuthProvider> */}
    </LanguageProvider>
  );
}
