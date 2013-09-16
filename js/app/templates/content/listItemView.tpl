<div class="listInner<% if(typeof(model.get("date")) != "undefined") { %> withDate<% } %>">

  <% if(typeof(model.get("date")) != "undefined") { %>
    <div class="date"><span class="icn time"></span><%= new Date(model.get("date")).toLocaleDateString() %></div>
  <% } %>
  <div class="title"><%= model.get("title") %></div>

  <% if(navigateable) { %>
    <span class="icn navigation"></span>
  <% } %>

  <% if(checkable) { %>
    <span class="icn checkbox<% if(model.checked()) {%> active<% } %>"></span>
  <% } %>
</div>