import { Routes } from '@angular/router';
import { LoginForm } from './Auth/Components/login-form/login-form';
import { RegisterForm } from './Auth/Components/register-form/register-form';
import { advisoRreservationGuard } from './Guards/adviso-rreservation-guard';
import { Consultant } from './Pages/Consultant/all-consultants/consultant';
import { Questions } from './Pages/questions/questions';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginForm },
    { path: 'register', component: RegisterForm },
    { path: 'home', loadComponent: () => import('./Pages/Home/home/home').then(m => m.Home), title: 'Home' },
    { path: 'all-consultants', component: Consultant, title: 'Consultants' },
    { path: 'advisor-details', loadComponent: () => import('../app/Pages/advisor-details/advisor-details').then(m => m.AdvisorDetails), title: 'Advisor Details' },
    { path: 'advisor-reservation', loadComponent: () => import('../app/Pages/reservation/reservation').then(m => m.Reservation), canActivate: [advisoRreservationGuard], title: 'Advisor Reservation' },
    { path: 'must-login', loadComponent: () => import('../app/Pages/must-login/must-login').then(m => m.MustLogin), title: 'Must Login' },

    { path: 'questions',component:Questions,title:'Questions'},
    { path: 'dashboard', loadComponent: () => import('../app/Pages/Dashboard/dashboard').then(m => m.Dashboard), title: 'Dashboard Main' ,children:[
        { path: '', redirectTo: 'dashboard-main', pathMatch: 'full'},
        { path: 'dashboard-main', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-main/dashboard-main').then(m => m.DashboardMain), title: 'Dashboard Main' },
        { path: 'dashboard-advisors', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/dashboard-advisors').then(m => m.DashboardAdvisors), title: 'Dashboard Advisors' },
        { path: 'dashboard-advisor-details/:id', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/components/dashboard-advisors-details/dashboard-advisors-details').then(m => m.DashboardAdvisorsDetails), title: 'Dashboard Advisor Details' },
        { path: 'dashboard-advisor-edit/:id', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/components/edit-advisor/edit-advisor').then(m => m.EditAdvisor), title: 'Dashboard Advisor Edit' },
        { path: 'dashboard-advisor-new', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/components/new-advisor/new-advisor').then(m => m.NewAdvisor), title: 'Dashboard Advisor New' },
        { path: 'dashboard-awareness', loadComponent: ()=> import('../app/Pages/Dashboard/components/awareness/awareness').then(m => m.Awareness), title: 'Dashboard Awareness' },
        { path: 'dashboard-awareness-new-video', loadComponent: ()=> import('../app/Pages/Dashboard/components/awareness/components/add-new-video/add-new-video').then(m => m.AddNewVideo), title: 'Add New Video' },
        { path: 'dashboard-news', loadComponent: ()=> import('../app/Pages/Dashboard/components/dashboard-news/dashboard-news').then(m => m.DashboardNews), title: 'Dashboard News' }
    ]},

    { path: 'questions', component: Questions, title: 'Questions' },

    { path: 'questions', component: Questions, title: 'Questions' },

    { path: 'not-found', loadComponent: () => import('../app/Pages/not-found/not-found').then(m => m.NotFound), title: 'Page Not Found' },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' }





];
