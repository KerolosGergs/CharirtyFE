import { Routes } from '@angular/router';
import { LoginForm } from './Auth/Components/login-form/login-form';
import { RegisterForm } from './Auth/Components/register-form/register-form';
import { advisoRreservationGuard } from './Guards/adviso-rreservation-guard';
import { Consultant } from './Pages/Consultant/all-consultants/consultant';
import { Questions } from './Pages/questions/questions';
import { OurService } from './Pages/Home/our-service/our-service';
import { HelpPeopole } from './Pages/Forms/Components/help-peopole/help-peopole';
import { RequestRepair } from './Pages/Forms/Components/request-repair/request-repair';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginForm },
    { path: 'register', component: RegisterForm },
    { path: 'home', loadComponent: () => import('./Pages/Home/home/home').then(m => m.Home), title: 'Home' },

    { path: 'HelpPeopole',component:HelpPeopole,title:'HelpPeopole' },
    { path: 'RequesrRepair',component:RequestRepair,title:'RequestRepair' },
    
    { path: 'our-service', component:OurService,title:'Our Service' },
    
    { path: 'all-consultants', component: Consultant, title: 'Consultants'  ,canActivate: [advisoRreservationGuard] },
    { path: 'advisor-details', loadComponent: () => import('../app/Pages/advisor-details/advisor-details').then(m => m.AdvisorDetails), title: 'Advisor Details' },
    { path: 'advisor-reservation', loadComponent: () => import('../app/Pages/reservation/reservation').then(m => m.Reservation), canActivate: [advisoRreservationGuard], title: 'Advisor Reservation' },
    { path: 'must-login', loadComponent: () => import('../app/Pages/must-login/must-login').then(m => m.MustLogin), title: 'Must Login' },
    
    { path: 'questions', component:Questions,title:'Questions'},
    
    { path: 'medical-services', loadComponent: () => import('../app/Pages/medicalservices/medicalservices').then(m => m.Medicalservices), title: 'Medical Services' },
    { path: 'achievements-communication', loadComponent: () => import('../app/Pages/achievements-communication/achievements-communication').then(m => m.AchievementsCommunication), title: 'Achievements Communication' },
    { path: 'report', loadComponent: () => import('../app/Pages/achievements-communication/components/report/report').then(m => m.Report), title: 'Report' },
    
    { path: 'dashboard', loadComponent: () => import('../app/Pages/Dashboard/dashboard').then(m => m.Dashboard), title: 'Dashboard Main' ,children:[
        { path: '', redirectTo: 'dashboard-main', pathMatch: 'full'},
        { path: 'dashboard-main', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-main/dashboard-main').then(m => m.DashboardMain), title: 'Dashboard Main' },
        { path: 'dashboard-advisors', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/dashboard-advisors').then(m => m.DashboardAdvisors), title: 'Dashboard Advisors' },
        { path: 'dashboard-advisor-details/:id', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/components/dashboard-advisors-details/dashboard-advisors-details').then(m => m.DashboardAdvisorsDetails), title: 'Dashboard Advisor Details' },
        { path: 'dashboard-advisor-edit/:id', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/components/edit-advisor/edit-advisor').then(m => m.EditAdvisor), title: 'Dashboard Advisor Edit' },
        { path: 'dashboard-advisor-new', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/components/new-advisor/new-advisor').then(m => m.NewAdvisor), title: 'Dashboard Advisor New' },
        
        { path: 'dashboard-meditation', loadComponent: ()=> import('../../src/app/Pages/Dashboard/components/midetation/midetation').then(m => m.Midetation), title: 'Dashboard Meditation' },
        { path: 'dashboard-midetation-new', loadComponent: ()=> import('../../src/app/Pages/Dashboard/components/midetation/components/add-midetation/add-midetation').then(m => m.AddMidetation), title: 'Dashboard Add Meditation' },
        { path: 'dashboard-midetation-edit/:id', loadComponent: ()=> import('../app/Pages/Dashboard/components/midetation/components/edit-midetation/edit-midetation').then(m => m.EditMidetation), title: 'Dashboard Edit Meditation' },
        { path: 'dashboard-midetation-details/:id', loadComponent: () => import('../app/Pages/Dashboard/components/midetation/components/midetation-detatils/midetation-detatils').then(m => m.MidetationDetatils), title: 'Dashboard Meditation Details' },
        { path: 'dashboard-consultants',loadComponent:()=> import('../app/Pages/Dashboard/components/consultation-management/consultation-management.component').then(m => m.ConsultationManagementComponent),title:'Dashboard Consultants'},
        { path: 'dashboard-awareness', loadComponent: ()=> import('../app/Pages/Dashboard/components/awareness/awareness').then(m => m.Awareness), title: 'Dashboard Awareness' },
        { path: 'dashboard-awareness-new-video', loadComponent: ()=> import('../app/Pages/Dashboard/components/awareness/components/add-new-video/add-new-video').then(m => m.AddNewVideo), title: 'Add New Video' },
        
        { path: 'dashboard-news', loadComponent: ()=> import('../app/Pages/Dashboard/components/dashboard-news/dashboard-news').then(m => m.DashboardNews), title: 'Dashboard News' },
        { path: 'dashboard-news-new', loadComponent: ()=> import('../app/Pages/Dashboard/components/dashboard-news/components/dashboard-add-news/dashboard-add-news').then(m => m.DashboardAddNews), title: 'Add New News' },
        { path: 'dashboard-news-edit/:id', loadComponent: ()=> import('../app/Pages/Dashboard/components/dashboard-news/components/dashboard-edit-news/dashboard-edit-news').then(m => m.DashboardEditNews), title: 'edit New News' },
        
        { path: 'dashboard-services', loadComponent: ()=> import('../app/Pages/Dashboard/components/services/services').then(m => m.ServicesComponent), title: 'Dashboard Services' },
        { path: 'dashboard-new-services', loadComponent: ()=> import('../app/Pages/Dashboard/components/services/component/add-new-service/add-new-service').then(m => m.AddNewService), title: 'Dashboard New Services' },
        { path: 'dashboard-edit-services/:id', loadComponent: ()=> import('../app/Pages/Dashboard/components/services/component/edit-services/edit-services').then(m => m.EditServices), title: 'Dashboard Edit Services' },
        { path: 'dashboard-complaints', loadComponent: ()=> import('../app/Pages/Dashboard/components/complaints/complaints').then(m => m.Complaints), title: 'Complaints' },
        
        { path: 'complaint-details/:id', loadComponent: ()=> import('../app/Pages/Dashboard/components/complaints/components/complaint-details/complaint-details').then(m => m.ComplaintDetails), title: 'Complaint Details' },
        { path: 'consultation-management', loadComponent: ()=> import('../app/Pages/Dashboard/components/consultation-management/consultation-management.component').then(m => m.ConsultationManagementComponent), title: 'Consltation Managment' },
        {path:'dashboard-help',loadComponent:()=> import('../app/Pages/Dashboard/components/dashboard-help/dashboard-help').then(m => m.DashboardHelp),title:'Dashboard Help'},  
        {path:'dashboard-Volunteer',loadComponent:()=>import('../app/Pages/Dashboard/components/dashboard-volunteer/dashboard-volunteer').then(m=>m.DashboardVolunteer),title:'Dashboard Volunteer'},
    ]},
    { path: 'advisor-dashboard', loadComponent: ()=> import('../app/Pages/advisor-dashboard/advisor-dashboard').then(m => m.AdvisorDashboard), title: 'Advisor Dashboard', children:[
        { path: '', redirectTo: 'dashboard-main', pathMatch: 'full' },
        { path: 'dashboard-main', loadComponent: ()=> import('../app/Pages/advisor-dashboard/component/dashboard-main/dashboard-main').then(m =>m.DashboardMain), title: 'Advisor Dashboard Main'},
        { path: 'dashboard-date', loadComponent: ()=> import('../app/Pages/advisor-dashboard/component/dashboard-date/dashboard-date').then(m =>m.DashboardDate), title: 'Advisor Dashboard Date' },
        { path: 'dashboard-schedule', loadComponent: ()=> import('../app/Pages/advisor-dashboard/component/dashboard-schedule/dashboard-schedule').then(m =>m.DashboardSchedule), title: 'Advisor Dashboard Schedule' },
        { path: 'date-details/:id', loadComponent: ()=> import('../app/Pages/advisor-dashboard/component/dashboard-date/components/date-details/date-details').then(m => m.DateDetails),title: 'Date Details' }
    ] },
    { path: 'reconcile-dashboard', loadComponent: () => import('../app/Pages/reconcile-dashboard/reconcile-dashboard').then(m => m.ReconcileDashboard), title: 'Reconcile Dashboard', children: [
        { path: '', redirectTo: 'reconcile-main', pathMatch: 'full' },
        { path: 'reconcile-main', loadComponent: () => import('../app/Pages/reconcile-dashboard/components/reconcile-main/reconcile-main').then(m => m.ReconcileMain), title: 'Reconcile Main' }
    ] },

    { path: 'questions', component: Questions, title: 'Questions' },

    { path: 'questions', component: Questions, title: 'Questions' },

    { path: 'not-found', loadComponent: () => import('../app/Pages/not-found/not-found').then(m => m.NotFound), title: 'Page Not Found' },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' }





];
