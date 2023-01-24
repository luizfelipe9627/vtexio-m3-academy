var Evento = function () {
    var _this = this;
    _this.handlers = [];

    _this.subscribe = function (fn) {
        this.handlers.push(fn);
    }.bind(_this);

    _this.unsubscribe = function (fn) {
        this.handlers = this.handlers.filter(function (item) {
            if (item !== fn) {
                return item;
            }
        });
    }.bind(_this);

    _this.fire = function (dados, thisObj) {
        var scope = thisObj || window;
        this.handlers.forEach(function (item) {
            item.call(scope, dados);
        });
    }.bind(_this);
};

export default Evento;
