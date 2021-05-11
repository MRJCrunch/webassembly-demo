import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';
import { Example3Component } from './example3/example3.component';

const routes: Routes = [
  { path: 'example-1', component: Example1Component },
  { path: 'example-2', component: Example2Component },
  { path: 'example-3', component: Example3Component },
  { path: '**', redirectTo: 'example-1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
