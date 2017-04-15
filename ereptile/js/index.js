document.addEventListener('DOMContentLoaded', function() {
  var timeout = 200;
  var containers = Array.prototype.slice.call(document.querySelectorAll('.anim'));

  containers.forEach(function(container) {
    var idx = 0;
    var images = container.querySelectorAll('.anim-image');
    var visible = images[0];

    visible.classList.remove('hidden');

    setInterval(function() {
      visible.classList.add('hidden');
      idx = (idx < images.length - 1) ? idx++ : 0;
      visible = images[idx];
      visible.classList.remove('hidden');
    }, timeout);
  });
});
