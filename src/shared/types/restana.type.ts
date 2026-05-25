import restana from 'restana';

export type Server = restana.Service<restana.Protocol.HTTP | restana.Protocol.HTTPS>;
export type Request = restana.Request<restana.Protocol>;
export type Response = restana.Response<restana.Protocol>;
export type NextHandler = () => void | Promise<void>;
