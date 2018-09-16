export default class AutoPageScroll {
  constructor(_speed = 10) {
    this.speed = _speed;
    this.pages = document.getElementsByClassName("autoScrollPage");
    this.currentPg = this.currentPage(window.scrollY);

    //a workaround for 2 problems relative to remove an event: call an anonymous func and bind the "this"
    // (https://stackoverflow.com/questions/30809682/dynamically-adding-and-removing-event-listeners)
    this.lockScrollEventWithThis = this.lockScrollEvent.bind(this);

    document.querySelectorAll(".autoScrollPageDown").forEach(element => {
      element.addEventListener("click", () => this.scroll("down"));
    }, this);
    document.querySelectorAll(".autoScrollPageTop").forEach(element => {
      element.addEventListener("click", () => this.scroll("top"));
    }, this);
  }
  currentPage(current_pos) {
    let page = { index: 0, page: null };
    try {
      Array.prototype.forEach.call(this.pages, (el, i) => {
        if (
          current_pos >= el.offsetTop &&
          current_pos < el.offsetTop + el.offsetHeight
        ) {
          page = { index: i, page: el };
        }
      });
      if (page.page === null)
        throw "You don't have a page with the class autoScrollPage at this point. Check the classes's names or if the the container's or the body's padding is not 0px";
    } catch (err) {
      console.warn(err);
    }
    return page;
  }
  scroll(direction) {
    this.currentPg = this.currentPage(window.scrollY);
    let from = window.scrollY;
    let to = 0;

    if (
      direction === "top" &&
      typeof this.pages[this.currentPg.index - 1] !== "undefined"
    ) {
      to = this.pages[this.currentPg.index - 1].offsetTop;
      this.engine(from, to, from, direction);
    }
    if (
      direction === "down" &&
      typeof this.pages[this.currentPg.index + 1] !== "undefined"
    ) {
      to = this.pages[this.currentPg.index + 1].offsetTop;
      this.engine(from, to, from, direction);
    }
  }
  engine(from, to, currentPos, direction) {
    let sin = Math.sin(
      this.map(currentPos, from, to, 0 + 0.01, Math.PI - 0.01)
    );
    //add a wave effect
    let step = this.speed * (sin * 10);

    if (direction === "top" && currentPos >= to) {
      window.scrollTo(0, currentPos);
      window.requestAnimationFrame(() => {
        this.engine(from, to, currentPos - step, direction);
      });
    }
    //adjust the last step (if the step goes beyond )
    if (direction === "top" && currentPos < to) {
      window.scrollTo(0, to);
      this.currentPg = this.currentPage(window.scrollY);
    }

    if (direction === "down" && currentPos < to) {
      window.scrollTo(0, currentPos);
      window.requestAnimationFrame(() => {
        this.engine(from, to, currentPos + step, direction);
      });
    }
    //adjust the last step (if the step goes beyond )
    if (direction === "down" && currentPos > to) {
      window.scrollTo(0, to);
      this.currentPg = this.currentPage(window.scrollY);
    }
  }
  //map a value between start1 - start2, into start2 - stop2
  map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }
  //avoid the scroll beyond the current page
  lockScrollEvent() {
    if (this.currentPg.page !== null) {
      let top = this.currentPg.page.offsetTop;
      let bottom = top + this.currentPg.page.offsetHeight;

      if (window.scrollY < top) {
        window.scroll(0, top);
      }
      if (window.scrollY + window.innerHeight > bottom) {
        window.scroll(0, bottom - window.innerHeight);
      }
    }
  }
  addLockScroll() {
    //scroll event seems to be more stable wrt wheel, ...
    document.addEventListener("scroll", this.lockScrollEventWithThis);
  }
  removelockScroll() {
    document.removeEventListener("scroll", this.lockScrollEventWithThis);
  }
}
