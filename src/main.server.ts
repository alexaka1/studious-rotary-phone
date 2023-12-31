import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { enableProdMode } from '@angular/core';

const bootstrap = () => bootstrapApplication(AppComponent, config);
enableProdMode();
export default bootstrap;
