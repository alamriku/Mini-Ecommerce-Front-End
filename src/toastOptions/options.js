const toastOptions = {
    theme: 'outline',
    position: 'top-right',
    dontClose : true,
    action : [
        {
            text: 'close',
            onClick : (e, toastObject) => {
                toastObject.goAway(0);
            }
        },
    ],
};

export default {
    toastOptions
}