
define(['text!templates/main.tpl', 'views/contentViews/indexView', 'views/contentViews/newsView'], function(Template) {

  return Backbone.View.extend({

    tagName: 'div',
    id: 'main',
    className: 'snap-content',
    template: _.template(Template),
    title: "iStudi",
    currentPage: undefined,
    page_container: undefined,
    old_id: undefined,
    scrollPosition: {},

    events: {
      "click .button.left": "toggleMenu"
    },

    render: function(){
      this.$el.append('<div class="pt-perspective">');
      this.page_container = this.$el.children(".pt-perspective");
      return this;
    },

    afterRender: function() {
    },

    addPage: function() {
      this.page_container.append(this.template({ title: this.title }));
      this.header = this.page_container.find(".header").last();
      this.content = this.page_container.find(".content").last();

      this.currentPage = this.page_container.children(".pt-page").last();
      return this.page_container.children(".pt-page").last();
    },

    afterAddPage: function() {
      this.scroller = new AppScroll({
        toolbar: this.header[0],
        scroller: this.content[0]
      });

      // scroll to the correct position
      if(typeof(this.scrollPosition[this.old_id]) != "undefined") {
        this.content[0].scrollTop = this.scrollPosition[this.old_id];
      }
    },

    toggleMenu: function(e) {
      if(this.options.app.menuOpen()) {
        this.options.app.closeMenu();
      } else {
        this.options.app.openMenu();
      }
    },

    openContent: function(item, model, transition) {

      // manage vars
      var key = "";
      var title = "";
      var id = "";

      if(item instanceof Backbone.Model) {
        key = item.get("key");
        title = item.get("title");
        id = item.get("id");
      } else {
        key = item.key;
        title = item.title;
        id = item.id;
      }

      if(typeof(id) == "undefined") {
        id = key;
      }

      // get template name
      var name = 'views/contentViews/' + key + 'View';
      var t = this;

      // try to load the view and do the transition
      try {
        require([name], function(view){
          t.title = title;
          t.contentView = new view({ app: t.options.app, model: model });

          // add a new Page
          var oldPage = t.currentPage;

          /* transition is only avaiable, if there already is a page */
          if(typeof(oldPage) == "undefined") {
            transition = undefined;
          } else {
            var oldPageInner = t.content.first();

            // save old scrollPosition
            t.scrollPosition[t.old_id] = t.content[0].scrollTop;
          }

          // add new page
          var newPage = t.addPage();
          var newPageInner = newPage.find(".content").first();

          switch(transition) {

            // navigate right
            case "slideRight":
              newPageInner.html(t.contentView.render().$el);

              setTimeout(function(){
                oldPage.addClass("pt-page-moveToLeft");
                newPage.addClass("pt-page-moveFromRight");

                //save key
                t.old_id = id;

                // do stuff, after the page was created
                t.afterAddPage();

                setTimeout(function(){
                  newPage.removeClass("pt-page-moveFromRight");
                  oldPage.remove();
                }, 410);
              });
              break;

            // navigate left
            case "slideLeft":
              setTimeout(function(){
                newPageInner.html(t.contentView.render().$el);
                oldPage.addClass("pt-page-moveToRight");
                newPage.addClass("pt-page-moveFromLeft");

                //save key
                t.old_id = id;

                // do stuff, after the page was created
                t.afterAddPage();

                setTimeout(function(){
                  newPage.removeClass("pt-page-moveFromLeft");
                  oldPage.remove();
                }, 410);
              });
              break;

            // default: just place the new page
            default:
              newPageInner.html(t.contentView.render().$el);

              //save key
              t.old_id = id;

              // do stuff, after the page was created
              t.afterAddPage();

              if(typeof(oldPage) != "undefined") {
                oldPage.remove();
              }

              break;
          }

          // make this page the current page
          newPage.addClass("pt-page-current");
        });

        return true;
      } catch(error) {
        return false;
      }
    }

  });

});