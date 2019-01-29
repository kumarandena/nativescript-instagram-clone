import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ImageAsset } from "tns-core-modules/image-asset";
import { isIOS } from "tns-core-modules/platform";
import { PhotosService } from '../../core/photos.service';
import { CameraService } from '../../core/camera.service';

@Component({
	selector: "Filter",
	moduleId: module.id,
	templateUrl: "./filter.component.html",
	styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

	public isIOS;
	photo: ImageAsset;
	filter: string = 'transparent';

	constructor(
		private params: ModalDialogParams,
		private photosService: PhotosService,
		private camera: CameraService
	) {
		this.isIOS = isIOS;
		this.photo = params.context;
	}

	ngOnInit(): void {
	}

	takePhoto() {

		this.camera.takePhoto()
			.then(imageAsset => {
				this.photo = imageAsset;
			}).catch(err => {
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
		this.onClose('success');
	}

	onClose(status: string) {
		this.params.closeCallback(status);
	}
}