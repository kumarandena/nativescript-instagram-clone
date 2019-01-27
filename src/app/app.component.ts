import { Component } from "@angular/core";
import { requestPermissions } from "nativescript-camera";
import { PhotosService } from "./core/photos.service";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {

    constructor(private photosService: PhotosService){
        requestPermissions();

        this.photosService.getFromLocalStorage(); 
        
    }
 }
