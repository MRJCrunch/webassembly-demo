import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit {
  // 1
  public leftParam1: number;
  public rightParam1: number;
  public result1: number;
  private function1;

  // 2
  public leftParam2: number;
  public result2: number;
  private function2; 

  // 3
  public param3;
  public result3;
  private function3;

  // 4
  public result4 = new WebAssembly.Global({value:'i32', mutable:true}, 3);
  private function4;

  // 5
  public input5 = [1,2,3,4,5];
  private memory = new WebAssembly.Memory({initial:1, maximum:10});
  public result5;
  private function5;

  // 6
  private function6;
  public result6;

  // 7
  private function7;
  public result7;

  constructor() { 

  }

  ngOnInit(): void {
    // 1
    WebAssembly.instantiateStreaming(fetch('assets/wa/example1/1.wasm'), {})
      .then(obj => {
        const { add } = obj.instance.exports;
        this.function1 = add;
      });

    // 2
    WebAssembly.instantiateStreaming(fetch('assets/wa/example1/2.wasm'), {})
      .then(obj => {
        const { getResult } = obj.instance.exports;
        this.function2 = getResult;
      });

    // 3
    WebAssembly.instantiateStreaming(fetch('assets/wa/example1/3.wasm'), {
      module: {
        externalFunction: (input) => input + 111
      }
    })
      .then(obj => {
        const { calculate } = obj.instance.exports;
        this.function3 = calculate;
      });

    // 4
    WebAssembly.instantiateStreaming(fetch('assets/wa/example1/4.wasm'), {
      module: {
        global: this.result4
      }
    })
      .then(obj => {
        const { increment } = obj.instance.exports;
        this.function4 = increment;
      });

    // 5
    WebAssembly.instantiateStreaming(fetch('assets/wa/example1/5.wasm'), {
      module: {
        memory: this.memory
      }
    })
      .then(obj => {
        const { sum } = obj.instance.exports;
        this.function5 = sum;
      });

    // 6
    WebAssembly.instantiateStreaming(fetch('assets/wa/example1/6.wasm'), {})
      .then(obj => {
        const { callByIndex } = obj.instance.exports;
        this.function6 = callByIndex;
      });

    // 7
    const importObj = {
      module: {
        memory : new WebAssembly.Memory({ initial: 1 }),
        table : new WebAssembly.Table({ initial: 1, element: "anyfunc" })
      }
    };
    
    Promise.all([
      WebAssembly.instantiateStreaming(fetch('assets/wa/example1/71.wasm'), importObj),
      WebAssembly.instantiateStreaming(fetch('assets/wa/example1/72.wasm'), importObj)
    ]).then((results) => {
      const { getResult } = results[1].instance.exports;
      this.function7 = getResult;
    });
  }

  calculate1() {
    this.result1 = this.function1(this.leftParam1, this.rightParam1)
  }

  calculate2() {
    this.result2 = this.function2(this.leftParam2)
  }

  calculate3() {
    this.result3 = this.function3(this.param3)
  }

  calculate41() {
    this.result4.value++;
  }

  calculate42() {
    this.function4()
  }

  calculate5() {
    const i32Buffer = new Uint32Array(this.memory.buffer);
    i32Buffer.set(this.input5, 0);
    this.result5 = this.function5(0, this.input5.length)
  }

  calculate6(index: number) {
    this.result6 = this.function6(index)
  }

  calculate7() {
    this.result7 = this.function7()
  }
}
