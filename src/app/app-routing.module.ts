import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoOneComponent } from './demo-one/demo-one.component';


const routes: Routes = [
  {
    path: '', component: AppComponent, children:
      [
        { path: '', redirectTo: 'demo-one', pathMatch: 'full' },
        { path: 'demo-one', component: DemoOneComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
