(function() {
  var HIDE_CLASS = 'hidden';
  var ITEM_CLASS = 'inline-block';

  function Item(el) {
    this.li = el;
    const title = el.querySelector('a').textContent;
    this.typeLowerCase = title.toLowerCase();
  }

  Item.prototype.contains = function(searchText) {
    return this.typeLowerCase.indexOf(searchText) >= 0;
  };

  Item.prototype.isHide = function() {
    this.li.classList.contains(HIDE_CLASS);
  };

  Item.prototype.hide = function() {
    if (!this.isHide()) this.li.classList.add(HIDE_CLASS);
  };

  Item.prototype.show = function() {
    this.li.classList.remove(HIDE_CLASS);
  };

  function ItemList(items) {
    this.items = items;
  }

  ItemList.fromSelector = function(selector) {
    var lis = document.querySelectorAll(selector);
    var items = Array.prototype.map.call(lis, function(li) {
      return new Item(li);
    });

    return new ItemList(items);
  };

  ItemList.prototype.showIfmatch = function(match) {
    match = match.toLowerCase(match);

    this.items.forEach(function(item) {
      item.contains(match) ? item.show() : item.hide();
    });
  };

  var items = ItemList.fromSelector('nav ul li');
  var input = document.getElementById('type-search');
  var lastMatch = '';


  function expandTitle(title){
    title.classList.add('active');
    let result = title.nextElementSibling;
    result.classList.add("active");
    if(title.firstElementChild.innerText === "+"){
      title.firstElementChild.innerText = "-"
    } else {
      title.firstElementChild.innerText = "+"
    }
  }

  function toggleTitles(){
    let titles = document.querySelectorAll("nav>h4");
    titles.forEach((title) => {
      title.addEventListener("click", function(){
        this.classList.toggle('active');
        let result = this.nextElementSibling;
        result.classList.toggle("active");

        if(this.firstElementChild.innerText === "+"){
          this.firstElementChild.innerText = "-"
        } else {
          this.firstElementChild.innerText = "+"
        }
      });
    });
  }

  function onChange() {
    let titles = document.querySelectorAll("nav>h4:not(.active)");
    titles.forEach(title => expandTitle(title));

    if (input.value === lastMatch) return;

    lastMatch = input.value;
    items.showIfmatch(lastMatch);
  }

  input.addEventListener('change', onChange);
  input.addEventListener('keyup', onChange);
  input.addEventListener('mouseup', onChange);
  toggleTitles();
})();
