import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PhotosService } from "./core/photos.service";
import { CameraService } from "./core/camera.service";
import { LocalStorage } from "./core/local-storage.service";
import { FileReaderService } from "./core/fileReader.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [PhotosService, CameraService, LocalStorage, FileReaderService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
