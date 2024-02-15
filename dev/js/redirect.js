/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}

window.addEventListener("load", function (event) {
  const path = window.location.pathname;

  if (!path.includes("get-shuffle")) {
    return;
  }

  const os = getMobileOperatingSystem();

  if (os === "Unknown") {
    return;
  }

  if (os === "iOS") {
    window.location.replace(
      "https://apps.apple.com/us/app/shuffle-your-evening/id6449493932"
    );
  } else if (os === "Android") {
    window.location.replace(
      "https://play.google.com/store/apps/details?id=tech.azart.shuffle"
    );
  }
});
