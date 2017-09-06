import { Observable } from 'rxjs/Observable';
/**
 *  Minimum definition needed by base class
 */
export interface HeadersCore {
    set(name: string, value: string): void | any;
}
/**
* Interface for object passed to an HTTP method override method
*/
export interface HttpMethodInterceptorArgs {
    requestInfo: RequestInfo;
    db: Object;
    config: InMemoryBackendConfigArgs;
    passThruBackend: PassThruBackend;
}
/**
* Interface for a class that creates an in-memory database
*
* Its `createDb` method creates a hash of named collections that represents the database
*
* For maximum flexibility, the service may define HTTP method overrides.
* Such methods must match the spelling of an HTTP method in lower case (e.g, "get").
* If a request has a matching method, it will be called as in
* `get(info: requestInfo, db: {})` where `db` is the database object described above.
*/
export declare abstract class InMemoryDbService {
    /**
    * Creates a "database" hash whose keys are collection names
    * and whose values are arrays of collection objects to return or update.
    *
    * This method must be safe to call repeatedly.
    * Each time it should return a new object with new arrays containing new item objects.
    * This condition allows InMemoryBackendService to morph the arrays and objects
    * without touching the original source data.
    *
    * The method will receive the request object from POST commands/resetDb
    * which it may use to adjust its behavior.
    */
    abstract createDb(req?: {}): {};
}
/**
* Interface for InMemoryBackend configuration options
*/
export declare abstract class InMemoryBackendConfigArgs {
    /**
     * false (default) if search match should be case insensitive
     */
    caseSensitiveSearch?: boolean;
    /**
     * true (default) encapsulate content in a `data` property inside the response body. false: put content directly inside the response body
     */
    dataEncapsulation?: boolean;
    /**
     * delay (in ms) to simulate latency
     */
    delay?: number;
    /**
     * false (default) should 204 when object-to-delete not found; true: 404
     */
    delete404?: boolean;
    /**
     * false (default) should pass unrecognized request URL through to original backend; true: 404
     */
    passThruUnknownUrl?: boolean;
    /**
     * true (default) should NOT return the item (204) after a POST. false: return the item (200).
     */
    post204?: boolean;
    /**
    * false (default) should NOT update existing item with POST. false: OK to update.
    */
    post409?: boolean;
    /**
    * true (default) should NOT return the item (204) after a POST. false: return the item (200).
    */
    put204?: boolean;
    /**
     * false (default) if item not found, create as new item; false: should 404.
     */
    put404?: boolean;
    /**
     * The base path to the api, e.g, 'api/'.
     * If not specified than `parseUrl` assumes it is the first path segment in the request.
     */
    apiBase?: string;
    /**
     * host for this service, e.g., 'localhost'
     */
    host?: string;
    /**
     * root path _before_ any API call, e.g., ''
     */
    rootPath?: string;
}
/**
*  InMemoryBackendService configuration options
*  Usage:
*    InMemoryWebApiModule.forRoot(InMemHeroService, {delay: 600})
*
*  or if providing separately:
*    provide(InMemoryBackendConfig, {useValue: {delay: 600}}),
*/
export declare class InMemoryBackendConfig implements InMemoryBackendConfigArgs {
    constructor(config?: InMemoryBackendConfigArgs);
}
/**
 *
 * Interface for the result of the parseUrl method:
 *   Given URL "http://localhost:8080/api/customers/42?foo=1 the default implementation returns
 *     base: 'api/'
 *     collectionName: 'customers'
 *     id: '42'
 *     query: this.createQuery('foo=1')
 *     resourceUrl: 'http://localhost/api/customers/'
 */
export interface ParsedUrl {
    base: string;
    collectionName: string;
    id: string;
    query: Map<string, string[]>;
    resourceUrl: string;
}
export interface PassThruBackend {
    /**
     * Handle an HTTP request and return an Observable of HTTP response
     * Both the request type and the response type are determined by the supporting HTTP library.
     */
    handle(req: any): Observable<any>;
}
export declare function removeTrailingSlash(path: string): string;
/**
 *  Minimum definition needed by base class
 */
export interface RequestCore {
    url: string;
}
/**
* Interface for object w/ info about the current request url
* extracted from an Http Request
*/
export interface RequestInfo {
    req: RequestCore;
    base: string;
    collection: any[];
    collectionName: string;
    headers: HeadersCore;
    method: string;
    id: any;
    query: Map<string, string[]>;
    resourceUrl: string;
    url: string;
}
/**
 * Provide a `responseInterceptor` method of this type in your `inMemDbService` to
 * morph the response options created in the `collectionHandler`.
 */
export declare type ResponseInterceptor = (res: ResponseOptions, ri: RequestInfo) => ResponseOptions;
export interface ResponseOptions {
    /**
     * String, Object, ArrayBuffer or Blob representing the body of the {@link Response}.
     */
    body?: string | Object | ArrayBuffer | Blob;
    /**
     * Response headers
     */
    headers?: HeadersCore;
    /**
     * Http {@link http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html status code}
     * associated with the response.
     */
    status?: number;
    /**
     * Status text for the status code
     */
    statusText?: string;
    /**
     * request url
     */
    url?: string;
}
