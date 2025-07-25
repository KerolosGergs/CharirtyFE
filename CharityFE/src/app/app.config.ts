import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';


import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { provideToastr } from 'ngx-toastr';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: 'ar' },

    // Required for animations
    provideToastr({
      timeOut: 4000, // ✔️ Auto dismiss after 4s
      extendedTimeOut: 1000,
      closeButton: true, // ✔️ Show close button
      tapToDismiss: true, // ✔️ Allow clicking anywhere to dismiss
      progressBar: true,
      positionClass: 'toast-top-center',
      toastClass: 'ngx-toastr animate__animated animate__fadeInDown', // ✔️ Animate.css support
      preventDuplicates: true,
      enableHtml: false
    }),
      provideAnimationsAsync(),
    importProvidersFrom(
      MatDatepickerModule,
      MatFormFieldModule,
      MatInputModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatSlideToggleModule,
      MatButtonModule
    )

  ]
};
