(module
  (import "module" "externalFunction" (func $externalFunction (param i32) (result i32)))
  (func (export "calculate") (param i32) (result i32)
    local.get 0
    i32.const 10
    i32.mul
    call $externalFunction
    i32.const 5
    i32.mul))