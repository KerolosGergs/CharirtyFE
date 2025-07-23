import { Routes } from '@angular/router';
import { LoginForm } from './Auth/Components/login-form/login-form';
import { RegisterForm } from './Auth/Components/register-form/register-form';
import { advisoRreservationGuard } from './Guards/adviso-rreservation-guard';
import { Consultant } from './Pages/Consultant/all-consultants/consultant';
import { Questions } from './Pages/questions/questions';
import { OurService } from './Pages/Home/our-service/our-service';
import { RequestRepair } from './Pages/Forms/Components/request-repair/request-repair';
// import { Achive } from './Pages/achievements-communication/achive/achive';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginForm },
    { path: 'register', component: RegisterForm },
    { path: 'home', loadComponent: () => import('./Pages/Home/home/home').then(m => m.Home), title: 'Home' },
    { path: 'achive', loadComponent: () => import('./Pages/sid-components/Complain/achive/achive').then(m => m.Achive), title: 'Achive' },
    { path: 'Satisfaction', loadComponent: () => import('./Pages/sid-components/Complain/satisfaction/satisfaction').then(m => m.Satisfaction), title: 'Satisfaction' },
    // Forms 
    { path: 'HelpPeopole', loadComponent: () => import('./Pages/Forms/Components/help-peopole/help-peopole').then(m => m.HelpPeopole), title: 'HelpPeopole' },
    { path: 'RequesrRepair', component: RequestRepair, title: 'RequestRepair' },
    { path: 'complaints', loadComponent: () => import('./Pages/Forms/Components/complaints/complaints').then(m => m.Complaints), title: 'Complaints' },

    { path: 'our-service', component: OurService, title: 'Our Service' },

    { path: 'all-consultants', component: Consultant, title: 'Consultants', canActivate: [advisoRreservationGuard] },
    { path: 'advisor-details', loadComponent: () => import('../app/Pages/advisor-details/advisor-details').then(m => m.AdvisorDetails), title: 'Advisor Details' },
    { path: 'advisor-reservation', loadComponent: () => import('../app/Pages/reservation/reservation').then(m => m.Reservation), canActivate: [advisoRreservationGuard], title: 'Advisor Reservation' },
    { path: 'must-login', loadComponent: () => import('../app/Pages/must-login/must-login').then(m => m.MustLogin), title: 'Must Login' },

    { path: 'questions', component: Questions, title: 'Questions' },

    { path: 'medical-services', loadComponent: () => import('../app/Pages/medicalservices/medicalservices').then(m => m.Medicalservices), title: 'Medical Services' },
    { path: 'achievements-communication', loadComponent: () => import('../app/Pages/achievements-communication/achievements-communication').then(m => m.AchievementsCommunication), title: 'Achievements Communication' },
    { path: 'report', loadComponent: () => import('../app/Pages/achievements-communication/components/report/report').then(m => m.Report), title: 'Report' },

    {
        path: 'dashboard', loadComponent: () => import('../app/Pages/Dashboard/dashboard').then(m => m.Dashboard), title: 'Dashboard Main', children: [
            { path: '', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-main/dashboard-main').then(m => m.DashboardMain), title: 'Dashboard Main' },
            { path: 'dashboard-main', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-main/dashboard-main').then(m => m.DashboardMain), title: 'Dashboard Main' },
            { path: 'dashboard-advisors', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/dashboard-advisors').then(m => m.DashboardAdvisors), title: 'Dashboard Advisors' },
            { path: 'dashboard-advisor-details/:id', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/components/dashboard-advisors-details/dashboard-advisors-details').then(m => m.DashboardAdvisorsDetails), title: 'Dashboard Advisor Details' },
            { path: 'dashboard-advisor-edit/:id', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/components/edit-advisor/edit-advisor').then(m => m.EditAdvisor), title: 'Dashboard Advisor Edit' },
            { path: 'dashboard-advisor-new', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/components/new-advisor/new-advisor').then(m => m.NewAdvisor), title: 'Dashboard Advisor New' },

            { path: 'dashboard-meditation', loadComponent: () => import('../../src/app/Pages/Dashboard/components/midetation/midetation').then(m => m.Midetation), title: 'Dashboard Meditation' },
            { path: 'dashboard-midetation-new', loadComponent: () => import('../../src/app/Pages/Dashboard/components/midetation/components/add-midetation/add-midetation').then(m => m.AddMidetation), title: 'Dashboard Add Meditation' },
            { path: 'dashboard-midetation-edit/:id', loadComponent: () => import('../app/Pages/Dashboard/components/midetation/components/edit-midetation/edit-midetation').then(m => m.EditMidetation), title: 'Dashboard Edit Meditation' },
            { path: 'dashboard-midetation-details/:id', loadComponent: () => import('../app/Pages/Dashboard/components/midetation/components/midetation-detatils/midetation-detatils').then(m => m.MidetationDetatils), title: 'Dashboard Meditation Details' },
            { path: 'dashboard-consultants', loadComponent: () => import('../app/Pages/Dashboard/components/consultation-management/consultation-management.component').then(m => m.ConsultationManagementComponent), title: 'Dashboard Consultants' },
            { path: 'dashboard-awareness', loadComponent: () => import('../app/Pages/Dashboard/components/awareness/awareness').then(m => m.Awareness), title: 'Dashboard Awareness' },
            { path: 'dashboard-awareness-new-video', loadComponent: () => import('../app/Pages/Dashboard/components/awareness/components/add-new-video/add-new-video').then(m => m.AddNewVideo), title: 'Add New Video' },

            { path: 'dashboard-news', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-news/dashboard-news').then(m => m.DashboardNews), title: 'Dashboard News' },
            { path: 'dashboard-news-new', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-news/components/dashboard-add-news/dashboard-add-news').then(m => m.DashboardAddNews), title: 'Add New News' },
            { path: 'dashboard-news-edit/:id', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-news/components/dashboard-edit-news/dashboard-edit-news').then(m => m.DashboardEditNews), title: 'edit New News' },

            { path: 'dashboard-services', loadComponent: () => import('../app/Pages/Dashboard/components/services/services').then(m => m.ServicesComponent), title: 'Dashboard Services' },
            { path: 'dashboard-new-services', loadComponent: () => import('../app/Pages/Dashboard/components/services/component/add-new-service/add-new-service').then(m => m.AddNewService), title: 'Dashboard New Services' },
            { path: 'dashboard-edit-services/:id', loadComponent: () => import('../app/Pages/Dashboard/components/services/component/edit-services/edit-services').then(m => m.EditServices), title: 'Dashboard Edit Services' },
            { path: 'dashboard-complaints', loadComponent: () => import('../app/Pages/Dashboard/components/complaints/complaints').then(m => m.Complaints), title: 'Complaints' },

            { path: 'complaint-details/:id', loadComponent: () => import('../app/Pages/Dashboard/components/complaints/components/complaint-details/complaint-details').then(m => m.ComplaintDetails), title: 'Complaint Details' },
            { path: 'consultation-management', loadComponent: () => import('../app/Pages/Dashboard/components/consultation-management/consultation-management.component').then(m => m.ConsultationManagementComponent), title: 'Consltation Managment' },
            { path: 'dashboard-help', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-help/dashboard-help').then(m => m.DashboardHelp), title: 'Dashboard Help' },
            { path: 'dashboard-Volunteer', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-volunteer/dashboard-volunteer').then(m => m.DashboardVolunteer), title: 'Dashboard Volunteer' },
        ]
    },
    {
        path: 'advisor-dashboard', loadComponent: () => import('../app/Pages/advisor-dashboard/advisor-dashboard').then(m => m.AdvisorDashboard), title: 'Advisor Dashboard', children: [
            { path: '', loadComponent: () => import('../app/Pages/advisor-dashboard/component/dashboard-main/dashboard-main').then(m => m.DashboardMain), title: 'Advisor Dashboard Main' },
            { path: 'dashboard-main', loadComponent: () => import('../app/Pages/advisor-dashboard/component/dashboard-main/dashboard-main').then(m => m.DashboardMain), title: 'Advisor Dashboard Main' },
            { path: 'dashboard-date', loadComponent: () => import('../app/Pages/advisor-dashboard/component/dashboard-date/dashboard-date').then(m => m.DashboardDate), title: 'Advisor Dashboard Date' },
            { path: 'dashboard-schedule', loadComponent: () => import('../app/Pages/advisor-dashboard/component/dashboard-schedule/dashboard-schedule').then(m => m.DashboardSchedule), title: 'Advisor Dashboard Schedule' },
            { path: 'date-details/:id', loadComponent: () => import('../app/Pages/advisor-dashboard/component/dashboard-date/components/date-details/date-details').then(m => m.DateDetails), title: 'Date Details' }
        ]
    },
    {
        path: 'reconcile-dashboard', loadComponent: () => import('../app/Pages/reconcile-dashboard/reconcile-dashboard').then(m => m.ReconcileDashboard), title: 'Reconcile Dashboard', children: [
            { path: '', loadComponent: () => import('../app/Pages/reconcile-dashboard/components/reconcile-main/reconcile-main').then(m => m.ReconcileMain), title: 'Reconcile Main' },
            { path: 'reconcile-main', loadComponent: () => import('../app/Pages/reconcile-dashboard/components/reconcile-main/reconcile-main').then(m => m.ReconcileMain), title: 'Reconcile Main' }
        ]
    },
    {
        path: 'about-layout',
        loadComponent: () => import('./Pages/sid-components/about-layout/about-layout').then(m => m.AboutLayout),
        title: 'About Layout',
        children: [
            { path: 'about', loadComponent: () => import('./Pages/sid-components/about-layout/Components/About/about-us').then(m => m.AboutUs), title: 'About' },
            { path: 'about-summary', loadComponent: () => import('./Pages/sid-components/about-layout/Components/AboutSummary/about-summary.component').then(m => m.AboutSummaryComponent), title: 'About Summary' },
            { path: 'association', loadComponent: () => import('./Pages/sid-components/about-layout/Components/AssociationSectors/association-sectors.component').then(m => m.AssociationSectorsComponent), title: 'Association Sectors' },
            { path: 'contact-phone', loadComponent: () => import('./Pages/sid-components/about-layout/Components/ContactPhone/contact-phone.component').then(m => m.ContactPhoneComponent), title: 'Contact Phone' },
            { path: 'investment', loadComponent: () => import('./Pages/sid-components/about-layout/Components/InvestmentPlan/investment-plan.component').then(m => m.InvestmentPlanComponent), title: 'Investment Plan' },
            { path: 'national-address', loadComponent: () => import('./Pages/sid-components/about-layout/Components/NationalAddress/national-address.component').then(m => m.NationalAddressComponent), title: 'National Address' },
            { path: 'operational-plan', loadComponent: () => import('./Pages/sid-components/about-layout/Components/OperationalPlan/operational-plan.component').then(m => m.OperationalPlanComponent), title: 'Operational Plan' },
            { path: 'operational-plan-2023', loadComponent: () => import('./Pages/sid-components/about-layout/Components/OperationalPlan2023/operational-plan-2023.component').then(m => m.OperationalPlan2023Component), title: 'Operational Plan 2023' },
            { path: 'registration-certificate', loadComponent: () => import('./Pages/sid-components/about-layout/Components/RegistrationCertificate/registration-certificate.component').then(m => m.RegistrationCertificateComponent), title: 'Registration Certificate' },
            { path: 'service-locations', loadComponent: () => import('./Pages/sid-components/about-layout/Components/ServiceLocations/service-locations.component').then(m => m.ServiceLocationsComponent), title: 'Service Locations' },
            { path: 'strategic-plan', loadComponent: () => import('./Pages/sid-components/about-layout/Components/StrategicPlan/strategic-plan.component').then(m => m.StrategicPlanComponent), title: 'Strategic Plan' },
            { path: 'tasks-authorities', loadComponent: () => import('./Pages/sid-components/about-layout/Components/TasksAuthorities/tasks-authorities.component').then(m => m.TasksAuthoritiesComponent), title: 'Tasks Authorities' },
            { path: 'vision-mission', loadComponent: () => import('./Pages/sid-components/about-layout/Components/VisionMission/vision-mission.component').then(m => m.VisionMissionComponent), title: 'Vision Mission' },
            { path: 'general-assembly', loadComponent: () => import('./Pages/sid-components/about-layout/Components/general-assembly/general-assembly').then(m => m.GeneralAssembly), title: 'General Assembly' },
            { path: 'board-members', loadComponent: () => import('./Pages/sid-components/about-layout/Components/board-members/board-members').then(m => m.BoardMembers), title: 'Board Members' },
            { path: 'board-duties', loadComponent: () => import('./Pages/sid-components/about-layout/Components/board-duties/board-duties').then(m => m.BoardDuties), title: 'Board Duties' },
            { path: 'organizational-structure', loadComponent: () => import('./Pages/sid-components/about-layout/Components/organizational-structure/organizational-structure').then(m => m.OrganizationalStructure), title: 'Organizational Structure' },
            { path: '', loadComponent: () => import('./Pages/sid-components/about-layout/Components/About/about-us').then(m => m.AboutUs), title: 'About' },
        ]
    }
    ,

    { path: 'questions', component: Questions, title: 'Questions' },

    { path: 'questions', component: Questions, title: 'Questions' },

    { path: 'not-found', loadComponent: () => import('../app/Pages/not-found/not-found').then(m => m.NotFound), title: 'Page Not Found' },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' }





];
