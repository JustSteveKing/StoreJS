'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _containers = [];
var container = '';

var Store = function () {
    function Store() {
        _classCallCheck(this, Store);
    }

    _createClass(Store, null, [{
        key: 'create',
        value: function create(containerName, expiry) {
            var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            localStorage.setItem(containerName, JSON.stringify({
                expiry: moment(expiry),
                data: data
            }));
            _containers.push(containerName);
            console.log(containerName + ' has been created');
        }
    }, {
        key: 'dump',
        value: function dump(containerName) {
            localStorage.removeItem(containerName);
        }
    }, {
        key: 'use',
        value: function use(containerName) {
            container = containerName;
            console.log('Now using container : ' + containerName);
        }
    }, {
        key: 'switch',
        value: function _switch(containerName) {
            container = containerName;
        }
    }, {
        key: 'containers',
        value: function containers() {
            return _containers;
        }
    }, {
        key: 'add',
        value: function add(data) {
            var containerName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var expiry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var newExpiry = void 0;
            if (containerName === null) {
                console.log('No container passed, using ' + container);
            } else {
                console.log('Adding item to ' + containerName);
                container = containerName;
            }

            var target = JSON.parse(localStorage.getItem(container));

            if (expiry === null) {
                newExpiry = target.expiry;
            } else {
                newExpiry = moment(expiry);
            }
            localStorage.setItem(container, JSON.stringify({
                expiry: newExpiry,
                data: data
            }));
            console.log('Added data to ' + container);
        }
    }, {
        key: 'empty',
        value: function empty() {
            var containerName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (containerName === null) {
                console.log('No container passed, using ' + container);
            } else {
                console.log('Emptying ' + containerName);
                container = containerName;
            }
            var target = JSON.parse(localStorage.getItem(container));

            localStorage.setItem(container, JSON.stringify({
                expiry: target.expiry,
                data: null
            }));
            console.log(container + ' has been emptied.');
        }
    }, {
        key: 'clean',
        value: function clean() {
            for (var i = 0, len = _containers.length; i < len; i++) {
                var _container = _containers[i];
                _container = JSON.parse(localStorage.getItem(_container));
                if (moment(new Date()).isAfter(_container.expiry)) {
                    localStorage.removeItem(_containers[i]);
                    console.log(_containers[i] + ' container removed');
                }
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            localStorage.clear();
            console.log('All containers have been reset');
        }
    }, {
        key: 'parse',
        value: function parse() {
            var containerName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (containerName === null) {
                console.log('No container passed, using ' + container);
            } else {
                console.log('Parsing ' + containerName);
                container = containerName;
            }
            return JSON.parse(localStorage.getItem(container));
        }
    }, {
        key: 'supported',
        value: function supported() {
            var test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        }
    }]);

    return Store;
}();
