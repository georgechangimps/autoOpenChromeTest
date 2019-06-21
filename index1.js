//先安裝 => npm install --save puppeteer
const puppeteer = require('puppeteer');

var App = function () {
    /** 
       * 要保書對應值
      */
    this.val = null;
};
App.prototype.getPic = async function (val) {
    // const browser = await puppeteer.launch({ headless: false, timeout: 120000 });
    const page = await browser.newPage();
    // await page.setDefaultNavigationTimeout(120000);
    await page.goto('https://demo.i-mps.com/mpsform/F040003_SCN1.action');

    // 設定可視區域大小
    await page.setViewport({
        width: 1024,
        height: 768
    });

    if (val == '3A0B4079-29B9-457D-87DA-75615E849EE7') {
        await page.click('#fastSubmit');
    }
    // await page.goto('https://demo.i-mps.com/mpsform/F040003_SCN1.action');

    await page.waitForSelector('.alertLoading');
    await page.waitFor(() => !document.querySelector('.alertLoading'), { timeout: 120000 });

    // await page.waitForNavigation();

    await page.waitForSelector('#editBtn');
    // await page.waitFor(10000);

    // await page.type('.select2-search__field', '保誠人壽三五中國外幣變額壽險要保書');
    //選擇要保書
    await page.evaluate(function (val) {
        //select2的setMcuVal
        var $select = $('#apformName'); var value = val; var eventData = {};
        var isTags = $select.data('select2') ? $select.data('select2').options.options.tags : false;
        if (isTags) {
            value = value.toString().replace(/,/g, "")
            if ($select.find("option[value='" + value + "']").length) {
                $select.val(value).trigger('change', Object.assign({ triggerBySetValue: true }, eventData));
            } else {
                var newOption = new Option(parseInt(value, 10).toLocaleString(), value, true, true);
                $select.append(newOption).trigger('change', Object.assign({ triggerBySetValue: true }, eventData));
            }
        } else {
            $select.val(value).trigger('change', Object.assign({ triggerBySetValue: true }, eventData));
        }
    }, val);

    //選擇版本
    await page.evaluate(function () {
        //select2的setMcuVal
        var $select = $('#apformVer'); var value = '273.1'; var eventData = {};
        var isTags = $select.data('select2') ? $select.data('select2').options.options.tags : false;
        if (isTags) {
            value = value.toString().replace(/,/g, "")
            if ($select.find("option[value='" + value + "']").length) {
                $select.val(value).trigger('change', Object.assign({ triggerBySetValue: true }, eventData));
            } else {
                var newOption = new Option(parseInt(value, 10).toLocaleString(), value, true, true);
                $select.append(newOption).trigger('change', Object.assign({ triggerBySetValue: true }, eventData));
            }
        } else {
            $select.val(value).trigger('change', Object.assign({ triggerBySetValue: true }, eventData));
        }
    });

    await page.click('#editBtn');

    await page.waitForSelector('#loading_window');

    // await page.waitFor(10000);


    await page.waitFor(() => !document.querySelector('#loading_window'), { timeout: 120000 });

    // await page.waitForNavigation();

    await page.waitForSelector('#navInfo');
    const text = await page.$eval('#navInfo', el => el.textContent);
    console.log('text: ' + text);

    await page.click('#ruleMappingTab');

    // setTimeout((() => {

    //     page.click('#select2-apformName-result-bqvy-7069B8BA-1062-4F3A-A28E-37EA7C955ED2')
    //     page.click('#editBtn')
    // }), 10000);

    // await page.click('#editBtn');
    // return page;
    // await browser.close();
};

App.prototype.openBrowser = async function () {
    browser = await puppeteer.launch({ headless: false, timeout: 120000 });
};

var test = ['3A0B4079-29B9-457D-87DA-75615E849EE7', '1CC659E0-FCC5-48BD-91B9-AED93396F5F0']
// getPic(test[0]);
// getPic(test[1]);

var app = new App();
let browser;
app.openBrowser().then(function () {
    app.getPic(test[0]);
    setTimeout((() => {
        app.getPic(test[1]);
        app.getPic(test[1]);
    }), 8000);
})

// app.getPic(test[0]);
// app.getPic(test[1]);