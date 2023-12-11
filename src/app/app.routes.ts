import { Routes } from '@angular/router';
import { ListComponent } from './movies/list/list.component';

export const routes: Routes = [
    {
        path : '', title: 'Home Movies', component: ListComponent,
    }
];