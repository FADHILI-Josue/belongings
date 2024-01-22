import { Inject, Injectable } from '@angular/core';
import sanityClient, { ClientConfig, SanityClient, createClient } from '@sanity/client'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SanityClientService {
  public client: SanityClient;
  private clientConfig: ClientConfig = {
    projectId: environment.sanity.SANITY_PROJECT_ID,
    dataset: environment.sanity.SANITY_DATASET,
    apiVersion: environment.sanity.SANITY_API_VERSION,
    useCdn: true,
    token: environment.sanity.token
  }

  constructor() {
    this.client = createClient(this.clientConfig)
  }
  async fetch(query: string, params?: Record<string, unknown>,): Promise<any> {
    const data = await this.client.fetch(query, (params && params));
    return data;
  }
}
