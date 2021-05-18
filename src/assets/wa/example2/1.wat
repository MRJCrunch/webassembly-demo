(module
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (memory $0 0)
 (export "isPrime" (func $assembly/index/isPrime))
 (export "memory" (memory $0))
 (func $assembly/index/isPrime (param $0 i32) (result i32)
  (local $1 i32)
  i32.const 2
  local.set $1
  loop $for-loop|0
   local.get $0
   local.get $1
   i32.gt_s
   if
    local.get $0
    local.get $1
    i32.rem_s
    i32.eqz
    if
     i32.const 0
     return
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  i32.const 1
 )
)
