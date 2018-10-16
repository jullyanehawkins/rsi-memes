import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Image } from './image';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RSI ABQ Meme Generator';

  constructor (private imageService: ImageService) {
  }
  ngOnInit() {
    this.getImage();
  }
   getImage() {
    this.imageService.getImage().subscribe((data:  <Image[]>) => {
        this.image  =  data;
        console.log(data);
    });
}
}
}
