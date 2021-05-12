(module
  (import "module" "memory" (memory 1))
  (import "module" "table" (table 1 funcref))
  (type $void_to_i32 (func (result i32)))
  (func (export "getResult") (result i32)
   i32.const 0
   i32.const 42
   i32.store
   i32.const 0
   call_indirect (type $void_to_i32))
)