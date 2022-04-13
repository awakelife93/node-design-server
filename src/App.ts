import { Application } from "express";
import * as _ from "lodash";
import config from "./config";
import {
  AppRepository,
  connectMongo,
  connectRepository,
  createDevelopmentExpress,
  createProductionExpress,
  createRoute,
  createServer,
  initializeSentry
} from "./lib";

class App {
  private onInitializeSentry(server: Application): void {
    console.log("App Initialize Sentry");
    initializeSentry(server);
  }

  private onCreateRoute(server: Application): void {
    console.log("App Created Route");
    createRoute(server);
  }

  private onCreateServer(server: Application): void {
    console.log("App Created Server");
    createServer(server);
  }

  private async onConnectDB(): Promise<void> {
    console.log("App Connected DB");
    await connectMongo();
  }

  private async onConnectRepository(): Promise<void> {
    console.log("App Connected Repositorys");
    await connectRepository();
  }

  private async onCreateTestSample(): Promise<void> {
    console.log("App Created Test Datas");
    await AppRepository.generateTestData();
  }

  private onCreateLocalHostApp = async (): Promise<void> => {
    const server: Application = createDevelopmentExpress();

    this.onCreateRoute(server);
    this.onCreateServer(server);
    await this.onConnectDB();
    await this.onConnectRepository();
    await this.onCreateTestSample();
  };

  // * localhost환경과 달라야 할 경우 확장
  private onCreateDevelopmentApp = this.onCreateLocalHostApp;

  private onCreateProductionApp = async (): Promise<void> => {
    const server: Application = createProductionExpress();

    this.onInitializeSentry(server);
    this.onCreateRoute(server);
    this.onCreateServer(server);
    await this.onConnectDB();
    await this.onConnectRepository();
  };

  private getApplication = (): Function => {
    const applications = {
      production: this.onCreateProductionApp,
      development: this.onCreateDevelopmentApp,
      localhost: this.onCreateLocalHostApp,
    };

    const application = applications[config.NODE_ENV];

    if (_.isFunction(application)) {
      console.log(`NODE_ENV =======> ${config.NODE_ENV} Start`);
      return application;
    } else {
      console.log(`NODE_ENV is Undefined!!! So, LocalHost Mode Start`);
      config.NODE_ENV = "localhost";
      return this.onCreateLocalHostApp;
    }
  };

  startApplication = async (): Promise<void> => {
    try {
      const application = this.getApplication();
      await application();
    } catch (error: unknown) {
      console.log(error);
    }
  };
}

export default new App();
