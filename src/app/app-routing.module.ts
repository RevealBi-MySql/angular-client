import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { ErrorRoutingModule } from './error-routing/error-routing.module';
import { ViewerComponent } from './viewer/viewer.component';
import { EditorComponent } from './editor/editor.component';

export const routes: Routes = [
  { path: '', redirectTo: 'viewer', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  {
    path: 'viewer',
    component: ViewerComponent,
    data: {
      text: 'Viewer'
    }
  },
  {
    path: 'editor',
    component: EditorComponent,
    data: {
      text: 'Editor'
    }
  },
  { path: '**', component: PageNotFoundComponent } // must always be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ErrorRoutingModule],
  exports: [RouterModule, ErrorRoutingModule]
})
export class AppRoutingModule {
}
