import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'signup/:billId',
    loadChildren: () => import ('./pages/signup/signup.module').then(m => m.SignupPageModule),
    canActivate: [AuthGuard]
   },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./pages/reset-password/reset-password.module').then(
        m => m.ResetPasswordPageModule
      )
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  { path: 'landing', 
    loadChildren: () => 
      import('./pages/landing/landing.module').then(m => m.LandingPageModule)
  },
  { path: 'bill-create', 
    loadChildren: () => import('./pages/bill-create/bill-create.module').then(m => m.BillCreatePageModule),
    canActivate: [AuthGuard]  
  },
  { path: 'bill-detail/:id', 
    loadChildren: () => import('./pages/bill-detail/bill-detail.module').then(m => m.BillDetailPageModule),
    canActivate: [AuthGuard] 
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
