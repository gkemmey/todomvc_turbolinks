on(document, "ajax:complete", "[data-behavior~=has_children_that_clear_after_submission]", function(event) {
  var children = this.querySelectorAll("[data-behavior~=clears_after_submission]");

  for (var i = 0; i < children.length; ++i) {
    children[i].value = '';
  }
});

on(document, "click", "[data-behavior~=submit_form_when_clicked]", function(event) {
  this.closest("form").submit();
});

on(document, "click", "[data-behavior~=submit_form_when_blurred]", function(event) {
  this.closest("form").submit();
});

on(document, "dblclick", "[data-behavior~=double_click_to_edit]", function(event) {
  this.classList.add("editing");

  var children_to_hide = this.querySelectorAll("[data-behavior~=hidden_after_double_clicking_to_edit]");
  for (var i = 0; i < children_to_hide.length; ++i) {
    children_to_hide[i].style.display = 'none';
  }

  var children_to_show = this.querySelectorAll("[data-behavior~=visible_after_double_clicking_to_edit]");
  for (var i = 0; i < children_to_show.length; ++i) {
    children_to_show[i].style.display = '';
  }

  this.querySelector("input.edit").focus();
  this.querySelector("input.edit").select();
});

on(document, "keydown", "[data-behavior~=cancel_edit_on_escape]", function(event) {
  if (event.keyCode != 27) { return; } // only the escape button

  var li = this.closest("[data-behavior~=double_click_to_edit]");
  li.classList.remove("editing");

  var children_to_hide = li.querySelectorAll("[data-behavior~=visible_after_double_clicking_to_edit]");
  for (var i = 0; i < children_to_hide.length; ++i) {
    children_to_hide[i].style.display = 'none';
  }

  var children_to_show = li.querySelectorAll("[data-behavior~=hidden_after_double_clicking_to_edit]");
  for (var i = 0; i < children_to_show.length; ++i) {
    children_to_show[i].style.display = '';
  }
});
