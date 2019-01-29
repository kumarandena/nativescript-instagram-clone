import { Injectable } from '@angular/core';
import { ImageAsset } from "tns-core-modules/image-asset";
import { LocalStorage } from './local-storage.service';

@Injectable()
export class PhotosService {

    private takenPhoto: ImageAsset;

    private photos: string[] = [
        'https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
        'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg',
        'https://cdn.pixabay.com/photo/2018/09/22/17/05/ara-3695678__480.jpg',
        'https://cdn.pixabay.com/photo/2018/09/25/21/54/hedgehog-3703244__480.jpg',
        'https://cdn.pixabay.com/photo/2018/09/26/21/24/sweet-corn-3705687__480.jpg'
    ];

    private photoExamples: string[] = [
        'https://cdn.pixabay.com/photo/2018/12/29/23/49/rays-3902368__480.jpg',
        'https://cdn.pixabay.com/photo/2018/08/06/16/30/mushroom-3587888__480.jpg',
        'https://cdn.pixabay.com/photo/2018/12/28/01/34/rum-3898745__480.jpg',
        'https://cdn.pixabay.com/photo/2018/07/16/13/17/kiss-3541905__480.jpg',
        'https://cdn.pixabay.com/photo/2018/12/09/14/44/leaf-3865014__480.jpg',
        'https://cdn.pixabay.com/photo/2018/09/12/12/14/photographer-3672010__480.jpg',
        'https://cdn.pixabay.com/photo/2018/11/11/16/51/ibis-3809147_1280.jpg',
        'https://cdn.pixabay.com/photo/2018/11/29/21/19/hamburg-3846525_1280.jpg',
        'https://cdn.pixabay.com/photo/2018/11/04/20/21/harley-davidson-3794909__480.jpg',
        'https://cdn.pixabay.com/photo/2018/11/23/14/19/forest-3833973__480.jpg',
        'https://cdn.pixabay.com/photo/2018/11/17/22/15/tree-3822149__480.jpg',
        'https://cdn.pixabay.com/photo/2018/11/06/14/01/pair-3798371__480.jpg',
        'https://cdn.pixabay.com/photo/2018/11/15/22/52/wolf-3818343__480.jpg',
        'https://cdn.pixabay.com/photo/2018/10/31/22/42/surprised-3786845__480.jpg',
        'https://cdn.pixabay.com/photo/2018/05/03/22/34/lion-3372720__480.jpg',
        'https://cdn.pixabay.com/photo/2018/10/05/22/53/sheep-3727049__480.jpg',
        'https://cdn.pixabay.com/photo/2018/04/04/10/11/portrait-3289372__480.jpg',
        '',
    ];

    constructor(private localStorage: LocalStorage) { }

    getPhotos() {
        return this.photos;
    }

    addPhoto() {

        const photoToAdd: string = this.photoExamples[Math.floor(Math.random() * (this.photoExamples.length - 1)) + 1];
        this.photos.unshift(photoToAdd);
        this.localStorage.saveValue(JSON.stringify(this.photos), 'photos');
    }

    getFromLocalStorage() {
        if (!this.localStorage.getValue('photos')) {
            console.log('FIRST TIME, SAVING VALUES');
            this.localStorage.saveValue(JSON.stringify(this.photos), 'photos');
        } else {
            console.log('NOT FIRST TIME, GETTING VALUES');
            this.photos = JSON.parse(this.localStorage.getValue('photos'));
        }

    }
}