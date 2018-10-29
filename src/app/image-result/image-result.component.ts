import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Images } from '../image';

@Component({
  selector: 'app-image-result',
  templateUrl: './image-result.component.html',

})
export class ImageResultComponent implements OnInit {
  searchQuery: '';
  images: any[];
  imagesFound: boolean = false;
  searching: boolean = false;

  handleSuccess(response) {
    this.imagesFound = true;
    this.images = response.data.map( (image) => {

      return {
        id: image.id,
        embed_url: image.embed_url,
        title: image.title ,
        url: image.url,
        downsized_url: image.images.downsized.url
      };
    });
    console.log(this.images);
  }

  handleError(error) {
    console.log(error);
  }
  constructor(private imageService: ImageService) { }

  onSubmit(query: string) {
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
