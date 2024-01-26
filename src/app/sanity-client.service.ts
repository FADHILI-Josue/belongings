import { Inject, Injectable } from '@angular/core';
import sanityClient, { ClientConfig, SanityClient, createClient } from '@sanity/client'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SanityClientService {
  public client: SanityClient;
  private clientConfig: ClientConfig = {
    // projectId: 'qutxk4zb',
    // dataset: 'dev',
    // apiVersion: '2022-03-07',
    // useCdn: true,
    // token: 'skU3GFmbxbEpnUUa3Q5sQGZWbha3Og0o5dOsag88SdDnYAZrmJS2F3YPdXKns5BR4516imGPvExpQAU4clZUjyVpEiC9nlKlBFIvhNyQVPE2YrCOe7PuC0KOGyTxbNjvENmwfBNHCGHKI5vL1446ZK6fBqA0Lvv4TeC9HCAnu3umtAaLuCRo'
    projectId: environment.sanity.SANITY_PROJECT_ID,
    dataset: environment.sanity.SANITY_DATASET,
    apiVersion: environment.sanity.SANITY_API_VERSION,
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
