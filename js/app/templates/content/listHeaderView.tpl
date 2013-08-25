
<% if(showSearch) { %>
  <form id="search">
    <input type="text" placeholder="<%= filterDefaultValue %>" />
  </form>
<% } %>

<% if(subtitle) { %>
  <h3><%= subtitle %></h3>
<% } %>

<% if(text) { %>
  <p><%= text %></p>
<% } %>

<div class="spacer"></div>