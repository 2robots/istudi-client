<div class="listInner">
  <div class="title"><%= model.get("title") %></div>

  <% if(navigateable) { %>
    <span class="icn navigation"></span>
  <% } %>

  <% if(checkable) { %>
    <span class="icn checkbox<% if(model.checked()) {%> active<% } %>"></span>
  <% } %>
</div>