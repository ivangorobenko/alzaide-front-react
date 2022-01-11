export const browserGeolocationService = {
    getGeoLocation: (success, error) => {
        const options = {
            enableHighAccuracy: true,
            timeout: 100,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(success, error, options)
    }

}

