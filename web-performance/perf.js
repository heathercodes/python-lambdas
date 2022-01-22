// from Todd Gardner's web performance course
// captures field data from our webpage and bring it back.
// could also just use the web vitals library from Google

// 1. document ready
(function (ready) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    ready();
  } else {
    document.addEventListener("readystatechange", function () {
      if (document.readyState === "complete") {
        ready();
      }
    });
  }
})(function perf() {
  /* the document is now complete. */
  // 2. what are we measuring?
  var data = {
    url: window.location.href,
    dcl: 0, // dom content loaded
    load: 0, // load event
    // web vitals
    fcp: 0, // first contentful paint
    lcp: 0, // largest contentful paint
    cls: 0, // cumulative layout shift
    fid: 0, // first input delay
  };

  // 3. set up observers
  // use buffers to get historical events

  // first contentful paint observer
  var fcpObserver = new PerformanceObserver(function handleFCP(entryList) {
    var entries = entryList.getEntries() || [];
    entries.forEach(function (entry) {
      if (entry.name === "first-contentful-paint") {
        // this gets alllll the paint entries, so you need to filter for the right one
        data.fcp = entry.startTime;
        console.log("Recorded FCP Performance: " + data.fcp);
      }
    });
  }).observe({ type: "paint", buffered: true });

  // largest contentful paint
  var lcpObserver = new PerformanceObserver(function handleLCP(entryList) {
    var entries = entryList.getEntries() || [];
    entries.forEach(function (entry) {
      if (entry.startTime > data.lcp) {
        // compare: is the start time of the event bigger than what we've captured before?
        data.lcp = entry.startTime;
        console.log("Recorded LCP Performance: " + data.lcp);
      }
    });
  }).observe({ type: "largest-contentful-paint", buffered: true });

  // cumulative layout shift
  var clsObserver = new PerformanceObserver(function handleCLS(entryList) {
    var entries = entryList.getEntries() || [];
    entries.forEach(function (entry) {
      if (!entry.hadRecentInput) {
        // check: was this entry expected? i.e. filter out user clicks on dropdowns, accordions etc that would affect the layout
        data.cls += entry.value;
        console.log("Increased CLS Performance: " + data.cls);
      }
    });
  }).observe({ type: "layout-shift", buffered: true });

  // first input delay
  var fidObserver = new PerformanceObserver(function handleFID(entryList) {
    var entries = entryList.getEntries() || [];
    entries.forEach(function (entry) {
      // do the math ourselves: when did we start calling events in response to a click and when did the click event happen?
      data.fid = entry.processingStart - entry.startTime;
      console.log("Recorded FID Performance: " + data.fid);
    });
  }).observe({ type: "first-input", buffered: true });

  // because any of these could happen during the lifecycle of the page, you don't know when you're done! You only know when you're done when the page is unloaded.

  // 4. listen to the unload event
  window.addEventListener("beforeunload", function () {
    var navEntry = performance.getEntriesByType("navigation")[0];
    data.dcl = navEntry.domContentLoadedEventStart;
    data.load = navEntry.loadEventStart;

    var payload = JSON.stringify(data);
    navigator.sendBeacon("/api/perf", payload); // beacons can be fired after the page is done to
    console.log("Sending performance:", payload);
  });
});
