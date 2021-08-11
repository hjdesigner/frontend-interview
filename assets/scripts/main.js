(function() {
  const header = document.querySelector('header');

  function transparentHeader() {
    document.addEventListener('scroll', function(e) {
      window.scrollY >= 150 ? header.classList.add('transparent') : header.classList.remove('transparent');
    });
  }



  transparentHeader();
})()
