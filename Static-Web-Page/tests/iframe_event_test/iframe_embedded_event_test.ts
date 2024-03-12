function init2() 
{
    var body = document.getElementsByTagName('body')[0] as HTMLBodyElement
    /*body.addEventListener('mousemove', (e: MouseEvent) => {
        console.log('iframe: x = ' + e.clientX + ', y=' + e.clientY)
        const event = new Event('child_ev')
        parent.document.dispatchEvent(event)
    })*/
}

window.onload = init2

