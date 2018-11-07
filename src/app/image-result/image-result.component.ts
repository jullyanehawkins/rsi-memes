import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Images } from '../image';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-image-result',
  templateUrl: './image-result.component.html'
})
export class ImageResultComponent implements OnInit {
  searchQuery: '';
  images: any[];
  imagesFound: boolean = false;
  searching: boolean = false;
  url = '';
  file;
  selectedFile = null;

  constructor(private imageService: ImageService, private storageService: StorageService) { }


  handleSuccess(response) {
    this.imagesFound = true;
    this.images = response.data.map(image => {
      return {
        id: image.id,
        embed_url: image.embed_url,
        title: image.title,
        url: image.url,
        downsized_url: image.images.downsized.url
      };
    });
    console.log(this.images);
  }

  handleError(error) {
    console.log(error);
  }

  onSubmit(query: string) {
    this.searching = true;
    return this.imageService
      .getImage(query)
      .subscribe(
        data => this.handleSuccess(data),
        error => this.handleError(error),
        () => (this.searching = false)
      );
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();


      reader.readAsDataURL(event.target.files[0]);

      this.file = event.target.files[0];

      reader.onload = event => {
        this.url = event.target.result;
      };
    }
  }

  onUpload() {
    // let reader = new FileReader();
    // reader.readAsDataURL(file);

    console.log(this.file);
    this.storageService.upload(this.file,
      (res) => { console.log(res) },
      (res) => { console.log(res) },
      null);
  }

  ngOnInit() { }
}


