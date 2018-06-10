import { ActionReducerMap, State } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '@env/environment';

export const META_REDUCERS = !environment.production ? [storeFreeze] : [];