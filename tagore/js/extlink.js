if (Drupal.jsEnabled) {
  $(document).ready(function() {
    // Strip the host name down, removing subdomains or www.
    var host = window.location.host.replace(/^(([^\/]+?\.)*)([^\.]{4,})((\.[a-z]{1,4})*)$/, '$3$4');
    var subdomain = window.location.host.replace(/^(([^\/]+?\.)*)([^\.]{4,})((\.[a-z]{1,4})*)$/, '$1');

    // Determine what subdomains are considered internal.
    if (Drupal.settings.extlink.extSubdomains) {
      var subdomains = "([^/]*)?";
    }
    else if (subdomain == 'www.' || subdomain == '') {
      var subdomains = "(www\.)?";
    }
    else {
      var subdomains = subdomain.replace(".", "\.");
    }

    // Build regular expressions that define an internal link.
    var internal_link = new RegExp("^https?://" + subdomains + host, "i");

    // Find all links which are NOT internal and begin with http (as opposed
    // to ftp://, javascript:, etc. other kinds of links.
    // When operating on the 'this' variable, the host has been appended to
    // all links by the browser, even local ones.
    // In jQuery 1.1 and higher, we'd us a filter method here, but it is not
    // available in jQuery 1.0 (Drupal 5 default).
    var external_links = new Array();
    $("a").each(function(el) {
      try {
        var url = this.href.toLowerCase();
        if (url.indexOf('http') == 0 && !url.match(internal_link)) {
          external_links.push(this);
        }
      }
      // IE7 throws errors often when dealing with irregular links, such as:
      // <a href="http://www.artic.edu/aic/collections/sites/all/modules/extlink/node/10"></a> Empty tags.
      // <a href="http://user:pass@example.com">example</a> User:pass syntax.
      catch(error) {
        return false;
      }
    });

    $links = $(external_links);

    if (Drupal.settings.extlink.extClass) {
      // Apply the "ext" class to all links not containing images.
      $links.not($links.find('img').parents('a')).addClass(Drupal.settings.extlink.extClass);
    }

    if (Drupal.settings.extlink.extTarget) {
      // Apply the target attribute to all links.
      $links.attr('target', Drupal.settings.extlink.extTarget);
    }
  });
}
