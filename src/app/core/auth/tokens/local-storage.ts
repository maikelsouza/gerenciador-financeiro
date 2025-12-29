import { InjectionToken } from "@angular/core";

export const localStorageToken = new InjectionToken<Storage>('local Storage', {
        providedIn: 'root',
        factory: () => window.localStorage
    }
);