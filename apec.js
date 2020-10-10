const pageHeaders = document.getElementsByClassName('pageHeader');
const pages = document.getElementsByClassName('form-page');
let currentPageIndex = 0;
const red = "#f05428";
const white = "#fffafa";

const nextSection = () => {
    if(!isThisPageInputValid()) {
        return;
    }

    clearCurrentPageStyle();
    currentPageIndex = Math.min(2, ++currentPageIndex);
    loadNewCurrentPage();

}

const isThisPageInputValid = () => {
    const activePage = document.getElementsByClassName('form-page active');
    const elements = activePage[0].getElementsByClassName('page-content');

    let areInputsValid = true; 
    for(const element of elements) {
        if(!element.checkValidity()){
            areInputsValid = false;
            if(element.classList.contains("invalid-input-parent")) {
                continue;
            }
            addWarningAndClassToElement(element);
        }else{
            if(element.classList.contains("invalid-input-parent")) {
                element.classList.remove("invalid-input-parent");
                element.parentElement.removeChild(element.nextSibling);
            }
        }
    }

    if(areInputsValid){
        clearInvalidWarnings();
    }

    return areInputsValid;
}

const clearInvalidWarnings = () => {
    const elements = document.getElementsByClassName('invalid-input-warning');
    for (const element of elements) {
        element.parentNode.removeChild(element);
    }
}

const addWarningAndClassToElement = (element) => {
    element.classList.add("invalid-input-parent");
    const paragraph = document.createElement("p");
    const textNode = document.createTextNode("Required, check format");
    paragraph.classList.add("invalid-input-warning");
    paragraph.appendChild(textNode);
    element.insertAdjacentElement("afterend", paragraph);
}

const clearCurrentPageStyle = () => {
    pageHeaders[currentPageIndex].style.borderColor =  white;
    pages[currentPageIndex].style.display = "none";
    pages[currentPageIndex].classList.remove('active');
}

const loadNewCurrentPage = () => {
    pageHeaders[currentPageIndex].style.borderColor =  red;
    pages[currentPageIndex].style.display = "block";
    pages[currentPageIndex].classList.add('active');
}

const previousSection = () => {
    if(!isThisPageInputValid()) {
        return;
    }

    clearCurrentPageStyle();
    currentPageIndex = Math.max(0, --currentPageIndex);
    loadNewCurrentPage();
}

const onPageHeaderClick = (pageHeaderIndex) => {
    if(!isThisPageInputValid()) {
        return;
    }

    clearCurrentPageStyle();
    currentPageIndex = pageHeaderIndex;
    loadNewCurrentPage();
}
