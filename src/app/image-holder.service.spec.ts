import { TestBed } from '@angular/core/testing';

import { ImageHolderService } from './image-holder.service';

describe('ImageHolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageHolderService = TestBed.get(ImageHolderService);
    expect(service).toBeTruthy();
  });
});
