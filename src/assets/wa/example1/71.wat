(module
  (import "module" "memory" (memory 1))
  (import "module" "table" (table 1 funcref))
  (elem (i32.const 0) $sharedFunc)
  (func $sharedFunc (result i32)
   i32.const 0
   i32.load)
)