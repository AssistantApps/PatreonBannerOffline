export const setDocumentTitle = (title: string) => {
    document.title = getNewDocumentTitle(title);
}

export const getNewDocumentTitle = (title: string) => `${title} - Support Banner by AssistantApps`;

export const setBodyLoadingClass = (isLoading: boolean) => {
    if (isLoading) {
        document.body.classList.add('is-loading');
    } else {
        document.body.classList.remove('is-loading');
    }
}

// export const setBodyOverflowClass = (dialogIsOpen: boolean) => {
//     if (dialogIsOpen) {
//         document.body.classList.add('overflow-hidden');
//     } else {
//         document.body.classList.remove('overflow-hidden');
//     }
// }

export const updateCustomStyleTag = (tagName: string, cssContent: string) => {
    const head: any = document.head || document.getElementsByTagName('head')[0];

    if (head == null) return;

    const exitingScriptTag = [...head.childNodes].find((cn: any) => cn.id === tagName);
    if (exitingScriptTag != null) {
        exitingScriptTag.remove();
    }

    const styleElem: any = document.createElement('style');

    styleElem.type = 'text/css';
    styleElem.id = tagName;
    if (styleElem.styleSheet) {
        // This is required for IE8 and below.
        styleElem.styleSheet.cssText = cssContent;
    } else {
        styleElem.appendChild(document.createTextNode(cssContent));
    }

    head.appendChild(styleElem);
}


export const preventDefault = (e: any) => e?.preventDefault?.();
export const noContextMenu = (e: any) => e?.preventDefault?.();
