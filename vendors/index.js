function Vendor() {
    this.menuFactory = (function() {
        var menu = {
            prefix: '<span class="ci-menu-item">',
            subfix: '</span>',
            template: '<div class="ci-actions-menu"></div>'
        };

        function createMenuItem(name, handler) {
            var $item = $(menu.prefix+ name+ menu.subfix);
            $item.click(handler);
            return $item;
        }

        return function(menus) {
            var $menu = $(menu.template);
            menus.forEach(function(item) {
                $menu.append(createMenuItem(item.name, item.handler));
            });
            return $menu;
        }
    })();
}

(function() {
    function TinyEventEmitter() {
        this.events = {};
    }
    Vendor.prototype = new TinyEventEmitter();

    var proto = TinyEventEmitter.prototype;

    proto.on = function(eventName, handler) {
        var advocate = this.events[eventName];
        if (!advocate) {
            advocate = [];
            this.events[eventName] = advocate;
        }
        advocate.push(handler);
    }

    proto.off = function(eventName, handler) {
        var advocate = this.events[eventName];
        if (!advocate) return;

        if (!handler) {
            advocate.length = 0;
            return;
        }
        var foundIndex = advocate.indexOf(handler);
        if (foundIndex >= 0) {
            delete advocate[index];
        };
    }

    proto.emit = function(eventName) {
        var emitInfo = Array.prototype.slice.call(arguments, 1);
        var self = this;
        var advocate = this.events[eventName];
        if (!advocate) return;
        advocate.forEach(function(handler) {
            handler.apply(self, emitInfo);
        });
    }
})();

Vendor.prototype.renderMenu = function($container, menuData) {
    this.$menu = this.menuFactory(menuData);
    this.$menu.css('display', 'none');
    $container.append(this.$menu);
    this.attachActionMenu();
}

Vendor.prototype.hoverMenu = function(el) {
    $(el.currentTarget).prepend(this.$menu);
    this.$menu.show();
}

Vendor.prototype.blurMenu = function() {
    this.$menu.hide();
}
