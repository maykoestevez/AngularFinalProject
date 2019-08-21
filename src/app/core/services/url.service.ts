export class UrlService {

    public static APIURL = new UrlService().getApiUrl();
    public static BASEURL: string = new UrlService().getBaseUrl();

    public baseUrlProd = 'http://localhost:5000/';
    public apiUrlProd = 'http://localhost:5000/api/';

    public baseUrlDev = 'http://localhost:5000/';
    public apiUrlDev = 'http://localhost:5000/api/';

    private environment = 'DEV';

    public getBaseUrl(): string {

        switch (this.environment) {
            case 'DEV':
                return this.baseUrlDev;

            case 'PROD':
                return this.baseUrlProd;

            default:
                return this.baseUrlDev;

        }
    }

    public getApiUrl(): string {

        switch (this.environment) {
            case 'DEV':
                return this.apiUrlDev;

            case 'PROD':
                return this.apiUrlProd;

            default:
                return this.apiUrlDev;

        }
    }
}
