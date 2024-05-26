document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      var alerts = document.querySelectorAll('.alert');
      alerts.forEach(function(alert) {
        alert.classList.add('fade');
        setTimeout(function() {
          if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
          }
        }, 500);
      });
    }, 2000); 
  });