import 'reflect-metadata';
import 'module-alias/register';
import 'dotenv/config';
import restana from 'restana';
import { errorHandler, routeNotFound } from '@shared/utils/response.util';
import type { Server } from '@shared/types/restana.type';
import RouteVersion from '@shared/enums/route.config.enum';
import initializeMiddlewares from './middlewares';
import bootstrapApp from './bootstrap';
import { closeDatabase } from './database/manager';
import healthRoute from '@modules/health/health.route';
import articleRoute from '@modules/article/article.route';
import memoirRoute from '@modules/memoir/memoir.route';
import mediaRoute from '@modules/media/media.route';
import siteRoute from '@modules/site/site.route';

class App {
  public appServer: Server;

  constructor() {
    this.appServer = restana({
      defaultRoute: routeNotFound,
      errorHandler,
    });

    initializeMiddlewares(this.appServer);
    this.registerModules();
    bootstrapApp();
  }

  private registerModules() {
    healthRoute(this.appServer, RouteVersion['v1.health']);
    articleRoute(this.appServer, RouteVersion['v1.articles']);
    memoirRoute(this.appServer, RouteVersion['v1.memoirs']);
    mediaRoute(this.appServer, RouteVersion['v1.media']);
    siteRoute(this.appServer, RouteVersion['v1.site']);
  }

  public async close() {
    await this.appServer.close();
    await closeDatabase();
  }

  public listen(port: number, address: string) {
    return this.appServer.start(port, address);
  }
}

export default App;
