//Layout
import {
  OnlySidebarLayout,
  ProfileLayout,
  PremiumLayout,
  SettingLayout,
} from "../component/Layout";
import LoginLayout from "../component/LoginLayout";

//components

//pages
import learn from "../pages/Learn/learn";
import LeaderBoard from "../pages/LeaderBoard/LeaderBoard";
import Profile from "../pages/Profile/Profile";
import Register from "../component/LoginLayout/Register";
import Quest from "../pages/Quest/Quest";
import Shop from "../pages/Shop/Shop";
import License from "../pages/License/License";
import Lesson from "../pages/Lesson/Lesson";
import Setting from "../pages/SettingPage/Setting";
import ChangePassword from "../pages/SettingPage/ChangePassword";
import Notification from "../pages/Notification";
import SuperPackInfomation from "../pages/SuperpackInformation";
import PremiumIntro from "../component/Layout/PremiumLayout/PremiumIntro";
import ReadQuestionPage from "../pages/ReadQuestionPage";
import THPTQGExams from "../pages/THPTQGExams";
import EmailRequestPending from "../pages/EmailRequestPending";
import Practices from "../pages/RealPractices";
import Tests from "../pages/Practices";
import Payment from "../pages/Payment";
import { PaymentSuccess } from "../pages/Payment/SuccessPayment";
import { ErrorPayment } from "../pages/Payment/ErrorPayment";
import { LoadingPage } from "../pages/Loading";
//pubic routes
const publicRoutes = [
  { path: "/practices/:courseId", component: Practices },
  { path: "/tests", component: Tests },
  { path: "/readQuestionPage/:testType/:testId", component: ReadQuestionPage },
  { path: "/payment", component: Payment, layout: PremiumLayout },
  {
    path: "/payment/success/:paymentId",
    component: PaymentSuccess,
    layout: PremiumLayout,
  },
  { path: "/payment/error", component: ErrorPayment, layout: PremiumLayout },
  { path: "/allTestOfType/:allTestType", component: THPTQGExams },
  { path: "/learn", component: learn },
  { path: "/", component: LoadingPage, layout: null },
  { path: "/leaderBoard", component: LeaderBoard },
  { path: "/license", component: License, layout: OnlySidebarLayout },
  { path: "/premium", component: PremiumIntro, layout: PremiumLayout },
  { path: "/quest", component: Quest },
  { path: "/shop", component: Shop },
  { path: "/profile", component: Profile, layout: ProfileLayout },
  { path: "/setting", component: Setting, layout: SettingLayout },
  {
    path: "/setting/changePassword",
    component: ChangePassword,
    layout: SettingLayout,
  },
  { path: "/changePassword", component: ChangePassword, layout: SettingLayout },
  { path: "/signin/:token/changePassword", component: ChangePassword, layout: null },
  { path: "/sendEmail", component: ChangePassword, layout: null },
  { path: "/waitingPage", component: ChangePassword, layout: null },
  
  {
    path: "signin/emailRequestPending",
    component: EmailRequestPending,
    layout: null,
  },
  {
    path: "/setting/superInfomation",
    component: SuperPackInfomation,
    layout: SettingLayout,
  },
  {
    path: "/setting/notification",
    component: Notification,
    layout: SettingLayout,
  },
  { path: "/lesson/:type/:questionType/:lessonNumber", component: Lesson, layout: null },
  { path: "/loading/:type/:questionType/:lessonNumber", component: LoadingPage, layout: null },
  { path: "/signin", component: LoginLayout, layout: null },
  { path: "register", component: Register, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
