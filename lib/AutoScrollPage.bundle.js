"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AutoScrollPage = function () {
  function AutoScrollPage() {
    var _this = this;

    var _speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    _classCallCheck(this, AutoScrollPage);

    this.speed = _speed;
    this.pages = document.getElementsByClassName("autoScrollPage");
    this.currentPg = this.currentPage(window.scrollY);

    //a workaround for 2 problems relative to remove an event: call an anonymous func and bind the "this"
    // (https://stackoverflow.com/questions/30809682/dynamically-adding-and-removing-event-listeners)
    this.lockScrollEventWithThis = this.lockScrollEvent.bind(this);

    document.querySelectorAll(".autoScrollPageDown").forEach(function (element) {
      element.addEventListener("click", function () {
        return _this.scroll("down");
      });
    }, this);
    document.querySelectorAll(".autoScrollPageTop").forEach(function (element) {
      element.addEventListener("click", function () {
        return _this.scroll("top");
      });
    }, this);
  }

  _createClass(AutoScrollPage, [{
    key: "currentPage",
    value: function currentPage(current_pos) {
      var page = { index: 0, page: null };
      try {
        Array.prototype.forEach.call(this.pages, function (el, i) {
          if (current_pos >= el.offsetTop && current_pos < el.offsetTop + el.offsetHeight) {
            page = { index: i, page: el };
          }
        });
        if (page.page === null) throw "You don't have a page with the class autoScrollPage at this point. Check the classes's names or if the the container's or the body's padding is not 0px";
      } catch (err) {
        console.warn(err);
      }
      return page;
    }
  }, {
    key: "scroll",
    value: function scroll(direction) {
      this.currentPg = this.currentPage(window.scrollY);
      var from = window.scrollY;
      var to = 0;

      if (direction === "top" && typeof this.pages[this.currentPg.index - 1] !== "undefined") {
        to = this.pages[this.currentPg.index - 1].offsetTop;
        this.engine(from, to, from, direction);
      }
      if (direction === "down" && typeof this.pages[this.currentPg.index + 1] !== "undefined") {
        to = this.pages[this.currentPg.index + 1].offsetTop;
        this.engine(from, to, from, direction);
      }
    }
  }, {
    key: "engine",
    value: function engine(from, to, currentPos, direction) {
      var _this2 = this;

      var sin = Math.sin(this.map(currentPos, from, to, 0 + 0.01, Math.PI - 0.01));
      //add a wave effect
      var step = this.speed * (sin * 10);

      if (direction === "top" && currentPos >= to) {
        window.scrollTo(0, currentPos);
        window.requestAnimationFrame(function () {
          _this2.engine(from, to, currentPos - step, direction);
        });
      }
      //adjust the last step (if the step goes beyond )
      if (direction === "top" && currentPos < to) {
        window.scrollTo(0, to);
        this.currentPg = this.currentPage(window.scrollY);
      }

      if (direction === "down" && currentPos < to) {
        window.scrollTo(0, currentPos);
        window.requestAnimationFrame(function () {
          _this2.engine(from, to, currentPos + step, direction);
        });
      }
      //adjust the last step (if the step goes beyond )
      if (direction === "down" && currentPos > to) {
        window.scrollTo(0, to);
        this.currentPg = this.currentPage(window.scrollY);
      }
    }
    //map a value between start1 - start2, into start2 - stop2

  }, {
    key: "map",
    value: function map(value, start1, stop1, start2, stop2) {
      return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
    }
    //avoid the scroll beyond the current page

  }, {
    key: "lockScrollEvent",
    value: function lockScrollEvent() {
      if (this.currentPg.page !== null) {
        var top = this.currentPg.page.offsetTop;
        var bottom = top + this.currentPg.page.offsetHeight;

        if (window.scrollY < top) {
          window.scroll(0, top);
        }
        if (window.scrollY + window.innerHeight > bottom) {
          window.scroll(0, bottom - window.innerHeight);
        }
      }
    }
  }, {
    key: "addLockScroll",
    value: function addLockScroll() {
      //scroll event seems to be more stable wrt wheel, ...
      document.addEventListener("scroll", this.lockScrollEventWithThis);
    }
  }, {
    key: "removelockScroll",
    value: function removelockScroll() {
      document.removeEventListener("scroll", this.lockScrollEventWithThis);
    }
  }]);

  return AutoScrollPage;
}();

