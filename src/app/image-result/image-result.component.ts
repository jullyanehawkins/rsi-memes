import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Image } from '../image';

@Component({
  selector: 'app-image-result',
  templateUrl: './image-result.component.html',

})
export class ImageResultComponent implements OnInit {
  images: any[];
  imagesFound: boolean = false;
  searching: boolean = false;

  handleSuccess(data) {
    this.imagesFound = true;
    this.images = data.hits;
    console.log(data.hits);
  }

  handleError(error) {
    console.log(error);
  }
  constructor(private imageService: ImageService) { }

  searchImage(query: string) {
    this.searching = true;
    return this.imageService.getImage(query).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }
  ngOnInit() {

  }

}
