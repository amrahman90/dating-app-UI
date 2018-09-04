import { Routes } from '@angular/router';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ListsComponent } from './components/lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/message.resolver';
import { HomeComponent } from './components/home/home.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { LoginComponent } from './components/login/login.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },

    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver} },
            { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
            { path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] },
            { path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
            { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full'},
];
