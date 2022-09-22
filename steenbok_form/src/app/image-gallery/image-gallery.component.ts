import { Component, Input, OnInit } from '@angular/core';
import { sampleImage } from 'src/assets/constants';
@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent {
  @Input() imageList: any
  constructor() { }
  sampleImage = sampleImage
}
