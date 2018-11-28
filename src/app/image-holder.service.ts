import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageHolderService {
  private imageData: string; // base 64 image data
  constructor() {
    this.imageData = '';
  }

  /**
   * Retain image data into holder
   * @param imgData b64 string containing image data
   */
  public keepImage(imgData: string): void {
    console.log('image kept: ', imgData && imgData.substr(0, 50));
    this.imageData = imgData;
  }

  /**
   * Get retained image data
   */
  public getImage(): string {
    return this.imageData;
  }

  /**
   * Clear retained data
   */
  public clearImage(): void {
    this.imageData = '';
  }
}
