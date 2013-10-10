
define(['text!templates/main.tpl', 'iscroll-min'], function(Template) {

  return Backbone.View.extend({

    tagName: 'div',
    id: 'main',
    className: 'snap-content',
    template: _.template(Template),
    title: "iStudi",
    currentPage: undefined,
    page_container: undefined,
    old_id: undefined,
    contentView: undefined,
    scrollPosition: {},
    left_button: undefined,
    right_button: undefined,
    left_button_el: undefined,
    right_button_el: undefined,
    currentContentSet: undefined,
    lastContentSet: undefined,

    events: {
      "click .button.left": "leftButtonAction",
      "click .button.right": "rightButtonAction"
    },

    initialize: function() {
      this.on({
        "leftButtonSetActive": this.leftButtonSetActive,
        "rightButtonSetActive": this.rightButtonSetActive,
        "leftButtonSetInactive": this.leftButtonSetInactive,
        "rightButtonSetInactive": this.rightButtonSetInactive
      });
    },

    render: function(){
      this.$el.append('<div class="pt-perspective">');
      this.page_container = this.$el.children(".pt-perspective");
      return this;
    },

    afterRender: function() {
    },

    addPage: function() {
      this.page_container.append(this.template({ title: this.title, left_button: this.left_button, right_button: this.right_button }));
      this.header = this.page_container.find(".header").last();
      this.left_button_el = this.header.find(".button.left");
      this.right_button_el = this.header.find(".button.right");

      this.content = this.page_container.find(".content").last();

      this.currentPage = this.page_container.children(".pt-page").last();
      return this.page_container.children(".pt-page").last();
    },

    afterAddPage: function() {
      this.scroller = new AppScroll({
        toolbar: this.header[0],
        scroller: this.content[0]
      });
    },

    leftButtonAction: function() {
      if(!this.left_button_el.hasClass("inactive")) {
        this.contentView.trigger("leftButtonAction");
      }
    },

    rightButtonAction: function() {
      if(!this.right_button_el.hasClass("inactive")) {
        this.contentView.trigger("rightButtonAction");
      }
    },

    leftButtonSetActive: function() {
      this.left_button_el.removeClass("inactive");
    },

    rightButtonSetActive: function() {
      this.right_button_el.removeClass("inactive");
    },

    leftButtonSetInactive: function() {
      this.left_button_el.addClass("inactive");
    },

    rightButtonSetInactive: function() {
      this.right_button_el.addClass("inactive");
    },

    toggleMenu: function() {
      if(this.options.app.menuOpen()) {
        this.options.app.closeMenu();
      } else {
        this.options.app.openMenu();
      }
    },

    initIScroll: function(newPage, model) {

      var t = this;

      // remove scroll id
      $(".content").attr("id", "");
      newPage.find(".content").attr("id", "scroll");

      // enable iScroll on this page and disable snapper on drag
      if(typeof(model) != "undefined" && model.zoomable === true) {
        //t.scroll = new iScroll('scroll', { zoom: true, zoomMax: 4, zoomMin: 1 });
        t.scroll = new IScroll('#scroll', { zoom: true, zoomMax: 4, zoomMin: 1 });
        t.options.app.snapper.settings({touchToDrag: false});

      } else {
        //t.scroll = new iScroll('scroll');
        t.scroll = new IScroll('#scroll');
        t.options.app.snapper.settings({touchToDrag: true});
      }

      // scroll to the correct position
      if(typeof(t.scrollPosition[t.old_id]) != "undefined") {
        t.scroll.scrollTo(0, t.scrollPosition[t.old_id]);
        //this.content[0].scrollTop = this.scrollPosition[this.old_id];
      }
    },

    openContent: function(item, model, transition) {

      // save this content-set
      this.lastContentSet = this.currentContentSet;
      this.currentContentSet = {item: item, model: model};

      // manage vars
      var key = "";
      var title = "";
      var id = "";

      if(item instanceof Backbone.Model) {
        key = item.get("key");
        title = item.get("title");
        id = item.get("id");
        this.left_button = item.get("left_button");
        this.right_button = item.get("right_button");
      } else {
        key = item.key;
        title = item.title;
        id = item.id;
        this.left_button = item.left_button;
        this.right_button = item.right_button;
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

                // make this page the current page
                newPage.addClass("pt-page-current");
                t.initIScroll(newPage, model);

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

                // make this page the current page
                newPage.addClass("pt-page-current");
                t.initIScroll(newPage, model);

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

              // make this page the current page
              newPage.addClass("pt-page-current");
              t.initIScroll(newPage, model);

              break;
          }

          t.contentView.afterRender();
        });

        return true;
      } catch(error) {
        return false;
      }
    },

    navigateBack: function() {
      this.openContent(this.lastContentSet.item,this.lastContentSet.model, "slideLeft");
    }

  });

});