import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";
import { TakePictureComponent } from "../filter-screen/take-picture.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: 'take-picture', component: TakePictureComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
