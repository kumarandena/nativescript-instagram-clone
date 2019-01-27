import { Component, OnInit } from '@angular/core';
import { ImageAsset } from "tns-core-modules/image-asset";
import { PhotosService } from '../core/photos.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { CameraService } from '../core/camera.service';
import { isIOS } from "tns-core-modules/platform";

@Component({
    moduleId: module.id,
    selector: 'app-take-picture',
    templateUrl: './take-picture.component.html',
    styleUrls: ['./take-picture.component.css']
})

export class TakePictureComponent implements OnInit {

    public isIOS;

    photo: ImageAsset;
    filter: string = 'transparent';


    constructor(private photosService: PhotosService, private routerExtensions: RouterExtensions, private camera: CameraService, private route: ActivatedRoute) {
        this.isIOS = isIOS;
    }

    ngOnInit(): void {
        this.photo = this.photosService.getTakenPhoto();
        console.log(" photo value = " + JSON.stringify(this.photo));
    }

    goBack() {
        this.routerExtensions.back();
    }

    takePhoto() {

        this.camera.takePhoto()
            .then(imageAsset => {
                this.photo = imageAsset;
            }).catch(err => {
                this.routerExtensions.navigate(['home'], {
                    clearHistory: true
                });
                console.log(err.message);
            });
    }

    applyFilter(color: string) {
 
        this.filter = color;

    }

    usePhoto() {

        /*
        get the base64 of the image and uploat it to some server here, 
        get URL and save it to the array if everything is fine
       
        const source = new ImageSource();
        source.fromAsset(this.photo).then((imageSource: ImageSource) => {
    
        let imageString =  imageSource.toBase64String('png',70);
        console.log('BASE64 image length is: '+ imageString.length + " and is : " + imageString);
        
    });  */

        //instead we will use some random beautiful pic from pixabay
        this.photosService.addPhoto();
        this.routerExtensions.navigate(['home'], { clearHistory: true });

    }
}