import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Page } from "ui/page";
import { screen } from "platform";
import { PhotosService } from "../core/photos.service";
import { CameraService } from "../core/camera.service";
import { FileReaderService } from "../core/fileReader.service";
import { FilterComponent } from "./filter/filter.component";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
}) 
export class HomeComponent implements OnInit {

    photoWidth: number = screen.mainScreen.widthDIPs * 0.33333;
    photoHeight: number = this.photoWidth;

    photos: string[] = [];

    instagram: any[] = [];

    constructor( private photosService: PhotosService, private camera: CameraService, private page: Page, private fileReader: FileReaderService, private modal: ModalDialogService, private vref: ViewContainerRef) {
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
                this.onNavtap('loading');
                const options: ModalDialogOptions = {
                    context: imageAsset,
                    viewContainerRef: this.vref,
                    fullscreen: true
                };
                setTimeout(() => { //https://github.com/NativeScript/NativeScript/issues/5744#issuecomment-384589739
                this.modal.showModal(FilterComponent, options).then((response) => {
                    if (response == 'success') {
                        this.onNavtap('profile');
                    }
                    else { 
                        this.onNavtap('home');
                    }
                }, error => {
                    console.log(error);
                });
            }, 1);

            }).catch(err => {
                console.log(err.message);
            });
    }

    selectedRoute: string = 'home';

    onNavtap(route: string) {
        this.selectedRoute = route;
    }
}
