var yaml = require('js-yaml');
var fs   = require('fs');
var process = require('process');
var _ = require('underscore');

module.exports = function() {

    this.config = [];

    /**
     * init
     *
     * method that autoloads both the default and project config and merges the settings
     */
    this.init = function() {
        var defaultConfig = this.loadDefaultConfig();
        var projectConfig = this.loadProjectConfig();

        for (setting in projectConfig) {
            _.extend(defaultConfig[setting], projectConfig[setting]);
        };

        this.config = defaultConfig;
    };

    /**
     * loadDefaultConfig
     *
     * Loads the default config from the default.yml, which is packed with this package
     *
     * @returns {Array}
     */
    this.loadDefaultConfig = function() {
        var defaultConfig = this.loadYamlConfig(__dirname + '/../config/default.yml');
        return defaultConfig;
    };

    /**
     * loadProjectConfig
     *
     * Loads the project config
     *
     * @returns {Array}
     */
    this.loadProjectConfig = function() {
        var projectConfigFile = this.userDefinedConfig('.scss-lint.yml');
        var config = this.loadYamlConfig(projectConfigFile);

        return config;
    };

    /**
     * userDefinedConfig
     *
     * returns a filename if the config file is found in the arguments
     *
     * @param {string} configName
     * @returns {val|module.exports.userDefinedConfig.definedConfig}
     */
    this.userDefinedConfig = function(configName) {
        var definedConfig;
        process.argv.forEach(function(val, index, array) {
            if (val.indexOf(configName) > -1) {
                definedConfig = val;
                return;
            }
        });
        return definedConfig;
    };

    /**
     * loadYamlConfig
     *
     * returns object or array with settings found in the yaml file
     *
     * @param {string} file
     * @returns {Array}
     */
    this.loadYamlConfig = function(file) {
        try {
            var config = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
        } catch (e) {
            var config = [];
        }

        return typeof config['linters'] === 'undefined' ? [] : config['linters'];
    };

    /**
     * getEnabledFunctionList
     *
     * returns a list of all functions that are enabled
     *
     * @returns {Array}
     */
    this.getEnabledFunctionList = function() {
        var list = [];
        for (setting in this.config) {
            if (this.config[setting].enabled === true) {
                list.push(setting);
            }
        }
        return list;
    };

    /**
     * getFunctionSettings
     *
     * returns object with all the settings for requested function
     *
     * @param {string} setting
     * @returns {Array}
     */
    this.getFunctionSettings = function(setting) {
        return this.config[setting];
    };

    this.init();

    return this;
};



