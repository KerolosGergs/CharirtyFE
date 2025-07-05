import { Routes } from '@angular/router';
import path from 'path';
import { Login } from './Auth/login/login';
import { Register } from './Auth/register/register';
import { Home } from './Pages/Home/home/home';

export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: Login },
            { path: 'register', component: Register }

            , {
                path: 'User',
                children: [
                    { path: 'home', component: Home },
                ]

            }
        ]
    }



];
