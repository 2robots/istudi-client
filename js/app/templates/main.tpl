<div class="pt-page">
  <div class="header">

    <% if(typeof(left_button) != "undefined") { %>
      <a class="button left">
        <span class="icn <%= left_button %>"></span>
        <span class="sep"></span>
      </a>
    <% } %>

    <h2><%= title %></h2>

    <% if(typeof(right_button) != "undefined") { %>
      <a class="button right">
        <span class="icn <%= right_button %>"></span>
        <span class="sep"></span>
      </a>
    <% } %>
  </div>

  <div class="content">
  </div>
</div>