import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  GetServerTemplateOptions,
  ServerTemplate,
  InitServerTemplateOptions,
} from 'firebase-admin/lib/remote-config/remote-config-api';

@Injectable()
export class FirebaseRemoteConfigService {
  constructor(public readonly app: admin.app.App) {}

  getServerTemplate(options?: GetServerTemplateOptions): Promise<ServerTemplate> {
    return this.remoteConfig.getServerTemplate(options);
  }
  initServerTemplate(options?: InitServerTemplateOptions): ServerTemplate {
    return this.remoteConfig.initServerTemplate(options);
  }

  get remoteConfig() {
    if (!this.app) {
      throw new Error('Firebase instance is undefined.');
    }
    return this.app.remoteConfig();
  }

  getTemplate(): Promise<admin.remoteConfig.RemoteConfigTemplate> {
    return this.remoteConfig.getTemplate();
  }

  getTemplateAtVersion(versionNumber: number | string): Promise<admin.remoteConfig.RemoteConfigTemplate> {
    return this.remoteConfig.getTemplateAtVersion(versionNumber);
  }

  validateTemplate(
    template: admin.remoteConfig.RemoteConfigTemplate,
  ): Promise<admin.remoteConfig.RemoteConfigTemplate> {
    return this.remoteConfig.validateTemplate(template);
  }

  publishTemplate(
    template: admin.remoteConfig.RemoteConfigTemplate,
    options?: { force: boolean },
  ): Promise<admin.remoteConfig.RemoteConfigTemplate> {
    return this.remoteConfig.publishTemplate(template, options);
  }

  createTemplateFromJSON(json: string): admin.remoteConfig.RemoteConfigTemplate {
    return this.remoteConfig.createTemplateFromJSON(json);
  }

  rollback(versionNumber: string | number): Promise<admin.remoteConfig.RemoteConfigTemplate> {
    return this.remoteConfig.rollback(versionNumber);
  }

  listVersions(options?: admin.remoteConfig.ListVersionsOptions): Promise<admin.remoteConfig.ListVersionsResult> {
    return this.remoteConfig.listVersions(options);
  }
}
