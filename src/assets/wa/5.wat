(module
  (memory (import "module" "memory") 1)
  (func $sum (export "sum") (param $ptr i32) (param $len i32) (result i32)
    (local $end i32) (local $sum i32)
    local.get $ptr
    local.get $len
    i32.const 4
    i32.mul
    i32.add
    local.set $end
    block $label0
      loop $label1
        local.get $ptr
        local.get $end
        i32.eq
        br_if $label0
        local.get $sum
        local.get $ptr
        i32.load
        i32.add
        local.set $sum
        local.get $ptr
        i32.const 4
        i32.add
        local.set $ptr
        br $label1
      end $label1
    end $label0
    local.get $sum
  )
)