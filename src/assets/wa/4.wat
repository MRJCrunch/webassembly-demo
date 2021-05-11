(module
   (global $g (import "module" "global") (mut i32))
   (func (export "increment")
        global.get $g
        i32.const 2
        i32.add
        global.set $g)
)