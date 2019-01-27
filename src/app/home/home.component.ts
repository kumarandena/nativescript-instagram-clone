import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { screen } from "platform";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { PhotosService } from "../core/photos.service";
import { CameraService } from "../core/camera.service";
import { FileReaderService } from "../core/fileReader.service";
  
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    photoWidth: number = screen.mainScreen.widthDIPs * 0.33333;
    photoHeight: number = this.photoWidth;

    photos: string[] = [];

    instagram: any[] = [];

    constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private photosService: PhotosService, private camera: CameraService, private page: Page, private fileReader: FileReaderService) {
        this.photos = this.photosService.getPhotos();
        this.letsInitialize();
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    letsInitialize() {
        this.fileReader.readJSON('/app/core/instagram.json').then(
            res => {
                this.instagram = res["instagram"];
            },
            err => {
                console.log('Error reading json: ' + JSON.stringify(err));
            }
        )
    }

    takePhoto() {

        this.camera.takePhoto()
            .then(imageAsset => {
                this.photosService.setTakenPhoto(imageAsset);
                this.routerExtensions.navigate(['take-picture'], { relativeTo: this.route, animated: false });
            }).catch(err => {
                console.log(err.message);
            });
    }

    selectedRoute: string = 'home';

    onNavtap(route: string) {
        this.selectedRoute = route;
    }

}
