import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare const Module;

@Component({
  selector: 'app-example3',
  templateUrl: './example3.component.html',
  styleUrls: ['./example3.component.scss']
})
export class Example3Component implements OnInit {
  @ViewChild('jpegImg') jpegImg: ElementRef;
  @ViewChild('webpImg') webpImg: ElementRef;

  public result1;

  private width;
  private height;
  private api;
  private imageData;
  constructor() { }

  ngOnInit(): void {
    const node1 = document.createElement('script'); // creates the script tag
    node1.src = 'assets/wa/example3/factorial.js'; // sets the source (insert url in between quotes)
    node1.type = 'text/javascript'; // set the script type
    // append to head of document
    document.getElementsByTagName('head')[0].appendChild(node1); 

    node1.onload = () => {
      Module.onRuntimeInitialized = async _ => {
        this.api = {
          factorial: Module.cwrap('factorial', 'number', ['number']),
        };
      };  
    }



    const node2 = document.createElement('script'); // creates the script tag
    node2.src = 'assets/wa/example3/webp.js'; // sets the source (insert url in between quotes)
    node2.type = 'text/javascript'; // set the script type
    // append to head of document
    document.getElementsByTagName('head')[0].appendChild(node2); 

    node2.onload = () => {
      Module.onRuntimeInitialized = async _ => {
        this.api = {
          ...this.api, 
          create_buffer: Module.cwrap('create_buffer', 'number', ['number', 'number']),
          destroy_buffer: Module.cwrap('destroy_buffer', '', ['number']),
          encode: Module.cwrap('encode', '', ['number', 'number', 'number', 'number']),
          get_result_pointer: Module.cwrap('get_result_pointer', 'number', []),
          get_result_size: Module.cwrap('get_result_size', 'number', []),
          free_result: Module.cwrap('free_result', '', ['number']),
        };
      };  
    }
  }


  public calculateFactorial() {
    this.result1 = this.api.factorial(5)
  }


  public async onInputChange(file) {
    const bitmap = await createImageBitmap(file)
    const [width, height] = [bitmap.width, bitmap.height];
    this.width = width
    this.height = height

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(bitmap, 0, 0);

    this.imageData = ctx.getImageData(0, 0, width, height)

    this.jpegImg.nativeElement.src = URL.createObjectURL(file)
    this.jpegImg.nativeElement.onload = () => {
      this.width = this.jpegImg.nativeElement.width
      this.height = this.jpegImg.nativeElement.height
    }
  }

  public encode() {
    const pointer = this.api.create_buffer(this.width, this.height)

    Module.HEAP8.set(this.imageData.data, pointer);
    this.api.encode(pointer, this.width, this.height, 100);
    const resultPointer = this.api.get_result_pointer();
    const resultSize = this.api.get_result_size();

    // Note: new Uint8Array(someBuffer) will create a new view onto the same memory chunk, while new Uint8Array(someTypedArray) will copy the data.

    const resultView = new Uint8Array(Module.HEAP8.buffer, resultPointer, resultSize);
    const result = new Uint8Array(resultView);

    this.api.free_result(resultPointer);
    this.api.destroy_buffer(pointer);

    const blob = new Blob([result], {type: 'image/webp'});
    const blobURL = URL.createObjectURL(blob);
    this.webpImg.nativeElement.src = blobURL;
  }
}
