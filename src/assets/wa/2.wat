(module
  (func $getSalt (result i32)
    i32.const 111)
  (func (export "getResult") (param i32) (result i32)
    local.get 0
    call $getSalt
    i32.mul))