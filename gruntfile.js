module.exports = function(grunt) {
  grunt.initConfig({

    concurrent: {
      protractor_test: [
        'protractor-docs',
        'protractor-crm',
        'protractor-procs',
        'protractor-login',
        'protractor-logout',
        'module',
        'adiios-smoke',
        'monitor'
      ]
   },

    protractor: {
      options: {
        logConcurrentOutput: true,
        configFile: "stage.conf.js", // Default config
        singleRun: false,
        keepAlive: true,
        noColor: false, // If true, protractor will not use colors in its output.
        args: {


        }
      },
      run_crm: {
        options: {
          args: {
            browser: "chrome",
            specs: ['test/crm/crm_create.js',
              'test/crm/crm_edit.js',
              'test/crm/check_staffToBeAdded.js',
              'test/crm/crm_delete.js'
            ]
          }
        }
      },
      run_docs: {
        options: {
          args: {
            browser: "chrome",
            specs: ['test/docs/folder_create.js' /*, 'test/docs/folder_download.js', 'test/docs/folder_check.js'*/ ]
          }
        }
      },
      run_procs: {
        options: {
          args: {

            browser: "chrome",
            specs: ['test/proc/create_Draft.js',
              'test/proc/sent_Draft.js',
              'test/proc/checkProc.js',
              'test/proc/proc2proc.js'
            ]
          }
        }
      },
      run_login: {
        options: {
          configFile: "/Users/lain/Dev/selenium_grunt/login.conf.js",
          args: {
            browser: "chrome",
            specs: ['test/login/log_in.js', 'test/login/logout.js']
          }
        }
      },
      run_logout: {
        options: {

          args: {
            browser: "chrome",
            specs: ['test/login/logout.js']
          }
        }
      },
      run_module: {
        options: {

          args: {
            browser: "chrome",
            specs: [
              'test/module/mod_*.js',
              'test/module/admin_*.js',

            ],
          }
        }
      },
      adiios_smoke: {
        options: {

          args: {
            browser: "chrome",
            specs: [

                            'test/module/adiios/mod_*.js',
                            'test/module/adiios/ref_*.js',
                            'test/module/adiios/docs_mosreg/docs_*.js',
                            'test/module/mod_start.js',
                            'test/module/mod_admin.js',
                            'test/module/admin_groups.js',
                            'test/module/admin_users.js',
                            'test/module/admin_message.js',
                            'test/module/adiios/mosreq.js',
                            'test/module/adiios/object/check_*.js',
              
              //////////run_monitor repeat

              'test/monitor/checkOsn.js',
              'test/monitor/inspector.js',
              'test/monitor/region.js',
              'test/monitor/builder.js',
              'test/monitor/typeOfObj.js',

              'test/monitor/objNadzor.js',
              'test/monitor/objBehind.js',
              'test/monitor/objZos.js',
              'test/monitor/objForecast.js',
              'test/monitor/objExploitation.js',

              //    'test/monitor/filtrType.js',
              'test/monitor/builderObj.js',
              'test/monitor/muniObj.js'


            ],
          }
        }
      },

      run_monitor: {
        options: {

          args: {
            browser: "chrome",
            specs: [

              'test/monitor/checkOsn.js',
              'test/monitor/objNadzor.js',
              'test/monitor/inspector.js',
              'test/monitor/region.js',
              'test/monitor/builder.js',
              'test/monitor/typeOfObj.js',


              'test/monitor/objBehind.js',
              'test/monitor/objZos.js',
              'test/monitor/objForecast.js',
              'test/monitor/objExploitation.js',


              //    'test/monitor/filtrType.js',
              'test/monitor/builderObj.js',
              'test/monitor/muniObj.js'

            ]
          }
        }
      }

    },

  });

  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('protractor-crm', ['protractor:run_crm']);
  grunt.registerTask('protractor-docs', ['protractor:run_docs']);
  grunt.registerTask('protractor-procs', ['protractor:run_procs']);
  grunt.registerTask('protractor-login', ['protractor:run_login']);
  grunt.registerTask('protractor-logout', ['protractor:run_logout']);

  grunt.registerTask('module', ['protractor:run_module']);
  grunt.registerTask('monitor', ['protractor:run_monitor']);
  grunt.registerTask('adiios-smoke', ['protractor:adiios_smoke']);


  grunt.registerTask('default', 'protractor-e2e', ['concurrent:protractor_test']);


};
