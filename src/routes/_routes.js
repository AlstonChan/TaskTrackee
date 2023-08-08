import "$Styles/global.scss";

import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Homepage from "./index";
import ProtectedRoute from "$Lib/ProtectedRoute.js";
import NoAuthenticateUser from "$Lib/NoAuthenticateUser.js";

const AllTask = lazy(() => import("$Routes/dashboard/allTask.js"));
const TodayTask = lazy(() => import("$Routes/dashboard/todayTask.js"));
const UpcoimngTask = lazy(() => import("$Routes/dashboard/upcomingTask.js"));
const FinishedTask = lazy(() => import("$Routes/dashboard/finishedTask.js"));
const Account = lazy(() => import("$Routes/account/index.js"));
const ForgetPass = lazy(() => import("$Routes/account/forgetPass.js"));

import Dashboard from "$Routes/dashboard/index.js";
import PageNotFound from "$Components/errorPage/PageNotFound.js";
import ContentNotFound from "$Components/errorPage/ContentNotFound.js";
import Spinner from "$Components/PageLoader.js";

export default function App() {
  const fallbackFill = <Spinner pos="fill" sz="large" pad="50px 0 0 0" />;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <NoAuthenticateUser>
              <Suspense fallback={<Spinner pos="full" sz="large" />}>
                <Homepage />
              </Suspense>
            </NoAuthenticateUser>
          }
        />
        <Route path="/account">
          <Route
            index
            element={
              <ProtectedRoute>
                <Suspense fallback={<Spinner pos="full" sz="large" />}>
                  <Account />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="forget-password"
            element={
              <ProtectedRoute forgetPass>
                <Suspense fallback={<Spinner pos="full" sz="large" />}>
                  <ForgetPass />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<ContentNotFound />} />
          <Route
            path="alltask"
            element={
              <Suspense fallback={fallbackFill}>
                <AllTask />
              </Suspense>
            }
          />
          <Route
            path="todaytask"
            element={
              <Suspense fallback={fallbackFill}>
                <TodayTask />
              </Suspense>
            }
          />
          <Route
            path="upcomingtask"
            element={
              <Suspense fallback={fallbackFill}>
                <UpcoimngTask />
              </Suspense>
            }
          />
          <Route
            path="finishedtask"
            element={
              <Suspense fallback={fallbackFill}>
                <FinishedTask />
              </Suspense>
            }
          />
          <Route path="*" element={<ContentNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
