

export default{
    bind (el, binding) {
        el.addEventListener('mouseenter', e => {
            el.appendChild('<div>11111</div>>')

        }, false)
    }
}
