import { getGooglePosition } from "../../../../core/state-manager.js";
export function GoogleComponent(x, y) {
    const element = document.createElement('img');
    render(element)
    return { element };
}

async function render(element) {

    const googlePosition = await getGooglePosition()
    element.src = './ui/assets/images/google.png';

}