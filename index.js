export default {
    inserted(el, binding, vnode) {
        const props = binding.value

        if (props == null) {
            throw new Erorr('please, provide value for animate directive')
        }

        // init
        el.style.opacity = 0
        el.classList.add('animated')

        // listen for changes
        const eventNames = ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend']
        eventNames.map(item =>
            el.addEventListener(item, () =>
                el.classList.remove(props.name)
            )
        )

        // animate
        if (!props.active) {el.style.opacity = 0; return}
        setTimeout(() => {el.style.opacity = 1; el.classList.add(props.name)}, props.delay || 0)

    },

    update(el, binding, vnode) {
        const props = binding.value
        const oldProps = binding.oldValue

        // reduces number of unnecessarily fired animations
        if (oldProps.active === true && props.active === true) { return }

        // animate
        if (!props.active) {el.style.opacity = 0; return}
        setTimeout(() => {el.style.opacity = 1; el.classList.add(props.name)}, props.delay || 0)
    }
}