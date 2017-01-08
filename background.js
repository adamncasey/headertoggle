var exts = {
    "h": "cpp",
    "cpp": "h"
}

var funcs = {
    "toggle-h-to-cpp": () => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            if(tabs.length == 0) {
                return;
            }
            var url = new URL(tabs[0].url);

            var urlparts = url.pathname.split(".");

            var ext = urlparts[urlparts.length - 1];

            var newext = exts[ext];

            if(!newext) {
                return;
            }

            urlparts[urlparts.length - 1] = newext;

            url.pathname = urlparts.join(".");

            chrome.tabs.update(tabs.id, {"url": url.toString()});
        });
    }
};

chrome.commands.onCommand.addListener(function(command) {
    func = funcs[command];

    if(func) {
        func();
    }
});
