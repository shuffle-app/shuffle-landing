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

/**
 * Определение типа устройства и браузера для аналитики
 */
function getDeviceInfo() {
    const userAgent = navigator.userAgent;

    let deviceType = 'desktop';
    let os = 'Unknown';
    let browser = 'Unknown';

    // Тип устройства
    if (/iPad/.test(userAgent)) {
        deviceType = 'tablet';
    } else if (/Mobile|Android|iPhone/.test(userAgent)) {
        deviceType = 'mobile';
    }

    // OS
    if (/Windows/.test(userAgent)) os = 'Windows';
    else if (/Mac OS/.test(userAgent)) os = 'macOS';
    else if (/Android/.test(userAgent)) os = 'Android';
    else if (/iOS|iPhone|iPad/.test(userAgent)) os = 'iOS';
    else if (/Linux/.test(userAgent)) os = 'Linux';

    // Браузер
    if (/Chrome/.test(userAgent) && !/Edge/.test(userAgent)) browser = 'Chrome';
    else if (/Firefox/.test(userAgent)) browser = 'Firefox';
    else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) browser = 'Safari';
    else if (/Edge/.test(userAgent)) browser = 'Edge';

    return { deviceType, os, browser };
}

/**
 * Отправка аналитики
 */
function sendAnalytics(redirectTarget) {
    const deviceInfo = getDeviceInfo();
    const willRedirect = redirectTarget !== 'unknown';

    const data = {
        password: 'shuffle2024!', // Замените на ваш пароль
        ...deviceInfo,
        clickedDownload: willRedirect,
        appStoreClicked: willRedirect ? (redirectTarget === 'iOS' ? 'app_store' : 'google_play') : null
    };

    // Отправляем аналитику
    fetch('https://aviation-backendapi-dev.up.railway.app/v1/database-operations/shuffle-qr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(resp => resp.json())
        .then(result => {
            console.log('QR analytics tracked before redirect:', result);
        })
        .catch(err => {
            console.error('QR analytics failed:', err);
        });

    // Отправляем в Google Analytics (если доступен)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'qr_page_view', {
            'source': 'qr_code',
            'device_type': deviceInfo.deviceType,
            'will_redirect': willRedirect,
            'redirect_target': redirectTarget
        });

        if (willRedirect) {
            gtag('event', 'auto_redirect', {
                'app_store': redirectTarget === 'iOS' ? 'app_store' : 'google_play',
                'source': 'qr_code'
            });
        }
    }
}

window.addEventListener("load", function (event) {
    const path = window.location.pathname;

    if (!path.includes("get-shuffle")) {
        return;
    }

    const os = getMobileOperatingSystem();

    // Всегда отправляем аналитику (даже если unknown)
    sendAnalytics(os);

    // Если unknown, не делаем редирект
    if (os === "unknown") {
        return;
    }

    // Делаем редирект с небольшой задержкой для отправки аналитики
    setTimeout(() => {
        if (os === "iOS") {
            window.location.replace(
                "https://apps.apple.com/us/app/shuffle-your-evening/id6449493932"
            );
        } else if (os === "Android") {
            window.location.replace(
                "https://play.google.com/store/apps/details?id=tech.azart.shuffle"
            );
        }
    }, 300); // 300мс задержка для отправки аналитики
});