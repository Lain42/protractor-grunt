var HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
var JasmineReporters = require('jasmine-reporters');
var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  directConnect: true,
  allScriptsTimeout: 500000,
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    shardTestFiles: false,
    maxInstances: 1, //1
    'browserName': 'chrome',
    "loggingPrefs": {
      "browser": "SEVERE"
    },
    'platform': 'ANY',
    'version': 'ANY',
    'chromeOptions': {
      // Get rid of —ignore-certificate yellow warning
      args: ['--no-sandbox', '--test-type=browser'],
      // Set download path and avoid prompting for download even though
      // this is already the default on Chrome but for completeness
      prefs: {
        'download': {
          'prompt_for_download': false,
          'default_directory': 'files',
        },
      },
    },
  },


  framework: 'jasmine2',
  jasmineNodeOpts: {
    // isVerbose: true,
    //   showColors: true,
    defaultTimeoutInterval: 7000000,
    print: function() {},
  },
  baseUrl: 'http://localhost:9001/',

  onPrepare: function() {
    require('./waitReady.js');

    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'all'
    }));

    jasmine.getEnv().addReporter(new JasmineReporters.JUnitXmlReporter({
      savePath: 'build/reports/e2e',
      consolidateAll: false
    }));

    jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
      dest: "build/reports/e2e/screenshots",
      ignoreSkippedSpecs: true
        //captureOnlyFailedSpecs: true,
        //  showConfiguration: true
    }));


    beforeEach(function() {

      browser.executeScript("$('.jivo_chat_widget').remove();");
    });

    browser.manage().window().maximize();
    browser.get('/login');
    browser.sleep('4000');

    browser.executeScript('arguments[0].scrollIntoView()', element(by.name('email')).getWebElement());
    browser.element(by.name('email')).sendKeys('xxx@xxx');

    browser.executeScript('arguments[0].scrollIntoView()', element(by.name('password')).getWebElement());
    browser.element(by.name('password')).sendKeys('adminpass');

    browser.executeScript('arguments[0].scrollIntoView()', element.all(by.css('.xui-btn')).first().getWebElement());
    browser.element.all(by.css('.xui-btn')).first().submit();

    afterEach(function() {
      browser.manage().logs().get('browser').then(function(browserLogs) {
        // browserLogs is an array of objects with level and message fields
        browserLogs.forEach(function(log) {
          if (log.level.value > 900) { // it's an error log
            console.log('Browser console error!');
            console.log(log.message);
          }
        });
      });
    });

    afterAll(function() {
      browser.executeScript('window.sessionStorage.clear();'); //clear session
      browser.executeScript('window.localStorage.clear();'); //clear local storage
    });
  },

  suites: {

    crm: [
      'test/crm/crm_create.js',
      'test/crm/crm_edit.js',
      'test/crm/check_staffToBeAdded.js',
      'test/crm/crm_delete.js'
    ],

    crm_create: ['test/crm/crm_create.js'],
    crm_edit: ['test/crm/crm_edit.js'],
    crm_staff: ['test/crm/check_staffToBeAdded.js'],
    crm_delete: ['test/crm/crm_delete.js'],
    crm_search: ['test/crm/crm_search.js'],

    proc: ['test/proc/create_Draft.js',
      'test/proc/sent_Draft.js',
      'test/proc/checkProc.js',
      'test/proc/proc2proc.js'
    ],

    proc_draft: ['test/proc/create_Draft.js'],
    proc_sent: ['test/proc/sent_Draft.js'],
    check_proc: ['test/proc/checkProc.js'],

    proc_proc: ['test/proc/proc2proc.js'],
    proc_proc_sent: ['test/proc/proc2procSent.js'],

    docs: ['test/docs/folder_createRoot.js',
      'test/docs/checkBlock.js',
      'test/docs/checkBrick.js',
      'test/docs/checkFileFolde.js'
    ],

    docs_tree: [
      'test/docs/checkTree.js',
      'test/docs/checkTreeUploadFiles.js',
      'test/docs/showCorrectionsLog.js',
      'test/docs/breadcrumbsBrick.js',
      'test/docs/breadcrumbsBlock.js'
    ],
    docs_tree_create: ['test/docs/checkTree.js'],
    docs_tree_upload: ['test/docs/checkTreeUploadFiles.js'],
    docs_tree_journal: ['test/docs/showCorrectionsLog.js'],
    docs_tree_breadBrick: ['test/docs/breadcrumbsBrick.js'],
    docs_tree_breadBlock: ['test/docs/breadcrumbsBlock.js'],

    docs_folder: ['test/docs/folder_createRoot.js'],
    docs_download: ['test/docs/folder_download.js'],
    docs_check: ['test/docs/folder_check.js'],
    check_conv: ['test/docs/check_conv.js'],

    login: ['test/login/log_in.js', 'test/login/logout.js'],
    logout: ['test/login/logout.js'],

    mod_start: ['test/module/mod_start.js'],
    mod_objMap: ['test/module/obj_map.js'],
    mod_monitor: ['test/module/monitor.js'],
    //  mod_performance: [],
    mod_objects_mosreg: ['test/module/mosreq.js'],
    //checkObj
    mod_analytic: ['test/module/analytic.js'],
    mod_graphGant: ['test/module/graphGant.js'],
    mod_proc: ['test/module/mod_proc.js'],
    mod_finance: ['test/module/finance.js'],
    mod_doc: ['test/module/mod_docs.js'],
    mod_tasks: ["test/module/mod_tasks.js"],
    mod_message: ['test/module/mod_message.js'],
    mod_crm: ['test/module/mod_crm.js'],
    mod_reports: ['test/module/mod_objReports.js'],
    mod_profile: ['test/module/mod_profile.js'],
    mod_reports_new: ['test/module/mod_reportsNew.js'],
    mod_tenders: ['test/module/mod_tenders.js'],
    mod_admin: ['test/module/mod_admin.js'],
    mod_admin_users: ['test/module/admin_users.js'],
    mod_admin_groups: ['test/module/admin_groups.js'],
    mod_admin_objects: ['test/module/admin_objects.js'],
    mod_admin_message: ['test/module/admin_message.js'],
    mod_admin_catPerms: ['test/module/admin_cat_perms.js'],

    ///adiios-smoke
    mod_ref_main: ['test/module/admin/ref_main.js'],


    ref_create_org: ['test/mosreq/create_org.js'],
    ref_create_fiz: ['test/mosreq/create_fiz.js'],
    ref_create_ip: ['test/mosreq/create_ip.js'],
    ref_create_gk: ['test/mosreq/create_gk.js'],

    ///Monitor
    monitor_to_table: [
      'test/monitor/checkOsn.js',
      'test/monitor/inspector.js',
      'test/monitor/region.js',
      'test/monitor/builder.js',
      'test/monitor/typeOfObj.js'
    ],

    monitor_check_osn: ['test/monitor/checkOsn.js'],
    monitor_check_inspector: ['test/monitor/inspector.js'],
    monitor_check_region: ['test/monitor/region.js'],
    monitor_check_builder: ['test/monitor/builder.js'],
    monitor_check_type: ['test/monitor/typeOfObj.js'],

    monitor_obj: [
      'test/monitor/objNadzor.js',
      'test/monitor/objBehind.js',
      'test/monitor/objZos.js',
      'test/monitor/objForecast.js',
      'test/monitor/objExploitation.js'
    ],

    monitor_obj_nadzor: ['test/monitor/objNadzor.js'],
    monitor_obj_behind: ['test/monitor/objBehind.js'],
    monitor_obj_zos: ['test/monitor/objZos.js'],
    monitor_obj_forecast: ['test/monitor/objForecast.js'],
    monitor_obj_exploitation: ['test/monitor/objExploitation.js'],

    monitor_filtr: ['test/monitor/filtrType.js'],
    builder_to_obj: ['test/monitor/builderObj.js'],
    muni_to_obj: ['test/monitor/muniObj.js'],

    ref_activity: ['test/module/adiios/moreRef/ref_more_activity.js'],

    checkObj1: ['test/module/adiios/object/check_obj1.js'],
    checkObj2: ['test/module/adiios/object/check_obj2.js']


  }
};
