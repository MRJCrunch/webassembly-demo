import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as loader from "@assemblyscript/loader";

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.scss']
})
export class Example2Component implements OnInit {
  constructor() { }

  private isPrimeWasm;
  private wasmFunctions;

  ngOnInit(): void {
    WebAssembly.instantiateStreaming(fetch('assets/wa/example2/1.wasm'), {})
    .then(obj => {
      const { isPrime } = obj.instance.exports;
      this.isPrimeWasm = isPrime;
    });


    loader.instantiate(fetch('assets/wa/example2/2.wasm'))
    .then(({ exports }) => {
      this.wasmFunctions = exports;
    });

    this.prepareArray()
  }

  public arrayForSort;
  public sortedTimeWithJs;
  public sortedTimeWithWasm;

  public primeResultJs;
  public primeResultWasm;

  isPrime(x) {
    for (let i = 2; i < x; i++) {
        if (x % i === 0) {
            return false;
        }
    }

    return true;
  }

  calculatePrimeJS() {
    let start = performance.now()
    const result = this.isPrime(492876863)
    let end = performance.now()
    this.primeResultJs = `${end - start} ms, result: ${result}`
  }

  calculatePrimeWasm() {
    let start = performance.now()
    const result = this.isPrimeWasm(492876863)
    let end = performance.now()
    this.primeResultWasm = `${end - start} ms, result: ${result}`
  }

  // 2
  
  prepareArray() {
    this.arrayForSort = new Array(10000).fill(0).map(() => Math.floor(Math.random() * 100000))
  }

  bubbleSort(arr) {
    const len = arr.length;
      for (let i = 0; i < len; i++) {
          for (let j = 0; j < len; j++) {
              if (arr[j] > arr[j + 1]) {
                  const tmp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = tmp;
              }
          }
      }
      return arr;
  }

  sortArrayWithJs() {
    const arr = [...this.arrayForSort]
    const start = performance.now()
    this.bubbleSort(arr)
    const end = performance.now()

    this.sortedTimeWithJs = `${end - start} ms, result: [${arr.slice(arr.length-5)}]`
  }

  sortWithWasm() {
    let arrayPtr = this.wasmFunctions.__pin(this.wasmFunctions.__newArray(this.wasmFunctions.Int32Array_ID, [
      ...this.arrayForSort
    ]))

    const start = performance.now()
    this.wasmFunctions.bubbleSort(arrayPtr)
    const end = performance.now()

    const result = this.wasmFunctions.__getArrayView(arrayPtr)
    this.sortedTimeWithWasm = `${end - start} ms, result: [${result.slice(result.length-5)}]`
    // this.wasmFunctions.__getArrayView(arrayPtr)
    this.wasmFunctions.__unpin(arrayPtr)
  }
}
